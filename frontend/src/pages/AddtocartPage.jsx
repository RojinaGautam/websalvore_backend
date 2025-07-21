import React, { useState } from 'react';
import { 
  Plus, Minus, Trash2, MapPin, Clock, User, Phone, Mail, 
  CreditCard, Wallet, ShoppingCart, Star, Utensils, Fish,
  Home, Building, CheckCircle, AlertCircle, ArrowRight
} from 'lucide-react';
import { useCart } from '../components/CartContext.jsx';

const AddtocartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();

  const [deliveryInfo, setDeliveryInfo] = useState({
    type: 'delivery', // delivery or pickup
    address: '',
    apartment: '',
    city: '',
    zipCode: '',
    phone: '',
    specialInstructions: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [orderType, setOrderType] = useState('asap'); // asap or scheduled
  const [scheduledTime, setScheduledTime] = useState('');
  const [promoCode, setPromoCode] = useState('');

  // Additional menu items to add
  const additionalItems = [
    {
      id: 4,
      name: 'Fish & Chips',
      price: 18.99,
      image: '/api/placeholder/120/120',
      category: 'Popular',
      rating: 4.6,
      description: 'Classic British fish and chips with tartar sauce'
    },
    {
      id: 5,
      name: 'Shrimp Scampi',
      price: 24.99,
      image: '/api/placeholder/120/120',
      category: 'Signature Dishes',
      rating: 4.8,
      description: 'Garlic butter shrimp with white wine sauce'
    },
    {
      id: 6,
      name: 'Crab Cakes',
      price: 22.99,
      image: '/api/placeholder/120/120',
      category: 'Appetizers',
      rating: 4.7,
      description: 'Maryland-style crab cakes with aioli'
    },
    {
      id: 7,
      name: 'Clam Chowder',
      price: 12.99,
      image: '/api/placeholder/120/120',
      category: 'Soups',
      rating: 4.5,
      description: 'Creamy New England clam chowder'
    },
    {
      id: 8,
      name: 'Oysters Rockefeller',
      price: 16.99,
      image: '/api/placeholder/120/120',
      category: 'Appetizers',
      rating: 4.9,
      description: 'Baked oysters with spinach and herbs'
    }
  ];

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const deliveryFee = deliveryInfo.type === 'delivery' ? 4.99 : 0;
  const tax = calculateSubtotal() * 0.08;
  const total = calculateSubtotal() + deliveryFee + tax;

  const handlePlaceOrder = async () => {
    // Get user email from localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    const userEmail = user?.email || '';
    if (!deliveryInfo.phone) {
      alert('Please fill in all required fields');
      return;
    }
    if (deliveryInfo.type === 'delivery' && !deliveryInfo.address) {
      alert('Please enter your delivery address');
      return;
    }
    // Prepare order data
    const orderData = {
      userId: user?.id,
      deliveryType: deliveryInfo.type,
      address: deliveryInfo.address,
      phone: deliveryInfo.phone,
      email: userEmail,
      specialInstructions: deliveryInfo.specialInstructions,
      paymentMethod,
      orderType,
      scheduledTime: orderType === 'scheduled' ? scheduledTime : null,
      status: 'pending',
      total,
      items: cartItems.map(item => ({
        menuItemId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        customizations: item.customizations || []
      }))
    };
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:4000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orderData)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        clearCart();
        localStorage.removeItem('cartItems');
        alert('Order placed successfully! You will receive a confirmation email shortly.');
      } else {
        alert(data.error || 'Failed to place order.');
      }
    } catch (err) {
      alert('Failed to place order.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <ShoppingCart className="w-5 h-5" />
                <span className="font-medium">{cartItems.length} items</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">Your Order</h2>
              </div>
              <div className="p-6">
                {cartItems.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingCart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Your cart is empty</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4 p-4 border border-gray-100 rounded-lg">
                        <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                          <Utensils className="w-8 h-8 text-gray-400" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{item.name}</h3>
                          <p className="text-sm text-gray-500 mb-1">{item.description}</p>
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="text-sm text-gray-600">{item.rating}</span>
                            </div>
                            <span className="text-sm text-gray-400">•</span>
                            <span className="text-sm text-gray-600">{item.category}</span>
                          </div>
                          {item.customizations.length > 0 && (
                            <div className="text-sm text-gray-500">
                              {item.customizations.join(', ')}
                            </div>
                          )}
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="text-right">
                            <div className="font-medium text-gray-900">
                              ${(item.price * item.quantity).toFixed(2)}
                            </div>
                            <div className="text-sm text-gray-500">
                              ${item.price.toFixed(2)} each
                            </div>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700 p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Delivery Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">Delivery Information</h2>
              </div>
              <div className="p-6 space-y-4">
                {/* Order Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Order Type</label>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => setDeliveryInfo({...deliveryInfo, type: 'delivery'})}
                      className={`flex-1 p-3 rounded-lg border ${
                        deliveryInfo.type === 'delivery' 
                          ? 'border-red-500 bg-red-50 text-red-700' 
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <MapPin className="w-5 h-5" />
                        <span>Delivery</span>
                      </div>
                    </button>
                    <button
                      onClick={() => setDeliveryInfo({...deliveryInfo, type: 'pickup'})}
                      className={`flex-1 p-3 rounded-lg border ${
                        deliveryInfo.type === 'pickup' 
                          ? 'border-red-500 bg-red-50 text-red-700' 
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <Building className="w-5 h-5" />
                        <span>Pickup</span>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Address Fields */}
                {deliveryInfo.type === 'delivery' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                      <input
                        type="text"
                        value={deliveryInfo.address}
                        onChange={(e) => setDeliveryInfo({...deliveryInfo, address: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        placeholder="Street address"
                      />
                    </div>
                  </div>
                )}

                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      value={deliveryInfo.phone}
                      onChange={(e) => setDeliveryInfo({...deliveryInfo, phone: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>

                {/* Special Instructions */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Special Instructions</label>
                  <textarea
                    value={deliveryInfo.specialInstructions}
                    onChange={(e) => setDeliveryInfo({...deliveryInfo, specialInstructions: e.target.value})}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="Any special requests or delivery instructions..."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 sticky top-6">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">Order Summary</h2>
              </div>
              <div className="p-6 space-y-4">
                
                {/* Order Timing */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">When do you want your order?</label>
                  <div className="space-y-2">
                    <button
                      onClick={() => setOrderType('asap')}
                      className={`w-full p-3 rounded-lg border text-left ${
                        orderType === 'asap' 
                          ? 'border-red-500 bg-red-50 text-red-700' 
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <Clock className="w-5 h-5" />
                        <span>ASAP (30-45 mins)</span>
                      </div>
                    </button>
                    <button
                      onClick={() => setOrderType('scheduled')}
                      className={`w-full p-3 rounded-lg border text-left ${
                        orderType === 'scheduled' 
                          ? 'border-red-500 bg-red-50 text-red-700' 
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <Clock className="w-5 h-5" />
                        <span>Schedule for later</span>
                      </div>
                    </button>
                  </div>
                  {orderType === 'scheduled' && (
                    <input
                      type="datetime-local"
                      value={scheduledTime}
                      onChange={(e) => setScheduledTime(e.target.value)}
                      className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                  )}
                </div>

                {/* Payment Method */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                  <div className="space-y-2">
                    <button
                      onClick={() => setPaymentMethod('card')}
                      className={`w-full p-3 rounded-lg border text-left ${
                        paymentMethod === 'card' 
                          ? 'border-red-500 bg-red-50 text-red-700' 
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <CreditCard className="w-5 h-5" />
                        <span>Pay Online</span>
                      </div>
                    </button>
                    <button
                      onClick={() => setPaymentMethod('cash')}
                      className={`w-full p-3 rounded-lg border text-left ${
                        paymentMethod === 'cash' 
                          ? 'border-red-500 bg-red-50 text-red-700' 
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <Wallet className="w-5 h-5" />
                        <span>Cash on {deliveryInfo.type === 'delivery' ? 'Delivery' : 'Pickup'}</span>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Order Total */}
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900">${calculateSubtotal().toFixed(2)}</span>
                  </div>
                  {deliveryInfo.type === 'delivery' && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Delivery Fee</span>
                      <span className="text-gray-900">${deliveryFee.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="text-gray-900">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg border-t pt-2">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Place Order Button */}
                <button
                  onClick={handlePlaceOrder}
                  disabled={cartItems.length === 0}
                  className="w-full bg-red-600 text-white py-4 px-6 rounded-lg hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2 font-medium"
                >
                  <span>Place Order</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                {/* Estimated Time */}
                <div className="text-center text-sm text-gray-500">
                  <Clock className="w-4 h-4 inline mr-1" />
                  Estimated {orderType === 'asap' ? '30-45 mins' : 'delivery time based on schedule'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddtocartPage;