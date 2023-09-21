const express = require('express');
const OrderRoutes = express.Router();
const orderController = require('../controllers/order.controller');
const authenticateToken = require('../middleware/auth.middleware');


OrderRoutes.post('/order', authenticateToken, orderController.placeOrder);

OrderRoutes.get('/orders', authenticateToken, orderController.getAllOrders);

module.exports = OrderRoutes;
