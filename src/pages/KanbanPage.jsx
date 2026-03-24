import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useApp } from "../context/AppContext";

export default function KanbanPage() {
  const { tickets, setTickets } = useApp();

  const columns = {
    pending: tickets.filter((t) => t.status === "pending"),
    booked: tickets.filter((t) => t.status === "booked"),
    cancelled: tickets.filter((t) => t.status === "cancelled"),
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const updated = tickets.map((ticket) => {
      if (ticket.id === result.draggableId) {
        return { ...ticket, status: result.destination.droppableId };
      }
      return ticket;
    });

    setTickets(updated);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Ticket Management</h2>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {Object.entries(columns).map(([colId, items]) => (
            <Droppable droppableId={colId} key={colId}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="card min-h-[300px]"
                >
                  <h3 className="font-semibold mb-4 capitalize text-gray-600">
                    {colId}
                  </h3>

                  {items.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="bg-blue-500 hover:bg-blue-600 text-white p-3 mb-3 rounded-lg shadow transition"
                        >
                          {item.title}
                        </div>
                      )}
                    </Draggable>
                  ))}

                  {provided.placeholder}

                  {items.length === 0 && (
                    <p className="text-sm text-gray-400 text-center mt-10">
                      No tickets
                    </p>
                  )}
                </div>
              )}
            </Droppable>
          ))}

        </div>
      </DragDropContext>
    </div>
  );
}