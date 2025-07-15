import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import ApperIcon from "@/components/ApperIcon";

const CategoryModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    color: "#6366F1",
    icon: "Folder"
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const availableIcons = [
    "Folder", "FolderOpen", "Briefcase", "Home", "User", "Users",
    "Calendar", "Clock", "Star", "Heart", "Bookmark", "Tag",
    "Target", "Trophy", "Zap", "Coffee", "ShoppingCart", "Car",
    "Gamepad2", "Music", "Camera", "Book", "Palette", "Code"
  ];

  const availableColors = [
    "#6366F1", "#8B5CF6", "#EC4899", "#EF4444", "#F59E0B",
    "#10B981", "#06B6D4", "#3B82F6", "#6366F1", "#8B5CF6",
    "#84CC16", "#F97316", "#EF4444", "#EC4899", "#A855F7",
    "#059669", "#0891B2", "#2563EB", "#7C3AED", "#BE185D"
  ];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Category name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Category name must be at least 2 characters";
    } else if (formData.name.trim().length > 50) {
      newErrors.name = "Category name must be less than 50 characters";
    }

    if (!formData.color) {
      newErrors.color = "Please select a color";
    }

    if (!formData.icon) {
      newErrors.icon = "Please select an icon";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await onSubmit({
        name: formData.name.trim(),
        color: formData.color,
        icon: formData.icon
      });
      
      // Reset form after successful submission
      setFormData({
        name: "",
        color: "#6366F1",
        icon: "Folder"
      });
      setErrors({});
    } catch (error) {
      console.error("Failed to create category:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setFormData({
        name: "",
        color: "#6366F1",
        icon: "Folder"
      });
      setErrors({});
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              onClick={handleClose}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-surface/95 backdrop-blur-sm rounded-lg border border-slate-700/50 shadow-elevation"
            >
              <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <ApperIcon name="FolderPlus" size={20} className="text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-slate-100">
                      Create Category
                    </h2>
                    <p className="text-sm text-slate-400">
                      Add a new category to organize your tasks
                    </p>
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClose}
                  disabled={isSubmitting}
                  className="text-slate-400 hover:text-slate-200"
                >
                  <ApperIcon name="X" size={20} />
                </Button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    Category Name
                  </label>
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter category name..."
                    className={`w-full ${errors.name ? 'border-red-500' : ''}`}
                    disabled={isSubmitting}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    Color
                  </label>
                  <div className="grid grid-cols-10 gap-2">
                    {availableColors.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, color }))}
                        className={`w-8 h-8 rounded-lg border-2 transition-all ${
                          formData.color === color
                            ? 'border-white scale-110'
                            : 'border-transparent hover:border-slate-400'
                        }`}
                        style={{ backgroundColor: color }}
                        disabled={isSubmitting}
                      />
                    ))}
                  </div>
                  {errors.color && (
                    <p className="mt-1 text-sm text-red-400">{errors.color}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    Icon
                  </label>
                  <div className="grid grid-cols-8 gap-2 max-h-40 overflow-y-auto">
                    {availableIcons.map((icon) => (
                      <button
                        key={icon}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, icon }))}
                        className={`w-10 h-10 rounded-lg border-2 flex items-center justify-center transition-all ${
                          formData.icon === icon
                            ? 'border-primary bg-primary/20 text-primary'
                            : 'border-slate-600 hover:border-slate-400 text-slate-400 hover:text-slate-200'
                        }`}
                        disabled={isSubmitting}
                      >
                        <ApperIcon name={icon} size={18} />
                      </button>
                    ))}
                  </div>
                  {errors.icon && (
                    <p className="mt-1 text-sm text-red-400">{errors.icon}</p>
                  )}
                </div>

                <div className="flex items-center space-x-3 pt-4">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={handleClose}
                    disabled={isSubmitting}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isSubmitting}
                    className="flex-1"
                  >
                    {isSubmitting ? (
                      <>
                        <ApperIcon name="Loader2" size={16} className="mr-2 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      <>
                        <ApperIcon name="Plus" size={16} className="mr-2" />
                        Create Category
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CategoryModal;