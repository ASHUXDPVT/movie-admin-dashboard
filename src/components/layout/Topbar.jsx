import { useApp } from "../../context/AppContext";

export default function Topbar() {
  const { dark, setDark } = useApp();

  return (
    <div className="flex justify-between items-center p-4 bg-white/70 dark:bg-gray-800/70 backdrop-blur rounded-xl shadow">
      <h1 className="text-xl font-semibold">
        🚀 Admin Dashboard
      </h1>

      <button
        onClick={() => setDark(!dark)}
        className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-lg"
      >
        {dark ? "Light Mode" : "Dark Mode"}
      </button>
    </div>
  );
}