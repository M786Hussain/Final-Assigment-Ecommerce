const Product = require('../models/Product');

// Get all products (Buyer/Admin)
exports.getProducts = async (req, res) => {
    const products = await Product.find({});
    res.json(products);
};

// Create Product (Admin Only)
exports.createProduct = async (req, res) => {
    const { name, price, description, image, category, countInStock } = req.body;
    const product = new Product({ name, price, description, image, category, countInStock });
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
};

// Delete Product (Admin Only)
exports.deleteProduct = async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        await product.deleteOne();
        res.json({ message: 'Product removed' });
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
};
