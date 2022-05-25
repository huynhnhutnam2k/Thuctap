const Diagnose = require("../models/diagnose")
const Question = require("../models/question")
const diagnoseController = {
    //add
    add: async(req,res) => {
        try {
            
            const diagnose = await new Diagnose(req.body)
            const newDiagnose = await diagnose.save()
            if(req.body.questionId){
                const question = await Question.findById(req.body.questionId, {$push: {diagnose: diagnose._id}})
            }
            res.status(200).json(newDiagnose)
        } catch (error) {
            res.status(500).json(`Error: ${error.message}`)
        }
    },
    //update
    update: async(req,res) =>{
        try {   
            const id = req.params.id
            const updateDiagnose = await Diagnose.findByIdAndUpdate(id,{$set: req.body})
            res.status(200).json("Update successfully")
        } catch (error) {
            res.status(500).json(`Error :${error.message}`)
        }
    },
    //delete
    delete: async(req,res) =>{
        try {
            const id = req.params.id
            await Diagnose.deleteOne({_id: id})
            await Question.updateMany({_id:id}, {$pull: {diagnose: id}})
            res.status(200).json("Delete successfully")
        } catch (error) {
            res.status(500).json(`Error: ${error.message}`)
        }
    },
    //get an diagnose
    get: async(req,res) => {
        try {
            const id  = req.params.id
            const diagnose = await Diagnose.findById(id)
            res.status(200).json(diagnose)
        } catch (error) {
            res.status(500).json(`Error: ${error.message}`)
        }
    },
    //get all diagnose
    getAll: async(req,res) => {
        try {
            const diagnoses = await Diagnose.find()
            res.status(200).json(diagnoses)
        } catch (error) {
            res.status(500).json(`Error: ${error.message}`)
        }
    }
}
module.exports = diagnoseController