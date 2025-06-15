import React from "react";
import { 
  Plus, Calendar as CalendarIcon,
  Trash2, 
} from 'lucide-react';
import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

const KanbanBoard = () => {
  const { isDark } = useTheme();
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('kanbanTasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '', status: 'todo' });
  
  useEffect(() => {
    localStorage.setItem('kanbanTasks', JSON.stringify(tasks));
  }, [tasks]);
  
  const columns = [
    { id: 'todo', title: 'To Do', color: 'bg-gray-500' },
    { id: 'progress', title: 'In Progress', color: 'bg-blue-500' },
    { id: 'review', title: 'In Review', color: 'bg-yellow-500' },
    { id: 'completed', title: 'Completed', color: 'bg-green-500' }
  ];
  
  const addTask = () => {
    if (newTask.title && newTask.description) {
      setTasks([...tasks, { 
        id: Date.now(), 
        ...newTask 
      }]);
      setNewTask({ title: '', description: '', status: 'todo' });
      setShowAddTask(false);
    }
  };
  
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };
  
  const moveTask = (taskId, newStatus) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Kanban Board</h3>
        <button
          onClick={() => setShowAddTask(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
        >
          <Plus size={16} className="mr-2" />
          Add Task
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {columns.map((column) => (
          <div key={column.id} className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-sm border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className={`p-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full ${column.color} mr-2`}></div>
                <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{column.title}</h4>
                <span className={`ml-2 px-2 py-1 text-xs rounded-full ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                  {tasks.filter(task => task.status === column.id).length}
                </span>
              </div>
            </div>
            
            <div className="p-4 space-y-3 min-h-[200px]">
              {tasks.filter(task => task.status === column.id).map((task) => (
                <div key={task.id} className={`p-3 border rounded-lg ${isDark ? 'border-gray-600 bg-gray-700' : 'border-gray-200 bg-gray-50'} group`}>
                  <div className="flex justify-between items-start mb-2">
                    <h5 className={`font-medium text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>{task.title}</h5>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className={`opacity-0 group-hover:opacity-100 p-1 rounded ${isDark ? 'text-red-400 hover:bg-gray-600' : 'text-red-600 hover:bg-red-50'} transition-opacity`}
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'} mb-3`}>{task.description}</p>
                  <div className="flex space-x-1">
                    {columns.map((col) => (
                      <button
                        key={col.id}
                        onClick={() => moveTask(task.id, col.id)}
                        className={`px-2 py-1 text-xs rounded ${
                          task.status === col.id 
                            ? `${col.color} text-white` 
                            : (isDark ? 'bg-gray-600 text-gray-300 hover:bg-gray-500' : 'bg-gray-200 text-gray-600 hover:bg-gray-300')
                        } transition-colors`}
                        disabled={task.status === col.id}
                      >
                        {col.title}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              
              {tasks.filter(task => task.status === column.id).length === 0 && (
                <div className={`text-center py-8 ${isDark ? 'text-gray-400' : 'text-gray-500'} text-sm`}>
                  No tasks in {column.title.toLowerCase()}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {/* Add Task Modal */}
      {showAddTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-xl w-96`}>
            <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Add New Task</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Task Title"
                value={newTask.title}
                onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                className={`w-full p-3 border rounded-lg ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
              />
              <textarea
                placeholder="Task Description"
                value={newTask.description}
                onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                className={`w-full p-3 border rounded-lg h-20 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
              />
              <select
                value={newTask.status}
                onChange={(e) => setNewTask({...newTask, status: e.target.value})}
                className={`w-full p-3 border rounded-lg ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
              >
                {columns.map((column) => (
                  <option key={column.id} value={column.id}>{column.title}</option>
                ))}
              </select>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddTask(false)}
                className={`px-4 py-2 rounded-lg ${isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
              >
                Cancel
              </button>
              <button
                onClick={addTask}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default KanbanBoard;