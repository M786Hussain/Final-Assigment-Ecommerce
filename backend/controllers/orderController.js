const Order = require('../models/Order');

// @desc Create new order (Buyer)
exports.addOrderItems = async (req, res) => {
    const { orderItems, totalPrice } = req.body;
    if (orderItems && orderItems.length === 0) {
        return res.status(400).json({ message: 'No order items' });
    } else {
        // user field me req.user._id automatically protect middleware se ata hai
        const order = new Order({ user: req.user._id, orderItems, totalPrice });
        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    }
};

// @desc Get all orders (Admin Only)
exports.getOrders = async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id name');
    res.json(orders);
};

// @desc Get orders of a specific user (Buyer)
exports.getMyOrders = async (req, res) => {
    try {
        // req.params.id frontend se pass ho rahi hai
        const orders = await Order.find({ user: req.params.id });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Orders fetch karne mein masla hua' });
    }
};

// @desc Update order status (Admin Only)
exports.updateOrderStatus = async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        order.status = req.body.status || order.status;
        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } else {
        res.status(404).json({ message: 'Order not found' });
    }
};
