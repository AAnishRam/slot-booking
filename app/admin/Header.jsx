import React from "react";
import { Download } from "lucide-react";
import Image from "next/image";
import goml from "../assets/goml.png";

export default function Header({ exportToCSV, exportToJSON, selectedDate }) {
  return (
    <>
      <Image src={goml} width={150} height={50} className="mb-10" alt="Logo" />
      <div className="bg-orange-200 border border-orange-300 rounded-lg p-6 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-orange-700">Seat Booking Dashboard</h1>
          <p className="text-orange-600 mt-1">Manage and track seat reservations</p>
        </div>
        <div className="flex gap-3">
          <button onClick={exportToCSV} className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700">
            <Download size={16} /> Export CSV
          </button>
          <button onClick={exportToJSON} className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800">
            <Download size={16} /> Export JSON
          </button>
        </div>
      </div>
    </>
  );
}