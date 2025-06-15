import { useTheme } from "../context/ThemeContext";
import React from "react";
const StatsCard = ({ title, value, icon: Icon, change }) => {
  const { isDark } = useTheme();
  
  return (
    <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-sm border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{title}</p>
          <p className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{value}</p>
          <p className="text-sm text-green-600">{change}</p>
        </div>
        <Icon className={`w-8 h-8 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
      </div>
    </div>
  );
};

export default StatsCard;