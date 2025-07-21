import React, { useState, useEffect } from 'react';
import backgroundImg from "../assets/background.jpg";

const filterOptions = ["Signature Dishes", "Special Menu", "Beverage Menu"];

const MenuPage = () => {
  const [filter, setFilter] = useState("Signature Dishes");
  const [menuItems, setMenuItems] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [fetchError, setFetchError] = useState('');

  // Fetch menu items from backend
  const fetchMenuItems = async () => {
    setFetching(true);
    setFetchError('');
    try {
      const res = await fetch('http://localhost:4000/api/menu');
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

  // Filter menu items by category
  const getFilteredMenuItems = () => {
    if (!menuItems.length) return [];
    if (filter === 'Signature Dishes') return menuItems.filter(item => item.category === 'Signature');
    if (filter === 'Special Menu') return menuItems.filter(item => item.category === 'Special');
    if (filter === 'Beverage Menu') return menuItems.filter(item => item.category === 'Beverage');
    return menuItems;
  };

  return (
    <main className="relative min-h-screen text-white overflow-hidden">
      {/* Background Image */}
      <img
        src={backgroundImg}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover blur-md z-0"
        style={{ filter: 'blur(4px)' }}
      />
      <div className="absolute inset-0 bg-black/70 z-0" />
      <div className="p-8 relative z-10">
        {/* Fetch error and loading */}
        {fetchError && <div className="text-red-600 text-center font-semibold py-2 bg-white bg-opacity-80 rounded mb-4">{fetchError}</div>}
        {fetching && <div className="text-gray-600 text-center font-semibold py-2 bg-white bg-opacity-80 rounded mb-4">Loading menu items...</div>}
        {/* Filter Buttons */}
        <div className="mb-6 flex gap-4 justify-end">
          {filterOptions.map(option => (
            <button
              key={option}
              onClick={() => setFilter(option)}
              className={`px-4 py-2 rounded-full font-semibold border transition ${
                filter === option
                  ? "bg-red-600 text-white border-red-600"
                  : "bg-white text-black border-gray-300 hover:bg-red-100"
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Dynamic Menu Items */}
        <>
          <h1 className="text-6xl font-extrabold text-center mb-8">{filter}</h1>
          <div className="bg-[#d44d32] rounded-3xl p-8 flex flex-wrap justify-center gap-8">
            {getFilteredMenuItems().map(item => (
              <div
                key={item.id}
                className="bg-[#d44d32] rounded-lg shadow-lg flex flex-col items-center p-4 w-72"
              >
                <div className="bg-red-600 rounded-lg mb-4 w-full flex items-center justify-center" style={{height: '12rem'}}>
                  {item.image ? (
                    <img
                      src={`http://localhost:4000/uploads/${item.image}`}
                      alt={item.name}
                      className="rounded-lg object-cover h-full w-full"
                    />
                  ) : (
                    <span className="text-white">No Image</span>
                  )}
                </div>
                <div className="text-center">
                  <div className="font-semibold italic text-base text-black mb-2">{item.name}</div>
                  <div className="text-black font-bold text-2xl mb-2">${item.price}</div>
                  <button className="bg-yellow-300 hover:bg-yellow-400 text-black font-bold py-2 px-6 rounded-full transition">
                    ADD TO CART
                  </button>
                  {item.description && (
                    <div className="text-white text-xs md:text-sm mt-2" style={{textTransform: 'uppercase', letterSpacing: '0.5px'}}>
                      {item.description}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      </div>
    </main>
  );
};

export default MenuPage;
