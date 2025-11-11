export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="text-2xl font-bold p-4 border-b">HPJ AI</div>
      <nav className="flex-1 p-4 space-y-2">
        <a href="#" className="block p-2 rounded hover:bg-blue-100 text-blue-600 font-medium">Dashboard</a>
        <a href="#" className="block p-2 rounded hover:bg-blue-100">My Files</a>
        <a href="#" className="block p-2 rounded hover:bg-blue-100">Shared</a>
        <a href="#" className="block p-2 rounded hover:bg-blue-100">Trash</a>
      </nav>
      <div className="p-4 border-t text-sm text-gray-500">Storage: 73% used</div>
    </aside>
  );
}
