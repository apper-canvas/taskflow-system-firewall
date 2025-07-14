import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TaskItem from "@/components/molecules/TaskItem";
import TaskStats from "@/components/molecules/TaskStats";
import SearchBar from "@/components/molecules/SearchBar";
import Button from "@/components/atoms/Button";
import Empty from "@/components/ui/Empty";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import ApperIcon from "@/components/ApperIcon";

const TaskList = ({ 
  tasks, 
  loading, 
  error, 
  onToggleComplete, 
  onDeleteTask, 
  onUpdateTask, 
  onAddTask, 
  onRefresh 
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [showCompleted, setShowCompleted] = useState(true);

  const filteredAndSortedTasks = useMemo(() => {
    let filtered = tasks;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by completion status
    if (!showCompleted) {
      filtered = filtered.filter(task => !task.completed);
    }

    // Sort tasks
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "priority":
          return b.priority - a.priority;
        case "dueDate":
          if (!a.dueDate && !b.dueDate) return 0;
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate) - new Date(b.dueDate);
        case "title":
          return a.title.localeCompare(b.title);
        case "createdAt":
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });
  }, [tasks, searchTerm, sortBy, showCompleted]);

  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData("text/plain", taskId);
    e.target.classList.add("dragging");
  };

  const handleDragEnd = (e) => {
    e.target.classList.remove("dragging");
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetPriority) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("text/plain");
    const task = tasks.find(t => t.Id === parseInt(taskId));
    
    if (task && task.priority !== targetPriority) {
      onUpdateTask(task.Id, { priority: targetPriority });
    }
  };

  if (loading) return <Loading type="tasks" />;
  if (error) return <Error message={error} onRetry={onRefresh} type="tasks" />;

  return (
    <div className="space-y-6">
      <TaskStats tasks={tasks} />
      
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <SearchBar onSearch={setSearchTerm} placeholder="Search tasks..." />
        
        <div className="flex items-center gap-3">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 bg-surface border border-slate-600 rounded-lg text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          >
            <option value="createdAt">Sort by Date</option>
            <option value="priority">Sort by Priority</option>
            <option value="dueDate">Sort by Due Date</option>
            <option value="title">Sort by Title</option>
          </select>
          
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setShowCompleted(!showCompleted)}
          >
            <ApperIcon name={showCompleted ? "EyeOff" : "Eye"} size={16} className="mr-1" />
            {showCompleted ? "Hide" : "Show"} Completed
          </Button>
          
          <Button
            variant="primary"
            size="sm"
            onClick={onAddTask}
          >
            <ApperIcon name="Plus" size={16} className="mr-1" />
            Add Task
          </Button>
        </div>
      </div>

      {filteredAndSortedTasks.length === 0 ? (
        <Empty 
          type={searchTerm ? "search" : "tasks"} 
          onAction={searchTerm ? () => setSearchTerm("") : onAddTask}
          actionText={searchTerm ? "Clear Search" : "Add Task"}
        />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredAndSortedTasks.map((task, index) => (
              <motion.div
                key={task.Id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
                draggable
                onDragStart={(e) => handleDragStart(e, task.Id)}
                onDragEnd={handleDragEnd}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, task.priority)}
              >
                <TaskItem
                  task={task}
                  onToggleComplete={onToggleComplete}
                  onDelete={onDeleteTask}
                  onUpdate={onUpdateTask}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
};

export default TaskList;