import React, {
  useState,
} from "react";

import { NavLink } from "react-router-dom";

import {
  Menu,
  X,
  LayoutDashboard,
  Users,
  Film,
  Calendar,
  KanbanSquare,
} from "lucide-react";

export default function Sidebar() {
  const [open, setOpen] =
    useState(false);

  const menus = [
    {
      name: "Dashboard",
      path: "/",
      icon:
        LayoutDashboard,
    },
    {
      name: "Users",
      path: "/users",
      icon: Users,
    },
    {
      name: "Movies",
      path: "/movies",
      icon: Film,
    },
    {
      name: "Calendar",
      path: "/calendar",
      icon: Calendar,
    },
    {
      name: "Kanban",
      path: "/kanban",
      icon:
        KanbanSquare,
    },
  ];

  const links = menus.map(
    (item) => {
      const Icon =
        item.icon;

      return (
        <NavLink
          key={item.path}
          to={item.path}
          end={
            item.path ===
            "/"
          }
          onClick={() =>
            setOpen(false)
          }
          className={({
            isActive,
          }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
              isActive
                ? "bg-indigo-600 text-white"
                : "text-slate-300 hover:bg-slate-800"
            }`
          }
        >
          <Icon size={18} />
          {item.name}
        </NavLink>
      );
    }
  );

  return (
    <>
      {/* Mobile Button */}
      <button
        onClick={() =>
          setOpen(true)
        }
        className="md:hidden fixed top-4 left-4 z-50 bg-indigo-600 p-2 rounded-lg"
      >
        <Menu size={20} />
      </button>

      {/* Desktop */}
      <aside className="hidden md:flex w-64 min-h-screen bg-slate-900 border-r border-slate-800 p-5 flex-col">
        <h1 className="text-2xl font-bold text-indigo-400 mb-8">
          🎬 Movie Admin
        </h1>

        <nav className="space-y-2">
          {links}
        </nav>
      </aside>

      {/* Mobile Drawer */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/60 md:hidden">
          <aside className="w-64 h-full bg-slate-900 p-5">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-xl font-bold text-indigo-400">
                🎬 Admin
              </h1>

              <button
                onClick={() =>
                  setOpen(
                    false
                  )
                }
              >
                <X />
              </button>
            </div>

            <nav className="space-y-2">
              {links}
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}