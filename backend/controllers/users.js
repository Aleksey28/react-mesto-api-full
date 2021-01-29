const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundErr = require('../errors/not-found-err');
const ConflictingRequest = require('../errors/conflicting-request');

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const { NODE_ENV, JWT_SECRET } = process.env;

      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res.cookie('jwt', `Bearer ${token}`, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      }).send({ success: true });
    })
    .catch(next);
};

const logout = (req, res) => {
  res.clearCookie('jwt').send({ success: true });
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((data) => {
      res.send(data);
    })
    .catch(next);
};

const getUser = (req, res, next) => {
  User.findById(req.params.id)
    .then((data) => {
      if (!data) {
        throw new NotFoundErr('Нет пользователя с таким id');
      }
      res.send(data);
    })
    .catch(next);
};

const getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((data) => {
      if (!data) {
        throw new NotFoundErr('Нет пользователя с таким id');
      }
      res.send(data);
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  User.findOne({
    email,
  })
    .then((data) => {
      if (data) {
        throw new ConflictingRequest('Пользователь с таким E-mail уже существует.');
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((hash) => {
      res.send({
        name: hash.name, about: hash.about, avatar: hash.avatar, email: hash.email,
      });
    })
    .catch(next);
};

const updateUserInfo = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    {
      name,
      about,
    },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    },
  )
    .then((data) => {
      if (!data) {
        throw new NotFoundErr('Нет пользователя с таким id');
      }
      res.send(data);
    })
    .catch(next);
};

const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    },
  )
    .then((data) => {
      if (!data) {
        throw new NotFoundErr('Нет пользователя с таким id');
      }
      res.send(data);
    })
    .catch(next);
};
module.exports = {
  login,
  logout,
  getUsers,
  getUser,
  getUserInfo,
  createUser,
  updateUserInfo,
  updateUserAvatar,
};
