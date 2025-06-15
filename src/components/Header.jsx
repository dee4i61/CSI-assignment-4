import { useTheme } from "../context/ThemeContext";
import React from "react";
import { 
  Moon, Sun, Calendar as CalendarIcon,
} from 'lucide-react';

const Header = () => {
  const { isDark, toggleTheme } = useTheme();
  
  return (
    <header className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b px-6 py-4 flex justify-between items-center`}>
      <div>
        <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Dashboard
        </h2>
      </div>
      
      <button
        onClick={toggleTheme}
        className={`p-2 rounded-lg ${isDark ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'} transition-colors`}
      >
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </header>
  );
};
export default Header;