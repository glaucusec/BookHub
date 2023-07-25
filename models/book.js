const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema({
    image: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: true,
        min: 49,
        max: 4999
    },
    author: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: 'User'
    },
    createdAt: {
        type: Date, 
        immutable: true,
        default: () => Date.now()
    },
    updatedAt: {
        type: Date,
        required: false
    }
})

module.exports = mongoose.model('Book', bookSchema);