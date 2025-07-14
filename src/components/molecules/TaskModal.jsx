import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TaskForm from "@/components/molecules/TaskForm";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const TaskModal = ({ isOpen, onClose, onSubmit, initialData = null }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (taskData) => {
    setIsSubmitting(true);
    try {
      await onSubmit(taskData);
      onClose();
    } catch (error) {
      console.error("Failed to submit task:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md glass-effect rounded-2xl p-6 shadow-elevation"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-200 font-display">
              {initialData ? "Edit Task" : "Add New Task"}
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              disabled={isSubmitting}
            >
              <ApperIcon name="X" size={20} />
            </Button>
          </div>

          <TaskForm
            initialData={initialData}
            onSubmit={handleSubmit}
            onCancel={onClose}
          />
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default TaskModal;