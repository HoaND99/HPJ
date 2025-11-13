// server/index.js
import express from "express";
import cors from "cors";
import multer from "multer";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import aiRoutes from "./routes/aiRoutes.js";
import driveRoutes from "./routes/driveRoutes.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, ".env") });

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

const upload = multer({ storage: multer.memoryStorage() });

// routes
app.use("/api/ocr-extract", upload.single("documentImage"), aiRoutes);
app.use("/api/save-document", express.json(), driveRoutes);

app.get("/api/health", (req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ HPJ backend running on port ${PORT}`));
