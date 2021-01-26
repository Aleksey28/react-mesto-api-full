const mongoose = require("mongoose");
const isEmail = require("validator/lib/isEmail");
const isURL = require('validator/lib/isURL');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "Жак-Ив Кусто",
    required: false,
    minLength: 2,
    maxLength: 30,
  },
  about: {
    type: String,
    default: "Исследователь",
    required: false,
    minLength: 2,
    maxLength: 30,
  },
  avatar: {
    type: String,
    default: "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
    required: false,
    validate: {
      validator: (v) => isURL(v),
      message: "Не верно указан адрес.",
    },
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
