export default function Dashboard() {
  return (
    <div>
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6 rounded-xl text-white mb-6">
        <h2 className="text-2xl font-bold mb-2">AI Smart Scan & Auto-Fill</h2>
        <p className="text-sm opacity-90 mb-4">
          Upload documents and let AI extract and organize information automatically
        </p>
        <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100">
          Try AI Scan Now
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Files" value="1,247" />
        <StatCard label="AI Processed" value="892" />
        <StatCard label="Auto-Tagged" value="756" />
        <StatCard label="Time Saved" value="48 hrs" />
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm">
        <h3 className="text-lg font-semibold mb-3">Recent AI Processed Files</h3>
        <p className="text-gray-500">Coming soon...</p>
      </div>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="bg-white rounded-xl p-4 text-center shadow-sm">
      <div className="text-2xl font-bold text-blue-600">{value}</div>
      <div className="text-gray-500 text-sm">{label}</div>
    </div>
  );
}
