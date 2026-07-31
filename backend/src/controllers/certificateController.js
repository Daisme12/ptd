import { db, admin } from "../config/firebase.js";

const getAllCertificates = async (req, res) => {
    try {
        const snapshot = await db.collection("certificates").get();
        const certificates = [];

        for (const doc of snapshot.docs) {
            const certData = doc.data();
            const productIds = certData.products || [];
            const productsList = [];

            if (productIds.length > 0) {
                try {
                    // Firestore limit cho truy vấn 'in' là 30 items
                    const prodSnapshot = await db.collection("products")
                        .where(admin.firestore.FieldPath.documentId(), 'in', productIds.slice(0, 30))
                        .get();
                    
                    prodSnapshot.forEach(pDoc => {
                        productsList.push({
                            _id: pDoc.id,
                            name: pDoc.data().name,
                            slug: pDoc.data().slug,
                            imageUrl: pDoc.data().imageUrl
                        });
                    });
                } catch (e) {
                    console.error("Lỗi populate sản phẩm cho chứng chỉ:", e);
                }
            }

            certificates.push({
                _id: doc.id,
                ...certData,
                products: productsList
            });
        }

        res.set("Cache-Control", "public, max-age=120, stale-while-revalidate=300");
        res.json(certificates);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCertificateById = async (req, res) => {
    try {
        const doc = await db.collection("certificates").doc(req.params.id).get();

        if (!doc.exists) {
            return res.status(404).json({ message: "Certificate not found" });
        }

        const certData = doc.data();
        const productIds = certData.products || [];
        const productsList = [];

        if (productIds.length > 0) {
            try {
                const prodSnapshot = await db.collection("products")
                    .where(admin.firestore.FieldPath.documentId(), 'in', productIds.slice(0, 30))
                    .get();

                prodSnapshot.forEach(pDoc => {
                    productsList.push({
                        _id: pDoc.id,
                        name: pDoc.data().name,
                        slug: pDoc.data().slug,
                        imageUrl: pDoc.data().imageUrl,
                        ...pDoc.data()
                    });
                });
            } catch (e) {
                console.error("Lỗi populate chi tiết sản phẩm cho chứng chỉ:", e);
            }
        }

        res.json({
            _id: doc.id,
            ...certData,
            products: productsList
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createCertificate = async (req, res) => {
    try {
        const data = { ...req.body };

        if (req.file) {
            data.fileUrl = req.file.path;
        }

        if (typeof data.products === 'string') {
            try {
                data.products = JSON.parse(data.products);
            } catch (e) {
                data.products = [];
            }
        }

        data.createdAt = new Date().toISOString();
        data.updatedAt = new Date().toISOString();

        const docRef = await db.collection("certificates").add(data);
        const newDoc = await docRef.get();

        res.status(201).json({
            _id: newDoc.id,
            ...newDoc.data()
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateCertificate = async (req, res) => {
    try {
        const data = { ...req.body };

        if (req.file) {
            data.fileUrl = req.file.path;
        }

        if (typeof data.products === 'string') {
            try {
                data.products = JSON.parse(data.products);
            } catch (e) {
                data.products = [];
            }
        }

        data.updatedAt = new Date().toISOString();
        delete data._id;

        const docRef = db.collection("certificates").doc(req.params.id);
        const doc = await docRef.get();

        if (!doc.exists) {
            return res.status(404).json({ message: "Certificate not found" });
        }

        await docRef.update(data);
        const updatedDoc = await docRef.get();

        res.json({
            _id: updatedDoc.id,
            ...updatedDoc.data()
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteCertificate = async (req, res) => {
    try {
        const docRef = db.collection("certificates").doc(req.params.id);
        const doc = await docRef.get();

        if (!doc.exists) {
            return res.status(404).json({ message: "Certificate not found" });
        }

        await docRef.delete();
        res.json({ message: "Deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { getAllCertificates, getCertificateById, createCertificate, updateCertificate, deleteCertificate };