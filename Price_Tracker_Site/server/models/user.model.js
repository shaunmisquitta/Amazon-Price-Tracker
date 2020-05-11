const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        minlength:3
    },

    email:{
        type:String,
        required:true,
        unique:true,
    },

    password:{
        type:String,
        required:true,
        minlength:3
    },
})

const user = mongoose.model('users',userSchema)
module.exports = user;
