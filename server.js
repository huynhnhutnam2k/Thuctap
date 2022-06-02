const express = require('express')
const dotenv = require('dotenv')
const path = require('path')
const app = express()
const connect = require('./configs/db')
const router = require('./router')
const methodOverride = require('method-override')
const cors = require('cors')
const bodyParser = require("body-parser")
const morgan = require('morgan')
dotenv.config()
connect()
app.use(cors())
// app.use(express.bodyParser({limit: '50mb'}));
//static files
// app.use(express.static(path.join(__dirname, 'public')))
// 
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(morgan('common'))
// dùng các midleware để parse body cho resquest gửi lên sever
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())
router(app)

const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log('App listening at: http://localhost:' + port)
})