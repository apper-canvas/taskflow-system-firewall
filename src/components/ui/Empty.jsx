import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Empty = ({ type = "tasks", onAction, actionText = "Add New" }) => {
  const getEmptyContent = () => {
    switch (type) {
      case "tasks":
        return {
          icon: "CheckSquare",
          title: "No tasks yet",
          description: "Create your first task to get started with your productivity journey.",
          actionText: "Add Task"
        };
      case "categories":
        return {
          icon: "FolderPlus",
          title: "No categories",
          description: "Organize your tasks by creating categories that match your workflow.",
          actionText: "Add Category"
        };
      case "search":
        return {
          icon: "Search",
          title: "No results found",
          description: "Try adjusting your search terms or browse all tasks.",
          actionText: "Clear Search"
        };
      case "completed":
        return {
          icon: "Trophy",
          title: "No completed tasks",
          description: "Complete some tasks to see them here and celebrate your progress!",
          actionText: null
        };
      default:
        return {
          icon: "Inbox",
          title: "Nothing here",
          description: "This area is empty. Start by adding some content.",
          actionText: actionText
        };
    }
  };

  const content = getEmptyContent();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center p-12 text-center"
    >
      <div className="w-20 h-20 bg-gradient-to-br from-secondary to-accent rounded-full flex items-center justify-center mb-6 shadow-elevation">
        <ApperIcon name={content.icon} size={40} className="text-white" />
      </div>
      
      <h3 className="text-2xl font-bold text-slate-200 mb-3 font-display gradient-text">
        {content.title}
      </h3>
      
      <p className="text-slate-400 mb-8 max-w-md leading-relaxed">
        {content.description}
      </p>
      
      {content.actionText && onAction && (
        <Button
          onClick={onAction}
          variant="primary"
          size="lg"
          className="min-w-40"
        >
          <ApperIcon name="Plus" size={16} className="mr-2" />
          {content.actionText}
        </Button>
      )}
    </motion.div>
  );
};

export default Empty;