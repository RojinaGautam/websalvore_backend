import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import DashboardPage from './DashboardPage';
import MenuPage from './MenuPage';
import TeamPage from './TeamPage';


const AdminDashboard = () => (
  <AdminLayout>
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="menu" element={<MenuPage />} />
      <Route path="team" element={<TeamPage />} />
      {/* Add more admin subpages here as needed */}
    </Routes>
  </AdminLayout>
);

export default AdminDashboard;