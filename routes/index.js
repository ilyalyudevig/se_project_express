const router = require("express").Router();

router.use("/users", require("./users"));
router.use("/items", require("./clothingItems"));

module.exports = router;
