import { cloudinary } from '../config/cloudinary.js';
import supabase from '../config/supabase.js';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

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

/**
 * Upload buffer lên Supabase Storage
 * @param {Buffer} buffer - File buffer từ multer
 * @param {string} originalName - Tên file gốc
 * @param {string} bucket - Tên bucket trên Supabase
 * @returns {Promise<string>} - Trả về Public URL của file
 */
export const uploadPdfToSupabase = async (buffer, originalName, bucket = 'ptd-pdf') => {
    try {
        const ext = path.extname(originalName) || '.pdf';
        const uniqueFilename = `${uuidv4()}${ext}`;
        const filePath = `products/${uniqueFilename}`;

        const { data, error } = await supabase
            .storage
            .from(bucket)
            .upload(filePath, buffer, {
                contentType: 'application/pdf',
                upsert: false
            });

        if (error) {
            throw error;
        }

        const { data: publicUrlData } = supabase
            .storage
            .from(bucket)
            .getPublicUrl(filePath);

        return publicUrlData.publicUrl;
    } catch (error) {
        console.error("Lỗi upload PDF lên Supabase:", error);
        throw error;
    }
};
