"use client";
import React, { useState, useEffect, useMemo } from "react";
import Header from "./Header";
import Statistics from "./Statistics";
import BookingsTable from "./BookingsTable";
import FilterPanel from "./FilterPanel";
import Footer from "./Footer";
import { getBookingsByDate } from "../services/getBookings";
import { exportToCSV, exportToJSON, getStatusColor, formatDate } from "../utils/exportUtils";

export default function AdminPage() {
    
  const getTomorrow = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().slice(0, 10);
  };

  const [selectedDate, setSelectedDate] = useState(getTomorrow());
  const [bookingData, setBookingData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

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
            ...(list_of_booked || []).map(email => ({ email, status: "booked" })),
            ...(list_of_cancelled || []).map(email => ({ email, status: "cancelled" })),
          ];
          setBookingData(combined);
        } else {
          setBookingData([]);
        }
      } catch (error) {
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
      filtered = filtered.filter(b => b.status === statusFilter);
    }
    if (searchTerm.trim()) {
      filtered = filtered.filter(b => b.email.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    return filtered;
  }, [bookingData, statusFilter, searchTerm]);

  return (
    <div className="min-h-screen w-full bg-amber-50 p-6 flex flex-col">
      <Header
        exportToCSV={() => exportToCSV(filteredBookings, selectedDate)}
        exportToJSON={() => exportToJSON(filteredBookings, selectedDate)}
        selectedDate={selectedDate}
      />
      <FilterPanel
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />
      <Statistics bookingData={filteredBookings} />
      <BookingsTable
        bookings={filteredBookings}
        isLoading={isLoading}
        getStatusColor={getStatusColor}
      />
      <Footer />
    </div>
  );
}