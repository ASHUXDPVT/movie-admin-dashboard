import React, {
  useContext,
} from "react";

import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

import { AppContext } from "../context/AppContext";

export default function Layout() {
  const { darkMode } =
    useContext(AppContext);

  return (
    <div
      className={
        darkMode
          ? "dark"
          : ""
      }
    >
      <div className="min-h-screen flex bg-slate-100 dark:bg-slate-950 text-black dark:text-white transition-colors duration-300">
        <Sidebar />

        <div className="flex-1 flex flex-col min-w-0">
          <Topbar />

          <main className="flex-1 p-4 md:p-6 overflow-x-hidden">
            <div className="max-w-7xl mx-auto">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}