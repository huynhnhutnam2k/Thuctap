const jwt = require("jsonwebtoken")

const verifyToken = (req,res,next) => {
    const token = req.headers.token?.split(" ")[1]
    console.log(req.headers)
    if(token){
        jwt.verify(token, process.env.JWT_SECRET, (err, user)=>{
            if(user.user.isAdmin){
                
                res.user = user.user
                next()
            }
            else{
                return res.status(403).json("Token is not valid")
            }
        })
    }
    else{
        return res.status(403).json("You're not authenticated")
    }
}
const verifyRoleAndAdmin = (req,res,next) => {
    const token = req.headers.token?.split(" ")[1]
    if(token){
        jwt.verify(token, process.env.JWT_SECRET, (err,user) => {
            if(user.user.isAdmin || user.user.role != "user") {
                res.user = user.user
                // console.log(user.user)
                next()
            }
            else{
                return res.status(403).json("Token is not valid")
            }
        })
    }
    else{
        return res.status(403).json("You're not authenticated")
    }
}
module.exports = {verifyToken, verifyRoleAndAdmin}