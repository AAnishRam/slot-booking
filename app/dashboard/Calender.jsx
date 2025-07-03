"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CalenderComponent = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const today = currentDate.getDate();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
  const startDay = firstDay === 0 ? 6 : firstDay - 1;

  return (
    <div className="bg-orange-100 border border-orange-300 rounded-2xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-orange-700">
          {monthNames[currentMonth]} {currentYear}
        </h3>
        <div className="flex items-center space-x-2">
          <ChevronLeft className="w-4 h-4 text-orange-600 cursor-pointer hover:text-orange-800" />
          <ChevronRight className="w-4 h-4 text-orange-600 cursor-pointer hover:text-orange-800" />
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-4">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
          <div
            key={day}
            className="text-xs text-orange-600 text-center py-2 font-medium"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: startDay }, (_, i) => (
          <div key={`empty-${i}`} className="w-8 h-8"></div>
        ))}

        {Array.from({ length: daysInMonth }, (_, i) => {
          const date = i + 1;
          const isToday = date === today;

          return (
            <button
              key={date}
              onClick={() => setSelectedDate(date)}
              className={`w-8 h-8 text-sm rounded-lg transition-all duration-200 ${
                isToday
                  ? "bg-orange-600 text-white shadow-lg"
                  : selectedDate === date
                  ? "bg-orange-400 text-white"
                  : "text-orange-700 hover:bg-orange-200"
              }`}
            >
              {date}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CalenderComponent;
