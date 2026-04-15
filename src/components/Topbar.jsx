import React, {
  useContext,
} from "react";

import {
  Sun,
  Moon,
} from "lucide-react";

import { AppContext } from "../context/AppContext";

export default function Topbar() {
  const {
    darkMode,
    toggleTheme,
  } = useContext(AppContext);

  return (
    <header className="h-16 px-6 pl-16 md:pl-6 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur flex items-center justify-between sticky top-0 z-40">
      <h2 className="text-xl md:text-2xl font-bold">
        Admin Dashboard
      </h2>

      <button
        onClick={
          toggleTheme
        }
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition"
      >
        {darkMode ? (
          <>
            <Sun size={18} />
            Light
          </>
        ) : (
          <>
            <Moon size={18} />
            Dark
          </>
        )}
      </button>
    </header>
  );
}