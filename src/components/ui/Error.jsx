import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Error = ({ message, onRetry, type = "general" }) => {
  const getErrorIcon = () => {
    switch (type) {
      case "network":
        return "WifiOff";
      case "tasks":
        return "AlertTriangle";
      case "categories":
        return "FolderX";
      default:
        return "AlertCircle";
    }
  };

  const getErrorTitle = () => {
    switch (type) {
      case "network":
        return "Connection Problem";
      case "tasks":
        return "Task Loading Error";
      case "categories":
        return "Category Loading Error";
      default:
        return "Something went wrong";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center p-8 text-center"
    >
      <div className="w-16 h-16 bg-gradient-to-br from-error to-red-600 rounded-full flex items-center justify-center mb-4 shadow-elevation">
        <ApperIcon name={getErrorIcon()} size={32} className="text-white" />
      </div>
      
      <h3 className="text-xl font-semibold text-slate-200 mb-2 font-display">
        {getErrorTitle()}
      </h3>
      
      <p className="text-slate-400 mb-6 max-w-md">
        {message || "We encountered an error while loading your data. Please try again."}
      </p>
      
      {onRetry && (
        <Button
          onClick={onRetry}
          variant="primary"
          size="lg"
          className="min-w-32"
        >
          <ApperIcon name="RefreshCw" size={16} className="mr-2" />
          Try Again
        </Button>
      )}
    </motion.div>
  );
};

export default Error;