const router = require("express").Router();
const auth = require("../middlewares/auth");
const { getItems } = require("../controllers/clothingItems");
const { login, createUser } = require("../controllers/users");
const {
  validateUserData,
  validateUserLoginData,
} = require("../middlewares/validation");

router.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

router.post("/signin", validateUserLoginData, login);
router.post("/signup", validateUserData, createUser);
router.get("/items", getItems);

router.use(auth);

router.use("/items", auth, require("./clothingItems"));
router.use("/users", auth, require("./users"));

module.exports = router;
