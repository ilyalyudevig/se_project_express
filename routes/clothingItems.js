const router = require("express").Router();
const { validateItem, validateItemId } = require("../middlewares/validation");

const {
  createItem,
  deleteItem,
  likeItem,
  unlikeItem,
} = require("../controllers/clothingItems");

router.post("/", validateItem, createItem);

router.use("/:itemId", validateItemId);
router.delete("/:itemId", deleteItem);
router.put("/:itemId/likes", likeItem);
router.delete("/:itemId/likes", unlikeItem);

module.exports = router;
