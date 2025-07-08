"use client";
import { useState, useEffect, useMemo } from "react";
import { getBookingsByDate } from "../services/getBookings";
import { deleteUserBooking } from "../services/deleteUserBooking";
import { deleteSlot } from "../services/deleteSlot";
import { enableSlot, disableSlot } from "../services/slotBookings";
import { toast } from "react-hot-toast";

export function useAdminBookings() {
  //get tomorrow's date in yyyy-mm-dd format
  const getTomorrow = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().slice(0, 10);
  };

  const [bookingData, setBookingData] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [selectedBookings, setSelectedBookings] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedDate, setSelectedDate] = useState(getTomorrow()); 
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  // Fetch bookings when date changes
useEffect(() => {
  if (!selectedDate) {
    setBookingData([]);
    setFilteredBookings([]);
    return;
  }

  setIsLoading(true);
  setError(false);

  const controller = new AbortController(); // optional, for canceling
  const timeoutId = setTimeout(() => {
    setError(true);
    toast.error("Request timed out. Please try again.");
    controller.abort();
    setIsLoading(false);
  }, 5000); 

  const [year, month, day] = selectedDate.split("-");
  const formattedDate = `${day}-${month}-${year}`;

  getBookingsByDate(formattedDate)
    .then((response) => {
      clearTimeout(timeoutId); // Clear timeout on success
      if (response && response.data) {
        const { list_of_booked = [], list_of_cancelled = [] } = response.data;
        const bookings = [
          ...list_of_booked.map((email) => ({ email, status: "booked" })),
          ...list_of_cancelled.map((email) => ({ email, status: "cancelled" })),
        ];
        setBookingData(bookings);
        setFilteredBookings(bookings);
      } else {
        setError(true);
        toast.error("No data found.");
        setBookingData([]);
        setFilteredBookings([]);
      }
    })
    .catch((err) => {
      clearTimeout(timeoutId);
      setError(true);
      toast.error("Failed to fetch bookings. Please try again later.");
      setBookingData([]);
      setFilteredBookings([]);
    })
    .finally(() => {
      setIsLoading(false);
    });

  return () => clearTimeout(timeoutId); // clean up if component unmounts
}, [selectedDate]);

  // Filter bookings when search/status changes
  useEffect(() => {
    let filtered = bookingData;
    if (statusFilter !== "all") {
      filtered = filtered.filter((b) => b.status === statusFilter);
    }
    if (searchTerm) {
      filtered = filtered.filter((b) =>
        b.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredBookings(filtered);
  }, [bookingData, statusFilter, searchTerm]);

  // Statistics
  const statistics = useMemo(
    () => ({
      total: bookingData.length,
      booked: bookingData.filter((b) => b.status === "booked").length,
      cancelled: bookingData.filter((b) => b.status === "cancelled").length,
    }),
    [bookingData]
  );

  // Handlers
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedBookings([]);
    } else {
      setSelectedBookings(
        filteredBookings
          .filter((b) => b.status !== "cancelled")
          .map((b) => b.email)
      );
    }
    setSelectAll(!selectAll);
  };

  const handleSelectBooking = (email) => {
    setSelectedBookings((prev) =>
      prev.includes(email)
        ? prev.filter((e) => e !== email)
        : [...prev, email]
    );
  };

  const handleDeleteSelected = async () => {
    setIsDeleting(true);
    try {
      for (const email of selectedBookings) {
        await deleteUserBooking(email);
      }
      // Refetch bookings from backend
      const [year, month, day] = selectedDate.split("-");
      const formattedDate = `${day}-${month}-${year}`;
      const response = await getBookingsByDate(formattedDate);
      let bookings = [];
      if (response && response.data) {
        const { list_of_booked = [], list_of_cancelled = [] } = response.data;
        bookings = [
          ...list_of_booked.map(email => ({ email, status: "booked" })),
          ...list_of_cancelled.map(email => ({ email, status: "cancelled" })),
        ];
      }
      setBookingData(bookings);
      setFilteredBookings(bookings);
      setSelectedBookings([]);
      setSelectAll(false);
      toast.success("Selected bookings deleted");
    } catch {
      toast.error("Failed to delete some bookings");
    }
    setIsDeleting(false);
  };

  const handleDeleteSlot = async () => {
    try {
      await deleteSlot(selectedDate);
      setBookingData([]);
      setFilteredBookings([]);
      toast.success("Slot deleted");
    } catch {
      toast.error("Failed to delete slot");
    }
  };

  const handleEnableSlot = async () => {
    try {
      await enableSlot(selectedDate);
      toast.success("Slot enabled");
    } catch {
      toast.error("Failed to enable slot");
    }
  };

  const handleDisableSlot = async () => {
    try {
      await disableSlot(selectedDate);
      toast.success("Slot disabled");
    } catch {
      toast.error("Failed to disable slot");
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
  };

  return {
    bookingData,
    filteredBookings,
    selectedBookings,
    selectAll,
    selectedDate,
    setSelectedDate,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    isDeleting,
    isLoading,
    statistics,
    handleSelectAll,
    handleSelectBooking,
    handleDeleteSelected,
    handleDeleteSlot,
    enableSlot: handleEnableSlot,
    disableSlot: handleDisableSlot,
    clearFilters,
    toast,
    error,
    setError,
  };
}