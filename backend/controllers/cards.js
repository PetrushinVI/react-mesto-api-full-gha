const cardSchema = require('../models/card');
const BadRequest = require('../errors/badRequest');
const NotFound = require('../errors/notFound');
const Forbidden = require('../errors/forbidden');

module.exports.getCards = (req, res, next) => {
  cardSchema.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.status(200)
      .send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  cardSchema.create({ name, link, owner })
    .then((card) => card.populate('owner'))
    .then((card) => res.status(201)
      .send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  cardSchema.findById(cardId)
    .populate(['owner', 'likes'])
    .then((card) => {
      if (!card) {
        throw new NotFound('Карточка с указанным _id не найдена');
      } if (req.user._id !== card.owner._id.toString()) {
        throw new Forbidden('У вас нет прав на удаление данной карточки');
      }
      return cardSchema.findByIdAndRemove(cardId)
        .then(() => res.send({ message: 'Карточка удалена' }));
    })
    .catch(next);
};

module.exports.addLike = (req, res, next) => {
  const { cardId } = req.params;
  const { _id } = req.user;
  cardSchema
    .findByIdAndUpdate(
      cardId,
      // req.params.cardId,
      // { $addToSet: { likes: req.user._id } },
      { $addToSet: { likes: _id } },
      { new: true },
    )
    .populate(['owner', 'likes'])
    .orFail(() => new NotFound('Указанный _id не найден'))
    .then((card) => {
      if (!card) {
        return next(new NotFound('Карточка с указанным _id не найдена'));
      }
      return res.status(200).json(card);

    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteLike = (req, res, next) => {
  cardSchema.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .orFail(() => new NotFound('Указанный _id не найден'))
    .then((card) => {
      if (!card) {
        return next(new NotFound('Карточка с указанным _id не найдена'));
      }
      return res.json(card);
      // return res.status(200)
      //   .send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};
