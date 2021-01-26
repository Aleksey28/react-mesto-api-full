const mongoose = require("mongoose");
const isEmail = require("validator/lib/isEmail");
const isURL = require('validator/lib/isURL');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
    required: true,
  },
  about: {
    type: String,
    minLength: 2,
    maxLength: 30,
    required: true,
  },
  avatar: {
    type: String,
    validate: {
      validator: (v) => isURL(v),
      message: "Не верно указан адрес.",
    },
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: (v) => isEmail(v),
      message: "Неверно указана почта."
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: (v) => v.length>7,
      message: "Минимальная длинна пароля 8 симолов."
    },
  },
});

module.exports = mongoose.model("user", userSchema);
