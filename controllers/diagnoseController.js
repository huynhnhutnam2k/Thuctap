const Diagnose = require("../models/diagnose")
const diagnoseController = {
    //add
    add: async(req,res) => {
        try {
            const diagnose = await new Diagnose(req.body)
            res.status(200).json(diagnose)
        } catch (error) {
            res.status(500).json(`Error: ${error.message}`)
        }
    },
    //update
    update: async(req,res) =>{

    },
    //delete
    delete: async(req,res) =>{

    },
    //get an diagnose
    get: async(req,res) => {

    },
    //get all diagnose
    getAll: async(req,res) => {

    }
}
module.exports = diagnoseController