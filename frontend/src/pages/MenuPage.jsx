import React, { useState } from 'react';
import fish from '../assets/fish.png';
import lobster from '../assets/lobster.png';
import octopus from '../assets/octopus.png';
import prawn from '../assets/prawn.png';
import grilledplatter from '../assets/grilledplatter.png';
import boiledplatter from '../assets/boiledplatter.png';
import red from '../assets/red.png';
import yellow from '../assets/yellow.png';
import pink from '../assets/pink.png';
import blue from '../assets/blue.png';
import backgroundImg from "../assets/background.jpg"; 

const signatureDishes = [
  {
    id: 1,
    name: "Simple Seasoned Grilled Fish",
    price: 18,
    image: fish,
  },
  {
    id: 2,
    name: "Broiled Buttery Lobster Tails",
    price: 32,
    image: lobster,
  },
  {
    id: 3,
    name: "Barbecue Grilled Octopus with Oregano",
    price: 28,
    image: octopus,
  },
  {
    id: 4,
    name: "Tiger prawns with chermoula butter",
    price: 30,
    image: prawn,
  },
];

const specialMenu = [
  {
    id: 1,
    name: "Grilled Sea Food Platter",
    price: 45,
    image: grilledplatter,
    description:
      "EXPERIENCE THE OCEAN ON A PLATE WITH OUR GRILLED SEAFOOD PLATTER, FEATURING JUICY TIGER PRAWNS, TENDER CALAMARI, BUTTERY SCALLOPS, FLAME-GRILLED FISH, AND GARLIC-INFUSED MUSSELS. SERVED WITH ROASTED VEGETABLES, LEMON WEDGES, AND THREE FLAVORFUL DIPS, THIS SIZZLING PLATTER IS A VISUAL AND AROMATIC DELIGHT—PERFECT FOR SHARING AND SURE TO IMPRESS ANY SEAFOOD LOVER.",
  },
  {
    id: 2,
    name: "Boiled Sea Food Platter",
    price: 40,
    image: boiledplatter,
    description:
      "OUR BOILED SEAFOOD PLATTER IS A HEARTY AND FLAVORFUL FEAST, FEATURING A DELICIOUS MIX OF PRAWNS, CRAB LEGS, MUSSELS, AND CLAMS GENTLY BOILED WITH HERBS, GARLIC, AND SPICES. SERVED HOT WITH CORN ON THE COB, BABY POTATOES, AND A SIDE OF ZESTY BUTTER SAUCE, THIS PLATTER BRINGS OUT THE NATURAL TASTE OF THE SEA IN EVERY BITE—PERFECT FOR THOSE WHO LOVE THEIR SEAFOOD SIMPLE, FRESH, AND SATISFYING.",
  },
];

const beverageMenu = [
  {
    id: 1,
    name: "Fairy belle Cocktail",
    price: 15,
    image: red,
  },
  {
    id: 2,
    name: "Yellow Nut Mocktail",
    price: 10,
    image: yellow,
  },
  {
    id: 3,
    name: "Blueberry Lime Mocktail",
    price: 11,
    image: pink,
  },
  {
    id: 4,
    name: "Blue Lagoon Cocktail",
    price: 14,
    image: blue,
  },
];

const filterOptions = ["Signature Dishes", "Special Menu", "Beverage Menu"];

const MenuPage = () => {
  const [filter, setFilter] = useState("Signature Dishes");

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

        {/* Signature Dishes */}
        {filter === "Signature Dishes" && (
          <>
            <h2 className="text-red-400 text-3xl font-bold mb-2">Menu Highlights</h2>
            <h1 className="text-6xl font-extrabold mb-8">Signature Dishes</h1>
            <div className="bg-[#d44d32] rounded-3xl p-8 flex flex-wrap justify-center gap-8">
              {signatureDishes.map(dish => (
                <div
                  key={dish.id}
                  className="bg-[#d44d32] rounded-lg shadow-lg flex flex-col items-center p-4 w-72"
                >
                  <div className="bg-red-600 rounded-lg mb-4 w-full flex items-center justify-center" style={{height: '12rem'}}>
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="rounded-lg object-cover h-full w-full"
                    />
                  </div>
                  <div className="text-center">
                    <div className="font-semibold italic text-base text-black mb-2">{dish.name}</div>
                    <div className="text-black font-bold text-2xl mb-2">${dish.price}</div>
                    <button className="bg-yellow-300 hover:bg-yellow-400 text-black font-bold py-2 px-6 rounded-full transition">
                      ADD TO CART
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Special Menu */}
        {filter === "Special Menu" && (
          <>
            <h1 className="text-6xl font-extrabold text-center mb-8">Special Menu</h1>
            <div className="flex flex-col md:flex-row gap-8">
              {specialMenu.map(item => (
                <div
                  key={item.id}
                  className="flex-1 flex flex-col bg-[#d44d32] rounded-3xl overflow-hidden"
                >
                  <div className="bg-red-600 rounded-lg mb-4 w-full flex items-center justify-center" style={{height: '18rem'}}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="rounded-lg object-cover h-full w-full"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-lg text-black">{item.name} - <span className="font-bold">${item.price}</span></span>
                      <button className="bg-yellow-300 hover:bg-yellow-400 text-black font-bold py-1 px-6 rounded-full transition">
                        ADD TO CART
                      </button>
                    </div>
                    <div className="text-white text-xs md:text-sm" style={{textTransform: 'uppercase', letterSpacing: '0.5px'}}>
                      {item.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Beverage Menu */}
        {filter === "Beverage Menu" && (
          <>
            <h1 className="text-6xl font-extrabold text-center mb-8">Beverage Menu</h1>
            <div className="bg-[#d44d32] rounded-3xl p-8 flex flex-wrap justify-center gap-8">
              {beverageMenu.map(drink => (
                <div
                  key={drink.id}
                  className="bg-[#d44d32] rounded-lg shadow-lg flex flex-col items-center p-4 w-64"
                >
                  <div className="bg-red-600 rounded-lg mb-4 w-full flex items-center justify-center" style={{height: '14rem'}}>
                    <img
                      src={drink.image}
                      alt={drink.name}
                      className="rounded-lg object-cover h-full w-full"
                    />
                  </div>
                  <div className="text-center">
                    <div className="text-black mb-2">
                      <div className="font-semibold text-lg">{drink.name}</div>
                      <div className="font-bold text-lg">${drink.price}</div>
                    </div>
                    <button className="bg-yellow-300 hover:bg-yellow-400 text-black font-bold py-2 px-6 rounded-full transition">
                      ADD TO CART
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default MenuPage;
