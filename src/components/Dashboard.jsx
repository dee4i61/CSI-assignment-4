import React, { useState, createContext, useContext } from 'react';

import  { useTheme } from '../context/ThemeContext';
import Overview from './Overview';
import Sidebar from './Sidebar';
import Header from './Header';
import DataTables from './DataTables';
import Analytics from './Analytics';
import Calendar from './Calendar';
import KanbanBoard from './KanbanBoard';


const Dashboard = () => {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState('overview');
  
  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <Overview />;
      case 'tables':
        return <DataTables />;
      case 'analytics':
        return <Analytics />;
      case 'calendar':
        return <Calendar />;
      case 'kanban':
        return <KanbanBoard />;
      default:
        return <Overview />;
    }
  };
  
  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} flex`}>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
