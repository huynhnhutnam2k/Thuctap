const router = require("express").Router()
const categoriesController = require("../controllers/categoriesController")
const {verifyToken} = require("../middlewares/verifyToken")
router.post("/add", verifyToken, categoriesController.add)
router.put("/update/:id", categoriesController.update)
router.delete("/delete/:id", categoriesController.delete)
router.get("/:id", categoriesController.get)
router.get("/", categoriesController.getAll)
module.exports = router
