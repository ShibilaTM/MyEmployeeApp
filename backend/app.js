const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
require('./config/db')
const app = express()
app.use(morgan('dev'))
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const PORT = process.env.PORT

const userRoute = require('./routes/userRoutes')
app.use('/user', userRoute)

const formRoute = require('./routes/formRoutes')
app.use('/form',formRoute)

app.listen(PORT,()=>{
    console.log(`server is listening on ${PORT}`)
})