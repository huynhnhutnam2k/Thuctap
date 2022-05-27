const mongoose = require("mongoose")
const Schema  = mongoose.Schema

const questionSchema = new Schema({
    description: {
        type: String, 
        required: true
    },
    image: {
        type: [String], 
    },
    answer: {
        type: String, 
        required: true
    },
    name: {
        type: String,
        required: true
    },
    categories: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Categories"
    },
    averageMark: {
        type: Number,
        default: 0
    },
    video:{
        type: String, 
    },
    diagnose: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Diagnose"
    }],
    department: {

        type: mongoose.ObjectId,
        ref: "Department"
    }
        
    
},{
    timestamps: true
})

module.exports = mongoose.model("Question", questionSchema)