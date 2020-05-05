const router = require("express").Router();
const User = require("../models/User");
const auth = require("../utils/middleware/authMiddleware").authMiddleware;
const { ROOT_URL } = require("../utils/config.js");
const {
  sendWelcomeEmail,
  sendResetPasswordEmail,
  sendPasswordChangeConfirmation,
} = require("../utils/middleware/emailMiddleware");
const crypto = require("crypto");
const async = require("async");

router.post("/signup", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.getAuthToken();
    sendWelcomeEmail(user.email, user.fname);
    res.setHeader("Access-Control-Allow-Origin", ROOT_URL);
    res.cookie("access_token", token, {
      maxAge: 9999999,
      httpOnly: true,
    });
    res.append("Set-Cookie", "access_token=" + token + ";");

    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    const token = await user.getAuthToken();

    res.setHeader("Access-Control-Allow-Origin", ROOT_URL);
    res.cookie("access_token", token, {
      maxAge: 9999999,
      httpOnly: true,
    });
    res.append("Set-Cookie", "access_token=" + token + ";");
    res.send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/users/me", auth, async (req, res) => {
  try {
    const data = { data: req.user };
    res.send(data);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

router.post("/recovery", (req, res) => {
  const { email } = req.body;

  async.waterfall(
    [
      (done) => {
        User.findOne({ email }).exec((err, user) => {
          if (!user) done(`User ${email} that not found.`);
          done(err, user);
        });
      },
      (user, done) => {
        crypto.randomBytes(20, (err, buffer) => {
          var token = buffer.toString("hex");
          done(err, user, token);
        });
      },
      (user, token, done) => {
        User.findByIdAndUpdate(
          { _id: user._id },
          {
            resetPasswordToken: token,
            resetPasswordExpires: Date.now() + 86400000,
          },
          { upsert: true, new: true }
        ).exec((err, new_user) => {
          done(err, token, new_user);
        });
      },
      (token, user, done) => {
        const emailConfig = {
          redirectLink: `${ROOT_URL}/?#/reset-password/`,
          token,
          tokenExpires: user.resetPasswordExpires,
          email: req.body.email,
        };

        const mailSent = sendResetPasswordEmail(emailConfig);

        if (mailSent)
          return res.json({
            success: true,
            message: `Link to reset your password was sent to ${user.email} with further instructions.`,
          });
        else return done(err);
      },
    ],
    (err) => res.status(422).json({ message: err })
  );
});

router.post("/:token/update-password", (req, res, next) => {
  const { password, confirmPassword } = req.body;
  const { token } = req.params;

  User.findOne(
    {
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    },
    async (err, user) => {
      if (!user)
        return res.status(400).send({
          message: "Password reset token is invalid or has expired.",
        });
      if (password !== confirmPassword)
        return res.status(400).send({
          message: "Passwords do not match.",
        });
      user.password = confirmPassword;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;

      await user.save();

      const mailSent = sendPasswordChangeConfirmation(user.email, user.fname);

      if (mailSent)
        return res.json({
          success: true,
          message: `Your password for account ${user.email} has been changed.`,
        });
      else
        return res.status(400).send({
          error: "Unable to confirmation for changing your password.",
        });
    }
  );
});

router.post("/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

router.delete("/delete-account", auth, async (req, res) => {
  try {
    await req.user.remove();
    res.send({ message: "Account deleted" });
  } catch (error) {
    return res.status(400).send({ error: "Failed to delete account." });
  }
});

router.patch("/update", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "fname",
    "email",
    "password",
    "starred",
    "idBoards",
    "username",
    "avatar",
    "bio",
    "viewedRecent",
  ];
  const isValidField = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidField)
    return res.status(400).send({ error: "Invalid update field" });

  try {
    updates.forEach((update) => {
      req.user[update] = req.body[update];
    });

    await req.user.save();

    res.send(req.user);
  } catch (error) {
    return res.status(400).send({
      message: error.message,
    });
  }
});

module.exports = router;
