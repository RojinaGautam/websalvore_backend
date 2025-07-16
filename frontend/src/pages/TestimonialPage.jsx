import React, { useState } from 'react';
import { Star, Fish, Waves, User } from 'lucide-react';
import Layout from "../components/Layout";

const TestimonialPage = () => {
  const [testimonials, setTestimonials] = useState([
    {
      id: 1,
      name: "Daniel Gallego",
      rating: 5,
      review: "“The seafood platter was absolutely amazing—fresh, flavorful, and beautifully served. A must-try!",
      date: "2024-10-30",
      dish: "Grilled seafood platter"
    },
    {
      id: 2,
      name: "Olivia Wilson",
      rating: 5,
      review: "“I come here often because the food is consistently great and the atmosphere is so welcoming.”",
      date: "2024-12-08",
      dish: "Barbecue Grilled Octopus with Oregano"
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      rating: 4,
      review: "Great atmosphere and fresh seafood. The clam chowder was rich and creamy. Service was prompt and friendly. Will definitely return!",
      date: "2024-07-20",
      dish: "Clam Chowder"
    }
  ]);

  const [newTestimonial, setNewTestimonial] = useState({
    name: '',
    rating: 5,
    review: '',
    dish: ''
  });

  const [showForm, setShowForm] = useState(false);

  const handleSubmit = () => {
    if (newTestimonial.name && newTestimonial.review) {
      const testimonial = {
        id: testimonials.length + 1,
        ...newTestimonial,
        date: new Date().toISOString().split('T')[0]
      };
      setTestimonials([testimonial, ...testimonials]);
      setNewTestimonial({
        name: '',
        rating: 5,
        review: '',
        dish: ''
      });
      setShowForm(false);
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const handleStarClick = (rating) => {
    setNewTestimonial({ ...newTestimonial, rating });
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-6">
        {/* Add Review Button */}
        <div className="mb-8 text-center">
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-[#ca3d2a] text-white px-8 py-3 rounded-full font-semibold hover:bg-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            {showForm ? 'Cancel' : 'Share Your Experience'}
          </button>
        </div>

        {/* Review Form */}
        {showForm && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-red-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <User className="w-6 h-6 mr-2 text-[#ca3d2a]" />
              Share Your Review
            </h2>
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="block text-gray-700 font-semibold mb-2">Your Name</div>
                  <input
                    type="text"
                    value={newTestimonial.name}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <div className="block text-gray-700 font-semibold mb-2">Favorite Dish (Optional)</div>
                  <input
                    type="text"
                    value={newTestimonial.dish}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, dish: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., Grilled Salmon"
                  />
                </div>
              </div>

              <div>
                <div className="block text-gray-700 font-semibold mb-2">Rating</div>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleStarClick(star)}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`w-8 h-8 ${star <= newTestimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'} hover:text-yellow-400 transition-colors`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="block text-gray-700 font-semibold mb-2">Your Review</div>
                <textarea
                  value={newTestimonial.review}
                  onChange={(e) => setNewTestimonial({ ...newTestimonial, review: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32 resize-none"
                  placeholder="Share your experience with us..."
                />
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-[#ca3d2a] text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-all duration-300 transform hover:scale-105"
              >
                Submit Review
              </button>
            </div>
          </div>
        )}

        {/* Testimonials Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-blue-100"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-800 text-lg">{testimonial.name}</h3>
                  <div className="flex">{renderStars(testimonial.rating)}</div>
                </div>
                
                {testimonial.dish && (
                  <div className="mb-3">
                    <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                      {testimonial.dish}
                    </span>
                  </div>
                )}
                
                <p className="text-gray-600 mb-4 leading-relaxed">{testimonial.review}</p>
                
                <div className="text-sm text-gray-500 border-t pt-3">
                  {new Date(testimonial.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Statistics */}
        <div className="mt-12 bg-[#ca3d2a] rounded-2xl p-8 text-white">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">{testimonials.length}</div>
              <div className="text-red-100">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">
                {(testimonials.reduce((acc, t) => acc + t.rating, 0) / testimonials.length).toFixed(1)}
              </div>
              <div className="text-red-100">Average Rating</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">100%</div>
              <div className="text-red-100">Fresh Seafood</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TestimonialPage;