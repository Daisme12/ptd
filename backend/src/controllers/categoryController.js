import Category from "../models/Category.js";
import { uploadImageToCloudinary } from "../utils/uploadHelpers.js";

// GET ALL
const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();

        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// GET BY ID
const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json({
                message: "Category not found"
            });
        }

        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// CREATE
const createCategory = async (req, res) => {
    try {
        let imageUrl = req.body.imageUrl || '';
        
        if (req.file) {
            imageUrl = await uploadImageToCloudinary(req.file.buffer, 'ptd_project/categories');
        }

        const category = await Category.create({
            ...req.body,
            imageUrl
        });

        res.status(201).json(category);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

// UPDATE
const updateCategory = async (req, res) => {
    try {
        const updateData = { ...req.body };

        if (req.file) {
            updateData.imageUrl = await uploadImageToCloudinary(req.file.buffer, 'ptd_project/categories');
        }

        const category = await Category.findByIdAndUpdate(
            req.params.id,
            updateData,
            {
                new: true,
                runValidators: true
            }
        );

        if (!category) {
            return res.status(404).json({
                message: "Category not found"
            });
        }

        res.status(200).json(category);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

// DELETE
const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(
            req.params.id
        );

        if (!category) {
            return res.status(404).json({
                message: "Category not found"
            });
        }

        res.status(200).json({
            message: "Delete category successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

export { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory };