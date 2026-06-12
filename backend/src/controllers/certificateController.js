import Certificate from "../models/Certificate.js";

const getAllCertificates = async (req,res)=>{
    const certificates = await Certificate
        .find()
        .populate("products");

    res.json(certificates);
};

const getCertificateById = async (req,res)=>{
    const certificate = await Certificate
        .findById(req.params.id)
        .populate("products");

    res.json(certificate);
};

const createCertificate = async (req,res)=>{
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
};

const updateCertificate = async (req,res)=>{
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

    res.json(certificate);
};

const deleteCertificate = async (req,res)=>{
    await Certificate.findByIdAndDelete(req.params.id);

    res.json({
        message:"Deleted successfully"
    });
};

export {getAllCertificates, getCertificateById, createCertificate, updateCertificate, deleteCertificate};