const mongoose = require("mongoose")

const departmentSchema = new mongoose.Schema({
    name: {
        type: String, required: true
    },
    question: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Question"
        }
    ],
    deanName: {
        type: String, 
    },
    categoriesId:{
        type: String, 
        required: true
    }
},{
    timestamps: true
})

module.exports = mongoose.model("Department", departmentSchema)