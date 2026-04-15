import React, {
  useState,
} from "react";

import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";

export default function KanbanPage() {
  const [columns, setColumns] =
    useState({
      todo: {
        name: "To Do",
        items: [
          {
            id: "1",
            text:
              "Add Movie Banner",
          },
        ],
      },
      progress: {
        name:
          "In Progress",
        items: [
          {
            id: "2",
            text:
              "Update Revenue Chart",
          },
        ],
      },
      done: {
        name: "Done",
        items: [],
      },
    });

  const [newTask, setNewTask] =
    useState("");

  const [editTaskId, setEditTaskId] =
    useState(null);

  const [editText, setEditText] =
    useState("");

  const onDragEnd = (
    result
  ) => {
    if (
      !result.destination
    )
      return;

    const {
      source,
      destination,
    } = result;

    const sourceCol =
      columns[
        source
          .droppableId
      ];

    const destCol =
      columns[
        destination
          .droppableId
      ];

    const sourceItems = [
      ...sourceCol.items,
    ];

    const [removed] =
      sourceItems.splice(
        source.index,
        1
      );

    if (
      source.droppableId ===
      destination.droppableId
    ) {
      sourceItems.splice(
        destination.index,
        0,
        removed
      );

      setColumns({
        ...columns,
        [source
          .droppableId]:
          {
            ...sourceCol,
            items:
              sourceItems,
          },
      });
    } else {
      const destItems = [
        ...destCol.items,
      ];

      destItems.splice(
        destination.index,
        0,
        removed
      );

      setColumns({
        ...columns,
        [source
          .droppableId]:
          {
            ...sourceCol,
            items:
              sourceItems,
          },
        [destination
          .droppableId]:
          {
            ...destCol,
            items:
              destItems,
          },
      });
    }
  };

  const addTask = () => {
    if (!newTask.trim())
      return;

    const updated = {
      ...columns,
      todo: {
        ...columns.todo,
        items: [
          ...columns
            .todo.items,
          {
            id: Date.now().toString(),
            text: newTask,
          },
        ],
      },
    };

    setColumns(updated);
    setNewTask("");
  };

  const deleteTask = (
    colId,
    id
  ) => {
    setColumns({
      ...columns,
      [colId]: {
        ...columns[colId],
        items:
          columns[
            colId
          ].items.filter(
            (i) =>
              i.id !== id
          ),
      },
    });
  };

  const saveEdit = (
    colId,
    id
  ) => {
    setColumns({
      ...columns,
      [colId]: {
        ...columns[colId],
        items:
          columns[
            colId
          ].items.map(
            (item) =>
              item.id ===
              id
                ? {
                    ...item,
                    text:
                      editText,
                  }
                : item
          ),
      },
    });

    setEditTaskId(null);
    setEditText("");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        Kanban Board
      </h1>

      <div className="flex gap-3">
        <input
          className="input-ui"
          placeholder="New Task"
          value={newTask}
          onChange={(e) =>
            setNewTask(
              e.target.value
            )
          }
        />

        <button
          onClick={addTask}
          className="btn-primary"
        >
          Add
        </button>
      </div>

      <DragDropContext
        onDragEnd={
          onDragEnd
        }
      >
        <div className="grid md:grid-cols-3 gap-5">
          {Object.entries(
            columns
          ).map(
            ([
              colId,
              col,
            ]) => (
              <div
                key={colId}
                className="panel p-4"
              >
                <h2 className="font-bold mb-4 text-lg">
                  {
                    col.name
                  }
                </h2>

                <Droppable
                  droppableId={
                    colId
                  }
                >
                  {(
                    provided
                  ) => (
                    <div
                      ref={
                        provided.innerRef
                      }
                      {
                        ...provided.droppableProps
                      }
                      className="space-y-3 min-h-[250px]"
                    >
                      {col.items.map(
                        (
                          item,
                          index
                        ) => (
                          <Draggable
                            key={
                              item.id
                            }
                            draggableId={
                              item.id
                            }
                            index={
                              index
                            }
                          >
                            {(
                              provided
                            ) => (
                              <div
                                ref={
                                  provided.innerRef
                                }
                                {
                                  ...provided.draggableProps
                                }
                                {
                                  ...provided.dragHandleProps
                                }
                                className="bg-slate-800 text-white p-3 rounded-xl"
                              >
                                {editTaskId ===
                                item.id ? (
                                  <div className="space-y-2">
                                    <input
                                      className="input-ui"
                                      value={
                                        editText
                                      }
                                      onChange={(
                                        e
                                      ) =>
                                        setEditText(
                                          e
                                            .target
                                            .value
                                        )
                                      }
                                    />

                                    <button
                                      onClick={() =>
                                        saveEdit(
                                          colId,
                                          item.id
                                        )
                                      }
                                      className="btn-primary w-full"
                                    >
                                      Save
                                    </button>
                                  </div>
                                ) : (
                                  <>
                                    <p className="mb-3">
                                      {
                                        item.text
                                      }
                                    </p>

                                    <div className="flex gap-2">
                                      <button
                                        onClick={() => {
                                          setEditTaskId(
                                            item.id
                                          );
                                          setEditText(
                                            item.text
                                          );
                                        }}
                                        className="btn-warning"
                                      >
                                        Edit
                                      </button>

                                      <button
                                        onClick={() =>
                                          deleteTask(
                                            colId,
                                            item.id
                                          )
                                        }
                                        className="btn-danger"
                                      >
                                        Delete
                                      </button>
                                    </div>
                                  </>
                                )}
                              </div>
                            )}
                          </Draggable>
                        )
                      )}

                      {
                        provided.placeholder
                      }
                    </div>
                  )}
                </Droppable>
              </div>
            )
          )}
        </div>
      </DragDropContext>
    </div>
  );
}