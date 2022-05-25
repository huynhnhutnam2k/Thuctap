const Question = require("../models/question")
const Diagnose = require("../models/diagnose")
const Categories = require("../models/categories")
const Department = require("../models/department")
const questionController = {
    //add
    add: async(req, res) =>{
        try {
            const question = await new Question(req.body)
            if(req.body.categories ){
                const categories = await Categories.findByIdAndUpdate(req.body.categories, {$push: {question: question._id}})
            }
            if(req.body.department){
                const department = await Department.findByIdAndUpdate(req.body.department, {$push : {question: question._id}})
            }
            const newQuestion = await question.save()
            res.status(200).json(newQuestion)
        } catch (error) {
            res.status(500).json(`Error: ${error}`)
        }
    },
    //update
    update: async(req,res) =>{
        try {
            const id = req.params.id
            const updateQuestion = await Question.findByIdAndUpdate(id, {$set: req.body})
            res.status(200).json("Update successfully")
        } catch (error) {
            res.status(500).json(`Error: ${error.message}`)
        }
    },
    //delete
    delete: async(req,res) =>{
        try {
            const id = req.params.id
            await Question.deleteOne({_id: id})
            res.status(200).json("delete successfully")
        } catch (error) {
            res.status(500).json(`Error: ${error.message}`)
        }
    },
    //get an question
    get: async(req,res) => {
        try {
            const id = req.params
            const question = await Question.findById(id)
            res.status(200).json(question)
        } catch (error) {
            res.status(500).json(`Error: ${error.message}`)
        }
    },
    //get all question
    getAll: async(req,res) =>{
        try {
            const questions = await Question.find()
            res.status(200).json(questions)
        } catch (error) {
            res.status(500).json(`Error : ${error.message}`)
        }
    }
}

module.exports = questionController