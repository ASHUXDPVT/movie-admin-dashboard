import React, {
  useContext,
  useMemo,
  useState,
} from "react";

import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import MovieForm from "../components/MovieForm";

export default function Movies() {
  const { movies, setMovies } =
    useContext(AppContext);

  const [form, setForm] =
    useState({
      title: "",
      genre: "",
      rating: "",
    });

  const [editId, setEditId] =
    useState(null);

  const [search, setSearch] =
    useState("");

  const [genreFilter, setGenreFilter] =
    useState("");

  const [page, setPage] =
    useState(1);

  const perPage = 5;

  const filtered =
    useMemo(() => {
      return movies.filter(
        (m) =>
          m.title
            .toLowerCase()
            .includes(
              search.toLowerCase()
            ) &&
          (genreFilter === ""
            ? true
            : m.genre === genreFilter)
      );
    }, [
      movies,
      search,
      genreFilter,
    ]);

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
      title: "",
      genre: "",
      rating: "",
    });

    setEditId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.title.trim() ||
      !form.genre.trim() ||
      !form.rating
    ) {
      toast.error(
        "All fields are required"
      );
      return;
    }

    const rating =
      Number(form.rating);

    if (
      rating < 1 ||
      rating > 10
    ) {
      toast.error(
        "Rating must be 1 to 10"
      );
      return;
    }

    const payload = {
      ...form,
      rating,
    };

    if (editId) {
      setMovies(
        movies.map((m) =>
          m.id === editId
            ? {
                ...m,
                ...payload,
              }
            : m
        )
      );

      toast.success(
        "Movie updated"
      );
    } else {
      setMovies([
        ...movies,
        {
          id: Date.now(),
          ...payload,
        },
      ]);

      toast.success(
        "Movie added"
      );
    }

    resetForm();
  };

  const handleEdit = (m) => {
    setEditId(m.id);

    setForm({
      title: m.title,
      genre: m.genre,
      rating: m.rating,
    });

    toast.info(
      "Editing movie"
    );
  };

  const handleDelete = (id) => {
    setMovies(
      movies.filter(
        (m) => m.id !== id
      )
    );

    toast.success(
      "Movie deleted"
    );
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        Movies Management
      </h1>

      <div className="panel p-5">
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <input
            className="input-ui"
            placeholder="Search movie..."
            value={search}
            onChange={(e) => {
              setSearch(
                e.target.value
              );
              setPage(1);
            }}
          />

          <select
            className="input-ui"
            value={
              genreFilter
            }
            onChange={(e) => {
              setGenreFilter(
                e.target.value
              );
              setPage(1);
            }}
          >
            <option value="">
              All Genres
            </option>
            <option>
              Action
            </option>
            <option>
              Sci-Fi
            </option>
            <option>
              Drama
            </option>
            <option>
              Comedy
            </option>
          </select>
        </div>

        <MovieForm
          form={form}
          setForm={setForm}
          editId={editId}
          handleSubmit={handleSubmit}
        />
      </div>

      <div className="panel p-4 overflow-x-auto">
        <table className="table-ui">
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Rating</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {current.map(
              (m) => (
                <tr
                  key={m.id}
                >
                  <td>
                    {m.title}
                  </td>
                  <td>
                    {m.genre}
                  </td>
                  <td>
                    {m.rating}
                  </td>

                  <td className="space-x-2">
                    <button
                      onClick={() =>
                        handleEdit(
                          m
                        )
                      }
                      className="btn-warning"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(
                          m.id
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