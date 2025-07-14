import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import TaskList from "@/components/organisms/TaskList";
import TaskModal from "@/components/molecules/TaskModal";
import { useTasks } from "@/hooks/useTasks";
import { useCategories } from "@/hooks/useCategories";

const TaskDashboard = () => {
  const { categoryId } = useParams();
  const { categories } = useCategories();
  const {
    tasks,
    loading,
    error,
    addTask,
    updateTask,
    deleteTask,
    toggleComplete,
    refetch
  } = useTasks(categoryId ? parseInt(categoryId) : null);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Listen for add task events from header
  useEffect(() => {
    const handleAddTask = () => {
      setIsAddModalOpen(true);
    };

    window.addEventListener('addTask', handleAddTask);
    return () => window.removeEventListener('addTask', handleAddTask);
  }, []);

  const handleAddTask = async (taskData) => {
    try {
      await addTask(taskData);
      setIsAddModalOpen(false);
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  };

  const category = categories.find(cat => cat.Id === parseInt(categoryId));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto"
    >
      <TaskList
        tasks={tasks}
        loading={loading}
        error={error}
        onToggleComplete={toggleComplete}
        onDeleteTask={deleteTask}
        onUpdateTask={updateTask}
        onAddTask={() => setIsAddModalOpen(true)}
        onRefresh={refetch}
      />

      <TaskModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddTask}
      />
    </motion.div>
  );
};

export default TaskDashboard;