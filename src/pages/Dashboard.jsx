import React, { useState } from "react";
import AIDocumentForm from "../components/AIDocumentForm";
import axios from "axios";

export default function Dashboard() {
  const [formData, setFormData] = useState({
    benA_CongTy: "",
    benA_DaiDien: "",
    benA_ChucVu: "",
    suCo: "",
    thongSoKyThuatArray: [],
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [rawText, setRawText] = useState("");

  // 🧠 handle manual input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 📂 file picker
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // 🚀 send to backend → Gemini → autofill
  const handleGeminiExtract = async () => {
    if (!file) return alert("Vui lòng chọn tệp hình ảnh trước!");
    setLoading(true);
    setError("");
    setRawText("");

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("documentImage", file);

      const res = await axios.post("/api/ocr-extract", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        const extracted = res.data.extractedFields;
        if (extracted.rawText) {
          setRawText(extracted.rawText); // model output not clean JSON
        } else {
          setFormData((prev) => ({
            ...prev,
            ...extracted,
          }));
        }
      } else {
        setError(res.data.error || "Không thể phân tích tài liệu");
      }
    } catch (err) {
      console.error("Gemini extract error:", err);
      setError(err.message || "Lỗi khi gửi yêu cầu đến AI");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">HPJ AI Smart Scan</h1>
        <div className="space-x-3">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="border px-2 py-1 rounded bg-white"
          />
          <button
            onClick={handleGeminiExtract}
            disabled={loading}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            {loading ? "Đang quét AI..." : "Phân tích bằng Gemini AI"}
          </button>
        </div>
      </div>

      {error && (
        <p className="text-red-600 bg-red-50 border border-red-200 p-2 rounded">
          ⚠️ {error}
        </p>
      )}

      {rawText && (
        <div className="bg-gray-100 p-3 rounded text-sm text-gray-700 whitespace-pre-wrap max-h-80 overflow-y-auto">
          <h3 className="font-semibold mb-2 text-gray-900">
            Văn bản AI trả về:
          </h3>
          {rawText}
        </div>
      )}

      <AIDocumentForm formData={formData} onChange={handleChange} />
    </div>
  );
}
