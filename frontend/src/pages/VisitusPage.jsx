import React, { useState, useEffect } from "react";
import Aaron from "../assets/Aaron.png";
import Drew from "../assets/Drew.png";
import Rufus from "../assets/Rufus.png";
import Ndemi from "../assets/Ndemi.png";
import clientbig from "../assets/clientbig.png";
import blackgirl from "../assets/blackgirl.png";
import whitegirl from "../assets/whitegirl.png";
import Thankyou from "../assets/Thankyou.png";
import backgroundImg from "../assets/background.jpg";

const chefs = [
  {
    name: "Aaron Loeb",
    image: Aaron,
    title: "THE FLAVOR MASTER",
    description: "CHEF AARON HAS A DEEP UNDERSTANDING OF SPICE BLENDING AND TRADITIONAL FLAVORS"
  },
  {
    name: "Drew Felg",
    image: Drew,
    title: "THE PRESENTATION ARTIST",
    description: "WITH A KEEN EYE FOR DETAIL, CHEF DREW TURNS EVERY PLATE INTO A VISUAL MASTERPIECE."
  },
  {
    name: "Rufus Stewart",
    image: Rufus,
    title: "THE SEAFOOD SPECIALIST",
    description: "CHEF RUFUS BRINGS OUT THE BEST IN SEAFOOD WITH PERFECT TIMING, SEASONING, AND TECHNIQUE"
  },
  {
    name: "Ndemi Olteno",
    image: Ndemi,
    title: "THE INNOVATOR",
    description: "ALWAYS EXPERIMENTING WITH NEW INGREDIENTS CHEF NDEMI ADDS A CREATIVE TWIST TO THE MENU."
  }
];

const filterOptions = ["Team and Management", "Testimonial", "Contact"];

const staffImages = [Aaron, Drew, Ndemi, Rufus];

function getRandomImage(idx) {
  // Use index to keep image stable per render
  return staffImages[idx % staffImages.length];
}

const VisitusPage = () => {
  const [filter, setFilter] = useState(filterOptions[0]);
  const [contactInfo, setContactInfo] = useState({
    phone: '',
    address: '',
    website: ''
  });
  const [testimonials, setTestimonials] = useState([]);
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    // Fetch settings for contact info
    fetch('http://localhost:4000/api/settings', {
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(data => {
        if (data.data) {
          setContactInfo({
            phone: data.data.phone || '',
            address: data.data.address || '',
            website: data.data.website || ''
          });
        }
      });
  }, []);

  useEffect(() => {
    // Fetch testimonials from backend
    fetch('http://localhost:4000/api/testimonials', {
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(data => {
        if (data.data) {
          setTestimonials(data.data);
        }
      });
  }, []);

  useEffect(() => {
    // Fetch admin users from backend
    fetch('http://localhost:4000/api/users', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
      .then(res => res.json())
      .then(data => {
        if (data.data) {
          setAdmins(data.data.filter(u => u.role === 'admin'));
        }
      });
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

        {/* Team and Management */}
        {filter === "Team and Management" && (
          <div className="bg-[#d44d32] rounded-3xl p-8">
            <h1 className="text-6xl font-extrabold text-center mb-8">Team and Management</h1>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              {admins.length === 0 ? (
                <div className="col-span-4 text-center text-white text-lg">No staff/admins found.</div>
              ) : (
                admins.map((admin, idx) => (
                  <div key={admin.id} className="flex flex-col items-center">
                    <img
                      src={getRandomImage(idx)}
                      alt={admin.name}
                      className="rounded-lg object-cover h-56 w-full mb-4"
                      style={{ maxWidth: "250px" }}
                    />
                    <div className="font-bold text-lg text-white text-center">{admin.name}</div>
                    <div className="text-white text-sm text-center">{admin.position}</div>
                  </div>
                ))
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {admins.length === 0 ? null : admins.map((admin) => (
                <div key={admin.id + '-desc'} className="text-center">
                  <div className="font-bold text-yellow-300 mb-2" style={{ letterSpacing: "1px" }}>
                    {admin.department || 'Management'}
                  </div>
                  <div className="text-white font-semibold text-xs" style={{ letterSpacing: "0.5px" }}>
                    {admin.email}<br/>{admin.phone}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Testimonial */}
        {filter === "Testimonial" && (
          <div className="flex flex-col md:flex-row items-stretch bg-transparent">
            {/* Left big image */}
            <div className="md:w-1/2 flex items-center justify-center -mt-12 mb-2 md:mb-0">
              <img
                src={clientbig}
                alt="Client"
                className="rounded-lg object-cover w-full h-[40rem]"
                style={{ maxWidth: "650px" }}
              />
            </div>
            {/* Right testimonials */}
            <div className="md:w-1/2 flex flex-col justify-center pl-0 md:pl-12">
              <h1 className="text-5xl md:text-6xl font-extrabold mb-8">Our Client Say!!!</h1>
              <div className="flex flex-col gap-8">
                {testimonials.length === 0 ? (
                  <div className="text-white">No testimonials found.</div>
                ) : (
                  testimonials.map((t, idx) => (
                    <div key={t.id || idx} className="flex items-start gap-4">
                      <img
                        src={idx % 2 === 0 ? blackgirl : whitegirl}
                        alt={t.name}
                        className="rounded-lg object-cover w-20 h-20"
                      />
                      <div>
                        <div className={`font-bold text-lg text-orange-600`}>
                          {t.name} {t.rating && (
                            <span className="inline-block align-middle">
                              {Array.from({ length: t.rating }).map((_, i) => (
                                <span key={i} className="text-yellow-400 text-xl">&#9733;</span>
                              ))}
                            </span>
                          )}
                        </div>
                        <div className="text-white font-semibold text-sm mt-1">
                          “{t.message}”
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* Contact */}
        {filter === "Contact" && (
          <div className="flex flex-col md:flex-row w-full h-full">
            {/* Left Side */}
            <div className="flex-1 flex flex-col justify-center items-start p-12">
              <h1 className="text-white text-7xl font-extrabold mb-10">Thank<br />You!</h1>
              <div className="mt-8">
                <div className="text-red-500 text-xl font-bold mb-2">Contact Us :</div>
                <div className="text-white text-lg leading-relaxed">
                  {contactInfo.phone && <>{contactInfo.phone}<br /></>}
                  {contactInfo.website && <>{contactInfo.website}<br /></>}
                  {contactInfo.address && <>{contactInfo.address}</>}
                </div>
              </div>
            </div>
            {/* Right Side */}
            <div className="flex-1 min-h-[400px] flex items-center justify-center mt-8">
              <img
                src={Thankyou}
                alt="Thank You"
                className="object-cover w-full h-[60rem]"
                style={{ minHeight: "300px", maxHeight: "500px" }}
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default VisitusPage;
