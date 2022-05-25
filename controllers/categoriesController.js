const Categories = require("../models/categories")
const Question = require("../models/question")
const Department = require("../models/department")
const categoriesController = {
    //add
    add: async(req,res) => {
        try {
            const cate = await new Categories(req.body)
            const newCate = await cate.save()

            res.status(200).json(newCate)
        } catch (error) {
            res.status(500).json(`Error: ${error}`)
        }
    },
    //update
    update: async(req,res) => {
        try {
            const { id } = req.params
            const updateCate = await Categories.updateOne({_id: id}, { $set: req.body})
            res.status(200).json("Update successfully")
        } catch (error) {
            res.status(500).json(`Error: ${error}`)
        }
    },
    //delete

    delete: async(req,res) =>
    {
        try {
            const { id } = req.params
            await Categories.deleteOne({_id: id}, {$pull: {question: null , department: null}})
        } catch (error) {
            res.status(500).json(`Eror: ${error}`)
        }
    },
    //get an cate

    get: async(req,res) => {
        try {
            const { id } = req.params
            const categories = await Categories.findById(id)
            
            res.status(200).json(categories)
        } catch (error) {
            res.status(500).json(`Error: ${error}`)
        }
    },
    //get all cate
    getAll: async(req,res)=>{
        try {
            const categories = await Categories.find({}).populate("department").populate("question")
            res.status(200).json(categories)
        } catch (error) {
            res.status(500).json(`Error: ${error}`)
        }
    }
}

module.exports = categoriesController