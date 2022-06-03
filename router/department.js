const router = require("express").Router()
const departmentController = require("../controllers/departmentController")
const { verifyRoleAndAdmin} = require("../middlewares/verifyToken")

router.post("/add", verifyRoleAndAdmin, departmentController.add)
router.put("/update/:id" , verifyRoleAndAdmin, departmentController.update)
router.delete("/delete/:id" , verifyRoleAndAdmin, departmentController.delete)
router.get("/cate/:idcate", departmentController.getByCate)
router.get("/:id", departmentController.get)
router.get("/", departmentController.getAll)
module.exports = router