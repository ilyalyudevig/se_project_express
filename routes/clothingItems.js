const router = require("express").Router();
const { validateItem, validateItemId } = require("../middlewares/validation");

const {
  createItem,
  deleteItem,
  likeItem,
  unlikeItem,
} = require("../controllers/clothingItems");

router.post("/", validateItem, createItem);
router.delete("/:itemId", validateItemId, deleteItem);
router.put("/:itemId/likes", validateItemId, likeItem);
router.delete("/:itemId/likes", validateItemId, unlikeItem);

module.exports = router;
