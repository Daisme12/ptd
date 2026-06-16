import Product from "../models/Product.js";
import { uploadImageToCloudinary, uploadPdfToSupabase } from "../utils/uploadHelpers.js";

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find()
            .populate("category", "name slug imageUrl")
            .lean();

        res.set("Cache-Control", "public, max-age=60, stale-while-revalidate=120");
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate("category")
            .lean();

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getProductBySlug = async (req, res) => {
    try {
        const product = await Product.findOne({
            slug: req.params.slug,
            status: true,
        }).populate("category").lean();

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Không tìm thấy sản phẩm",
            });
        }

        // Lấy sản phẩm cùng danh mục
        let relatedProducts = await Product.find({
            category: product.category._id,
            _id: { $ne: product._id },
            status: true,
        })
            .limit(4)
            .populate("category", "name slug")
            .lean();

        // Nếu không đủ 4 sản phẩm thì lấy thêm sản phẩm khác
        if (relatedProducts.length < 4) {
            const additionalProducts = await Product.find({
                _id: {
                    $nin: [
                        product._id,
                        ...relatedProducts.map((item) => item._id),
                    ],
                },
                status: true,
            })
                .sort({ createdAt: -1 })
                .limit(4 - relatedProducts.length)
                .populate("category", "name slug")
                .lean();

            relatedProducts = [
                ...relatedProducts,
                ...additionalProducts,
            ];
        }

        res.set("Cache-Control", "public, max-age=60, stale-while-revalidate=120");
        res.status(200).json({
            success: true,
            data: product,
            relatedProducts,
        });
    } catch (error) {
        console.error("Get product by slug error:", error);

        res.status(500).json({
            success: false,
            message: "Lỗi server",
        });
    }
};

const createProduct = async (req, res) => {
    try {
        // Xử lý documents (PDF) từ upload
        const documents = [];

        if (req.files?.declarationPdf?.[0]) {
            const file = req.files.declarationPdf[0];
            const publicUrl = await uploadPdfToSupabase(file.buffer, file.originalname);
            documents.push({
                title: "Bản công bố sản phẩm",
                fileUrl: publicUrl
            });
        }

        if (req.files?.testResultPdf?.[0]) {
            const file = req.files.testResultPdf[0];
            const publicUrl = await uploadPdfToSupabase(file.buffer, file.originalname);
            documents.push({
                title: "Phiếu kết quả xét nghiệm",
                fileUrl: publicUrl
            });
        }

        let imageUrl = req.body.imageUrl;
        if (req.files?.image?.[0]) {
            imageUrl = await uploadImageToCloudinary(req.files.image[0].buffer);
        }

        const product = await Product.create({
            ...req.body,
            imageUrl: imageUrl,
            documents: documents.length > 0 ? documents : req.body.documents
        });

        res.status(201).json(product);
    } catch (error) {
        console.error("Lỗi createProduct:", error);
        res.status(500).json({
            message: error.message || error.toString()
        });
    }
};

const updateProduct = async (req, res) => {
    try {
        const updateData = { ...req.body };

        // Nếu có upload ảnh mới
        if (req.files?.image?.[0]) {
            updateData.imageUrl = await uploadImageToCloudinary(req.files.image[0].buffer);
        }

        // Nếu có upload PDF mới
        const newDocs = [];
        if (req.files?.declarationPdf?.[0]) {
            const file = req.files.declarationPdf[0];
            const publicUrl = await uploadPdfToSupabase(file.buffer, file.originalname);
            newDocs.push({
                title: "Bản công bố sản phẩm",
                fileUrl: publicUrl
            });
        }
        if (req.files?.testResultPdf?.[0]) {
            const file = req.files.testResultPdf[0];
            const publicUrl = await uploadPdfToSupabase(file.buffer, file.originalname);
            newDocs.push({
                title: "Phiếu kết quả xét nghiệm",
                fileUrl: publicUrl
            });
        }
        if (newDocs.length > 0) {
            updateData.documents = newDocs;
        }

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            updateData,
            {
                new: true,
                runValidators: true
            }
        );

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json(product);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json({ message: "Deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { getAllProducts, getProductById, getProductBySlug, createProduct, updateProduct, deleteProduct };
