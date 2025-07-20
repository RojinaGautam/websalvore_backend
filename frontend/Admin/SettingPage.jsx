import React, { useState } from 'react';
import { 
  Store, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  CreditCard, 
  Users, 
  Bell, 
  Shield, 
  Camera, 
  Upload, 
  Save, 
  Edit3,
  Trash2,
  Plus,
  DollarSign,
  Truck,
  Star,
  Globe,
  Settings,
  ChefHat,
  Utensils
} from 'lucide-react';

const SettingPage = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    // General Settings
    restaurantName: 'Bella Vista Restaurant',
    description: 'Authentic Italian cuisine with a modern twist',
    cuisine: 'Italian',
    phone: '+1 (555) 123-4567',
    email: 'info@bellavista.com',
    website: 'www.bellavista.com',
    address: '123 Main Street, Downtown, NY 10001',
    
    // Operating Hours
    operatingHours: {
      monday: { open: '11:00', close: '22:00', closed: false },
      tuesday: { open: '11:00', close: '22:00', closed: false },
      wednesday: { open: '11:00', close: '22:00', closed: false },
      thursday: { open: '11:00', close: '22:00', closed: false },
      friday: { open: '11:00', close: '23:00', closed: false },
      saturday: { open: '10:00', close: '23:00', closed: false },
      sunday: { open: '10:00', close: '21:00', closed: false }
    },
    
    // Payment & Delivery
    acceptedPayments: ['credit_card', 'debit_card', 'cash', 'digital_wallet'],
    deliveryRadius: 5,
    deliveryFee: 3.99,
    minimumOrder: 15.00,
    deliveryTime: '30-45',
    
    // Table Management
    totalTables: 20,
    maxPartySize: 8,
    reservationBuffer: 15,
    
    // Notifications
    notifications: {
      newOrders: true,
      reservations: true,
      reviews: true,
      lowInventory: true,
      staffUpdates: false,
      promotions: true
    },
    
    // Tax & Service
    taxRate: 8.25,
    serviceCharge: 18,
    autoGratuity: true,
    autoGratuityThreshold: 6,
    
    // Online Presence
    socialMedia: {
      facebook: 'facebook.com/bellavista',
      instagram: '@bellavista_restaurant',
      twitter: '@bellavista_ny'
    }
  });

  const [staffMembers, setStaffMembers] = useState([
    { id: 1, name: 'John Smith', role: 'Manager', email: 'john@bellavista.com', phone: '555-0101' },
    { id: 2, name: 'Sarah Johnson', role: 'Chef', email: 'sarah@bellavista.com', phone: '555-0102' },
    { id: 3, name: 'Mike Wilson', role: 'Waiter', email: 'mike@bellavista.com', phone: '555-0103' }
  ]);

  const [newStaff, setNewStaff] = useState({ name: '', role: '', email: '', phone: '' });

  const handleInputChange = (section, field, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleDirectChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleHoursChange = (day, field, value) => {
    setSettings(prev => ({
      ...prev,
      operatingHours: {
        ...prev.operatingHours,
        [day]: {
          ...prev.operatingHours[day],
          [field]: value
        }
      }
    }));
  };

  const handlePaymentChange = (payment, checked) => {
    setSettings(prev => ({
      ...prev,
      acceptedPayments: checked 
        ? [...prev.acceptedPayments, payment]
        : prev.acceptedPayments.filter(p => p !== payment)
    }));
  };

  const addStaffMember = () => {
    if (newStaff.name && newStaff.role && newStaff.email) {
      setStaffMembers(prev => [...prev, { ...newStaff, id: Date.now() }]);
      setNewStaff({ name: '', role: '', email: '', phone: '' });
    }
  };

  const removeStaffMember = (id) => {
    setStaffMembers(prev => prev.filter(member => member.id !== id));
  };

  const saveSettings = () => {
    // Here you would typically send the settings to your backend
    alert('Settings saved successfully!');
  };

  const tabs = [
    { id: 'general', label: 'General Info', icon: Store },
    { id: 'payments', label: 'Payments & Delivery', icon: CreditCard },
    { id: 'tables', label: 'Table Management', icon: Utensils }
  ];

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Restaurant Name</label>
          <input
            type="text"
            value={settings.restaurantName}
            onChange={(e) => handleDirectChange('restaurantName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Cuisine Type</label>
          <select
            value={settings.cuisine}
            onChange={(e) => handleDirectChange('cuisine', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="Italian">Italian</option>
            <option value="Chinese">Chinese</option>
            <option value="Mexican">Mexican</option>
            <option value="Indian">Indian</option>
            <option value="American">American</option>
            <option value="Japanese">Japanese</option>
            <option value="Mediterranean">Mediterranean</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
        <textarea
          value={settings.description}
          onChange={(e) => handleDirectChange('description', e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
          <input
            type="tel"
            value={settings.phone}
            onChange={(e) => handleDirectChange('phone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            value={settings.email}
            onChange={(e) => handleDirectChange('email', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
        <input
          type="text"
          value={settings.address}
          onChange={(e) => handleDirectChange('address', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
        <input
          type="url"
          value={settings.website}
          onChange={(e) => handleDirectChange('website', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>
  );

  const renderOperatingHours = () => (
    <div className="space-y-4">
      {Object.entries(settings.operatingHours).map(([day, hours]) => (
        <div key={day} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
          <div className="w-24 font-medium text-gray-700 capitalize">{day}</div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={!hours.closed}
              onChange={(e) => handleHoursChange(day, 'closed', !e.target.checked)}
              className="rounded"
            />
            <span className="text-sm text-gray-600">Open</span>
          </div>
          {!hours.closed && (
            <>
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-600">From:</label>
                <input
                  type="time"
                  value={hours.open}
                  onChange={(e) => handleHoursChange(day, 'open', e.target.value)}
                  className="px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-600">To:</label>
                <input
                  type="time"
                  value={hours.close}
                  onChange={(e) => handleHoursChange(day, 'close', e.target.value)}
                  className="px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );

  const renderPaymentSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Accepted Payment Methods</h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            { id: 'credit_card', label: 'Credit Card', icon: CreditCard },
            { id: 'debit_card', label: 'Debit Card', icon: CreditCard },
            { id: 'cash', label: 'Cash', icon: DollarSign },
            { id: 'digital_wallet', label: 'Digital Wallet', icon: Phone }
          ].map(payment => (
            <div key={payment.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <input
                type="checkbox"
                checked={settings.acceptedPayments.includes(payment.id)}
                onChange={(e) => handlePaymentChange(payment.id, e.target.checked)}
                className="rounded"
              />
              <payment.icon className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700">{payment.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Radius (miles)</label>
          <input
            type="number"
            value={settings.deliveryRadius}
            onChange={(e) => handleDirectChange('deliveryRadius', parseFloat(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Fee ($)</label>
          <input
            type="number"
            step="0.01"
            value={settings.deliveryFee}
            onChange={(e) => handleDirectChange('deliveryFee', parseFloat(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Order ($)</label>
          <input
            type="number"
            step="0.01"
            value={settings.minimumOrder}
            onChange={(e) => handleDirectChange('minimumOrder', parseFloat(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Time (minutes)</label>
          <input
            type="text"
            value={settings.deliveryTime}
            onChange={(e) => handleDirectChange('deliveryTime', e.target.value)}
            placeholder="e.g., 30-45"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );

  const renderTableSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Total Tables</label>
          <input
            type="number"
            value={settings.totalTables}
            onChange={(e) => handleDirectChange('totalTables', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Max Party Size</label>
          <input
            type="number"
            value={settings.maxPartySize}
            onChange={(e) => handleDirectChange('maxPartySize', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Reservation Buffer (minutes)</label>
          <input
            type="number"
            value={settings.reservationBuffer}
            onChange={(e) => handleDirectChange('reservationBuffer', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );

  const renderStaffManagement = () => (
    <div className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Staff Member</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Full Name"
            value={newStaff.name}
            onChange={(e) => setNewStaff(prev => ({ ...prev, name: e.target.value }))}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <select
            value={newStaff.role}
            onChange={(e) => setNewStaff(prev => ({ ...prev, role: e.target.value }))}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Role</option>
            <option value="Manager">Manager</option>
            <option value="Chef">Chef</option>
            <option value="Waiter">Waiter</option>
            <option value="Host">Host</option>
            <option value="Cashier">Cashier</option>
          </select>
          <input
            type="email"
            placeholder="Email"
            value={newStaff.email}
            onChange={(e) => setNewStaff(prev => ({ ...prev, email: e.target.value }))}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <input
            type="tel"
            placeholder="Phone"
            value={newStaff.phone}
            onChange={(e) => setNewStaff(prev => ({ ...prev, phone: e.target.value }))}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button
          onClick={addStaffMember}
          className="mt-4 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Staff Member
        </button>
      </div>

      <div className="bg-white border rounded-lg overflow-hidden">
        <div className="px-4 py-3 bg-gray-50 border-b">
          <h3 className="text-lg font-medium text-gray-900">Current Staff</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {staffMembers.map((member) => (
            <div key={member.id} className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">{member.name}</div>
                  <div className="text-sm text-gray-500">{member.role}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-600">
                  <div>{member.email}</div>
                  <div>{member.phone}</div>
                </div>
                <button
                  onClick={() => removeStaffMember(member.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-4">
      {Object.entries(settings.notifications).map(([key, value]) => (
        <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="font-medium text-gray-900 capitalize">
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </span>
          </div>
          <input
            type="checkbox"
            checked={value}
            onChange={(e) => handleInputChange('notifications', key, e.target.checked)}
            className="rounded"
          />
        </div>
      ))}
    </div>
  );

  const renderFinancialSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tax Rate (%)</label>
          <input
            type="number"
            step="0.01"
            value={settings.taxRate}
            onChange={(e) => handleDirectChange('taxRate', parseFloat(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Service Charge (%)</label>
          <input
            type="number"
            step="0.01"
            value={settings.serviceCharge}
            onChange={(e) => handleDirectChange('serviceCharge', parseFloat(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
        <input
          type="checkbox"
          checked={settings.autoGratuity}
          onChange={(e) => handleDirectChange('autoGratuity', e.target.checked)}
          className="rounded"
        />
        <div className="flex-1">
          <span className="font-medium text-gray-900">Auto-Gratuity</span>
          <p className="text-sm text-gray-600">Automatically add gratuity for large parties</p>
        </div>
        {settings.autoGratuity && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">For parties of</span>
            <input
              type="number"
              value={settings.autoGratuityThreshold}
              onChange={(e) => handleDirectChange('autoGratuityThreshold', parseInt(e.target.value))}
              className="w-16 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <span className="text-sm text-gray-600">or more</span>
          </div>
        )}
      </div>
    </div>
  );

  const renderOnlinePresence = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Facebook Page</label>
          <input
            type="url"
            value={settings.socialMedia.facebook}
            onChange={(e) => handleInputChange('socialMedia', 'facebook', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Instagram Handle</label>
          <input
            type="text"
            value={settings.socialMedia.instagram}
            onChange={(e) => handleInputChange('socialMedia', 'instagram', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Twitter Handle</label>
          <input
            type="text"
            value={settings.socialMedia.twitter}
            onChange={(e) => handleInputChange('socialMedia', 'twitter', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general': return renderGeneralSettings();
      case 'payments': return renderPaymentSettings();
      case 'tables': return renderTableSettings();
      default: return renderGeneralSettings();
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Restaurant Settings</h1>
        <p className="text-gray-600">Manage your restaurant configuration and preferences</p>
      </div>
      <div className="bg-white rounded-lg shadow-sm border">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {renderTabContent()}
        </div>

        {/* Save Button */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end">
          <button
            onClick={saveSettings}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Save className="w-4 h-4" />
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingPage;