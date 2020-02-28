const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  "first-name": {
    type: String,
    required: true
  },
  "last-name": {
    type: Date,
    default: Date.now()
  },
  "date-joined": {
    type: Date,
    default: Date.now()
  },
  "last-active": {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("User", UserSchema);
