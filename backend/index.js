import { onRequest } from "firebase-functions/v2/https";
import app from "./src/app.js";

// Đóng gói Express app làm Cloud Function có tên là "api"
export const api = onRequest({
  cors: true,
  maxInstances: 10,
  memory: "256MiB",
  region: "asia-east1" // Cấu hình region asia-east1 (Hồng Kông) gần Việt Nam cho phản hồi cực nhanh
}, app);
