const router = require("express").Router()
const subMarkController = require("../controllers/subMarkController")
router.post("/add", subMarkController.add)

module.exports = router