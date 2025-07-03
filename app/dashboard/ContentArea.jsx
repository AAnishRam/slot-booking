"use client";

import React, { useState } from "react";
import { Building } from "lucide-react";
import Lottie from "lottie-react";
import desk from "../assets/animations/desk.json"; // Adjust the path as necessary

const ContentArea = ({ children }) => {
  const [isBottomSeatOccupied, setIsBottomSeatOccupied] = useState(false);
  const getAnimationSegment = isBottomSeatOccupied ? [57, 120] : [48, 49];

  return (
    <div className="lg:col-span-2">
      <div className="bg-orange-100 border border-orange-300 rounded-2xl p-8 shadow-lg min-h-[400px] flex flex-col items-center justify-center">
        {children || (
          <div className="text-center text-orange-600">
            <h2 className="text-2xl font-semibold ">
              {isBottomSeatOccupied
                ? "Seat Booked for Tomorrow!"
                : "Book Your Seat for Tomorrow"}
            </h2>
            <Lottie
              animationData={desk}
              loop
              autoplay
              initialSegment={getAnimationSegment}
              style={{ width: "100%", height: "95%" }}
            />
          </div>
        )}
        <div className="flex gap-4 mt-10 flex-wrap items-center justify-center">
          <button
            onClick={() => setIsBottomSeatOccupied(true)}
            className=" cursor-pointer px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg 
              hover:bg-emerald-500 active:bg-emerald-700 
              disabled:bg-gray-600 disabled:cursor-not-allowed
              transition-colors duration-200 ease-in-out"
            disabled={isBottomSeatOccupied}
          >
            Book Seat
          </button>

          <button
            onClick={() => setIsBottomSeatOccupied(false)}
            className="cursor-pointer  px-6 py-3 bg-red-600 text-white font-medium rounded-lg 
              hover:bg-red-500 active:bg-red-700 
              disabled:bg-gray-600 disabled:cursor-not-allowed
              transition-colors duration-200 ease-in-out"
            disabled={!isBottomSeatOccupied}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContentArea;
