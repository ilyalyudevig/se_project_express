const router = require("express").Router();
const { getCurrentUser, updateUserData } = require("../controllers/users");

router.get("/me", getCurrentUser);
router.patch("/me", updateUserData);

module.exports = router;
