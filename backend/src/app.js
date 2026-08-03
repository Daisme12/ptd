import express from "express";
import cors from "cors";
import compression from "compression";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { db } from "./config/firebase.js";

import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import certificateRoutes from "./routes/certificateRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

const app = express();

// Configure helmet (exclude contentSecurityPolicy so it doesn't block inline scripts/styles of SPA)
app.use(helmet({
    contentSecurityPolicy: false
}));

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

app.get("/api/proxy-pdf", async (req, res) => {
    try {
        const { url } = req.query;
        if (!url) {
            return res.status(400).json({ message: "URL is required" });
        }
        const response = await fetch(url);
        if (!response.ok) {
            return res.status(response.status).json({ message: "Failed to fetch PDF" });
        }
        const arrayBuffer = await response.arrayBuffer();
        res.setHeader("Content-Type", "application/pdf");
        res.send(Buffer.from(arrayBuffer));
    } catch (error) {
        console.error("Proxy PDF error:", error);
        res.status(500).json({ message: error.message });
    }
});

let baseIndexHtml = null;

const getBaseIndexHtml = async () => {
    if (baseIndexHtml) return baseIndexHtml;
    try {
        const response = await fetch("https://thinhphongdo-vn.web.app/index.html");
        if (response.ok) {
            baseIndexHtml = await response.text();
            return baseIndexHtml;
        }
    } catch (e) {
        console.error("Error fetching base index.html:", e);
    }
    return `<!doctype html><html><head><meta charset="UTF-8" /><title>Thịnh Phong Đỗ</title></head><body><div id="root"></div></body></html>`;
};

app.get("/products/:slug", async (req, res) => {
    try {
        const { slug } = req.params;
        const snapshot = await db.collection("products").where("slug", "==", slug).limit(1).get();
        
        if (snapshot.empty) {
            const html = await getBaseIndexHtml();
            return res.send(html);
        }

        const product = snapshot.docs[0].data();
        let html = await getBaseIndexHtml();

        const title = `${product.name} | Thịnh Phong Đỗ`;
        const desc = product.description || "Công ty TNHH Thịnh Phong Đỗ chuyên cung cấp suất ăn công nghiệp, suất ăn trường học với quy trình đạt chuẩn ISO 22000:2018.";
        const image = product.imageUrl || "https://thinhphongdo-vn.web.app/Logo.png";
        const url = `https://thinhphongdo-vn.web.app/products/${slug}`;

        // Inject meta tags into the static index.html template
        html = html
            .replace(/<title>.*?<\/title>/g, `<title>${title}</title>`)
            .replace(/<meta property="og:title" content=".*?"\s*\/?>/g, `<meta property="og:title" content="${title}" />`)
            .replace(/<meta property="og:description" content=".*?"\s*\/?>/g, `<meta property="og:description" content="${desc}" />`)
            .replace(/<meta property="og:image" content=".*?"\s*\/?>/g, `<meta property="og:image" content="${image}" />`)
            .replace(/<meta property="og:url" content=".*?"\s*\/?>/g, `<meta property="og:url" content="${url}" />`)
            .replace(/<meta name="twitter:title" content=".*?"\s*\/?>/g, `<meta name="twitter:title" content="${title}" />`)
            .replace(/<meta name="twitter:description" content=".*?"\s*\/?>/g, `<meta name="twitter:description" content="${desc}" />`)
            .replace(/<meta name="twitter:image" content=".*?"\s*\/?>/g, `<meta name="twitter:image" content="${image}" />`);

        res.send(html);
    } catch (error) {
        console.error("Error serving SEO product page:", error);
        try {
            const html = await getBaseIndexHtml();
            res.send(html);
        } catch (innerError) {
            res.status(500).send("Internal Server Error");
        }
    }
});

app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/certificates", certificateRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/upload", uploadRoutes);

export default app;