import express from "express";
import multer from "multer";
import {
    getAllProducts,
    getProductById,
    getProductBySlug,
    createProduct,
    updateProduct,
    deleteProduct
} from "../controllers/productController.js";

const router = express.Router();

// Middleware upload (nhận file vào RAM, chưa lưu ngay)
const upload = multer({ storage: multer.memoryStorage() });

const productUpload = upload.fields([
    { name: "image", maxCount: 1 },
    { name: "declarationPdf", maxCount: 1 },
    { name: "testResultPdf", maxCount: 1 }
]);

router.route("/")
    .get(getAllProducts)
    .post(productUpload, createProduct);

router.route("/:id")
    .get(getProductById)
    .put(productUpload, updateProduct)
    .delete(deleteProduct);

router.route("/slug/:slug")
    .get(getProductBySlug);

export default router;