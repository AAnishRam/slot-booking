import React, { useMemo } from "react";
import { Calendar, User, X } from "lucide-react";

export default function Statistics({ bookingData }) {
  const statistics = useMemo(() => {
    const total = bookingData.length;
    const booked = bookingData.filter(b => b.status === "booked").length;
    const cancelled = bookingData.filter(b => b.status === "cancelled").length;
    return { total, booked, cancelled };
  }, [bookingData]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-orange-100 p-6 rounded-lg border border-orange-200">
        <div className="flex items-center">
          <div className="p-2 bg-orange-300/40 rounded-lg">
            <Calendar className="w-6 h-6 text-orange-700" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-orange-600">Total Bookings</p>
            <p className="text-2xl font-bold text-orange-800">{statistics.total}</p>
          </div>
        </div>
      </div>
      <div className="bg-orange-100 p-6 rounded-lg border border-orange-200">
        <div className="flex items-center">
          <div className="p-2 bg-green-300/40 rounded-lg">
            <User className="w-6 h-6 text-green-700" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-orange-600">Confirmed</p>
            <p className="text-2xl font-bold text-green-800">{statistics.booked}</p>
          </div>
        </div>
      </div>
      <div className="bg-orange-100 p-6 rounded-lg border border-orange-200">
        <div className="flex items-center">
          <div className="p-2 bg-red-300/40 rounded-lg">
            <X className="w-6 h-6 text-red-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-orange-600">Cancelled</p>
            <p className="text-2xl font-bold text-red-800">{statistics.cancelled}</p>
          </div>
        </div>
      </div>
    </div>
  );
}