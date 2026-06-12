import express from "express";
import cors from "cors";

import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import certificateRoutes from "./routes/certificateRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/certificates", certificateRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/upload", uploadRoutes);

export default app;