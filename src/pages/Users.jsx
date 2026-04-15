import React, {
  useContext,
  useMemo,
  useState,
} from "react";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";

export default function Users() {
  const { users, setUsers } =
    useContext(AppContext);

  const [form, setForm] =
    useState({
      name: "",
      email: "",
      role: "User",
    });

  const [editId, setEditId] =
    useState(null);

  const [search, setSearch] =
    useState("");

  const [page, setPage] =
    useState(1);

  const perPage = 5;

  const filtered =
    useMemo(() => {
      return users.filter(
        (u) =>
          u.name
            .toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||
          u.email
            .toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );
    }, [users, search]);

  const totalPages =
    Math.ceil(
      filtered.length / perPage
    ) || 1;

  const current =
    filtered.slice(
      (page - 1) * perPage,
      page * perPage
    );

  const resetForm = () => {
    setForm({
      name: "",
      email: "",
      role: "User",
    });
    setEditId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.name.trim() ||
      !form.email.trim()
    ) {
      toast.error(
        "Name and email required"
      );
      return;
    }

    if (editId) {
      setUsers(
        users.map((u) =>
          u.id === editId
            ? {
                ...u,
                ...form,
              }
            : u
        )
      );

      toast.success(
        "User updated"
      );
    } else {
      setUsers([
        ...users,
        {
          id: Date.now(),
          ...form,
        },
      ]);

      toast.success(
        "User added"
      );
    }

    resetForm();
  };

  const handleEdit = (u) => {
    setEditId(u.id);

    setForm({
      name: u.name,
      email: u.email,
      role: u.role,
    });

    toast.info(
      "Editing user"
    );
  };

  const handleDelete = (id) => {
    setUsers(
      users.filter(
        (u) => u.id !== id
      )
    );

    toast.success(
      "User deleted"
    );
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        Users Management
      </h1>

      <div className="panel p-5">
        <input
          className="input-ui mb-4"
          placeholder="Search users..."
          value={search}
          onChange={(e) => {
            setSearch(
              e.target.value
            );
            setPage(1);
          }}
        />

        <form
          onSubmit={
            handleSubmit
          }
          className="grid md:grid-cols-4 gap-4"
        >
          <input
            className="input-ui"
            placeholder="Name"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name:
                  e.target.value,
              })
            }
          />

          <input
            className="input-ui"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email:
                  e.target.value,
              })
            }
          />

          <select
            className="input-ui"
            value={form.role}
            onChange={(e) =>
              setForm({
                ...form,
                role:
                  e.target.value,
              })
            }
          >
            <option>
              User
            </option>
            <option>
              Admin
            </option>
          </select>

          <button className="btn-primary">
            {editId
              ? "Update User"
              : "Add User"}
          </button>
        </form>
      </div>

      <div className="panel p-4 overflow-x-auto">
        <table className="table-ui">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {current.map(
              (u) => (
                <tr
                  key={u.id}
                >
                  <td>
                    {u.name}
                  </td>
                  <td>
                    {u.email}
                  </td>
                  <td>
                    {u.role}
                  </td>

                  <td className="space-x-2">
                    <button
                      onClick={() =>
                        handleEdit(
                          u
                        )
                      }
                      className="btn-warning"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(
                          u.id
                        )
                      }
                      className="btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>

        <div className="flex gap-2 mt-4">
          {Array.from(
            {
              length:
                totalPages,
            },
            (_, i) => (
              <button
                key={i}
                onClick={() =>
                  setPage(
                    i + 1
                  )
                }
                className={`px-4 py-2 rounded-xl ${
                  page ===
                  i + 1
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-700 text-white"
                }`}
              >
                {i + 1}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}