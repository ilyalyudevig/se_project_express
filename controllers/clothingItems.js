const ForbiddenError = require("../errors/ForbiddenError");
const BadRequestError = require("../errors/BadRequestError");

const ClothingItem = require("../models/clothingItem");

module.exports.getItems = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => res.send({ items }))
    .catch(next);
};

module.exports.createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => res.send(item))
    .catch(next);
};

module.exports.deleteItem = (req, res, next) => {
  const { itemId } = req.params;

  ClothingItem.findById(itemId)
    .orFail()
    .then((item) => {
      if (item.owner.toString() !== req.user._id) {
        throw new ForbiddenError(
          `You don't have permissions to delete this item`
        );
      }
      return ClothingItem.findByIdAndDelete(itemId);
    })
    .then((item) => {
      res.send(item);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("The id string is in an invalid format"));
      } else {
        next(err);
      }
    });
};

module.exports.likeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => {
      res.send(item);
    })
    .catch(next);
};

module.exports.unlikeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => {
      res.send(item);
    })
    .catch(next);
};
