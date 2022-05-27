const mongoose = require("mongoose")

const subMarkSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    questionId: {
        type: String,
        required: true
    },
    mark: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model("SubMark", subMarkSchema)