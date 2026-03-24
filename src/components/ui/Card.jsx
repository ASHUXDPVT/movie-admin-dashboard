import { motion } from "framer-motion";

export default function Card({ title, value, color }) {
  const colors = {
    blue: "from-blue-500 to-blue-700",
    purple: "from-purple-500 to-indigo-600",
    green: "from-green-500 to-emerald-600",
  };

  return (
    <motion.div
      whileHover={{ scale: 1.07 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`p-6 rounded-2xl shadow-xl text-white bg-gradient-to-r ${colors[color]}`}
    >
      <h3 className="text-sm opacity-80">{title}</h3>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </motion.div>
  );
}