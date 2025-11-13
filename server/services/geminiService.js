// server/services/geminiService.js
import axios from "axios";

/**
 * Analyze an image buffer with Gemini 2.5 Flash and return parsed JSON.
 */
export async function analyzeImageWithGemini(buffer, mimeType = "image/jpeg") {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error("Missing GEMINI_API_KEY");

  const base64 = buffer.toString("base64");

  // 🧠 Optimized prompt for Vietnamese maintenance report forms
  const promptText = `
Bạn là AI trích xuất dữ liệu từ biên bản sửa chữa & bảo trì máy in phun công nghiệp.
Hãy đọc ảnh và xuất ra dữ liệu **chính xác, ngắn gọn, đúng định dạng JSON**, KHÔNG bao gồm chú thích hay markdown.

Cấu trúc JSON phải đúng thứ tự và có các trường sau:

{
  "ngayLapBienBan": "dd/mm/yyyy",
  "benA_CongTy": "",
  "benA_DaiDien": "",
  "benB_DaiDien": "",
  "suCo": "Mô tả ngắn gọn nội dung hoặc sự cố / mục đích bảo trì",
  "thongSoKyThuatArray": [
    {
      "machine_name": "",
      "pump_run_time": "",
      "set_pressure": "",
      "actual_pressure_vj": "",
      "band_setting": "",
      "viscosity_setting": ""
    }
  ],
  "linhKienThayThe": [
    { "ten": "", "soLuong": "" },
    { "ten": "", "soLuong": "" }
  ]
}

Chỉ trả về JSON hợp lệ duy nhất.
Không thêm mô tả, không viết thêm gì khác ngoài JSON.`;

  const payload = {
    contents: [
      {
        role: "user",
        parts: [
          { text: promptText },
          {
            inline_data: {
              mime_type: mimeType,
              data: base64,
            },
          },
        ],
      },
    ],
    generationConfig: {
      temperature: 0.0,
      topP: 0.9,
      topK: 40,
      maxOutputTokens: 8192,
    },
  };

  const url = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${key}`;

  try {
    const resp = await axios.post(url, payload, {
      headers: { "Content-Type": "application/json" },
      timeout: 120000,
    });

    const rawText =
      resp.data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join("") ||
      "";

    if (!rawText || rawText.trim() === "") {
      console.warn(
        "Gemini returned empty text:",
        JSON.stringify(resp.data, null, 2)
      );
      return {
        rawText:
          "(Empty response — try smaller image or clearer prompt instructions)",
      };
    }

    const cleaned = rawText
      .replace(/^\s*```(?:json)?\s*/i, "")
      .replace(/\s*```\s*$/i, "")
      .trim();

    try {
      return JSON.parse(cleaned);
    } catch {
      const match = cleaned.match(/\{[\s\S]*\}/m);
      if (match) {
        try {
          return JSON.parse(match[0]);
        } catch {
          return { rawText: cleaned };
        }
      }
      return { rawText: cleaned };
    }
  } catch (err) {
    console.error("❌ Gemini call failed");
    if (err.response) {
      console.error("Status:", err.response.status);
      console.error("Data:", JSON.stringify(err.response.data, null, 2));
    } else {
      console.error("Error:", err.message);
    }
    throw err;
  }
}
