import { Link } from 'react-router-dom';
import { Home, FileText, Share2, Trash2, Menu, X } from 'lucide-react';
import { useState } from 'react';

const SidebarLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { to: "/", icon: Home, label: "Dashboard (AI Form)" },
    { to: "/my-files", icon: FileText, label: "Tài liệu của tôi" },
    { to: "/shared", icon: Share2, label: "Chia sẻ" },
    { to: "/trash", icon: Trash2, label: "Thùng rác" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      
      {/* Sidebar (Desktop) */}
      <nav className="hidden md:flex flex-col w-64 bg-white border-r shadow-lg p-4">
        <div className="p-4 text-2xl font-bold text-indigo-600 border-b mb-6">
          HPJ Docs Manager
        </div>
        {navItems.map((item) => (
          <Link
            key={item.label}
            to={item.to}
            className="flex items-center space-x-3 p-3 text-gray-700 rounded-lg hover:bg-indigo-100 hover:text-indigo-700 transition duration-150"
            onClick={() => setIsOpen(false)}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Mobile Header & Button */}
      <header className="md:hidden bg-white shadow-md p-4 flex justify-between items-center w-full sticky top-0 z-20">
        <h1 className="text-xl font-bold text-indigo-600">HPJ Manager</h1>
        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Mobile Menu (Overlay) */}
      {isOpen && (
        <div className="fixed inset-0 z-30 bg-black bg-opacity-50" onClick={() => setIsOpen(false)}>
          <nav className="flex flex-col w-64 h-full bg-white p-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
             <div className="p-4 text-2xl font-bold text-indigo-600 border-b mb-6">
                HPJ Docs Manager
             </div>
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="flex items-center space-x-3 p-3 text-gray-700 rounded-lg hover:bg-indigo-100 hover:text-indigo-700 transition duration-150"
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 p-4 md:p-8 overflow-y-auto">
        {/* Để lại một khoảng trống nhỏ cho Mobile Header */}
        <div className="md:hidden h-10"></div> 
        <div className="max-w-4xl mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default SidebarLayout;