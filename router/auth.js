const router = require("express").Router()
const authController = require("../controllers/authController")
const {verifyRoleAndAdmin, verifyToken} = require("../middlewares/verifyToken")
router.post("/register", verifyToken, authController.register)
router.post("/login", authController.login)
router.put("/update/:id",verifyRoleAndAdmin, authController.update)
router.get("/:id", verifyToken,  authController.get)
router.post("/logout", verifyRoleAndAdmin, authController.logout)
router.delete("/delete/:id", verifyToken, authController.delete)
router.get("/", verifyRoleAndAdmin, authController.getAll)

module.exports = router