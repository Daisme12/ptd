import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { uploadPdfToSupabase } from './src/utils/uploadHelpers.js';
import dotenv from 'dotenv';

// Load biến môi trường
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const testUpload = async () => {
    console.log("Bắt đầu test upload PDF lên Supabase...");

    try {
        // Đường dẫn tới file thực tế
        const testFilePath = path.resolve(__dirname, '../frontend/public/ISO_Chếbiến.pdf');

        if (!fs.existsSync(testFilePath)) {
            console.error("❌ Không tìm thấy file:", testFilePath);
            return;
        }

        // Đọc file thành buffer
        const fileBuffer = fs.readFileSync(testFilePath);
        const fileName = 'ISO_Chếbiến.pdf';

        console.log(`Đang upload file ${fileName} (${fileBuffer.length} bytes)...`);

        // Gọi hàm helper upload lên Supabase
        const publicUrl = await uploadPdfToSupabase(fileBuffer, fileName, 'ptd-pdf');

        console.log("✅ Upload thành công!");
        console.log("🔗 Public URL:", publicUrl);

    } catch (error) {
        console.error("❌ Lỗi upload:", error.message || error);
        if (error.status === 404) {
            console.log("💡 Gợi ý: Hãy chắc chắn rằng bucket tên 'ptd-pdf' đã được tạo trên Supabase.");
        }
    }
};

testUpload();
