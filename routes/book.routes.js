const express = require('express');
const BookRoutes = express.Router();
const bookController = require('../controllers/books.controller');
const authenticateToken = require('../middleware/auth.middleware');

BookRoutes.get('/books', bookController.getAllBooks);


BookRoutes.get('/books/:id', bookController.getBookById);

BookRoutes.post('/books', authenticateToken, bookController.createBook);


BookRoutes.put('/books/:id', authenticateToken, bookController.updateBookById);


BookRoutes.delete('/books/:id', authenticateToken, bookController.deleteBookById);

module.exports = BookRoutes;
