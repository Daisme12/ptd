import dotenv from 'dotenv';
import { cloudinary } from '../config/cloudinary.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function uploadPdf() {
  try {
    console.log('Uploading PDF to Cloudinary...');

    const filePath = path.resolve(
      __dirname,
      '../../../frontend/public/ISO_Chếbiến.pdf'
    );

    const result = await cloudinary.uploader.upload(filePath, {
    folder: 'ptd_project/pdfs',
    resource_type: "raw"
    });

    console.log('Upload thành công!');
    console.log('URL:', result.secure_url);
    console.log('Public ID:', result.public_id);
    console.log(result);

  } catch (error) {
    console.error(error);
  }
}

uploadPdf();