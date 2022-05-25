const mongoose = require("mongoose")
const Schema = mongoose.Schema

const categoriesSchema  = new Schema({
    name:{
        type: String, 
        required: true
    },
    question: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Question"
        }
    ],
    department: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Department"
        }
    ]
},{
    timestamps: true
})
module.exports = mongoose.model("Categories", categoriesSchema)