const mongoose = require("mongoose")

const subMarkSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question"
    },
    mark: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model("SubMark", subMarkSchema)