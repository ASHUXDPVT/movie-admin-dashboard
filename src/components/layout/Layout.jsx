import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function Layout({ children }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <div className="p-6 bg-gray-100 dark:bg-gray-900 flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
}