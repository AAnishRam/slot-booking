"use client";
import React, { useState, useMemo, useEffect } from "react";
import {
  Download,
  Calendar,
  User,
  MapPin,
  Filter,
  Search,
  X,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import goml from "../assets/goml.png";
import { getBookingsByDate } from "../services/getBookings";
import { deleteSlot } from "../services/deleteSlot";

export default function Report() {
  const getTomorrow = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().slice(0, 10);
  };
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [bookingData, setBookingData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(getTomorrow());
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!selectedDate) return;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [year, month, day] = selectedDate.split("-");
        const formattedDate = `${day}-${month}-${year}`;

        const res = await getBookingsByDate(formattedDate);
        if (res?.success && res.data) {
          const { list_of_booked, list_of_cancelled } = res.data;

          const combined = [
            ...(list_of_booked || []).map((email) => ({
              email,
              status: "booked",
            })),
            ...(list_of_cancelled || []).map((email) => ({
              email,
              status: "cancelled",
            })),
          ];
          setBookingData(combined);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setBookingData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedDate]);

  const filteredBookings = useMemo(() => {
    let filtered = bookingData;

    if (statusFilter !== "all") {
      filtered = filtered.filter((booking) => booking.status === statusFilter);
    }

    if (searchTerm.trim()) {
      filtered = filtered.filter((booking) =>
        booking.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [bookingData, statusFilter, searchTerm]);

  const handleDeleteSlot = async () => {
    const dateInput = prompt("Enter date to delete (dd-mm-yyyy format):");

    if (!dateInput) return;

    const datePattern = /^\d{2}-\d{2}-\d{4}$/;
    if (!datePattern.test(dateInput)) {
      alert("Invalid date format. Please use dd-mm-yyyy format.");
      return;
    }

    const confirmDelete = window.confirm(
      `Are you sure you want to delete the slot for ${dateInput}?`
    );

    if (confirmDelete) {
      try {
        console.log(await deleteSlot(dateInput));
      } catch (error) {}
    }
  };

  const statistics = useMemo(() => {
    const total = bookingData.length;
    const booked = bookingData.filter((b) => b.status === "booked").length;
    const cancelled = bookingData.filter(
      (b) => b.status === "cancelled"
    ).length;

    return { total, booked, cancelled };
  }, [bookingData]);

  const exportToCSV = () => {
    if (filteredBookings.length === 0) {
      alert("No data to export");
      return;
    }

    const headers = ["Email", "Status"];
    const csvContent = [
      headers.join(","),
      ...filteredBookings.map((booking) =>
        [booking.email, booking.status].map((field) => `"${field}"`).join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `seat-bookings-${selectedDate || "all"}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const exportToJSON = () => {
    if (filteredBookings.length === 0) {
      alert("No data to export");
      return;
    }

    const exportData = {
      exportDate: new Date().toISOString(),
      selectedDate: selectedDate,
      totalRecords: filteredBookings.length,
      data: filteredBookings,
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json",
    });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `seat-bookings-${selectedDate || "all"}.json`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "booked":
        return "bg-green-100 text-green-800 border-green-300";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setDepartmentFilter("all");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleDeleteSlot = async () => {
    const dateInput = prompt("Enter date to delete (dd-mm-yyyy format):");

    if (!dateInput) return;

    const datePattern = /^\d{2}-\d{2}-\d{4}$/;
    if (!datePattern.test(dateInput)) {
      alert("Invalid date format. Please use dd-mm-yyyy format.");
      return;
    }

    const confirmDelete = window.confirm(
      `Are you sure you want to delete the slot for ${dateInput}?`
    );

    if (confirmDelete) {
      try {
        console.log(await deleteSlot(dateInput));
      } catch (error) {}
    }
  };

  return (
    <div className="min-h-screen w-full bg-amber-50 p-6 flex flex-col">
      <Image src={goml} width={150} height={50} className="mb-10" alt="Logo" />

      <div className="bg-orange-200 border border-orange-300 rounded-lg p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-orange-700">
              Seat Booking Dashboard
            </h1>
            <p className="text-orange-600 mt-1">
              Manage and track seat reservations
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={exportToCSV}
              disabled={filteredBookings.length === 0}
              className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg cursor-pointer hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download size={16} /> Export CSV
            </button>
            <button
              onClick={exportToJSON}
              disabled={filteredBookings.length === 0}
              className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg cursor-pointer hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download size={16} /> Export JSON
            </button>
            <button
              onClick={handleDeleteSlot}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg cursor-pointer hover:bg-red-700"
            >
              <Trash2 size={16} /> Delete Slot
            </button>
          </div>
        </div>
      </div>

      <div className="bg-orange-100 border border-orange-300 rounded-lg p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-orange-700 mb-2">
              <Calendar size={16} className="inline mr-1" /> Select Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-orange-700 mb-2">
              <Search size={16} className="inline mr-1" /> Search
            </label>
            <input
              type="text"
              placeholder="Search by email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-orange-700 mb-2">
              <Filter size={16} className="inline mr-1" /> Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="all">All Status</option>
              <option value="booked">Booked</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={clearFilters}
              className="w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center justify-center gap-2"
            >
              <X size={16} /> Clear Filters
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-orange-100 p-6 rounded-lg border border-orange-200">
          <div className="flex items-center">
            <div className="p-2 bg-orange-300/40 rounded-lg">
              <Calendar className="w-6 h-6 text-orange-700" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-orange-600">
                Total Bookings
              </p>
              <p className="text-2xl font-bold text-orange-800">
                {statistics.total}
              </p>
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
              <p className="text-2xl font-bold text-green-800">
                {statistics.booked}
              </p>
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
              <p className="text-2xl font-bold text-red-800">
                {statistics.cancelled}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-orange-100 rounded-lg border border-orange-200 overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto"></div>
            <p className="mt-2 text-orange-600">Loading bookings...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full divide-y divide-orange-300">
              <thead className="bg-orange-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-orange-700 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-orange-700 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-orange-200">
                {filteredBookings.length > 0 ? (
                  filteredBookings.map((item, idx) => (
                    <tr key={idx} className=" bg-orange-50 hover:bg-orange-100">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(
                            item.status
                          )}`}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={2}
                      className="px-6 py-8 text-center text-orange-600"
                    >
                      {selectedDate
                        ? "No bookings found for the selected date and filters"
                        : "Please select a date to view bookings"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="mt-8 text-center text-sm text-orange-600">
        {selectedDate && (
          <span className="text-orange-800 font-medium">
            Showing results for: {formatDate(selectedDate)}
          </span>
        )}
        {filteredBookings.length > 0 && (
          <span className="ml-4">
            ({filteredBookings.length} of {bookingData.length} records)
          </span>
        )}
      </div>
    </div>
  );
}
