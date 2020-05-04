const router = require("express").Router();
const User = require("../models/User");
const auth = require("../utils/middleware/authMiddleware").authMiddleware;
const { CLIENT_URL } = require("../utils/config.js");
const { sendWelcomeEmail } = require("../utils/middleware/emailMiddleware");

router.post("/signup", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.getAuthToken();
    sendWelcomeEmail(user.email, user.fname);
    res.setHeader("Access-Control-Allow-Origin", CLIENT_URL);
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

    res.setHeader("Access-Control-Allow-Origin", CLIENT_URL);
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

router.post("/recover-password", auth, async (req, res) => {
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

router.post("/update-password", auth, async (req, res) => {
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

router.post("/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

router.delete("/delete", auth, async (req, res) => {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (error) {
    res.status(500).send();
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
  } catch (error) {}
});

module.exports = router;
