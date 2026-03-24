import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useApp } from "../context/AppContext";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

export default function CalendarPage() {
  const { tickets, setTickets } = useApp();

  const handleSelectSlot = ({ start, end }) => {
    const title = prompt("Enter Movie Name");

    if (title) {
      const newTicket = {
        id: Date.now().toString(),
        title,
        start,
        end,
        status: "pending",
      };

      setTickets([...tickets, newTicket]);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow h-[80vh]">
      <h2 className="text-xl font-bold mb-4">Movie Schedule</h2>

      <Calendar
        selectable
        localizer={localizer}
        events={tickets}
        startAccessor="start"
        endAccessor="end"
        onSelectSlot={handleSelectSlot}
        style={{ height: "100%" }}
      />
    </div>
  );
}