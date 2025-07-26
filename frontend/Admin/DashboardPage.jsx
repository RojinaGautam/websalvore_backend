import React, { useState, useEffect } from 'react';
import backgroundImg from '../src/assets/background.jpg';
import {
  DollarSign, ShoppingCart, Users, Star
} from 'lucide-react';
import {
  AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line
} from 'recharts';

const StatsCard = ({ title, value, change, icon: Icon, color }) => (
  <div className="bg-white rounded-xl shadow-md p-6 flex items-center justify-between">
    <div>
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className={`text-sm ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
        {change >= 0 ? '+' : ''}{change}% from last month
      </p>
    </div>
    <div className={`p-3 rounded-full ${color} flex items-center justify-center`}>
      <Icon className="w-6 h-6 text-white" />
    </div>
  </div>
);

const DashboardPage = () => {
  const [dashboardData, setDashboardData] = useState({
    totalRevenue: 0,
    ordersToday: 0,
    totalCustomers: 0,
    averageRating: 0,
    revenueChange: 0,
    recentOrders: [],
    monthlyData: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:4000/api/orders/dashboard/stats', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch dashboard data');
      }

      const result = await response.json();
      if (result.success) {
        setDashboardData(result.data);
      } else {
        throw new Error(result.error || 'Failed to fetch dashboard data');
      }
    } catch (err) {
      setError(err.message);
      console.error('Dashboard fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Format monthly data for charts
  const formatMonthlyData = (data) => {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return data.map(item => ({
      month: monthNames[new Date(item.month + '-01').getMonth()],
      sales: parseFloat(item.sales) || 0,
      orders: parseInt(item.orders) || 0
    }));
  };

  // Format recent orders for display
  const formatRecentOrders = (orders) => {
    return orders.map(order => ({
      id: `#${order.id.toString().padStart(3, '0')}`,
      customer: order.email || 'Guest',
      items: 1, // Simplified - you can add item count later
      total: parseFloat(order.total).toFixed(2),
      status: order.orderStatus,
      time: new Date(order.createdAt).toLocaleTimeString()
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 p-8 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={fetchDashboardData}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const chartData = formatMonthlyData(dashboardData.monthlyData);
  const recentOrdersData = formatRecentOrders(dashboardData.recentOrders);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Revenue"
          value={`$${dashboardData.totalRevenue.toLocaleString()}`}
          change={dashboardData.revenueChange}
          icon={DollarSign}
          color="bg-green-500"
        />
        <StatsCard
          title="Orders Today"
          value={dashboardData.ordersToday.toString()}
          change={8.2} // You can calculate this dynamically if needed
          icon={ShoppingCart}
          color="bg-blue-500"
        />
        <StatsCard
          title="Active Customers"
          value={dashboardData.totalCustomers.toLocaleString()}
          change={-2.1} // You can calculate this dynamically if needed
          icon={Users}
          color="bg-purple-500"
        />
        <StatsCard
          title="Average Rating"
          value={dashboardData.averageRating.toString()}
          change={0.3} // You can calculate this dynamically if needed
          icon={Star}
          color="bg-yellow-500"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Sales Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="sales" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Order Volume</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="orders" stroke="#10B981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
        <div className="space-y-4">
          {recentOrdersData.length > 0 ? (
            recentOrdersData.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="text-sm font-medium text-gray-900">{order.id}</div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{order.customer}</div>
                    <div className="text-sm text-gray-500">{order.items} items</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">${order.total}</div>
                  <div className={`text-xs px-2 py-1 rounded-full ${
                    order.status === 'D' ? 'bg-green-100 text-green-800' :
                    order.status === 'R' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {order.status === 'D' ? 'Delivered' : 
                     order.status === 'R' ? 'Ready' : 
                     order.status === 'P' ? 'Pending' : order.status}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              No recent orders
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage; 