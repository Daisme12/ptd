import { db, admin } from "../config/firebase.js";
import { uploadImageToCloudinary } from "../utils/uploadHelpers.js";
import createSlug from "../utils/slugify.js";

const getAllProducts = async (req, res) => {
    try {
        const snapshot = await db.collection("products").get();
        const products = [];
        const categoryIds = [...new Set(snapshot.docs.map(doc => doc.data().category).filter(Boolean))];
        const categoryMap = {};

        if (categoryIds.length > 0) {
            try {
                const catSnapshot = await db.collection("categories")
                    .where(admin.firestore.FieldPath.documentId(), 'in', categoryIds.slice(0, 30))
                    .get();
                catSnapshot.forEach(doc => {
                    categoryMap[doc.id] = { _id: doc.id, ...doc.data() };
                });
            } catch (e) {
                console.error("Lỗi populate category cho tất cả sản phẩm:", e);
            }
        }

        snapshot.docs.forEach(doc => {
            const data = doc.data();
            products.push({
                _id: doc.id,
                ...data,
                category: categoryMap[data.category] || null
            });
        });

        res.set("Cache-Control", "public, max-age=60, stale-while-revalidate=120");
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getProductById = async (req, res) => {
    try {
        const doc = await db.collection("products").doc(req.params.id).get();

        if (!doc.exists) {
            return res.status(404).json({ message: "Product not found" });
        }

        const data = doc.data();
        let categoryData = null;

        if (data.category) {
            try {
                const catDoc = await db.collection("categories").doc(data.category).get();
                if (catDoc.exists) {
                    categoryData = { _id: catDoc.id, ...catDoc.data() };
                }
            } catch (e) {
                console.error("Lỗi populate category cho sản phẩm theo ID:", e);
            }
        }

        res.json({
            _id: doc.id,
            ...data,
            category: categoryData
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getProductBySlug = async (req, res) => {
    try {
        const snapshot = await db.collection("products")
            .where("slug", "==", req.params.slug)
            .where("status", "==", true)
            .limit(1)
            .get();

        if (snapshot.empty) {
            return res.status(404).json({
                success: false,
                message: "Không tìm thấy sản phẩm",
            });
        }

        const doc = snapshot.docs[0];
        const productData = doc.data();
        let categoryData = null;

        if (productData.category) {
            try {
                const catDoc = await db.collection("categories").doc(productData.category).get();
                if (catDoc.exists) {
                    categoryData = { _id: catDoc.id, ...catDoc.data() };
                }
            } catch (e) {
                console.error("Lỗi populate category cho sản phẩm theo Slug:", e);
            }
        }

        const product = {
            _id: doc.id,
            ...productData,
            category: categoryData
        };

        // Lấy sản phẩm cùng danh mục
        let relatedProducts = [];
        if (productData.category) {
            try {
                const relatedSnapshot = await db.collection("products")
                    .where("category", "==", productData.category)
                    .where("status", "==", true)
                    .limit(5)
                    .get();

                relatedSnapshot.forEach(rDoc => {
                    if (rDoc.id !== doc.id && relatedProducts.length < 4) {
                        relatedProducts.push({
                            _id: rDoc.id,
                            ...rDoc.data()
                        });
                    }
                });
            } catch (e) {
                console.error("Lỗi lấy sản phẩm liên quan cùng danh mục:", e);
            }
        }

        // Nếu không đủ 4 sản phẩm thì lấy thêm sản phẩm khác
        if (relatedProducts.length < 4) {
            try {
                const excludeIds = [doc.id, ...relatedProducts.map((item) => item._id)];
                const additionalSnapshot = await db.collection("products")
                    .where("status", "==", true)
                    .limit(10)
                    .get();

                additionalSnapshot.forEach(aDoc => {
                    if (!excludeIds.includes(aDoc.id) && relatedProducts.length < 4) {
                        relatedProducts.push({
                            _id: aDoc.id,
                            ...aDoc.data()
                        });
                    }
                });
            } catch (e) {
                console.error("Lỗi lấy thêm sản phẩm liên quan bổ sung:", e);
            }
        }

        // Populate categories for related products
        const relatedCatIds = [...new Set(relatedProducts.map(p => p.category).filter(Boolean))];
        const relatedCatMap = {};

        if (relatedCatIds.length > 0) {
            try {
                const rCatSnapshot = await db.collection("categories")
                    .where(admin.firestore.FieldPath.documentId(), 'in', relatedCatIds.slice(0, 30))
                    .get();
                rCatSnapshot.forEach(cDoc => {
                    relatedCatMap[cDoc.id] = { 
                        _id: cDoc.id, 
                        name: cDoc.data().name, 
                        slug: cDoc.data().slug 
                    };
                });
            } catch (e) {
                console.error("Lỗi populate categories cho sản phẩm liên quan:", e);
            }
        }

        relatedProducts = relatedProducts.map(p => ({
            ...p,
            category: relatedCatMap[p.category] || null
        }));

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
        const documents = [];

        if (req.body.declarationPdf && req.body.declarationPdf.trim() !== "") {
            documents.push({
                title: "Bản công bố sản phẩm",
                fileUrl: req.body.declarationPdf.trim()
            });
        }

        if (req.body.testResultPdf && req.body.testResultPdf.trim() !== "") {
            documents.push({
                title: "Phiếu kết quả xét nghiệm",
                fileUrl: req.body.testResultPdf.trim()
            });
        }

        let imageUrl = req.body.imageUrl || "";
        if (req.files?.image?.[0]) {
            imageUrl = await uploadImageToCloudinary(req.files.image[0].buffer);
        }

        let qrImageUrl = req.body.qrImageUrl || "";
        if (req.files?.qrImage?.[0]) {
            qrImageUrl = await uploadImageToCloudinary(req.files.qrImage[0].buffer);
        }

        const data = {
            ...req.body,
            imageUrl: imageUrl,
            qrImageUrl: qrImageUrl,
            qrLink: req.body.qrLink || "",
            documents: documents,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        // Chuyển đổi status sang dạng Boolean nếu là string từ form-data
        if (typeof data.status === 'string') {
            data.status = data.status === 'true';
        }

        // Chuyển đổi price sang dạng Number nếu là string
        if (data.price) {
            data.price = Number(data.price);
        }

        // Tự động tạo slug nếu chưa có
        if (!data.slug && data.name) {
            data.slug = createSlug(data.name);
        }

        const docRef = await db.collection("products").add(data);
        const newDoc = await docRef.get();

        res.status(201).json({
            _id: newDoc.id,
            ...newDoc.data()
        });
    } catch (error) {
        console.error("Lỗi createProduct:", error);
        res.status(500).json({
            message: error.message || error.toString()
        });
    }
};

const updateProduct = async (req, res) => {
    try {
        const data = { ...req.body };

        // Nếu có upload ảnh mới
        if (req.files?.image?.[0]) {
            data.imageUrl = await uploadImageToCloudinary(req.files.image[0].buffer);
        }

        // Nếu có upload ảnh QR mới
        if (req.files?.qrImage?.[0]) {
            data.qrImageUrl = await uploadImageToCloudinary(req.files.qrImage[0].buffer);
        }

        // Xử lý documents từ req.body
        const documents = [];
        if (req.body.declarationPdf && req.body.declarationPdf.trim() !== "") {
            documents.push({
                title: "Bản công bố sản phẩm",
                fileUrl: req.body.declarationPdf.trim()
            });
        }

        if (req.body.testResultPdf && req.body.testResultPdf.trim() !== "") {
            documents.push({
                title: "Phiếu kết quả xét nghiệm",
                fileUrl: req.body.testResultPdf.trim()
            });
        }

        data.documents = documents;
        data.updatedAt = new Date().toISOString();
        delete data._id;

        // Chuyển đổi status sang dạng Boolean nếu là string từ form-data
        if (typeof data.status === 'string') {
            data.status = data.status === 'true';
        }

        // Chuyển đổi price sang dạng Number nếu là string
        if (data.price) {
            data.price = Number(data.price);
        }

        // Cập nhật slug nếu name đổi và không truyền slug
        if (data.name && !data.slug) {
            data.slug = createSlug(data.name);
        }

        // Clean các key trống để tránh undefined properties trong Firestore
        delete data.declarationPdf;
        delete data.testResultPdf;

        const docRef = db.collection("products").doc(req.params.id);
        const doc = await docRef.get();

        if (!doc.exists) {
            return res.status(404).json({ message: "Product not found" });
        }

        await docRef.update(data);
        const updatedDoc = await docRef.get();

        res.json({
            _id: updatedDoc.id,
            ...updatedDoc.data()
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const docRef = db.collection("products").doc(req.params.id);
        const doc = await docRef.get();

        if (!doc.exists) {
            return res.status(404).json({ message: "Product not found" });
        }

        await docRef.delete();
        res.json({ message: "Deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { getAllProducts, getProductById, getProductBySlug, createProduct, updateProduct, deleteProduct };
