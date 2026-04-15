import StatCard from "../components/StatCard";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

export default function Dashboard() {
  const revenueData = [
    { day: "Mon", value: 400 },
    { day: "Tue", value: 700 },
    { day: "Wed", value: 500 },
    { day: "Thu", value: 900 },
    { day: "Fri", value: 1200 },
    { day: "Sat", value: 1500 },
    { day: "Sun", value: 1100 },
  ];

  const bookingData = [
    { name: "Action", total: 18 },
    { name: "Drama", total: 12 },
    { name: "Sci-Fi", total: 15 },
    { name: "Comedy", total: 10 },
  ];

  return (
    <div className="space-y-6">
      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-5">
        <StatCard
          title="Users"
          value="1,240"
          color="bg-gradient-to-r from-blue-500 to-indigo-600"
        />

        <StatCard
          title="Tickets"
          value="3,540"
          color="bg-gradient-to-r from-purple-500 to-pink-600"
        />

        <StatCard
          title="Revenue"
          value="₹2.4L"
          color="bg-gradient-to-r from-green-500 to-emerald-600"
        />
      </div>

      {/* Revenue Chart */}
      <div className="bg-slate-900 p-6 rounded-2xl shadow-xl">
        <h2 className="text-xl font-semibold mb-4">
          Weekly Revenue
        </h2>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueData}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#6366f1"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Genre Chart */}
      <div className="bg-slate-900 p-6 rounded-2xl shadow-xl">
        <h2 className="text-xl font-semibold mb-4">
          Booking By Genre
        </h2>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={bookingData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="total"
                fill="#8b5cf6"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}