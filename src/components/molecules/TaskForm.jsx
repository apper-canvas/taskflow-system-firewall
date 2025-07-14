import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import Button from "@/components/atoms/Button";
import { useCategories } from "@/hooks/useCategories";
import ApperIcon from "@/components/ApperIcon";

const TaskForm = ({ onSubmit, onCancel, initialData = null }) => {
  const { categories } = useCategories();
  const [formData, setFormData] = useState({
    title: "",
    categoryId: "",
    dueDate: "",
    priority: 1
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        categoryId: initialData.categoryId || "",
        dueDate: initialData.dueDate || "",
        priority: initialData.priority || 1
      });
    }
  }, [initialData]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = "Task title is required";
    }
    
    if (!formData.categoryId) {
      newErrors.categoryId = "Category is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const taskData = {
        ...formData,
        categoryId: parseInt(formData.categoryId),
        priority: parseInt(formData.priority)
      };
      
      await onSubmit(taskData);
      
      // Reset form if not editing
      if (!initialData) {
        setFormData({
          title: "",
          categoryId: "",
          dueDate: "",
          priority: 1
        });
      }
    } catch (error) {
      console.error("Failed to submit task:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const priorityOptions = [
    { value: 1, label: "Low Priority" },
    { value: 2, label: "Medium Priority" },
    { value: 3, label: "High Priority" },
    { value: 4, label: "Very High Priority" },
    { value: 5, label: "Urgent" }
  ];

  const categoryOptions = categories.map(cat => ({
    value: cat.Id,
    label: cat.name
  }));

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <Input
        label="Task Title"
        placeholder="Enter task title..."
        value={formData.title}
        onChange={(e) => handleChange("title", e.target.value)}
        error={errors.title}
        required
      />

      <Select
        label="Category"
        value={formData.categoryId}
        onChange={(e) => handleChange("categoryId", e.target.value)}
        options={categoryOptions}
        placeholder="Select a category"
        error={errors.categoryId}
        required
      />

      <Input
        type="date"
        label="Due Date"
        value={formData.dueDate}
        onChange={(e) => handleChange("dueDate", e.target.value)}
        min={format(new Date(), "yyyy-MM-dd")}
      />

      <Select
        label="Priority"
        value={formData.priority}
        onChange={(e) => handleChange("priority", e.target.value)}
        options={priorityOptions}
      />

      <div className="flex space-x-3 pt-4">
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
          className="flex-1"
        >
          {isSubmitting ? (
            <>
              <ApperIcon name="Loader2" size={16} className="mr-2 animate-spin" />
              {initialData ? "Updating..." : "Creating..."}
            </>
          ) : (
            <>
              <ApperIcon name={initialData ? "Save" : "Plus"} size={16} className="mr-2" />
              {initialData ? "Update Task" : "Add Task"}
            </>
          )}
        </Button>
        
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
      </div>
    </motion.form>
  );
};

export default TaskForm;