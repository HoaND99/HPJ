// src/components/AIDocumentForm.jsx
import React from "react";

export default function AIDocumentForm({ formData = {}, onChange }) {
  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-center text-2xl font-bold uppercase mb-6">
        Biên Bản Sửa Chữa & Bảo Trì Máy In Phun Công Nghiệp
      </h2>

      {/* --- Parties Section --- */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="border p-4 rounded-lg">
          <h3 className="font-semibold mb-2">BÊN A</h3>
          <div className="space-y-2 text-sm">
            <div>
              <label className="font-medium">Công ty:</label>
              <input
                name="benA_CongTy"
                value={formData?.benA_CongTy || ""}
                onChange={onChange}
                className="w-full border rounded px-2 py-1"
              />
            </div>
            <div>
              <label>Người đại diện:</label>
              <input
                name="benA_DaiDien"
                value={formData?.benA_DaiDien || ""}
                onChange={onChange}
                className="w-full border rounded px-2 py-1"
              />
            </div>
            <div>
              <label>Chức vụ:</label>
              <input
                name="benA_ChucVu"
                value={formData?.benA_ChucVu || ""}
                onChange={onChange}
                className="w-full border rounded px-2 py-1"
              />
            </div>
          </div>
        </div>

        <div className="border p-4 rounded-lg">
          <h3 className="font-semibold mb-2">BÊN B</h3>
          <div className="space-y-2 text-sm">
            <p className="font-medium">
              CÔNG TY CP SX, TM & DV KỸ THUẬT HƯNG PHÁT
            </p>
            <p>
              B44TT17, KĐT Văn Quán, Yên Phúc, P. Phúc La, Q. Hà Đông, Hà Nội
            </p>
            <div>
              <label>Người đại diện:</label>
              <input
                name="benB_DaiDien"
                value={formData?.benB_DaiDien || ""}
                onChange={onChange}
                className="w-full border rounded px-2 py-1"
              />
            </div>
          </div>
        </div>
      </div>

      {/* --- Content Section --- */}
      <div className="mb-6">
        <label className="font-semibold">Nội dung / Mục đích:</label>
        <textarea
          name="suCo"
          value={formData?.suCo || ""}
          onChange={onChange}
          className="w-full border rounded p-2 mt-1 h-24"
        />
      </div>

      {/* --- Technical Table --- */}
{/* --- Technical Table --- */}
<h3 className="font-semibold mb-2">Bảng Thông Số Kỹ Thuật</h3>
<div className="overflow-x-auto mb-6 border rounded">
  <table className="min-w-full border text-sm">
    <thead className="bg-gray-100 text-gray-700">
      <tr>
        {[
          "Tên máy",
          "T.gian chạy pump",
          "Áp lực cài đặt (V)",
          "Áp lực thực tế (VJ)",
          "Band setting",
          "Độ nhớt (ECT)",
        ].map((h) => (
          <th key={h} className="border px-2 py-1 text-left">{h}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {(formData?.thongSoKyThuatArray || []).length > 0 ? (
        formData.thongSoKyThuatArray.map((row, idx) => (
          <tr key={idx} className="even:bg-gray-50">
            <td className="border px-2 py-1">{row.machine_name || ""}</td>
            <td className="border px-2 py-1">{row.pump_run_time || ""}</td>
            <td className="border px-2 py-1">{row.set_pressure || ""}</td>
            <td className="border px-2 py-1">{row.actual_pressure_vj || ""}</td>
            <td className="border px-2 py-1">{row.band_setting || ""}</td>
            <td className="border px-2 py-1">{row.viscosity_setting || ""}</td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="6" className="text-center text-gray-400 py-3">
            (Chưa có dữ liệu bảng kỹ thuật)
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>


      {/* --- Replacement Parts --- */}
      <h3 className="font-semibold mb-2">Linh Kiện Thay Thế</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <input
            key={i}
            placeholder={`Tên / Số lượng #${i}`}
            name={`linhKien${i}`}
            value={formData?.[`linhKien${i}`] || ""}
            onChange={onChange}
            className="border rounded px-2 py-1"
          />
        ))}
      </div>
    </div>
  );
}
