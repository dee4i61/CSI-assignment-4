import React from "react";
import { useTheme } from "../context/ThemeContext";
import { 
  BarChart
} from 'recharts';
import { 
  Calendar as CalendarIcon,
  Users, TrendingUp, ShoppingCart
} from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const { isDark } = useTheme();
  
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'tables', label: 'Data Tables', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart },
    { id: 'calendar', label: 'Calendar', icon: CalendarIcon },
    { id: 'kanban', label: 'Kanban Board', icon: ShoppingCart }
  ];
  
  return (
    <div className={`w-64 h-screen ${isDark ? 'bg-gray-800' : 'bg-white'} border-r ${isDark ? 'border-gray-700' : 'border-gray-200'} flex flex-col`}>
      <div className="p-6">
        <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Admin Panel
        </h1>
      </div>
      
      <nav className="flex-1 px-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center px-4 py-3 mb-2 rounded-lg transition-colors ${
                isActive 
                  ? (isDark ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600')
                  : (isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-50')
              }`}
            >
              <Icon size={20} className="mr-3" />
              {item.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;