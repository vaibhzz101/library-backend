const express = require('express');
const UserRoutes = express.Router();
const authController = require('../controllers/user.controllers');


UserRoutes.post('/register', authController.registerUser);
UserRoutes.post('/login', authController.loginUser);

module.exports = UserRoutes;
