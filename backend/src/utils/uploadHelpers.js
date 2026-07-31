import { cloudinary } from '../config/cloudinary.js';

/**
 * Upload buffer lên Cloudinary
 * @param {Buffer} buffer - File buffer từ multer
 * @param {string} folder - Tên folder trên Cloudinary
 * @returns {Promise<string>} - Trả về URL của ảnh
 */
export const uploadImageToCloudinary = (buffer, folder = 'ptd_project/products') => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: folder,
                resource_type: 'image'
            },
            (error, result) => {
                if (error) return reject(error);
                resolve(result.secure_url);
            }
        );
        uploadStream.end(buffer);
    });
};
