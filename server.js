const express = require('express')
const dotenv = require('dotenv')
const path = require('path')
const app = express()
const connect = require('./configs/db')
const router = require('./router')
const methodOverride = require('method-override')
const cors = require('cors')
const morgan = require('morgan')
dotenv.config()
connect()
app.use(cors())

//static files
// app.use(express.static(path.join(__dirname, 'public')))
// 
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

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