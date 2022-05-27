const router = require("express").Router()
const diagnoseController = require("../controllers/diagnoseController")
const { verifyRoleAndAdmin } = require("../middlewares/verifyToken")
router.post("/add",verifyRoleAndAdmin, diagnoseController.add)
router.put("/update/:id",verifyRoleAndAdmin, diagnoseController.update)
router.delete("/delete/:id",verifyRoleAndAdmin, diagnoseController.delete)
router.get("/:id", diagnoseController.get)
router.get("/", diagnoseController.getAll)
module.exports = router