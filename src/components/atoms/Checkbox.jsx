import { forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Checkbox = forwardRef(({
  className,
  checked = false,
  onChange,
  label,
  disabled = false,
  ...props
}, ref) => {
  return (
    <div className="flex items-center space-x-2">
      <div className="relative">
        <input
          ref={ref}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="sr-only"
          {...props}
        />
        <motion.div
          className={cn(
            "w-5 h-5 rounded border-2 flex items-center justify-center cursor-pointer transition-all duration-200",
            checked 
              ? "bg-gradient-to-r from-success to-green-600 border-success" 
              : "border-slate-500 bg-surface hover:border-slate-400",
            disabled && "opacity-50 cursor-not-allowed",
            className
          )}
          onClick={() => !disabled && onChange?.({ target: { checked: !checked } })}
          whileHover={{ scale: disabled ? 1 : 1.05 }}
          whileTap={{ scale: disabled ? 1 : 0.95 }}
        >
          {checked && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <ApperIcon name="Check" size={12} className="text-white" />
            </motion.div>
          )}
        </motion.div>
      </div>
      {label && (
        <label 
          className={cn(
            "text-sm text-slate-300 cursor-pointer select-none",
            disabled && "opacity-50 cursor-not-allowed"
          )}
          onClick={() => !disabled && onChange?.({ target: { checked: !checked } })}
        >
          {label}
        </label>
      )}
    </div>
  );
});

Checkbox.displayName = "Checkbox";

export default Checkbox;