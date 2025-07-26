import React, { useState, useEffect } from 'react';
import { Users, Plus, Edit, Trash2, Key, AlertCircle } from 'lucide-react';

const emptyStaff = {
  name: '',
  position: '',
  department: '',
  email: '',
  phone: '',
  hireDate: '',
  salary: '',
  status: 'active',
  performance: '',
  avatar: '',
  password: ''
};

const API_URL = 'http://localhost:4000/api/users';
function getToken() {
  return localStorage.getItem('token');
}

async function fetchAdmins() {
  const res = await fetch(API_URL, {
    headers: { 'Authorization': `Bearer ${getToken()}` },
  });
  if (!res.ok) throw new Error('Failed to fetch users');
  const data = await res.json();
  // Only admins
  return (data.data || []).filter(user => user.role === 'admin');
}

async function fetchForgottenUsers() {
  const res = await fetch(`${API_URL}/forgotten/list`, {
    headers: { 'Authorization': `Bearer ${getToken()}` },
  });
  if (!res.ok) throw new Error('Failed to fetch forgotten users');
  const data = await res.json();
  return data.data || [];
}

async function createAdmin(user) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ ...user, role: 'admin' }),
  });
  if (!res.ok) throw new Error('Failed to create admin');
  const data = await res.json();
  return data.data;
}

async function updateAdmin(id, user) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`,
    },
    body: JSON.stringify({ ...user, role: 'admin' }),
  });
  if (!res.ok) throw new Error('Failed to update admin');
  const data = await res.json();
  return data.data;
}

async function deleteAdmin(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${getToken()}` },
  });
  if (!res.ok) throw new Error('Failed to delete admin');
  return true;
}

