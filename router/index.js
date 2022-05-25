const question = require("./question")
const categories = require("./categories")
const department = require("./department")
const diagnose = require("./diagnose")
const auth  = require("./auth")
const router = (app) =>{
    app.use("/api/v1/categories", categories)
    app.use("/api/v1/diagnose", diagnose)
    app.use("/api/v1/department", department)
    app.use("/api/v1/question", question)
    app.use("/api/v1/auth", auth)
}

module.exports = router