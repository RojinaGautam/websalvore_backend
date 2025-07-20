import React, { useState } from 'react';
import { Users, Plus, Edit, Trash2 } from 'lucide-react';

const TeamPage = () => {
  const [activeTab, setActiveTab] = useState('staff');

  // Sample staff data (used for staff directory and payroll)
  const [staff] = useState([
    {
      id: 1,
      name: 'John Smith',
      position: 'Head Chef',
      department: 'Kitchen',
      email: 'john.smith@restaurant.com',
      phone: '+1 (555) 123-4567',
      hireDate: '2023-01-15',
      salary: 65000,
      status: 'active',
      performance: 4.8,
      avatar: '👨‍🍳'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      position: 'Server',
      department: 'Front of House',
      email: 'sarah.johnson@restaurant.com',
      phone: '+1 (555) 234-5678',
      hireDate: '2023-03-20',
      salary: 35000,
      status: 'active',
      performance: 4.5,
      avatar: '👩‍💼'
    },
    {
      id: 3,
      name: 'Mike Rodriguez',
      position: 'Sous Chef',
      department: 'Kitchen',
      email: 'mike.rodriguez@restaurant.com',
      phone: '+1 (555) 345-6789',
      hireDate: '2023-02-10',
      salary: 45000,
      status: 'active',
      performance: 4.2,
      avatar: '👨‍🍳'
    },
    {
      id: 4,
      name: 'Emily Chen',
      position: 'Manager',
      department: 'Management',
      email: 'emily.chen@restaurant.com',
      phone: '+1 (555) 456-7890',
      hireDate: '2022-11-05',
      salary: 55000,
      status: 'active',
      performance: 4.9,
      avatar: '👩‍💼'
    }
  ]);

  // StaffCard component
  const StaffCard = ({ person }) => (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow relative">
      {/* Edit/Delete icons */}
      <div className="absolute top-4 right-4 flex space-x-2">
        <button className="text-blue-500 hover:text-blue-700" title="Edit" onClick={() => {}}>
          <Edit className="w-4 h-4" />
        </button>
        <button className="text-red-500 hover:text-red-700" title="Delete" onClick={() => {}}>
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="text-3xl">{person.avatar}</div>
          <div>
            <h3 className="font-semibold text-gray-900">{person.name}</h3>
            <p className="text-sm text-gray-600">{person.position}</p>
            <p className="text-xs text-gray-500">{person.department}</p>
          </div>
        </div>
      </div>
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          {person.email}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          {person.phone}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          Hired: {new Date(person.hireDate).toLocaleDateString()}
        </div>
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <span className="text-yellow-500">★</span>
          <span className="text-sm font-medium">{person.performance}</span>
        </div>
        <div className="text-sm font-medium text-gray-900">
          ${person.salary.toLocaleString()}/year
        </div>
      </div>
    </div>
  );

  // Remove PayrollView and payroll tab

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Team & Management</h1>
        <p className="text-gray-600">Manage your restaurant staff</p> {/* Removed payroll mention */}
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            key="staff"
            onClick={() => setActiveTab('staff')}
            className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'staff'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Staff Directory</span>
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'staff' && (
        <>
          <div className="flex justify-end mb-4">
            <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition" onClick={() => {}}>
              <Plus className="w-4 h-4 mr-2" />
              Add Member
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {staff.map((person) => (
              <StaffCard key={person.id} person={person} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default TeamPage;