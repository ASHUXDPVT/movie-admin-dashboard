import React from "react";

export default function MovieForm({
  form,
  setForm,
  editId,
  handleSubmit,
}) {
  return (
    <form
      onSubmit={handleSubmit}
      className="grid md:grid-cols-4 gap-4"
    >
      <input
        className="input-ui"
        placeholder="Title"
        value={form.title}
        onChange={(e) =>
          setForm({
            ...form,
            title:
              e.target.value,
          })
        }
      />

      <input
        className="input-ui"
        placeholder="Genre"
        value={form.genre}
        onChange={(e) =>
          setForm({
            ...form,
            genre:
              e.target.value,
          })
        }
      />

      <input
        className="input-ui"
        type="number"
        min="1"
        max="10"
        placeholder="Rating"
        value={form.rating}
        onChange={(e) =>
          setForm({
            ...form,
            rating:
              e.target.value,
          })
        }
      />

      <button className="btn-primary">
        {editId
          ? "Update Movie"
          : "Add Movie"}
      </button>
    </form>
  );
}