const router = require("express").Router()

const questionController = require("../controllers/questionController")
router.post("/add", questionController.add)
router.put("/update/:id", questionController.update)
router.delete("/delete/:id", questionController.delete)
router.get("/:id", questionController.get)
router.get("/", questionController.getAll)
module.exports = router