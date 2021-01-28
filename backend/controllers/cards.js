const mongoose = require("mongoose");

const Card = require("../models/card");
const NotFoundErr = require("../errors/not-found-err");

const getCards = (req, res, next) => {
  Card.find({})
    .populate(["owner", "likes"])
    .sort('-createdAt')
    .then((data) => {
      res.send(data);
    })
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.findOneAndUpdate(
    { _id: mongoose.Types.ObjectId() },
    { name, link, owner: req.user._id },
    {
      new: true,
      upsert: true,
      runValidators: true,
      setDefaultsOnInsert: true,
      populate: ["owner", "likes"],
    },
    )
    .then((data) => {
      res.send(data);
    })
    .catch(next);
};

const deleteCard = (req, res, next) => {
  Card.findOneAndDelete({
    _id: req.params.cardId,
    owner: req.user._id,
  }).populate("owner")
    .then((data) => {
      if (!data) {
        throw new NotFoundErr("Нет карточки с таким id");
      }
      res.send(data);
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
    )
    .populate(["owner", "likes"])
    .then((data) => {
      if (!data) {
        throw new NotFoundErr("Нет карточки с таким id");
      }
      res.send(data);
    })
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
    )
    .populate(["owner", "likes"])
    .then((data) => {
      if (!data) {
        throw new NotFoundErr("Нет карточки с таким id");
      }
      res.send(data);
    })
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
