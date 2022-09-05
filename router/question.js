const router = require("express").Router()
const questionController = require("../controllers/questionController")
const { verifyRoleAndAdmin, verifyToken } = require("../middlewares/verifyToken")
const upload = require("../utils/multer")

router.post("/add", upload.single("image") , verifyRoleAndAdmin ,  questionController.add)
router.post("/:id" ,verifyRoleAndAdmin, questionController.submit)
router.put("/update/:id",verifyToken, questionController.update)
router.delete("/delete/:id",verifyRoleAndAdmin, questionController.delete)
router.get("/getcd",verifyRoleAndAdmin, questionController.getCd)
router.get("/:id", questionController.get)
router.get("/cate/:idcate", questionController.getByCate)
router.get("/", questionController.getAll)
module.exports = router