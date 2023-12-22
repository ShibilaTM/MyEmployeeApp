const mongoose = require('mongoose')
const Schema = mongoose.Schema

const formData = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    designation:{
        type:String,
        required:true
    },
    salary:{
        type:String,
        required:true 
    }
})
const userForm = mongoose.model('userform',formData)
module.exports = userForm