async function resetPassword(id, newPassword) {
  const res = await fetch(`${API_URL}/${id}/reset-password`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}` },
    body: JSON.stringify({ newPassword }),
  });
  if (!res.ok) throw new Error('Failed to reset password');
  return true;
}

const TeamPage = () => {
  const [activeTab, setActiveTab] = useState('staff');
  const [staff, setStaff] = useState([]);
  const [forgottenUsers, setForgottenUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [formData, setFormData] = useState(emptyStaff);
  const [editId, setEditId] = useState(null);
  const [resetUserId, setResetUserId] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [resetMessage, setResetMessage] = useState('');

  // Fetch admin users from backend
  const loadStaff = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchAdmins();
      setStaff(data);
    } catch (err) {
      setError(err.message || 'Failed to load staff');
    } finally {
      setLoading(false);
    }
  };

  // Fetch forgotten users
  const loadForgottenUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchForgottenUsers();
      setForgottenUsers(data);
    } catch (err) {
      setError(err.message || 'Failed to load forgotten users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'staff') {
      loadStaff();
    } else if (activeTab === 'forgotten') {
      loadForgottenUsers();
    }
  }, [activeTab]);

  // Add or update admin
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (editId) {
        await updateAdmin(editId, formData);
      } else {
        if (!formData.password) {
          setError('Password is required for new admin');
          setLoading(false);
          return;
        }
        await createAdmin(formData);
      }
      setShowForm(false);
      setFormData(emptyStaff);
      setEditId(null);
      loadStaff();
    } catch (err) {
      setError(err.message || 'Failed to save admin');
    } finally {
      setLoading(false);
    }
  };

  // Reset password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResetMessage('');
    try {
      await resetPassword(resetUserId, newPassword);
      setResetMessage('Password reset successfully!');
      setTimeout(() => {
        setShowResetModal(false);
        setResetUserId(null);
        setNewPassword('');
        setResetMessage('');
        loadForgottenUsers();
      }, 2000);
    } catch (err) {
      setResetMessage(err.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  // Edit admin
  const handleEdit = (person) => {
    setFormData({ ...person, password: '' }); // Don't prefill password
    setEditId(person.id);
    setShowForm(true);
  };

  // Delete admin
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this admin?')) return;
    setLoading(true);
    setError('');
    try {
      await deleteAdmin(id);
      loadStaff();
    } catch (err) {
      setError(err.message || 'Failed to delete admin');
    } finally {
      setLoading(false);
    }
  };

  // StaffCard component
  const StaffCard = ({ person }) => (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow relative">
      {/* Edit/Delete icons */}
      <div className="absolute top-4 right-4 flex space-x-2">
        <button className="text-blue-500 hover:text-blue-700" title="Edit" onClick={() => handleEdit(person)}>
          <Edit className="w-4 h-4" />
        </button>
        <button className="text-red-500 hover:text-red-700" title="Delete" onClick={() => handleDelete(person.id)}>
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
          Hired: {person.hireDate ? new Date(person.hireDate).toLocaleDateString() : ''}
        </div>
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <span className="text-yellow-500">★</span>
          <span className="text-sm font-medium">{person.performance}</span>
        </div>
        <div className="text-sm font-medium text-gray-900">
          ${person.salary?.toLocaleString()}/year
        </div>
      </div>
    </div>
  );

  // ForgottenUserCard component
  const ForgottenUserCard = ({ person }) => (
    <div className="bg-white rounded-lg shadow-md p-6 border border-orange-200 hover:shadow-lg transition-shadow relative">
      <div className="absolute top-4 right-4">
        <AlertCircle className="w-5 h-5 text-orange-500" />
      </div>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="text-3xl">{person.avatar || '👤'}</div>
          <div>
            <h3 className="font-semibold text-gray-900">{person.name}</h3>
            <p className="text-sm text-gray-600">{person.email}</p>
            <p className="text-xs text-orange-600 font-medium">Password Reset Requested</p>
          </div>
        </div>
      </div>
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          📞 {person.phone}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          🏢 {person.department || 'No department'}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          📅 Hired: {person.hireDate ? new Date(person.hireDate).toLocaleDateString() : 'Not specified'}
        </div>
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="text-sm text-gray-600">
          Role: {person.role}
        </div>
        <button
          onClick={() => {
            setResetUserId(person.id);
            setShowResetModal(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Key className="w-4 h-4" />
          Reset Password
        </button>
      </div>
    </div>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Team & Management</h1>
        <p className="text-gray-600">Manage your restaurant staff and password reset requests</p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('staff')}
            className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'staff'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Admin Directory</span>
          </button>
          <button
            onClick={() => setActiveTab('forgotten')}
            className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'forgotten'
                ? 'border-orange-500 text-orange-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <AlertCircle className="w-4 h-4" />
            <span>Password Reset Requests</span>
            {forgottenUsers.length > 0 && (
              <span className="bg-orange-500 text-white text-xs rounded-full px-2 py-1">
                {forgottenUsers.length}
              </span>
            )}
          </button>
        </nav>
      </div>

      {/* Error/Loading */}
      {error && <div className="text-red-600 mb-4">{error}</div>}
      {loading && <div className="text-blue-600 mb-4">Loading...</div>}

      {/* Tab Content */}
      {activeTab === 'staff' && (
        <>
          <div className="flex justify-end mb-4">
            <button
              className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition"
              onClick={() => {
                setFormData(emptyStaff);
                setEditId(null);
                setShowForm(true);
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Admin
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {staff.map((person) => (
              <StaffCard key={person.id} person={person} />
            ))}
          </div>
        </>
      )}

      {activeTab === 'forgotten' && (
        <>
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Users who requested password reset
            </h2>
            <p className="text-gray-600">
              Click "Reset Password" to set a new password and contact the user
            </p>
          </div>
          {forgottenUsers.length === 0 ? (
            <div className="text-center py-8">
              <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No password reset requests at the moment</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {forgottenUsers.map((person) => (
                <ForgottenUserCard key={person.id} person={person} />
              ))}
            </div>
          )}
        </>
      )}

      {/* Add/Edit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <form
            className="bg-white rounded-lg p-8 w-full max-w-md shadow-lg relative"
            onSubmit={handleSubmit}
          >
            <button
              type="button"
              aria-label="Close"
              className="text-2xl font-bold text-gray-400 hover:text-gray-600 focus:outline-none"
              onClick={() => setShowForm(false)}
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-4">{editId ? 'Edit Admin' : 'Add Admin'}</h2>
            <div className="space-y-3">
              <input
                className="w-full border px-3 py-2 rounded"
                placeholder="Name"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <input
                className="w-full border px-3 py-2 rounded"
                placeholder="Position"
                value={formData.position}
                onChange={e => setFormData({ ...formData, position: e.target.value })}
                required
              />
              <input
                className="w-full border px-3 py-2 rounded"
                placeholder="Department"
                value={formData.department}
                onChange={e => setFormData({ ...formData, department: e.target.value })}
                required
              />
              <input
                className="w-full border px-3 py-2 rounded"
                placeholder="Email"
                type="email"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                required
              />
              <input
                className="w-full border px-3 py-2 rounded"
                placeholder="Phone"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                required
              />
              <input
                className="w-full border px-3 py-2 rounded"
                placeholder="Hire Date"
                type="date"
                value={formData.hireDate}
                onChange={e => setFormData({ ...formData, hireDate: e.target.value })}
                required
              />
              <input
                className="w-full border px-3 py-2 rounded"
                placeholder="Salary"
                type="number"
                value={formData.salary}
                onChange={e => setFormData({ ...formData, salary: e.target.value })}
                required
              />
              <input
                className="w-full border px-3 py-2 rounded"
                placeholder="Status"
                value={formData.status}
                onChange={e => setFormData({ ...formData, status: e.target.value })}
              />
              <input
                className="w-full border px-3 py-2 rounded"
                placeholder="Performance"
                type="number"
                step="0.1"
                value={formData.performance}
                onChange={e => setFormData({ ...formData, performance: e.target.value })}
              />
              <input
                className="w-full border px-3 py-2 rounded"
                placeholder="Avatar (emoji or url)"
                value={formData.avatar}
                onChange={e => setFormData({ ...formData, avatar: e.target.value })}
              />
              {!editId && (
                <input
                  className="w-full border px-3 py-2 rounded"
                  placeholder="Password"
                  type="password"
                  value={formData.password}
                  onChange={e => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              )}
            </div>
            <button
              type="submit"
              className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
              disabled={loading}
            >
              {editId ? 'Update' : 'Add'} Admin
            </button>
          </form>
        </div>
      )}

      {/* Reset Password Modal */}
      {showResetModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <form
            className="bg-white rounded-lg p-8 w-full max-w-md shadow-lg relative"
            onSubmit={handleResetPassword}
          >
            <button
              type="button"
              aria-label="Close"
              className="text-2xl font-bold text-gray-400 hover:text-gray-600 focus:outline-none"
              onClick={() => {
                setShowResetModal(false);
                setResetUserId(null);
                setNewPassword('');
                setResetMessage('');
              }}
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-4">Reset Password</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <input
                  className="w-full border px-3 py-2 rounded"
                  placeholder="Enter new password"
                  type="password"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  required
                />
              </div>
              {resetMessage && (
                <div className={`p-3 rounded-lg text-sm ${
                  resetMessage.includes("successfully") 
                    ? "bg-green-100 text-green-700" 
                    : "bg-red-100 text-red-700"
                }`}>
                  {resetMessage}
                </div>
              )}
            </div>
            <div className="mt-6 space-y-3">
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
                disabled={loading}
              >
                Reset Password
              </button>
              <button
                type="button"
                className="w-full border border-gray-300 text-gray-700 font-semibold py-2 rounded hover:bg-gray-50"
                onClick={() => {
                  setShowResetModal(false);
                  setResetUserId(null);
                  setNewPassword('');
                  setResetMessage('');
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default TeamPage;