import Product from "../models/Product.js";

const getAllProducts = async (req, res) => {
    const products = await Product.find()
        .populate("category");

    res.json(products);
};

const getProductById = async (req, res) => {
    const product = await Product.findById(req.params.id)
        .populate("category");

    res.json(product);
};

const createProduct = async (req, res) => {
    const product = await Product.create(req.body);

    res.status(201).json(product);
};

const updateProduct = async (req, res) => {
    const product = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.json(product);
};

const deleteProduct = async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);

    res.json({
        message: "Deleted successfully"
    });
};

export { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct };