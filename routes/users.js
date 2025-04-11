const router = require("express").Router();
const { getCurrentUser, updateUserData } = require("../controllers/users");
const { validateUpdateUserData } = require("../middlewares/validation");

router.get("/me", getCurrentUser);
router.patch("/me", validateUpdateUserData, updateUserData);

module.exports = router;
