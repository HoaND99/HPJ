import { Trash2 } from 'lucide-react';

const Trash = () => {
  return (
    <div className="p-8 bg-white rounded-lg shadow-lg text-center border-4 border-dashed border-gray-300">
      <Trash2 className="w-16 h-16 mx-auto text-gray-400 mb-4" />
      <h1 className="text-2xl font-bold text-gray-700 mb-2">Thùng rác</h1>
      <p className="text-gray-500">
        Các tài liệu đã bị xóa tạm thời.
      </p>
    </div>
  );
};

export default Trash;