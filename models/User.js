const mongoose = require("mongoose");
const validate = require("validator");

const UserSchema = mongoose.Schema({
  "first-name": {
    type: String,
    required: true,
    trim: true,
    minlength: 4
  },
  "last-name": {
    type: String,
    trim: true
  },
  "date-joined": {
    type: Date,
    default: Date.now()
  },
  "last-active": {
    type: Date,
    default: Date.now()
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    required: true,
    validate(value) {
      if (!validate.isEmail(value)) throw new Error("Email is invalid");
    }
  },
  password: {
    type: String,
    trim: true,
    required: true,
    minlength: 7,
    validate(value) {
      if (value.toLowerCase().includes("password"))
        throw new Error(`Password should not be 'password'`);
    }
  }
});

module.exports = mongoose.model("User", UserSchema);
