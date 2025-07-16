import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  TrendingUp, ShoppingCart, Utensils, Users, BarChart, Settings
} from 'lucide-react';

const sidebarItems = [
  { id: 'overview', label: 'Overview', icon: TrendingUp, to: '/admin' },
  { id: 'menu', label: 'Menu Management', icon: Utensils, to: '/admin/menu' },
  { id: 'team', label: 'Team & Management', icon: Users, to: '/admin/team' },
  // Add more items as needed
];

const Sidebar = () => {
  const location = useLocation();
  return (
    <div className="w-64 bg-white shadow-lg h-full">
      <div className="p-6 border-b">
        <h1 className="text-xl font-bold text-gray-800">Restaurant Admin</h1>
      </div>
      <nav className="mt-6">
        {sidebarItems.map((item) => {
          const isActive = location.pathname === item.to || (item.to === '/admin' && location.pathname === '/admin/');
          return (
            <Link
              key={item.id}
              to={item.to}
              className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-50 transition-colors rounded-lg mb-1 ${
                isActive ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : 'text-gray-700'
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
