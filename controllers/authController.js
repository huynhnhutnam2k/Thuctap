const User = require("../models/auth")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const authController = {
    //register
    register: async(req,res) => {
        const user = await User.findOne({email: req.body.email})
        if(user){
            res.status(500).json("User is already exist")
            return
        }
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(req.body.password, salt)
        const newUser = await new User({
            password: hashPassword,
            username: req.body.username,
            isAdmin: req.body.isAdmin,
            role: req.body.role,
            email: req.body.email
            
        })
        const createUser = await newUser.save()
        res.status(200).json({
            message: "Register successfully",
            createUser
        })
    },
    //login

    login: async(req,res) => {
        try {
            const user = await User.findOne({email: req.body.email})
            if(!user){
                res.status(500).json("User does't exist")
                return
            }
            const validPassword = await bcrypt.compare(req.body.password, user.password)
            if(!validPassword){
                res.status(500).json("Password is uncorrect")
                return
            }
            if(user && validPassword){
                const token = await jwt.sign(
                    {
                        user
                    },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: "7d"
                    }
                )
                res.cookie("token", token)
                
                res.status(200).json({
                    username: user.username,
                    id: user._id,
                    isAdmin: user.isAdmin,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,
                    role: user.role,
                    token: token
                })
            }
        } catch (error) {
            res.status(500).json(`Error: ${error}`)
        }
    },

    //get a user 
    get: async(req,res) => {
        try {
            const id = req.params.id
            const user =  await User.findOne({_id: id})
            res.status(200).json(user)
        } catch (error) {
            res.status(500).json(`Error: ${error.message}`)
        }
    },
    //get all user

    getAll: async(req,res) =>{
        try {
            const users = await User.find()
            res.status(200).json(users)
        } catch (error) {
            res.status(500).json(`Error: ${error.message}`)
        }
    },
    //delete user
    delete: async(req,res) => {
        try{
            const id = req.params.id
            await User.deleteOne({_id: id})
            res.status(200).json("Delete successfully")
        }
        catch(err){
            res.status(500).json(`Error: ${error.message}`)
        }
    },
    //update user
    update: async(req,res) => {
        try {
            const id = req.user.user._id
            const { currentPass, username,  newPass } = req.body
            const user  = await User.findById(id)

            if(user) {
                user.username = username || user.username
                const validPassword = await bcrypt.compare(currentPass,user.password)
                if(validPassword ){
                    const pass = await bcrypt.hash(newPass, 10)
                    user.password = pass
                }
                const updatedUser = await user.save()
                res.json({
                    _id: updatedUser._id,
                    name: updatedUser.name,
                    email: updatedUser.email,
                    isAdmin: updatedUser.isAdmin,
                    createAt: updatedUser.createdAt
                })
            }else{
                res.status(404).json("User not found")
                return
            }
        } catch (error) {
            res.status(500).json(`Error: ${error.message}`)
        }
    },
    //log out
    logout: async(req,res) => {
        try {
            res.clearCookie("token")
            res.status(200).json("Logout success")
        } catch (error) {
            res.status(500).json(`Error: ${error.message}`)
        }
    }
}

module.exports = authController