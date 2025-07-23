import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  TrendingUp, ShoppingCart, Utensils, Users, BarChart, Settings, LogOut
} from 'lucide-react';
import { AuthContext } from '../src/components/AuthContext';

const sidebarItems = [
  { id: 'overview', label: 'Overview', icon: TrendingUp, to: '/admin' },
  { id: 'orders', label: 'Orders', icon: ShoppingCart, to: '/admin/orders' }, 
  { id: 'menu', label: 'Menu Management', icon: Utensils, to: '/admin/menu' },
  { id: 'team', label: 'Team & Management', icon: Users, to: '/admin/team' },
  { id: 'settings', label: 'Settings', icon: Settings, to: '/admin/settings' }, 
  { id: 'contact', label: 'Contact', icon: BarChart, to: '/admin/contact' },  
];

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="w-64 h-full shadow-lg" style={{ backgroundColor: '#D13B24' }}>
      <div className="p-6 border-b">
        <h1 className="text-xl font-bold text-white">Restaurant Admin</h1>
      </div>
      <nav className="mt-6">
        {sidebarItems.map((item) => {
          const isActive = location.pathname === item.to || (item.to === '/admin' && location.pathname === '/admin/');
          return (
            <Link
              key={item.id}
              to={item.to}
              className={`w-full flex items-center px-6 py-3 text-left transition-colors rounded-lg mb-10 last:mb-0 ${
                isActive ? 'bg-yellow-400 text-yellow-900 border-r-2 border-yellow-400' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <item.icon className={`w-5 h-5 mr-3 font-bold ${isActive ? 'text-yellow-900' : 'text-white'}`} />
              <span className={`font-bold ${isActive ? 'text-yellow-900' : 'text-white'}`}>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <button
        className="w-full flex items-center px-6 py-3 text-left text-red-600 hover:bg-red-50 transition-colors rounded-lg mt-auto mb-6"
        onClick={handleLogout}
      >
        <LogOut className="w-5 h-5 mr-3 text-white" />
        <span className="font-bold text-white">Logout</span>
      </button>
    </div>
  );
};

export default Sidebar;
