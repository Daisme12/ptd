import Certificate from "../models/Certificate.js";

const getAllCertificates = async (req,res)=>{
    try {
        const certificates = await Certificate
            .find()
            .populate("products", "name slug imageUrl")
            .lean();

        res.set("Cache-Control", "public, max-age=120, stale-while-revalidate=300");
        res.json(certificates);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCertificateById = async (req,res)=>{
    try {
        const certificate = await Certificate
            .findById(req.params.id)
            .populate("products")
            .lean();

        if (!certificate) {
            return res.status(404).json({ message: "Certificate not found" });
        }

        res.json(certificate);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createCertificate = async (req,res)=>{
    try {
        const data = { ...req.body };

        // Nếu có file upload (PDF hoặc ảnh) thì lấy link từ Cloudinary gán vào fileUrl
        if (req.file) {
            data.fileUrl = req.file.path;
        }

        // Xử lý trường products nếu gửi qua form-data (dạng chuỗi JSON)
        if (typeof data.products === 'string') {
            try {
                data.products = JSON.parse(data.products);
            } catch (e) {
                data.products = [];
            }
        }

        const certificate = await Certificate.create(data);

        res.status(201).json(certificate);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateCertificate = async (req,res)=>{
    try {
        const data = { ...req.body };

        // Nếu có file upload mới thì cập nhật fileUrl
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

        const certificate = await Certificate.findByIdAndUpdate(
            req.params.id,
            data,
            {new:true}
        );

        if (!certificate) {
            return res.status(404).json({ message: "Certificate not found" });
        }

        res.json(certificate);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteCertificate = async (req,res)=>{
    try {
        const cert = await Certificate.findByIdAndDelete(req.params.id);
        if (!cert) {
            return res.status(404).json({ message: "Certificate not found" });
        }
        res.json({ message:"Deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export {getAllCertificates, getCertificateById, createCertificate, updateCertificate, deleteCertificate};