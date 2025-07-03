"use client";

import React from "react";

const Header = ({ currentDayName, userName, userInitials }) => {
  return (
    <div className="flex justify-between items-start mb-8">
      <div>
        <div className="flex items-center space-x-4 mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Happy {currentDayName}, {userName}! 🌟
          </h2>
        </div>
      </div>

      {/* User Profile */}
      <div className="flex items-center space-x-3">
        <div className="text-right">
          <div className="text-sm font-medium text-orange-700">{userName}</div>
          <div className="text-xs text-orange-600">Employee</div>
        </div>
        <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold">
          {userInitials}
        </div>
      </div>
    </div>
  );
};

export default Header;
