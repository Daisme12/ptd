import express from "express";
import {
    getAllCertificates,
    getCertificateById,
    createCertificate,
    updateCertificate,
    deleteCertificate
} from "../controllers/certificateController.js";
import { uploadCloud } from "../config/cloudinary.js";

const router = express.Router();

router.route("/")
    .get(getAllCertificates)
    .post(uploadCloud.single('file'), createCertificate);

router.route("/:id")
    .get(getCertificateById)
    .put(uploadCloud.single('file'), updateCertificate)
    .delete(deleteCertificate);

export default router;