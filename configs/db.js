const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()
const connect = async() => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL,{
            useUnifiedTopology: true,
            useNewUrlParser: true,
          },() => {
              console.log("connect successfully")
        })
    }
    catch(err){
        console.log(`Error : ${err}`)
    }
}

module.exports = connect