// import { v2 as cloudinary } from 'cloudinary';
// import { CloudinaryStorage } from 'multer-storage-cloudinary';
// import multer from 'multer';
// import dotenv from 'dotenv';

// dotenv.config();

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET
// });

// // Cấu hình kho lưu trữ (Storage) trên Cloudinary
// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: 'ptd_project', // Tên thư mục trên Cloudinary
//     allowed_formats: ['jpg', 'png', 'jpeg', 'webp', 'pdf'], // Các định dạng cho phép (thêm pdf)
//     resource_type: 'auto' // Tự động nhận diện loại file (ảnh, pdf, video...)
//   }
// });

// // Khởi tạo multer với storage Cloudinary
// const uploadCloud = multer({ storage });



// export { cloudinary, uploadCloud };

import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadCloud = multer({
  storage: multer.memoryStorage(),
});

export { cloudinary, uploadCloud };