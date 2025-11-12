import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import MyFiles from "./pages/MyFiles";
import Shared from "./pages/Shared";
import Trash from "./pages/Trash";
import SidebarLayout from "./layouts/SidebarLayout";

function App() {
  return (
    <Router>
      <SidebarLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/my-files" element={<MyFiles />} />
          <Route path="/shared" element={<Shared />} />
          <Route path="/trash" element={<Trash />} />
        </Routes>
      </SidebarLayout>
    </Router>
  );
}

export default App;
