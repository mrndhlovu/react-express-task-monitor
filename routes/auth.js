const router = require("express").Router();
const User = require("../models/User");

router.post("/signup", async (req, res) => {
  const user = new User(req.body);
  await user
    .save()
    .then(() => {
      res.send(user);
    })
    .catch(error => res.status(400).send({ message: error }));
});

router.get("", async (req, res) => {
  await User.find({})
    .then(users => {
      res.send(users);
    })
    .catch(error => res.status(500).send());
});

router.get("/user/:userId", async (req, res) => {
  await User.findById(req.params.userId)
    .then(user => {
      if (!user) return res.status(404).send();
      res.send(user);
    })
    .catch(error => res.status(500).send());
});

router.patch("/user/:userId", async (req, res) => {
  await User.findById(req.params.userId)
    .then(user => {
      if (!user) return res.status(404).send();
      res.send(user);
    })
    .catch(error => res.status(500).send());
});

module.exports = router;
