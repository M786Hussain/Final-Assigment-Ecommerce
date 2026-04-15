const express = require('express');
const router = express.Router();
const { 
    addOrderItems, 
    getOrders, 
    updateOrderStatus,
    getMyOrders // Isay bhi controller se nikalna hoga
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

// 1. Buyer order place karega (POST), Admin saare orders dekhega (GET)
router.route('/')
    .post(protect, addOrderItems)
    .get(protect, admin, getOrders);

// 2. Naya Route: User apne orders dekh sakega
// Frontend isi path (/api/orders/user/:id) ko call kar raha hai
router.route('/user/:id').get(protect, getMyOrders);

// 3. Admin status update karega
router.route('/:id').put(protect, admin, updateOrderStatus);

module.exports = router;
