import {
  LayoutDashboard,
  Users,
  CalendarDays,
  Columns,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const { pathname } = useLocation();

  const linkClass = (path) =>
    `flex items-center gap-3 p-3 rounded-xl transition ${
      pathname === path
        ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow"
        : "hover:bg-gray-700"
    }`;

  return (
    <aside className="w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-gray-300 p-5">
      <h2 className="text-2xl font-bold text-white mb-8">
        🎬 Movie Admin
      </h2>

      <nav className="space-y-3">
        <Link to="/" className={linkClass("/")}>
          <LayoutDashboard size={18} /> Dashboard
        </Link>

        <Link to="/users" className={linkClass("/users")}>
          <Users size={18} /> Users
        </Link>

        <Link to="/calendar" className={linkClass("/calendar")}>
          <CalendarDays size={18} /> Calendar
        </Link>

        <Link to="/kanban" className={linkClass("/kanban")}>
          <Columns size={18} /> Kanban
        </Link>
      </nav>
    </aside>
  );
}