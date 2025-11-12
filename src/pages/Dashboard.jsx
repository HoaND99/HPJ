import { useState } from 'react';
import axios from 'axios';

// Định nghĩa các trường dữ liệu mặc định (Giống App.jsx cũ)
const initialFormData = {
  ngayLapBienBan: '',
  benA_CongTy: '',
  benA_DaiDien: '',
  modelThietBi: '',
  serialThietBi: '',
  suCo: '',
  thongSoKyThuat: '',
  linhKienThayThe: '',
};

const Dashboard = () => {
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError('');
    setMessage('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // --- API CALL: TRÍCH XUẤT AI ---
  const handleExtract = async () => {
    if (!file) { setError('Vui lòng chọn một tệp ảnh.'); return; }
    setLoading(true); setError(''); setMessage('');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('documentImage', file);

      const response = await axios.post('/api/ocr-extract', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.success) {
        const data = response.data.extractedFields;
        setFormData(prev => ({ 
            ...prev, 
            ...data,
            suCo: data.suCo || prev.suCo 
        }));
        setMessage('Trích xuất AI thành công! Vui lòng kiểm tra dữ liệu.');
      }

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Lỗi khi trích xuất AI. Kiểm tra server Node.js và API Key.');
    } finally {
      setLoading(false);
    }
  };

  // --- API CALL: LƯU VÀO GOOGLE DRIVE ---
  const handleSave = async () => {
    setLoading(true); setError(''); setMessage('');
    
    try {
        const response = await axios.post('/api/save-document', formData);
        if (response.data.success) {
            setMessage(response.data.message);
            setFormData(initialFormData); // Reset form
            setFile(null);
        }
    } catch (err) {
        console.error(err);
        setError(err.response?.data?.error || 'Lỗi khi lưu vào Drive. Kiểm tra quyền truy cập.');
    } finally {
        setLoading(false);
    }
  };

  const isFormPopulated = formData.benA_CongTy || formData.ngayLapBienBan;

  // Render UI
  return (
    <div className="bg-white shadow-xl rounded-lg p-6 sm:p-10">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6 border-b pb-2">
        📄 Tạo Biên Bản Mới (AI Trích Xuất)
      </h1>

      {/* Khu vực Upload & Trích xuất */}
      <div className="space-y-4 border border-indigo-200 rounded-lg p-6 bg-indigo-50">
        <label className="block text-lg font-medium text-gray-700">1. Tải ảnh Biên bản</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200"
        />

        <button
          onClick={handleExtract}
          disabled={!file || loading}
          className={`w-full py-3 px-4 rounded-lg font-semibold transition duration-200 ${
            !file || loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md'
          }`}
        >
          {loading ? 'Đang trích xuất AI...' : '2. Trích xuất Dữ liệu bằng Gemini AI'}
        </button>
      </div>
      
      {/* Thông báo */}
      {error && <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">{error}</div>}
      {message && <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg">{message}</div>}

      {/* Khu vực Form Chỉnh sửa & Lưu */}
      <div className="mt-8 space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            3. Kiểm tra và Lưu trữ
          </h2>
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 space-y-4">
            
            {Object.keys(formData).map((key) => {
              const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
              
              if (key === 'suCo' || key === 'thongSoKyThuat' || key === 'linhKienThayThe') {
                return (
                  <div key={key}>
                    <label className="block text-sm font-semibold text-gray-700 pt-3 border-t">
                      {label}
                    </label>
                    <textarea
                      name={key}
                      value={formData[key]}
                      onChange={handleChange}
                      rows="3"
                      className="w-full p-2 border rounded-md text-sm shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                );
              }
              
              return (
                <div key={key}>
                  <label className="block text-sm font-semibold text-gray-700 pt-3 border-t">
                    {label}
                  </label>
                  <input
                    name={key}
                    type="text"
                    value={formData[key]}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md text-sm shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              );
            })}
            
            <button 
              onClick={handleSave} 
              disabled={loading || !isFormPopulated}
              className="mt-4 w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 transition duration-200"
            >
              {loading ? 'Đang Lưu vào Drive...' : '4. Lưu Hồ sơ Kỹ thuật vào Google Drive'}
            </button>
          </div>
        </div>
    </div>
  );
};

export default Dashboard;