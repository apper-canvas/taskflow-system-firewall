import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { useCategories } from "@/hooks/useCategories";

const Header = ({ onToggleSidebar, onAddTask }) => {
  const { categoryId } = useParams();
  const { categories } = useCategories();
  const [currentTime, setCurrentTime] = useState(new Date());

  const category = categories.find(cat => cat.Id === parseInt(categoryId));

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const getPageTitle = () => {
    if (category) {
      return `${category.name} Tasks`;
    }
    return "All Tasks";
  };

  const getPageDescription = () => {
    if (category) {
      return `Manage your ${category.name.toLowerCase()} tasks efficiently`;
    }
    return "Stay organized and productive with your task management";
  };

  // Update time every minute
  React.useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-surface/50 backdrop-blur-sm border-b border-slate-700/50 sticky top-0 z-30"
    >
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleSidebar}
              className="lg:hidden"
            >
              <ApperIcon name="Menu" size={20} />
            </Button>
            
            <div>
              <div className="flex items-center space-x-3">
                {category && (
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                       style={{ backgroundColor: category.color + "20" }}>
                    <ApperIcon 
                      name={category.icon} 
                      size={18} 
                      style={{ color: category.color }}
                    />
                  </div>
                )}
                <h1 className="text-2xl font-bold text-slate-200 font-display">
                  {getPageTitle()}
                </h1>
              </div>
              <p className="text-sm text-slate-400 mt-1">
                {getPageDescription()}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden sm:block text-right">
              <p className="text-sm text-slate-400">{getGreeting()}</p>
              <p className="text-xs text-slate-500">
                {currentTime.toLocaleDateString(undefined, {
                  weekday: 'long',
                  month: 'short',
                  day: 'numeric'
                })}
              </p>
            </div>
            
            <Button
              variant="primary"
              onClick={onAddTask}
              className="shadow-elevation"
            >
              <ApperIcon name="Plus" size={16} className="mr-2" />
              <span className="hidden sm:inline">Add Task</span>
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;