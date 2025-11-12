import { Share2 } from 'lucide-react';

const Shared = () => {
  return (
    <div className="p-8 bg-white rounded-lg shadow-lg text-center border-4 border-dashed border-gray-300">
      <Share2 className="w-16 h-16 mx-auto text-gray-400 mb-4" />
      <h1 className="text-2xl font-bold text-gray-700 mb-2">Tài liệu được chia sẻ</h1>
      <p className="text-gray-500">
        Các tài liệu mà người khác đã chia sẻ với bạn hoặc các tệp bạn đã chia sẻ ra ngoài.
      </p>
    </div>
  );
};

export default Shared;