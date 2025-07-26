import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import DashboardPage from './DashboardPage';
import MenuPage from './MenuPage';
import TeamPage from './TeamPage';
import SettingPage from './SettingPage';
import ContactPage from './ContactPage';
import OrderPage from './OrderPage';
import ReservationPage from './ReservationPage';



const AdminDashboard = () => (
  <AdminLayout>
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="menu" element={<MenuPage />} />
      <Route path="team" element={<TeamPage />} />
      <Route path="settings" element={<SettingPage />} />
      <Route path="contact" element={<ContactPage />} />
      <Route path="orders" element={<OrderPage />} />
      <Route path="reservations" element={<ReservationPage />} />
      {/* Add more admin subpages here as needed */}
    </Routes>
  </AdminLayout>
);

export default AdminDashboard;