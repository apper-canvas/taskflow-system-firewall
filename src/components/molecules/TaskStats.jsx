import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const TaskStats = ({ tasks }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const stats = [
    {
      label: "Total Tasks",
      value: totalTasks,
      icon: "CheckSquare",
      color: "from-primary to-secondary"
    },
    {
      label: "Completed",
      value: completedTasks,
      icon: "CheckCircle",
      color: "from-success to-green-600"
    },
    {
      label: "Pending",
      value: pendingTasks,
      icon: "Clock",
      color: "from-warning to-yellow-600"
    },
    {
      label: "Completion Rate",
      value: `${completionRate}%`,
      icon: "TrendingUp",
      color: "from-accent to-pink-600"
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="glass-effect rounded-xl p-4 hover:shadow-glass transition-all duration-300"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-100">{stat.value}</p>
            </div>
            <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
              <ApperIcon name={stat.icon} size={20} className="text-white" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default TaskStats;