// server/routes/aiRoutes.js
import express from "express";
import { analyzeImageWithGemini } from "../services/geminiService.js";

const router = express.Router();

function mapExtractedToForm(extracted) {
  if (!extracted || typeof extracted !== "object") return {};

  // --- normalize technical table ---
  const thongSoKyThuatArray = Array.isArray(extracted.thongSoKyThuatArray)
    ? extracted.thongSoKyThuatArray
    : Array.isArray(extracted.thongSoKyThuat)
    ? extracted.thongSoKyThuat
    : Array.isArray(extracted.technical_specifications_table)
    ? extracted.technical_specifications_table
    : [];

  // --- flatten replacement components ---
  const linhKienFields = {};
  (extracted.linhKienThayThe || extracted.replaced_components || []).forEach(
    (item, idx) => {
      linhKienFields[`linhKien${idx + 1}`] =
        `${item.ten || item.name || ""} (${item.soLuong || item.quantity || ""})`.trim();
    }
  );

  return {
    ngayLapBienBan:
      extracted.ngayLapBienBan ||
      extracted.date ||
      extracted.agreement_date ||
      "",
    benA_CongTy: extracted.benA_CongTy || extracted.party_a?.name || "",
    benA_DaiDien:
      extracted.benA_DaiDien || extracted.party_a?.representative || "",
    benB_DaiDien:
      extracted.benB_DaiDien ||
      extracted.party_b?.representative ||
      extracted.partyB ||
      "",
    suCo:
      extracted.suCo ||
      extracted.noiDung ||
      extracted.description ||
      extracted.incident ||
      "",
    thongSoKyThuatArray,
    ...linhKienFields,
  };
}


router.post("/", async (req, res) => {
  try {
    const file = req.file;
    if (!file)
      return res.status(400).json({ success: false, error: "No file uploaded" });

    console.log("📤 Received file:", file.originalname);

    const extracted = await analyzeImageWithGemini(file.buffer, file.mimetype);

    if (extracted.rawText) {
      return res.json({ success: true, extractedFields: { rawText: extracted.rawText } });
    }

    const mapped = mapExtractedToForm(extracted);
    res.json({ success: true, extractedFields: mapped });
  } catch (err) {
    console.error("Gemini AI Error:", err.response?.data || err.message || err);
    res
      .status(500)
      .json({ success: false, error: "Failed to analyze document" });
  }
});

export default router;
