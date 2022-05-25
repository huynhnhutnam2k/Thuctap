const router = require("express").Router()
const diagnoseController = require("../controllers/diagnoseController")

router.get("/", diagnoseController.getAll)
router.get("/:id", diagnoseController.get)
router.post("/add", diagnoseController.add)
router.put("/update/:id", diagnoseController.update)
router.delete("/delete/:id", diagnoseController.delete)
module.exports = router