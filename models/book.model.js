const mongoose = require('mongoose');
const bookSchema = new mongoose.Schema({

        name: String,
        email: String,
        password: String,
        isAdmin: Boolean
    
});

const BookModel = mongoose.model('Book', bookSchema);
module.exports = BookModel;