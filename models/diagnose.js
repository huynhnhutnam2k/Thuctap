const mongoose = require("mongoose")

const diagnoseSchema = new mongoose.Schema({
    questionId:{
        type: String, 
        required: true
    },
    description: {
        type: String, 
        required: true
    },
    // id:{
    //     type:Number,
    //     required: true
    // },
    
    name: {
        type: String, 
        required: true
    },
    image: {
        type: [String], 
    },
    video: {
        type: [String],
    },
    subDiagnose: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "subDiagnose"
        }
    ]
},{
    timestamps: true
})
module.exports = mongoose.model("Diagnose", diagnoseSchema)