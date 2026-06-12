import dotenv from 'dotenv';
import { cloudinary } from '../config/cloudinary.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagesToUpload = [
  { name: 'Cơm nắm', file: '../../../frontend/src/assets/imgs/comNam.png' },
  { name: 'Sandwich', file: '../../../frontend/src/assets/imgs/sandwich.png' },
  { name: 'Cơm cuộn', file: '../../../frontend/src/assets/imgs/KIMBAP.png' },
  { name: 'Trà sữa', file: '../../../frontend/src/assets/imgs/traSua.png' }
];

async function uploadImages() {
  console.log('Uploading images to Cloudinary...');
  const results = {};
  
  for (const item of imagesToUpload) {
    try {
      const filePath = path.resolve(__dirname, item.file);
      const result = await cloudinary.uploader.upload(filePath, {
        folder: 'ptd_project/categories'
      });
      console.log(`Uploaded ${item.name}: ${result.secure_url}`);
      results[item.name] = result.secure_url;
    } catch (error) {
      console.error(`Error uploading ${item.name}:`, error);
    }
  }
  
  console.log('--- URL Mapping ---');
  console.log(JSON.stringify(results, null, 2));
}

uploadImages();
