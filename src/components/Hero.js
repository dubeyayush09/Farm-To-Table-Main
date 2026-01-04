import React from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const handleShopNow = () => {
    navigate("/Shop");
  };

  return (
    <div className="hero relative overflow-hidden">
      {/* Dark Overlay for readability */}
      <div className="absolute inset-0 bg-black/40 rounded-md"></div>

      {/* Running Offer Text */}
      <div className="absolute top-0 left-0 w-full bg-yellow-400 text-teal-900 font-bold py-2 overflow-hidden rounded-t-md z-20">
        <div className="animate-marquee whitespace-nowrap">
          🎉 Mega Sale! Upto 48% OFF on Fresh Organic Foods — Shop Now & Save
          Big! 🎉
        </div>
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-lg">
          Fresh & Healthy Organic Food
        </h1>
        <p className="mt-4 text-lg md:text-2xl font-medium">
          🌱 Sale up to{" "}
          <span className="text-yellow-300 font-bold">48% OFF</span> this
          season!
        </p>

        {/* Shop Now Button */}
        <button
          onClick={handleShopNow}
          className="mt-8 inline-block px-8 py-4 text-lg font-semibold rounded-full
             bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500 
             text-teal-900 shadow-[0_0_20px_rgba(255,255,255,0.6)] 
             transform-gpu origin-center transition-transform duration-300 ease-out
             hover:scale-80 hover:shadow-2xl"
        >
          🛒 Shop Now
        </button>
      </div>
    </div>
  );
};

export default Hero;
