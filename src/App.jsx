import { Routes, Route } from "react-router-dom";
import SidebarLayout from "./layouts/SidebarLayout";
import Dashboard from "./pages/Dashboard";
import MyFiles from "./pages/MyFiles";
import Shared from "./pages/Shared";
import Trash from "./pages/Trash";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SidebarLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="my-files" element={<MyFiles />} />
        <Route path="shared" element={<Shared />} />
        <Route path="trash" element={<Trash />} />
      </Route>
    </Routes>
  );
}

export default App;
