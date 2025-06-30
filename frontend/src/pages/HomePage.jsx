import React from "react";
import rightImage from "../assets/hero-section.png";

export default function HomePage() {
  return (
    <main className="flex h-[90vh] text-white">
      {/* Left Side - 45% */}
      <div className="w-[45%] flex flex-col justify-center px-12">
        <h1
          className="font-barlowCondensed text-[62px] uppercase leading-tight font-bold"
        >
          eNJOY Your Delicious
        </h1>

        <div className="flex justify-end">
          <h1
            className="font-barlowCondensed text-[131px] text-[#ca3d2a] uppercase leading-none font-extrabold"
          >
            MEaL
          </h1>
        </div>

        <p
          className="text-[12px] mt-4 font-bold"
          style={{ color: "#fcb300", fontFamily: "'Canva Sans', sans-serif" }}
        >
          Salvore – Where every bite is savory, soulful and unforgettable.
        </p>

      </div>

      {/* Right Side - 55% */}
      <div className="w-[55%] relative">
        <img
          src={rightImage}
          alt="Delicious meal"
          className="w-full h-full object-cover absolute inset-0"
        />
      </div>
    </main>
  );
}
