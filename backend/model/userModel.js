const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userData = new Schema({
    name:{
        type:String,
        required:true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: function(value) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: 'invalid email address'
        }
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,12}$/.test(value);
            },
            message: 'Password must be 8-12 characters and include at least one uppercase letter, one lowercase letter, and one digit'
        }
    },
    confirmpassword: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                return value === this.password; // Check if confirmpassword matches the password field
            },
            message: 'Passwords do not match'
        }
    }
})
const user = mongoose.model('userdata',userData)
module.exports = user