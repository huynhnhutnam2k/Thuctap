const mongoose = require("mongoose")

const treatmentSchema = new mongoose.Schema({
    questionId: {
        type: String, 
        required: true
    },
    diagnoseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubDiagnose"
    },
    name: {
        type: String, 
        required: true
    },
    desc: {
        type: String, 
    },
    result: {
        type: String, 
        required: true
    },
    note: {
        type: String,
    }
})

module.exports = mongoose.model("Treatment", treatmentSchema)