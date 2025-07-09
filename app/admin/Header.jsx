"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Download } from "lucide-react";
import goml from "../assets/goml.png";
import AddForm from "./AddForm";
import { initializeSlot } from "../services/intializeSlot";

export default function Header({
  exportToCSV,
  exportToJSON,
  filteredBookings,
  selectedDate,
  enableSlot,
  disableSlot,
  handleDeleteSlot,
  toast,
}) {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAdd = async (email) => {
    setIsLoading(true);
    toast.success(`Added booking for ${email}`);
    setIsLoading(false);
    setShowModal(false);
  };

  const handleInitializeSlot = async () => {
    await initializeSlot();
  };

  return (
    <>
      <Image src={goml} width={150} height={50} className="mb-10" alt="Logo" />
      <div className="bg-orange-200 border border-orange-300 rounded-lg p-6 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-orange-700">
              Seat Booking Dashboard
            </h1>
            <p className="text-orange-600 mt-1">
              Manage and track seat reservations
            </p>
          </div>
          <div className="flex flex-col md:flex-row md:flex-wrap gap-3 w-full lg:w-auto">
            <button
              onClick={exportToCSV}
              disabled={filteredBookings.length === 0}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg cursor-pointer hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto transition-colors"
            >
              <Download size={16} /> Export CSV
            </button>
            <button
              onClick={exportToJSON}
              disabled={filteredBookings.length === 0}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-black text-white rounded-lg cursor-pointer hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto transition-colors"
            >
              <Download size={16} /> Export JSON
            </button>
            <button
              onClick={handleInitializeSlot}
              className="flex items-center justify-center px-4 py-2 cursor-pointer bg-green-600 text-white rounded-lg hover:bg-green-700 w-full md:w-auto transition-colors"
            >
              Initialize
            </button>
            <button
              onClick={enableSlot}
              className="flex items-center justify-center px-4 py-2 cursor-pointer bg-green-600 text-white rounded-lg hover:bg-green-700 w-full md:w-auto transition-colors"
            >
              Enable Slot
            </button>
            <button
              onClick={disableSlot}
              className="flex items-center justify-center px-4 py-2 cursor-pointer bg-red-600 text-white rounded-lg hover:bg-red-700 w-full md:w-auto transition-colors"
            >
              Disable Slot
            </button>
            <button
              onClick={handleDeleteSlot}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-amber-300 text-white rounded-lg cursor-pointer hover:bg-amber-500 w-full md:w-auto transition-colors"
            >
              Delete Slot
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center justify-center px-4 py-2 cursor-pointer bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-full md:w-auto transition-colors"
            >
              Add
            </button>
          </div>
        </div>
      </div>
      <AddForm
        open={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleAdd}
        isLoading={isLoading}
      />
    </>
  );
}
