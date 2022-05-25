const jwt = require("jsonwebtoken")

const verifyToken = (req,res,next) => {
    const token = req.headers?.cookie.split("=")[1]
    if(token){
        jwt.verify(token, process.env.JWT_SECRET, (err, user)=>{
            if(user.user.isAdmin){
                res.user = user.user
                next()
            }
        })
    }
}

module.exports = {verifyToken}