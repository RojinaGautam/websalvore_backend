import React, { useState, useEffect } from 'react';
import { Star, Coffee, Award, Plus, Edit, Trash2 } from 'lucide-react';

const menuTabs = [
  { id: 'special', label: 'Special Menu', icon: Star },
  { id: 'beverage', label: 'Beverage Menu', icon: Coffee },
  { id: 'signature', label: 'Signature Dish', icon: Award }
];

const initialForm = {
  name: '',
  category: 'Special',
  price: '',
  stock: '',
  status: 'Available',
  image: null,
};

const MenuPage = () => {
  const [activeMenuTab, setActiveMenuTab] = useState('special');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [menuItems, setMenuItems] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [fetchError, setFetchError] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [editId, setEditId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Fetch menu items from backend
  const fetchMenuItems = async () => {
    setFetching(true);
    setFetchError('');
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:4000/api/menu', {
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || data?.message || 'Failed to fetch menu items');
      setMenuItems(data.data || []);
    } catch (err) {
      setFetchError(err.message || 'Failed to fetch menu items');
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const getCurrentMenuItems = () => {
    if (!menuItems.length) return [];
    if (activeMenuTab === 'special') return menuItems.filter(item => item.category === 'Special');
    if (activeMenuTab === 'beverage') return menuItems.filter(item => item.category === 'Beverage');
    if (activeMenuTab === 'signature') return menuItems.filter(item => item.category === 'Signature');
    return menuItems;
  };

  const getCurrentTabLabel = () => {
    const tab = menuTabs.find(tab => tab.id === activeMenuTab);
    return tab ? tab.label : 'Special Menu';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = (item) => {
    setForm({
      name: item.name,
      category: item.category,
      price: item.price,
      stock: item.stock,
      status: item.status,
      image: null,
    });
    setImageFile(null);
    setImagePreview(item.image ? `http://localhost:4000/uploads/${item.image}` : null);
    setEditId(item.id);
    setShowModal(true);
    setError('');
    setSuccess('');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('category', form.category);
      formData.append('price', parseFloat(form.price));
      formData.append('stock', parseInt(form.stock, 10));
      formData.append('status', form.status);
      if (imageFile) {
        formData.append('image', imageFile);
      }
      console.log(editId ? 'Editing menu item:' : 'Submitting menu item:', formData);
      const res = await fetch(`http://localhost:4000/api/menu${editId ? `/${editId}` : ''}`, {
        method: editId ? 'PUT' : 'POST',
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: formData,
      });
      let data = {};
      try {
        data = await res.json();
      } catch (jsonErr) {
        console.log('Failed to parse JSON:', jsonErr);
      }
      console.log('Backend response:', data);
      if (!res.ok) {
        setError(data?.error || data?.message || (editId ? 'Failed to update menu item' : 'Failed to add menu item'));
        setLoading(false);
        return;
      }
      setShowModal(false);
      setForm(initialForm);
      setImageFile(null);
      setImagePreview(null);
      setEditId(null);
      setSuccess(data?.message || (editId ? 'Menu item updated successfully!' : 'Menu item added successfully!'));
      setTimeout(() => setSuccess(''), 3000);
      fetchMenuItems();
    } catch (err) {
      setError(err.message || (editId ? 'Failed to update menu item' : 'Failed to add menu item'));
      console.log('Request error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this menu item?')) return;
    setDeleteLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:4000/api/menu/${id}`, {
        method: 'DELETE',
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      const data = await res.json();
      
      if (res.status === 409) {
        // Handle foreign key constraint error
        setError(data?.error || 'Cannot delete menu item. It is currently being used in orders.');
        // Clear error after 10 seconds
        setTimeout(() => setError(''), 10000);
        return;
      }
      
      if (!res.ok) throw new Error(data?.error || data?.message || 'Failed to delete menu item');
      
      setSuccess(data?.message || 'Menu item deleted successfully!');
      setTimeout(() => setSuccess(''), 3000);
      fetchMenuItems();
    } catch (err) {
      setError(err.message || 'Failed to delete menu item');
    } finally {
      setDeleteLoading(false);
    }
  };

  const renderMenuItemsTable = (items) => (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
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
              <td className="px-6 py-4 whitespace-nowrap">
                {item.image ? (
                  <img src={`http://localhost:4000/uploads/${item.image}`} alt={item.name} className="w-12 h-12 object-cover rounded" />
                ) : (
                  <span className="text-gray-400">No Image</span>
                )}
              </td>
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
                  <button
                    className="text-green-600 hover:text-green-800"
                    onClick={() => handleEdit(item)}
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                 <button
                   className="text-red-600 hover:text-red-800 disabled:opacity-50"
                   onClick={() => handleDelete(item.id)}
                   disabled={deleteLoading}
                 >
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
      {/* Fetch error */}
      {fetchError && <div className="text-red-600 text-center font-semibold py-2">{fetchError}</div>}
      {fetching && <div className="text-gray-600 text-center font-semibold py-2">Loading menu items...</div>}
      {/* Success message at the top of the page */}
      {success && (
        <div className="text-green-600 text-center font-semibold py-2">{success}</div>
      )}
      {/* Error message at the top of the page */}
      {error && (
        <div className="text-red-600 text-center font-semibold py-2 bg-red-50 border border-red-200 rounded-md mx-4 mt-4">
          {error}
        </div>
      )}
      {/* Add Item button at the top-right */}
      <div className="flex justify-end p-6">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition"
          onClick={() => { setShowModal(true); setForm(initialForm); setEditId(null); setError(''); setSuccess(''); }}
        >
          Add Item +
        </button>
      </div>
      {/* Modal for Add Item */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto">
          {/* Backdrop with blur */}
          <div className="absolute inset-0 bg-black bg-opacity-20 backdrop-blur-sm transition-all duration-300" />
          {/* Modal */}
          <div className="relative z-10 animate-pop-in">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 border border-gray-200 min-w-[320px] min-h-[200px] max-h-[90vh] overflow-y-auto">
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl font-bold"
                onClick={() => { setShowModal(false); setError(''); setSuccess(''); setEditId(null); }}
                aria-label="Close"
                type="button"
                style={{ top: '1rem', right: '1rem' }}
              >
                &times;
              </button>
              <h2 className="text-xl font-bold mb-4">{editId ? 'Edit Menu Item' : 'Add Menu Item'}</h2>
              {/* Error message */}
              {error && <div className="text-red-600 mb-2">{error}</div>}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Item Name</label>
                <input name="name" value={form.name} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter item name" required />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select name="category" value={form.category} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required>
                  <option value="Special">Special Menu</option>
                  <option value="Beverage">Beverage Menu</option>
                  <option value="Signature">Signature Dish</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                <input name="price" type="number" value={form.price} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter price" required />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Stock</label>
                <input name="stock" type="number" value={form.stock} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter stock" required />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select name="status" value={form.status} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required>
                  <option value="Available">Available</option>
                  <option value="Low Stock">Low Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
                <div className="flex flex-row items-center gap-4">
                  <input type="file" accept="image/*" onChange={handleImageChange} className="w-full max-w-xs" />
                  {imagePreview && (
                    <img src={imagePreview} alt="Preview" className="rounded w-12 h-12 object-cover" />
                  )}
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
          {/* Animation keyframes for pop-in */}
          <style>{`
            @keyframes pop-in {
              0% { opacity: 0; transform: scale(0.95); }
              100% { opacity: 1; transform: scale(1); }
            }
            .animate-pop-in {
              animation: pop-in 0.25s cubic-bezier(0.4,0,0.2,1);
            }
          `}</style>
        </div>
      )}
      <div className="p-6 border-b">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Menu Management</h3>
        </div>
        {/* Dropdown for menu categories */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Menu Category</label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={activeMenuTab}
            onChange={e => setActiveMenuTab(e.target.value)}
          >
            {menuTabs.map(tab => (
              <option key={tab.id} value={tab.id}>{tab.label}</option>
            ))}
          </select>
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