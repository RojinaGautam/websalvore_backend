import React, { useEffect, useState } from "react";
import aboutseabig from "../assets/aboutseabig.png";
import aboutsea from "../assets/aboutsea.png";
import aboutgirl from "../assets/aboutgirl.png";
import backgroundImg from "../assets/background.jpg"; 

const AboutUs = () => {
  const [restaurantName, setRestaurantName] = useState("Salvore Restaurant");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/settings", {
          headers: {
            "Content-Type": "application/json"
          }
        });
        if (res.ok) {
          const data = await res.json();
          if (data.data && data.data.restaurantName) {
            setRestaurantName(data.data.restaurantName);
          }
          if (data.data && data.data.description) {
            setDescription(data.data.description);
          }
        }
      } catch (e) {
        // fallback to default
      }
    };
    fetchSettings();
  }, []);

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
      {/* Top Section */}
      <section className="flex flex-col md:flex-row p-8 gap-8 relative z-10">
        {/* Left Image */}
        <div className="md:w-1/2">
          <img
            src={aboutseabig}
            alt="Seafood table"
            className="rounded-lg shadow-lg w-full object-cover h-[32rem] max-h-[90vh]"
          />
        </div>

        {/* Right Text and Stacked Images */}
        <div className="md:w-1/2 flex flex-col justify-center">
          <h2 className="text-yellow-400 text-2xl md:text-3xl font-bold mb-4">
            Welcome to {restaurantName} — Savor the Sea.
          </h2>
          {description && description.split(/\n\n/).map((para, idx) => (
            <p key={idx} className="text-gray-200 mb-4">{para}</p>
          ))}
          <p className="text-yellow-300 font-semibold">
            Come dine with us. Savor the Sea.
          </p>

          {/* Right bottom stacked images */}
          <div className="flex mt-16 gap-6 justify-end">
            <img
              src={aboutgirl}
              alt="Guest enjoying seafood"
              className="h-80 w-80 object-cover rounded-lg shadow-md"
            />
            <img
              src={aboutsea}
              alt="Seafood platter"
              className="h-72 w-72 object-cover rounded-lg shadow-md"
            />
          </div>
        </div>
      </section>

      {/* Bottom Left Text */}
      <h1 className="absolute bottom-16 left-40 text-5xl md:text-6xl font-extrabold text-white z-30">
        About Us
      </h1>
    </main>
  );
};

export default AboutUs;
