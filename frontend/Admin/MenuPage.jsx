import React, { useState } from 'react';
import { Star, Coffee, Award, Plus, Edit, Trash2 } from 'lucide-react';

const specialMenuItems = [
  { id: 1, name: "Chef's Special Risotto", category: 'Special', price: 32.99, stock: 8, status: 'Available' },
  { id: 2, name: 'Truffle Pasta', category: 'Special', price: 28.99, stock: 5, status: 'Low Stock' },
  { id: 3, name: 'Seafood Platter', category: 'Special', price: 45.99, stock: 12, status: 'Available' },
  { id: 4, name: 'Wagyu Steak', category: 'Special', price: 65.99, stock: 3, status: 'Low Stock' }
];

const beverageItems = [
  { id: 5, name: 'Craft Beer Selection', category: 'Beverage', price: 8.99, stock: 24, status: 'Available' },
  { id: 6, name: 'House Wine Red', category: 'Beverage', price: 12.99, stock: 18, status: 'Available' },
  { id: 7, name: 'Fresh Juice Combo', category: 'Beverage', price: 6.99, stock: 0, status: 'Out of Stock' },
  { id: 8, name: 'Signature Cocktail', category: 'Beverage', price: 14.99, stock: 15, status: 'Available' }
];

const signatureDishes = [
  { id: 9, name: 'Signature Grilled Salmon', category: 'Signature', price: 38.99, stock: 10, status: 'Available' },
  { id: 10, name: 'Famous Beef Wellington', category: 'Signature', price: 52.99, stock: 6, status: 'Available' },
  { id: 11, name: 'Legendary Chocolate Soufflé', category: 'Signature', price: 16.99, stock: 8, status: 'Available' },
  { id: 12, name: 'Signature Lobster Thermidor', category: 'Signature', price: 48.99, stock: 4, status: 'Low Stock' }
];

const menuTabs = [
  { id: 'special', label: 'Special Menu', icon: Star },
  { id: 'beverage', label: 'Beverage Menu', icon: Coffee },
  { id: 'signature', label: 'Signature Dish', icon: Award }
];

const MenuPage = () => {
  const [activeMenuTab, setActiveMenuTab] = useState('special');

  const getCurrentMenuItems = () => {
    switch (activeMenuTab) {
      case 'special':
        return specialMenuItems;
      case 'beverage':
        return beverageItems;
      case 'signature':
        return signatureDishes;
      default:
        return specialMenuItems;
    }
  };

  const getCurrentTabLabel = () => {
    const tab = menuTabs.find(tab => tab.id === activeMenuTab);
    return tab ? tab.label : 'Special Menu';
  };

  const renderMenuItemsTable = (items) => (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {items.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap font-medium">{item.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.category}</td>
              <td className="px-6 py-4 whitespace-nowrap">${item.price}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.stock}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  item.status === 'Available' ? 'bg-green-100 text-green-800' :
                  item.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {item.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex space-x-2">
                  <button className="text-green-600 hover:text-green-800">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="text-red-600 hover:text-red-800">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Menu Management</h3>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Add Item
          </button>
        </div>
        {/* Menu Sub-tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          {menuTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveMenuTab(tab.id)}
              className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeMenuTab === tab.id
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <tab.icon className="w-4 h-4 mr-2" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <div className="p-6">
        <h4 className="text-md font-medium text-gray-900 mb-4">{getCurrentTabLabel()}</h4>
        {renderMenuItemsTable(getCurrentMenuItems())}
      </div>
    </div>
  );
};

export default MenuPage; 