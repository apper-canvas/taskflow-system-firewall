import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import TaskList from "@/components/organisms/TaskList";
import TaskModal from "@/components/molecules/TaskModal";
import CategoryModal from "@/components/molecules/CategoryModal";
import { useTasks } from "@/hooks/useTasks";
import { useCategories } from "@/hooks/useCategories";

const TaskDashboard = () => {
  const { categoryId } = useParams();
const categories = useCategories();
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
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  // Listen for add task and add category events from header
  useEffect(() => {
    const handleAddTask = () => {
      setIsAddModalOpen(true);
    };

    const handleAddCategory = () => {
      setIsCategoryModalOpen(true);
    };

    window.addEventListener('addTask', handleAddTask);
    window.addEventListener('addCategory', handleAddCategory);
    return () => {
      window.removeEventListener('addTask', handleAddTask);
      window.removeEventListener('addCategory', handleAddCategory);
    };
  }, []);

const handleAddTask = async (taskData) => {
    try {
      await addTask(taskData);
      setIsAddModalOpen(false);
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  };

  const handleAddCategory = async (categoryData) => {
    try {
      await categories.addCategory(categoryData);
      setIsCategoryModalOpen(false);
    } catch (error) {
      console.error("Failed to add category:", error);
    }
  };

const category = categories.categories.find(cat => cat.Id === parseInt(categoryId));

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

      <CategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        onSubmit={handleAddCategory}
      />
    </motion.div>
  );
};

export default TaskDashboard;