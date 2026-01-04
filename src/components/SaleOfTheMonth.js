import React, { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import { Link } from "react-router-dom";

const SaleOfTheMonth = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const saleEndTime = new Date("2025-09-05T23:59:59").getTime();

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = saleEndTime - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col md:flex-row mx-4 md:mx-8 gap-8 max-w-7xl mx-auto">
      {/* Left side: Sale Component */}
      <div className="sale-of-month w-full md:w-1/2 relative p-8 rounded-xl shadow-lg bg-cover bg-center text-white">
        <div className="absolute top-4 left-4 bg-red-500 text-white font-bold px-4 py-1 rounded-full shadow-md transform rotate-12">
          BEST DEALS
        </div>

        <h2 className="text-4xl font-extrabold mt-12 mb-6 drop-shadow-lg">
          Sale of the Month
        </h2>

        <div className="countdown flex justify-center gap-4 mb-6">
          {["days", "hours", "minutes", "seconds"].map((unit) => (
            <div
              key={unit}
              className="time-unit flex flex-col items-center bg-black/50 rounded-lg px-4 py-2 shadow-md"
            >
              <span className="number text-2xl  font-bold">
                {String(timeLeft[unit]).padStart(2, "0")}
              </span>
              <span className="label text-white text-xs">
                {unit.toUpperCase()}
              </span>
            </div>
          ))}
        </div>

        <Link
          to="/shop"
          className="mt-6 inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500 text-teal-900 font-bold rounded-full text-lg shadow-[0_0_20px_rgba(255,255,255,0.6)] transition-transform transform-gpu hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.9)]"
        >
          🛒 Shop Now <Clock size={20} />
        </Link>
      </div>

      {/* Right side: Placeholder for other content */}
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <div className="bg-gray-100 w-full h-80 rounded-xl shadow-lg flex items-center justify-center">
          <span className="text-gray-400 font-bold text-xl">
            Right Side Content Here
          </span>
        </div>
      </div>
    </div>
  );
};

export default SaleOfTheMonth;
