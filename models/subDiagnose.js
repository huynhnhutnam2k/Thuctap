const mongoose = require("mongoose")

const subDiagnoseSchema = new mongoose.Schema({
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Diagnose"
    },
    nameDiagnose: {
        type: String,
        required: true
    },
    desc: {
        type: String, 
        required: true
    },
    resultDiagnose: {
        type: String,
        required: true
    },
    image: {
        type: String, 
        // required: true,
    },
    // definite: {
    //     type: String,
    //     required: true
    // },
    childrent: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Childrent"
    }],
    treatment: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Treatment"
        }
    ],
},{
    timestamps: true
})
module.exports = mongoose.model("SubDiagnose", subDiagnoseSchema)