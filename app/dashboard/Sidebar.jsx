"use client";

import React from "react";
import Image from "next/image";
import { Calendar, MessageSquare, Settings } from "lucide-react";

const Sidebar = ({ logo }) => {
  const menuItems = [
    { icon: Calendar, label: "My Bookings" },
    { icon: MessageSquare, label: "Notifications" },
    { icon: Settings, label: "Settings" },
  ];

  return (
    <div className="w-64 bg-orange-200 border border-orange-300 text-black min-h-screen shadow-2xl rounded-lg mr-6">
      <div className="p-6">
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-32 h-12 flex items-center justify-center mb-2">
            <Image
              src={logo}
              width={150}
              height={50}
              className="mt-5 mb-10"
              alt="Logo"
            />
          </div>
        </div>

        <nav className="space-y-2">
          <div className="bg-white/20 rounded-xl p-3 backdrop-blur-sm">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-white rounded-md flex items-center justify-center">
                <div className="w-3 h-3 bg-indigo-600 rounded-sm"></div>
              </div>
              <span className="font-medium">Dashboard</span>
            </div>
          </div>

          {menuItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 p-3 rounded-xl hover:bg-orange-300/40 transition-colors cursor-pointer text-orange-700"
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
