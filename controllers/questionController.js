const Question = require("../models/question")
const Diagnose = require("../models/diagnose")
const Categories = require("../models/categories")
const Department = require("../models/department")
const SubMark = require("../models/subMark")
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
            await Categories.updateOne(
                {question: id},
                {$pull: {question: id}}
            )
            await Department.updateOne(
                {question: id},
                {$pull: {question: id}}
            )
            await Diagnose.updateMany(
                {questionId: id},
                {questionId: null}
            )
            res.status(200).json("delete successfully")
        } catch (error) {
            res.status(500).json(`Error: ${error.message}`)
        }
    },
    //get an question
    get: async(req,res) => {
        try {
            const id = req.params.id
            const question = await Question.findById(id)
            res.cookie("markTemp" , 100 , { maxAge: 900000, httpOnly: true })
            // res.cookie('cookiename', 'cookievalue');
            res.status(200).json({
                question,
            })
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
    },
    average: (arr) => {
        let total = 0
        for (let index = 0; index < arr.length; index++) {
            total += +arr[index].mark
        }
        const avg = total / (arr.length)
        return avg
    },
    //exam submit
    submit: async(req,res) => {
        try {
            const body = req.body
            const reqAnswser = Object.values(body).join("").toLowerCase().trim()
            const question = await Question.findOne({_id: req.params.id})
            const answer = question.answer.toLowerCase().split(" ").join("")
            let currentMark = Number(req.headers.cookie?.split("=")[1])
            // console.log(currentMark)
            res.clearCookie("markTemp")
            // console.log(reqAnswser, answer)
            if(reqAnswser != answer){  
                currentMark > 0 ? currentMark -=  25 : currentMark
                // console.log(currentMark)
                res.cookie("markTemp" , currentMark , { maxAge: 900000, httpOnly: true })
                return res.status(500).json("Wrong answer")
            }
            const userId = res.user._id
            // console.log(res.user._id)
            const mark = await new SubMark({
                userId: userId,
                questionId: req.params.id,
                mark: currentMark
            })
            console.log(mark)
            const newMark = await mark.save()
            const questionList = await SubMark.find({questionId: req.params.id})
            const averageMark = questionController.average(questionList)
            await Question.findOneAndUpdate({_id: req.params.id}, {$set: {averageMark: averageMark}})
            res.clearCookie("markTemp")
            res.cookie("markTemp", 100)
            res.status(200).json({newMark, averageMark})
        } catch (error) {
            res.status(500).json(`Error :${error.message}`)
        }
    },
    //get categories and department
    getCd: async(req,res) => {
        try {
            const userRole = res.user?.role
            // const role = userRole.split(" ")[0].map((item, index) =>{
            //     let first = item[0]
            // })
            const categories = await Categories.findOne({name: userRole})
            const department = await Department.find({categoriesId: categories?._id})

            res.status(200).json({
                categories: categories,
                department: department
            })
        } catch (error) {
            res.status(500).json(`Error: ${error.message}`)
        }
    }
}

module.exports = questionController