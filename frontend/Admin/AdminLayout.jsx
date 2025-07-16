import React from 'react';
import Sidebar from './sidebar';

const AdminLayout = ({ children }) => (
  <div className="flex flex-col h-screen bg-gray-50">
    <div className="flex flex-1">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </div>
    </div>
  </div>
);

export default AdminLayout; 