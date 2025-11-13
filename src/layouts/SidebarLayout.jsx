import { Link, Outlet } from "react-router-dom";
import { Home, FileText, Share2, Trash2, Menu, X } from "lucide-react";
//import { useState } from "react";

const SidebarLayout = () => {
  //const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { to: "/", icon: Home, label: "Dashboard (AI Form)" },
    { to: "/my-files", icon: FileText, label: "Tài liệu của tôi" },
    { to: "/shared", icon: Share2, label: "Chia sẻ" },
    { to: "/trash", icon: Trash2, label: "Thùng rác" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r shadow-md p-6">
        <h2 className="text-2xl font-bold text-indigo-600 mb-8">
          HPJ Docs Manager
        </h2>
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-indigo-100 hover:text-indigo-700 transition"
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default SidebarLayout;
