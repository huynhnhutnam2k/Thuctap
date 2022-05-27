const router = require("express").Router()
const treatmentController = require('../controllers/treatmentController')

router.post("/add" , treatmentController.add)
module.exports = router