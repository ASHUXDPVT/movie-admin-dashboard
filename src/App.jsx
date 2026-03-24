import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import CalendarPage from "./pages/CalendarPage";
import KanbanPage from "./pages/KanbanPage";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/kanban" element={<KanbanPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}