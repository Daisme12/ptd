import express from "express";
import multer from "multer";
import {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
} from "../controllers/categoryController.js";

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.route("/")
    .get(getAllCategories)
    .post(upload.single('image'), createCategory);

router.route("/:id")
    .get(getCategoryById)
    .put(upload.single('image'), updateCategory)
    .delete(deleteCategory);

export default router;