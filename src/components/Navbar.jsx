export default function Navbar() {
  return (
    <header className="bg-white shadow-sm p-4 flex justify-between items-center">
      <input
        type="text"
        placeholder="Search files..."
        className="border rounded-lg px-3 py-2 w-1/3 focus:outline-none focus:ring focus:ring-blue-200"
      />
      <div className="flex items-center space-x-3">
        <span className="font-medium">Welcome back, John!</span>
        <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">J</div>
      </div>
    </header>
  );
}
