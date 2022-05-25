const router = require("express").Router()
const authController = require("../controllers/authController")
router.post("/register", authController.register)
router.post("/login", authController.login)
router.put("/update/:id",authController.update)
router.get("/:id", authController.get)
router.get("/", authController.getAll)
module.exports = router