const mongoose = require("mongoose")


const authSchema = new mongoose.Schema({
    username: {
        type: String, 
        required: true
    },
    email: {
        type: String, 
        required: true,
        unique: true
    },
    password: {
        type: String, 
        required: true

    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        required: true,
        default: 'user'
    },
},{
    timestamps: true
})

module.exports = mongoose.model("User", authSchema)