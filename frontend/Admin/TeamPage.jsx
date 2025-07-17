import React, { useState } from 'react';
import { Users, DollarSign } from 'lucide-react';

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
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
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

  // PayrollView component
  const PayrollView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Payroll Management</h3>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2">
          <DollarSign className="w-4 h-4" />
          <span>Process Payroll</span>
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-blue-500 p-3 rounded-full">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Payroll</p>
              <p className="text-2xl font-bold text-gray-900">$18,750</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-green-500 p-3 rounded-full">
              <span className="w-6 h-6 text-white">👥</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Employees</p>
              <p className="text-2xl font-bold text-gray-900">{staff.filter(s => s.status === 'active').length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="bg-yellow-500 p-3 rounded-full">
              <span className="w-6 h-6 text-white">⏰</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Hours This Week</p>
              <p className="text-2xl font-bold text-gray-900">312</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md">
        <div className="px-6 py-4 border-b border-gray-200">
          <h4 className="text-lg font-medium">Employee Payroll Details</h4>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hours</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gross Pay</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deductions</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Net Pay</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {staff.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-2xl mr-3">{employee.avatar}</div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                        <div className="text-sm text-gray-500">{employee.position}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">40</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${(employee.salary / 52 / 40).toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${(employee.salary / 52).toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${(employee.salary / 52 * 0.25).toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${(employee.salary / 52 * 0.75).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Team & Management</h1>
        <p className="text-gray-600">Manage your restaurant staff and payroll</p>
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
          <button
            key="payroll"
            onClick={() => setActiveTab('payroll')}
            className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'payroll'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>Payroll</span>
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'staff' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {staff.map((person) => (
            <StaffCard key={person.id} person={person} />
          ))}
        </div>
      )}
      {activeTab === 'payroll' && <PayrollView />}
    </div>
  );
};

export default TeamPage;