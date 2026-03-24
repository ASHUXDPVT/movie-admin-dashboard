import { motion } from "framer-motion";
import Card from "../components/ui/Card";
import ChartBox from "../components/ui/ChartBox";

export default function Dashboard() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Users" value="1,200" color="blue" />
        <Card title="Tickets" value="3,450" color="purple" />
        <Card title="Revenue" value="₹2.4L" color="green" />
      </div>

      {/* Chart */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition">
        <h2 className="text-lg font-semibold mb-4">
          📊 Weekly Revenue
        </h2>
        <ChartBox />
      </div>
    </motion.div>
  );
}