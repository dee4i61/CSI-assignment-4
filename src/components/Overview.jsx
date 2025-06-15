import { useTheme } from "../context/ThemeContext";
import React, { useState, useEffect } from "react";
import { 
 LineChart, Line, PieChart, Pie,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { 
  Calendar as CalendarIcon,
  Users, TrendingUp, DollarSign, ShoppingCart
} from 'lucide-react';
import StatsCard from "./StatsCard";

const Overview = () => {
  const { isDark } = useTheme();
  const [salesData, setSalesData] = useState(() => {
    const savedSales = localStorage.getItem('salesData');
    return savedSales ? JSON.parse(savedSales) : [];
  });
  const [revenueDistribution, setRevenueDistribution] = useState(() => {
    const savedRevenue = localStorage.getItem('revenueDistribution');
    return savedRevenue ? JSON.parse(savedRevenue) : [];
  });
  const [stats, setStats] = useState(() => {
    const savedStats = localStorage.getItem('overviewStats');
    return savedStats ? JSON.parse(savedStats) : {
      totalUsers: 0,
      revenue: 0,
      orders: 0,
      growth: 0
    };
  });

  useEffect(() => {
    localStorage.setItem('salesData', JSON.stringify(salesData));
  }, [salesData]);

  useEffect(() => {
    localStorage.setItem('revenueDistribution', JSON.stringify(revenueDistribution));
  }, [revenueDistribution]);

  useEffect(() => {
    localStorage.setItem('overviewStats', JSON.stringify(stats));
  }, [stats]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard title="Total Users" value={stats.totalUsers} icon={Users} change="+0%" />
        <StatsCard title="Revenue" value={`$${stats.revenue}`} icon={DollarSign} change="+0%" />
        <StatsCard title="Orders" value={stats.orders} icon={ShoppingCart} change="+0%" />
        <StatsCard title="Growth" value={`${stats.growth}%`} icon={TrendingUp} change="+0%" />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-sm border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Sales Trend</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#e5e7eb'} />
              <XAxis stroke={isDark ? '#9ca3af' : '#6b7280'} />
              <YAxis stroke={isDark ? '#9ca3af' : '#6b7280'} />
              <Tooltip contentStyle={{ backgroundColor: isDark ? '#1f2937' : '#fff', border: isDark ? '1px solid #374151' : '1px solid #e5e7eb' }} />
              <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
          <p className={`text-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} mt-4`}>
            {salesData.length === 0 ? 'No data available' : 'Sales data loaded'}
          </p>
        </div>
        
        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-sm border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Revenue Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={revenueDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <p className={`text-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} mt-4`}>
            {revenueDistribution.length === 0 ? 'No data available' : 'Revenue distribution loaded'}
          </p>
        </div>
      </div>
    </div>
  );
};
export default Overview;