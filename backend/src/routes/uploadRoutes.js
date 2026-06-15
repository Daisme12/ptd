import express from 'express';
import { uploadCloud } from '../config/cloudinary.js';

const router = express.Router();

router.post('/', (req, res) => {
  const upload = uploadCloud.single('file');

  upload(req, res, function (err) {
    if (err) {
      console.error(err);

      return res.status(400).json({
        message: 'Upload thất bại',
        error: err.message
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: 'Không tìm thấy file'
      });
    }

    console.log(req.file);

    return res.status(200).json({
      message: 'Upload thành công',
      file: req.file,
      url: req.file.path,
      publicId: req.file.filename
    });
  });
});

export default router;