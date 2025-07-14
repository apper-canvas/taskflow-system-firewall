import { motion } from "framer-motion";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";

const PriorityBadge = ({ priority, size = "md" }) => {
  const getPriorityConfig = (priority) => {
    switch (priority) {
      case 1:
        return {
          variant: "default",
          label: "Low",
          icon: "ArrowDown",
          color: "text-slate-400"
        };
      case 2:
        return {
          variant: "info",
          label: "Medium",
          icon: "Minus",
          color: "text-blue-400"
        };
      case 3:
        return {
          variant: "warning",
          label: "High",
          icon: "ArrowUp",
          color: "text-yellow-400"
        };
      case 4:
        return {
          variant: "error",
          label: "Very High",
          icon: "AlertTriangle",
          color: "text-red-400"
        };
      case 5:
        return {
          variant: "error",
          label: "Urgent",
          icon: "Zap",
          color: "text-red-300"
        };
      default:
        return {
          variant: "default",
          label: "Low",
          icon: "ArrowDown",
          color: "text-slate-400"
        };
    }
  };

  const config = getPriorityConfig(priority);

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <Badge 
        variant={config.variant} 
        size={size}
        className="priority-pill font-medium"
      >
        <ApperIcon 
          name={config.icon} 
          size={size === "sm" ? 12 : 14} 
          className={`mr-1 ${config.color}`} 
        />
        {config.label}
      </Badge>
    </motion.div>
  );
};

export default PriorityBadge;