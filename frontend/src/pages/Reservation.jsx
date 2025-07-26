import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Users, 
  User, 
  Phone, 
  Mail, 
  CheckCircle, 
  XCircle,
  Edit3,
  Trash2,
  ArrowLeft,
  MapPin,
  Star,
  MessageSquare,
  Send,
  Search,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import Layout from '../components/Layout'; // Add this import

const Reservation = () => {
  const [currentStep, setCurrentStep] = useState('booking'); // booking, confirmation, manage
  const [reservationData, setReservationData] = useState({
    date: '',
    time: '',
    guests: 2,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Mock available time slots
  const timeSlots = [
    '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', 
    '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM'
  ];

  // Mock existing reservations
  const mockReservations = [
    {
      id: 'RES001',
      date: '2025-01-20',
      time: '7:00 PM',
      guests: 4,
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.smith@email.com',
      phone: '(555) 123-4567',
      specialRequests: 'Window table if possible',
      status: 'confirmed',
      createdAt: '2025-01-15T10:30:00Z'
    },
    {
      id: 'RES002',
      date: '2025-01-22',
      time: '6:30 PM',
      guests: 2,
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.johnson@email.com',
      phone: '(555) 987-6543',
      specialRequests: 'Anniversary dinner',
      status: 'confirmed',
      createdAt: '2025-01-16T14:20:00Z'
    }
  ];

  const handleInputChange = (field, value) => {
    setReservationData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const isFormValid = () => {
    return reservationData.date && 
           reservationData.time && 
           reservationData.firstName && 
           reservationData.lastName && 
           reservationData.email && 
           reservationData.phone;
  };

  const handleSubmitReservation = async (e) => {
    e.preventDefault();
    if (!isFormValid()) return;
    setLoading(true);
    setError('');
    setSuccess(false);
    try {
      const res = await fetch('http://localhost:4000/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reservationData)
      });
      const data = await res.json();
      if (res.ok && data.data) {
        setSuccess(true);
        setCurrentStep('confirmation');
      } else {
        setError(data.error || 'Failed to make reservation');
      }
    } catch (err) {
      setError('Failed to make reservation');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const getMaxDate = () => {
    const today = new Date();
    const maxDate = new Date(today.getTime() + (90 * 24 * 60 * 60 * 1000)); // 90 days from now
    return maxDate.toISOString().split('T')[0];
  };

  const renderBookingForm = () => (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Make a Reservation
          </h2>
          <p className="text-gray-600">
            Reserve your table at Salvore Restaurant
          </p>
        </div>
        {error && <div className="text-red-600 mb-4">{error}</div>}
        {loading && <div className="text-blue-600 mb-4">Loading...</div>}
        <div className="space-y-6">
          {/* Date and Time Selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-2" />
                Date
              </label>
              <input
                type="date"
                value={reservationData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                min={getMinDate()}
                max={getMaxDate()}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="w-4 h-4 inline mr-2" />
                Time
              </label>
              <select
                value={reservationData.time}
                onChange={(e) => handleInputChange('time', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select time</option>
                {timeSlots.map(time => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Users className="w-4 h-4 inline mr-2" />
                Guests
              </label>
              <select
                value={reservationData.guests}
                onChange={(e) => handleInputChange('guests', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                {[1,2,3,4,5,6,7,8].map(num => (
                  <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-2" />
                First Name
              </label>
              <input
                type="text"
                value={reservationData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Name
              </label>
              <input
                type="text"
                value={reservationData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="w-4 h-4 inline mr-2" />
                Email
              </label>
              <input
                type="email"
                value={reservationData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Phone className="w-4 h-4 inline mr-2" />
                Phone
              </label>
              <input
                type="tel"
                value={reservationData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MessageSquare className="w-4 h-4 inline mr-2" />
              Special Requests (Optional)
            </label>
            <textarea
              value={reservationData.specialRequests}
              onChange={(e) => handleInputChange('specialRequests', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Any special dietary requirements, seating preferences, or celebration details..."
            />
          </div>

          <div className="flex items-center justify-between pt-4">
            {/* {editingReservation && (
              <button
                type="button"
                onClick={() => {
                  setEditingReservation(null);
                  setCurrentStep('manage');
                }}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Manage
              </button>
            )} */}
            <button
              type="button"
              onClick={handleSubmitReservation}
              disabled={!isFormValid() || loading}
              style={{ backgroundColor: '#cb3d27' }}
              className="flex items-center gap-2 px-6 py-3 text-white rounded-lg hover:brightness-90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors ml-auto"
            >
              <Send className="w-4 h-4" />
              Make Reservation
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderConfirmation = () => (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
        <div className="mb-6">
          <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Reservation Confirmed!
          </h2>
          <p className="text-gray-600">
            Your reservation has been confirmed. A confirmation email has been sent to {reservationData?.email}.
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <div>
              <p className="text-sm text-gray-600 mb-1">Reservation ID</p>
              <p className="font-medium text-gray-900">RES{Date.now()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Name</p>
              <p className="font-medium text-gray-900">{reservationData?.firstName} {reservationData?.lastName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Date & Time</p>
              <p className="font-medium text-gray-900">
                {reservationData?.date && formatDate(reservationData.date)} at {reservationData?.time}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Party Size</p>
              <p className="font-medium text-gray-900">{reservationData?.guests} guests</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm text-gray-600 mb-1">Contact</p>
              <p className="font-medium text-gray-900">{reservationData?.email} • {reservationData?.phone}</p>
            </div>
            {reservationData?.specialRequests && (
              <div className="md:col-span-2">
                <p className="text-sm text-gray-600 mb-1">Special Requests</p>
                <p className="font-medium text-gray-900">{reservationData.specialRequests}</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="text-left">
              <p className="font-medium text-blue-900">Bella Vista Restaurant</p>
              <p className="text-sm text-blue-700">123 Main Street, Downtown, NY 10001</p>
              <p className="text-sm text-blue-700">Phone: (555) 123-4567</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => {
              setCurrentStep('booking');
              setReservationData({
                date: '',
                time: '',
                guests: 2,
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                specialRequests: ''
              });
            }}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Make Another Reservation
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          {/* Navigation */}
          <div className="mb-8">
            <div className="flex justify-center space-x-8">
              <button
                onClick={() => setCurrentStep('booking')}
                style={{ backgroundColor: '#cb3d27' }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-white"
              >
                <Calendar className="w-4 h-4" />
                Make Reservation
              </button>
            </div>
          </div>

          {/* Content */}
          {currentStep === 'booking' && renderBookingForm()}
          {currentStep === 'confirmation' && renderConfirmation()}
        </div>
      </div>
    </Layout>
  );
};

export default Reservation;