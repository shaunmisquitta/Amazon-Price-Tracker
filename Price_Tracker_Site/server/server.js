const express= require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const dotenv = require('dotenv')
dotenv.config()

const app = express()
const port = 5000;

app.use(cors())
app.use(express.json())


mongoose.connect(process.env.uri, { useNewUrlParser: true, useCreateIndex: true })
const connection = mongoose.connection;
connection.once('open',() =>{
    console.log("connection established Sucessfully")
})
const dashboardrouter = require('./routes/dashboard')
const usersrouter = require('./routes/users')
app.use('/users/',usersrouter)
app.use('/Dashboard',dashboardrouter)

app.listen(port,() =>{
    console.log('Server is running')
})