import express from "express";
import cors from "cors";
import compression from "compression";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import certificateRoutes from "./routes/certificateRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

const app = express();

// Bảo vệ header HTTP, ẩn công nghệ server
app.use(helmet());

// Giới hạn request để chống spam/DDoS làm sập server free
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 phút
    max: 100, // Giới hạn 100 requests mỗi IP trong 15 phút
    message: "Quá nhiều request từ IP này, vui lòng thử lại sau 15 phút.",
});

app.use(cors());
app.use(compression());
app.use(express.json());

// Áp dụng giới hạn cho tất cả API
app.use("/api/", limiter);

app.get("/api/health", (_req, res) => {
    res.status(200).json({
        status: "ok",
        timestamp: Date.now(),
    });
});

app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/certificates", certificateRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/upload", uploadRoutes);

export default app;