const Department = require("../models/department")
const Categories = require("../models/categories")
const departmentController = {
    //add
    add: async(req,res) => {
        try {
            
            const department = await new Department(req.body)
            if(req.body.categoriesId){
                const cate = await Categories.findById(req.body.categoriesId)
                await cate.updateOne({$push: {department: department._id}})
            }
            const newDepartment = await department.save()

            res.status(200).json(newDepartment)
        } catch (error) {
            res.status(500).json(`Error: ${error}`)
        }
    },
    // update
    update: async(req,res) =>{
        try {
            const id = req.params.id
            const updateDepartment = await Department.findByIdAndUpdate(id,{$set: req.body})
            res.status(200).json("Update successfully")
        } catch (error) {
            res.status(500).json(`Error: ${error.message}`)
        }
    },
    //delete

    delete: async(req,res) =>{
        try {
            const id = req.params.id
            await Categories.updateMany(
                {department: id},
                {$pull: {department: id}}    
            )
            await Department.deleteOne({_id: id})
        } catch (error) {
            res.status(500).json(`Error: ${error.message}`)
        }
    },
    //get an department
    get: async(req,res) =>{
        try {
            const id = req.params.id
            const department = await Department.findById(id).populate({
                path: "categories",
                select: '_id name question department'
            })
            res.status(200).json(department)
        } catch (error) {
            res.status(500).json(`Error: ${error.message}`)
        }
    },
    //get all department
    getAll: async(req,res) =>{
        try{
            const department = await Department.find().populate("categories")

            res.status(200).json(department)
        }
        catch(error){
            res.status(500).json(`Error: ${error.message}`)
        }
    }
}

module.exports = departmentController