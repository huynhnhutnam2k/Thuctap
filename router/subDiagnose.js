const router = require("express").Router()
const subDiagnoseController = require("../controllers/subDiagnoseController")

router.post("/add", subDiagnoseController.add)
module.exports = router