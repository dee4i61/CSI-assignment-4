import React from 'react'
import Dashboard from './components/Dashboard';
import ThemeProvider from './context/ThemeContext';

const App = () => {
  return (
    <ThemeProvider>
      <Dashboard />
    </ThemeProvider>
  );  
};

export default App;