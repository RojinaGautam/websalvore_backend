import React from 'react';
import backgroundImg from '../src/assets/background.jpg';
import {
  DollarSign, ShoppingCart, Users, Star
} from 'lucide-react';
import {
  AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line
} from 'recharts';

const salesData = [
  { month: 'Jan', sales: 65000, orders: 450 },
  { month: 'Feb', sales: 72000, orders: 520 },
  { month: 'Mar', sales: 68000, orders: 480 },
  { month: 'Apr', sales: 85000, orders: 620 },
  { month: 'May', sales: 92000, orders: 680 },
  { month: 'Jun', sales: 88000, orders: 640 }
];

const recentOrders = [
  { id: '#001', customer: 'John Doe', items: 3, total: 67.99, status: 'Completed', time: '2 min ago' },
  { id: '#002', customer: 'Jane Smith', items: 2, total: 45.99, status: 'Preparing', time: '5 min ago' },
  { id: '#003', customer: 'Bob Johnson', items: 4, total: 89.99, status: 'Ready', time: '8 min ago' },
  { id: '#004', customer: 'Alice Brown', items: 1, total: 28.99, status: 'Completed', time: '12 min ago' }
];

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

const DashboardPage = () => (
  <div
    className="min-h-screen bg-gray-100 p-8"
    style={{
      backgroundImage: `url(${backgroundImg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}
  >
    {/* Stats Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatsCard
        title="Total Revenue"
        value="$92,450"
        change={12.5}
        icon={DollarSign}
        color="bg-green-500"
      />
      <StatsCard
        title="Orders Today"
        value="156"
        change={8.2}
        icon={ShoppingCart}
        color="bg-blue-500"
      />
      <StatsCard
        title="Active Customers"
        value="2,847"
        change={-2.1}
        icon={Users}
        color="bg-purple-500"
      />
      <StatsCard
        title="Average Rating"
        value="4.8"
        change={0.3}
        icon={Star}
        color="bg-yellow-500"
      />
    </div>

    {/* Charts */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Sales Overview</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={salesData}>
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
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="orders" stroke="#10B981" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
);

export default DashboardPage; 