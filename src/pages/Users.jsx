import { useState } from "react";
import { useApp } from "../context/AppContext";

export default function Users() {
  const { users, setUsers } = useApp();

  const [name, setName] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  const addUser = () => {
    if (!name.trim()) return;
    setUsers([...users, { id: Date.now(), name }]);
    setName("");
  };

  const deleteUser = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  const start = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(start, start + itemsPerPage);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Users Management</h2>

      {/* Controls */}
      <div className="card flex flex-wrap gap-3 items-center">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border px-3 py-2 rounded-lg w-[200px]"
          placeholder="Enter name"
        />

        <button onClick={addUser} className="btn btn-primary">
          Add User
        </button>

        <input
          placeholder="Search users..."
          className="border px-3 py-2 rounded-lg ml-auto"
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* Table */}
      <div className="card overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-500 border-b">
              <th className="p-3">ID</th>
              <th>Name</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {paginatedUsers.map((u) => (
              <tr key={u.id} className="border-b hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                <td className="p-3">{u.id}</td>
                <td>{u.name}</td>
                <td className="text-center">
                  <button
                    onClick={() => deleteUser(u.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredUsers.length === 0 && (
          <p className="text-center py-4 text-gray-500">No users found</p>
        )}
      </div>

      {/* Pagination */}
      {filteredUsers.length > 0 && (
        <div className="flex justify-center items-center gap-4">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            className="px-3 py-1 bg-gray-200 rounded"
          >
            Prev
          </button>

          <span className="font-medium">
            {currentPage} / {totalPages || 1}
          </span>

          <button
            onClick={() =>
              setCurrentPage((p) => (p < totalPages ? p + 1 : p))
            }
            className="px-3 py-1 bg-gray-200 rounded"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}