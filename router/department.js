const router = require("express").Router()
const departmentController = require("../controllers/departmentController")


router.get("/", departmentController.getAll)
router.get("/:id", departmentController.get)
router.post("/add", departmentController.add)
router.put("/update/:id" , departmentController.update)
router.delete("/delete/:id" , departmentController.delete)
module.exports = router