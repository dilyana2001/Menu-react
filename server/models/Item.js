const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    title: {
        type: String,
        maxlength: 100,
        required: true,
    },
    imageUrl: {
        type: String,
        validate: /^http?/
    },
    description: {
        required: true,
        type: String,
        maxlength: 500
    },
    price: {
        required: true,
        type: String,
        maxlength: 20
    },
    category:{
        type: String,
        maxlength: 100,
        required: true,
    }
});

module.exports = mongoose.model('Item', itemSchema);