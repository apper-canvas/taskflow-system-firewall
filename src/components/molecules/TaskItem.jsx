import { useState } from "react";
import { motion } from "framer-motion";
import { format, isToday, isPast, isFuture } from "date-fns";
import Checkbox from "@/components/atoms/Checkbox";
import Button from "@/components/atoms/Button";
import PriorityBadge from "@/components/molecules/PriorityBadge";
import TaskForm from "@/components/molecules/TaskForm";
import ApperIcon from "@/components/ApperIcon";
import { useCategories } from "@/hooks/useCategories";

const TaskItem = ({ task, onToggleComplete, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { categories } = useCategories();

  const category = categories.find(cat => cat.Id === task.categoryId);

  const getDueDateStatus = () => {
    if (!task.dueDate) return null;
    
    const dueDate = new Date(task.dueDate);
    if (isPast(dueDate) && !isToday(dueDate)) return "overdue";
    if (isToday(dueDate)) return "today";
    if (isFuture(dueDate)) return "upcoming";
    return null;
  };

  const dueDateStatus = getDueDateStatus();

  const getDueDateStyles = () => {
    switch (dueDateStatus) {
      case "overdue":
        return "text-error bg-error/20 border-error/30";
      case "today":
        return "text-warning bg-warning/20 border-warning/30";
      case "upcoming":
        return "text-info bg-info/20 border-info/30";
      default:
        return "text-slate-400 bg-slate-700/50 border-slate-600/50";
    }
  };

  const handleToggleComplete = async () => {
    try {
      await onToggleComplete(task.Id);
    } catch (error) {
      console.error("Failed to toggle task completion:", error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setIsDeleting(true);
      try {
        await onDelete(task.Id);
      } catch (error) {
        console.error("Failed to delete task:", error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const handleUpdate = async (updatedData) => {
    try {
      await onUpdate(task.Id, updatedData);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  if (isEditing) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-effect rounded-xl p-6 border border-primary/30"
      >
        <TaskForm
          initialData={task}
          onSubmit={handleUpdate}
          onCancel={() => setIsEditing(false)}
        />
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className={`glass-effect rounded-xl p-4 transition-all duration-300 hover:shadow-glass ${
        task.completed ? "opacity-75" : ""
      }`}
    >
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 mt-1">
          <Checkbox
            checked={task.completed}
            onChange={handleToggleComplete}
            className={task.completed ? "completion-animation" : ""}
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className={`font-medium text-slate-200 ${
                task.completed ? "line-through text-slate-400" : ""
              }`}>
                {task.title}
              </h3>
              
              <div className="flex items-center space-x-3 mt-2">
                {category && (
                  <div className="flex items-center space-x-1">
                    <ApperIcon 
                      name={category.icon} 
                      size={14} 
                      className="text-slate-400"
                      style={{ color: category.color }}
                    />
                    <span className="text-xs text-slate-400">{category.name}</span>
                  </div>
                )}
                
                <PriorityBadge priority={task.priority} size="sm" />
                
                {task.dueDate && (
                  <div className={`px-2 py-1 rounded-full text-xs border ${getDueDateStyles()}`}>
                    <ApperIcon name="Calendar" size={12} className="inline mr-1" />
                    {format(new Date(task.dueDate), "MMM dd")}
                    {dueDateStatus === "overdue" && " (Overdue)"}
                    {dueDateStatus === "today" && " (Today)"}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2 ml-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ApperIcon name="Edit2" size={14} />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDelete}
                disabled={isDeleting}
                className="opacity-0 group-hover:opacity-100 transition-opacity text-error hover:text-error"
              >
                {isDeleting ? (
                  <ApperIcon name="Loader2" size={14} className="animate-spin" />
                ) : (
                  <ApperIcon name="Trash2" size={14} />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskItem;