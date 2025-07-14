import { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { useCategories } from "@/hooks/useCategories";
import { useTasks } from "@/hooks/useTasks";

const Sidebar = ({ isOpen, onClose }) => {
  const { categoryId } = useParams();
  const { categories, loading: categoriesLoading, error: categoriesError } = useCategories();
  const { tasks } = useTasks();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const getTaskCountByCategory = (catId) => {
    return tasks.filter(task => task.categoryId === catId && !task.completed).length;
  };

  const totalTasks = tasks.filter(task => !task.completed).length;
  const completedTasks = tasks.filter(task => task.completed).length;

  const SidebarContent = () => (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-slate-700/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
              <ApperIcon name="CheckSquare" size={24} className="text-white" />
            </div>
            {!isCollapsed && (
              <div>
                <h1 className="text-xl font-bold text-slate-200 font-display gradient-text">
                  TaskFlow
                </h1>
                <p className="text-xs text-slate-400">Productivity Manager</p>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex"
          >
            <ApperIcon name={isCollapsed ? "ChevronRight" : "ChevronLeft"} size={16} />
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      {!isCollapsed && (
        <div className="p-6 border-b border-slate-700/50">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Active Tasks</span>
              <span className="text-xl font-bold text-slate-200">{totalTasks}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Completed</span>
              <span className="text-lg font-semibold text-success">{completedTasks}</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-300"
                style={{ 
                  width: `${totalTasks + completedTasks > 0 ? (completedTasks / (totalTasks + completedTasks)) * 100 : 0}%` 
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto">
        <nav className="p-4 space-y-2">
          {/* All Tasks */}
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                isActive && !categoryId
                  ? "bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border border-primary/30"
                  : "text-slate-300 hover:bg-slate-800/50 hover:text-slate-200"
              }`
            }
          >
            <ApperIcon name="Home" size={20} />
            {!isCollapsed && (
              <>
                <span className="font-medium">All Tasks</span>
                <span className="ml-auto text-xs bg-slate-700 px-2 py-1 rounded-full">
                  {totalTasks}
                </span>
              </>
            )}
          </NavLink>

          {/* Categories */}
          <div className="pt-4">
            {!isCollapsed && (
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">
                Categories
              </h3>
            )}
            
            {categoriesLoading ? (
              <Loading type="categories" />
            ) : categoriesError ? (
              <Error message={categoriesError} type="categories" />
            ) : (
              <div className="space-y-1">
                {categories.map((category) => {
                  const taskCount = getTaskCountByCategory(category.Id);
                  const isActive = categoryId === category.Id.toString();
                  
                  return (
                    <NavLink
                      key={category.Id}
                      to={`/category/${category.Id}`}
                      className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                        isActive
                          ? "bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border border-primary/30"
                          : "text-slate-300 hover:bg-slate-800/50 hover:text-slate-200"
                      }`}
                    >
                      <ApperIcon 
                        name={category.icon} 
                        size={20} 
                        style={{ color: isActive ? undefined : category.color }}
                      />
                      {!isCollapsed && (
                        <>
                          <span className="font-medium">{category.name}</span>
                          <span className="ml-auto text-xs bg-slate-700 px-2 py-1 rounded-full">
                            {taskCount}
                          </span>
                        </>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={`hidden lg:flex flex-col bg-surface border-r border-slate-700/50 transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      }`}>
        <SidebarContent />
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              onClick={onClose}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed left-0 top-0 bottom-0 w-80 bg-surface border-r border-slate-700/50 z-50 lg:hidden"
            >
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;