const router = require("express").Router();
const User = require("../models/User");
const auth = require("../utils.js/middleware/authMiddleware");

router.post("/signup", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.getAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    const token = await user.getAuthToken();
    res.send({ user: user, token });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.get("/users/me", auth, async (req, res) => {
  const data = { data: req.user, token: req.token };
  res.send(data);
});

router.post("/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      token => token.token !== req.token
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
  const allowedUpdates = ["fname", "email", "password"];
  const isValidField = updates.every(update => allowedUpdates.includes(update));

  if (!isValidField)
    return res.status(400).send({ error: "Invalid update field" });

  try {
    updates.forEach(update => {
      req.user[update] = req.body[update];
    });

    await req.user.save();

    res.send(req.user);
  } catch (error) {}
});

module.exports = router;
