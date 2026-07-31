import { db } from "../config/firebase.js";
import { uploadImageToCloudinary } from "../utils/uploadHelpers.js";

// GET ALL
const getAllCategories = async (req, res) => {
    try {
        const snapshot = await db.collection("categories").orderBy("name", "asc").get();
        const categories = snapshot.docs.map(doc => ({
            _id: doc.id,
            ...doc.data()
        }));

        res.set("Cache-Control", "public, max-age=120, stale-while-revalidate=300");
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
        const doc = await db.collection("categories").doc(req.params.id).get();

        if (!doc.exists) {
            return res.status(404).json({
                message: "Category not found"
            });
        }

        res.status(200).json({
            _id: doc.id,
            ...doc.data()
        });
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

        const data = {
            ...req.body,
            imageUrl,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        const docRef = await db.collection("categories").add(data);
        const newDoc = await docRef.get();

        res.status(201).json({
            _id: newDoc.id,
            ...newDoc.data()
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

// UPDATE
const updateCategory = async (req, res) => {
    try {
        const updateData = { 
            ...req.body,
            updatedAt: new Date().toISOString()
        };

        if (req.file) {
            updateData.imageUrl = await uploadImageToCloudinary(req.file.buffer, 'ptd_project/categories');
        }

        // Xóa trường _id khỏi dữ liệu update để tránh lưu _id vào trong document data
        delete updateData._id;

        const docRef = db.collection("categories").doc(req.params.id);
        const doc = await docRef.get();
        if (!doc.exists) {
            return res.status(404).json({
                message: "Category not found"
            });
        }

        await docRef.update(updateData);
        const updatedDoc = await docRef.get();

        res.status(200).json({
            _id: updatedDoc.id,
            ...updatedDoc.data()
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

// DELETE
const deleteCategory = async (req, res) => {
    try {
        const docRef = db.collection("categories").doc(req.params.id);
        const doc = await docRef.get();

        if (!doc.exists) {
            return res.status(404).json({
                message: "Category not found"
            });
        }

        await docRef.delete();

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