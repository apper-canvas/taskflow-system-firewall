import { motion } from "framer-motion";

const Loading = ({ type = "tasks" }) => {
  const renderTaskSkeleton = () => (
    <div className="space-y-4">
      {[...Array(6)].map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="glass-effect rounded-xl p-4 space-y-3"
        >
          <div className="flex items-center space-x-3">
            <div className="w-5 h-5 bg-gradient-to-r from-slate-600 to-slate-500 rounded animate-pulse"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gradient-to-r from-slate-600 to-slate-500 rounded animate-pulse"></div>
              <div className="h-3 bg-gradient-to-r from-slate-700 to-slate-600 rounded animate-pulse w-2/3"></div>
            </div>
            <div className="w-16 h-6 bg-gradient-to-r from-slate-600 to-slate-500 rounded-full animate-pulse"></div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const renderCategorySkeleton = () => (
    <div className="space-y-3">
      {[...Array(5)].map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center space-x-3 p-3 rounded-lg"
        >
          <div className="w-5 h-5 bg-gradient-to-r from-slate-600 to-slate-500 rounded animate-pulse"></div>
          <div className="flex-1 h-4 bg-gradient-to-r from-slate-600 to-slate-500 rounded animate-pulse"></div>
          <div className="w-6 h-6 bg-gradient-to-r from-slate-600 to-slate-500 rounded-full animate-pulse"></div>
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className="animate-pulse">
      {type === "tasks" && renderTaskSkeleton()}
      {type === "categories" && renderCategorySkeleton()}
      {type === "dashboard" && (
        <div className="space-y-6">
          <div className="h-8 bg-gradient-to-r from-slate-600 to-slate-500 rounded animate-pulse w-1/3"></div>
          {renderTaskSkeleton()}
        </div>
      )}
    </div>
  );
};

export default Loading;