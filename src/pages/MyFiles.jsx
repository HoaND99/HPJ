import { FileText } from 'lucide-react';

const MyFiles = () => {
  return (
    <div className="p-8 bg-white rounded-lg shadow-lg text-center border-4 border-dashed border-gray-300">
      <FileText className="w-16 h-16 mx-auto text-gray-400 mb-4" />
      <h1 className="text-2xl font-bold text-gray-700 mb-2">Tài liệu của tôi</h1>
      <p className="text-gray-500">
        Đây là nơi hiển thị danh sách tất cả các tài liệu đã được lưu trữ thành công vào Google Drive.
      </p>
      <p className="mt-4 text-sm text-indigo-500">
        (Chức năng hiển thị danh sách sẽ được phát triển sau khi chức năng lưu trữ hoàn tất.)
      </p>
    </div>
  );
};

export default MyFiles;