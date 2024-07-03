const Products = require("../models/products");
const asyncWrapper = require("../middleware/async");

// Get all products
const getAllProducts = asyncWrapper(async (req, res) => {
    const products = await Products.find();
    res.status(200).json({ numOfproducts: products.length, products });
});

// Get a single product
const getProduct = asyncWrapper(async (req, res) => {
    const { productId } = req.params;
    const product = await Products.findOne({ _id: productId });
    if (!product) {
        return res.status(404).json({ msg: `Product with the id: ${productId} not found` });
    }
    res.status(200).json({ product });
});

// Create a product
const createProduct = asyncWrapper(async (req, res) => {
    const { name, description, price, category, countInStock } = req.body;

    if (!name || !description || !price || !category || !countInStock) {
        return res.status(400).json({ msg: "Please provide necessary information" });
    }

    const product = await Products.create(req.body);
    res.status(201).json({ msg: "Product created", product });
});

// Update a product
const updateProduct = asyncWrapper(async (req, res) => {
    const { productId } = req.params;
    const product = await Products.findOneAndUpdate(
        { _id: productId },
        req.body,
        { new: true, runValidators: true }
    );
    res.status(200).json({ msg: "Product updated successfully", product });
});

// Delete a product
const deleteProduct = asyncWrapper(async (req, res) => {
    const { productId } = req.params;
    const product = await Products.findOneAndDelete({ _id: productId });
    res.status(200).json({ msg: "Product deleted", product });
});

// Exports
module.exports = {
    getAllProducts,
    updateProduct,
    deleteProduct,
    getProduct,
    createProduct,
};
