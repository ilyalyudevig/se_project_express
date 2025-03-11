const ClothingItem = require("../models/clothingItem");
const { handleError } = require("../utils/handleError");

module.exports.getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.send({ items }))
    .catch((err) => {
      handleError(err, res);
    });
};

module.exports.createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => res.send(item))
    .catch((err) => {
      handleError(err, res);
    });
};

module.exports.deleteItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then((item) => {
      res.send(item);
    })
    .catch((err) => {
      handleError(err, res);
    });
};

module.exports.likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => {
      res.send(item);
    })
    .catch((err) => {
      handleError(err, res);
    });
};

module.exports.unlikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => {
      res.send(item);
    })
    .catch((err) => {
      handleError(err, res);
    });
};
