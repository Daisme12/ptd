import admin from "firebase-admin";
import fs from "fs";
import path from "path";

let db;
let bucket;

try {
  // 1. Kiểm tra file serviceAccountKey.json ở thư mục gốc của backend
  const keyPath = path.join(process.cwd(), "serviceAccountKey.json");
  
  if (fs.existsSync(keyPath)) {
    const serviceAccount = JSON.parse(fs.readFileSync(keyPath, "utf8"));
    if (serviceAccount.private_key) {
      serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, "\n");
    }
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: `${serviceAccount.project_id}.appspot.com`
    });
    console.log("Firebase Admin SDK initialized using serviceAccountKey.json");
  } 
  // 2. Kiểm tra chuỗi JSON từ biến môi trường (Rất hữu ích khi deploy lên Koyeb/Render để bảo mật)
  else if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    if (serviceAccount.private_key) {
      serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, "\n");
    }
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: `${serviceAccount.project_id}.appspot.com`
    });
    console.log("Firebase Admin SDK initialized using FIREBASE_SERVICE_ACCOUNT env");
  } 
  // 3. Sử dụng cấu hình mặc định (applicationDefault)
  else {
    admin.initializeApp({
      credential: admin.credential.applicationDefault()
    });
    console.log("Firebase Admin SDK initialized using applicationDefault");
  }

  db = admin.firestore();
  db.settings({ ignoreUndefinedProperties: true });

  // 4. Khởi tạo Storage Bucket chỉ khi có cấu hình hợp lệ
  let bucketName = process.env.FIREBASE_STORAGE_BUCKET;
  if (!bucketName && fs.existsSync(keyPath)) {
    try {
      const serviceAccount = JSON.parse(fs.readFileSync(keyPath, "utf8"));
      bucketName = `${serviceAccount.project_id}.appspot.com`;
    } catch (e) {}
  }
  if (!bucketName && process.env.FIREBASE_SERVICE_ACCOUNT) {
    try {
      const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
      bucketName = `${serviceAccount.project_id}.appspot.com`;
    } catch (e) {}
  }

  if (bucketName) {
    bucket = admin.storage().bucket(bucketName);
    console.log(`Firebase Storage Bucket initialized: ${bucketName}`);
  } else {
    console.log("Firebase Storage Bucket is not specified, skipping bucket initialization.");
    bucket = null;
  }

} catch (error) {
  console.error("Lỗi khởi tạo Firebase Admin SDK:", error);
}

export { db, bucket, admin };
