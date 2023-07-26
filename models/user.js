const mongoose = require('mongoose');

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String, 
        required: true
    }, 
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: v => v.length >= 8,
            message: `Password length must be >= 8`
        }
    }
})

module.exports = mongoose.model('User', userSchema);