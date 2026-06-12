import express from 'express';
import { uploadCloud } from '../config/cloudinary.js';

const router = express.Router();

// Endpoint upload ảnh
// Frontend sẽ gửi file ảnh với key (field name) là 'image'
router.post('/', (req, res) => {
  const upload = uploadCloud.single('image');
  
  upload(req, res, function (err) {
    if (err) {
      console.error('Lỗi từ Multer hoặc Cloudinary:', err);
      // Trả về JSON chi tiết lỗi để dễ debug
      return res.status(400).json({ 
        message: 'Lỗi khi upload ảnh!', 
        error: err.message || err 
      });
    }

    try {
      if (!req.file) {
        return res.status(400).json({ message: 'Không tìm thấy file tải lên!' });
      }

      // req.file chứa thông tin file sau khi multer-storage-cloudinary xử lý xong
      res.status(200).json({
        message: 'Upload thành công!',
        imageUrl: req.file.path
      });
    } catch (error) {
      console.error('Lỗi server:', error);
      res.status(500).json({ message: 'Lỗi server khi xử lý ảnh!' });
    }
  });
});

export default router;
