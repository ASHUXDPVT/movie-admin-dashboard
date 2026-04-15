import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

export default function CalendarPage() {
  const events = [
    {
      title: "Avengers Premiere",
      start: new Date(),
      end: new Date(),
    },
    {
      title: "Batman Booking Rush",
      start: moment()
        .add(2, "days")
        .toDate(),
      end: moment()
        .add(2, "days")
        .toDate(),
    },
    {
      title: "Interstellar Re-release",
      start: moment()
        .add(4, "days")
        .toDate(),
      end: moment()
        .add(4, "days")
        .toDate(),
    },
  ];

  return (
    <div className="space-y-5">
      <h1 className="text-3xl font-bold">
        Booking Calendar
      </h1>

      <div className="bg-white text-black rounded-2xl p-5 h-[75vh] shadow-xl">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
        />
      </div>
    </div>
  );
}