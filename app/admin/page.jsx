"use client";
import React, { useState, useEffect,useMemo } from "react";
import { Toaster, toast } from "react-hot-toast";
import BookingsTable from "./BookingsTable";
import Header from "./Header";
import ReportFilter from "./Filter";
import BulkActions from "./BulkActions";
import Statistics from "./Statistics";
import { getBookingsByDate } from "../services/getBookings";
import { deleteUserBooking } from "../services/deleteUserBooking";
import { deleteSlot } from "../services/deleteSlot";
import { enableSlot, disableSlot } from "../services/slotBookings";
export default function Admin() {

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
   
   // New state for checkbox selections
   const [selectedBookings, setSelectedBookings] = useState([]);
   const [selectAll, setSelectAll] = useState(false);
   const [isDeleting, setIsDeleting] = useState(false);
 
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
             ...(list_of_booked || []).map((email) => ({ email, status: "booked" })),
             ...(list_of_cancelled || []).map((email) => ({ email, status: "cancelled" })),
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
 
   useEffect(() => {
     setSelectedBookings([]);
     setSelectAll(false);
   }, [bookingData, selectedDate]);
 
   useEffect(() => {
     const fetchData = async () => {
       const date = "08-07-2025";
       await getBookingsByDate(date);
     };
     fetchData();
   }, []);
 
   const filteredBookings = useMemo(() => {
     let filtered = bookingData;
 
     if (statusFilter !== "all") {
       filtered = filtered.filter(booking => booking.status === statusFilter);
     }
 
     if (searchTerm.trim()) {
       filtered = filtered.filter(booking =>
         booking.email.toLowerCase().includes(searchTerm.toLowerCase())
       );
     }
 
     return filtered;
   }, [bookingData, statusFilter, searchTerm]);
 
   const handleSelectBooking = (email) => {
     setSelectedBookings(prev => {
       if (prev.includes(email)) {
         return prev.filter(item => item !== email);
       } else {
         return [...prev, email];
       }
     });
   };
 
   const handleSelectAll = () => {
     if (selectAll) {
       setSelectedBookings([]);
     } else {
       const selectableBookings = filteredBookings
         .filter(booking => booking.status !== "cancelled")
         .map(booking => booking.email);
       setSelectedBookings(selectableBookings);
     }
     setSelectAll(!selectAll);
   };
 
   useEffect(() => {
     if (filteredBookings.length > 0) {
       const selectableBookings = filteredBookings.filter(booking => booking.status !== "cancelled");
       setSelectAll(selectableBookings.length > 0 && selectedBookings.length === selectableBookings.length);
     }
   }, [selectedBookings, filteredBookings]);
 
   const handleDeleteSelected = async () => {
     if (selectedBookings.length === 0) {
       alert("Please select at least one booking to delete");
       return;
     }
 
     const confirmDelete = window.confirm(
       `Are you sure you want to delete ${selectedBookings.length} selected booking(s)?`
     );
 
     if (!confirmDelete) return;
 
     setIsDeleting(true);
     const failedDeletions = [];
 
     try {
       for (const email of selectedBookings) {
         try {
           const result = await deleteUserBooking(email);
           if (!result) {
             failedDeletions.push(email);
           }
         } catch (error) {
           console.error(`Failed to delete booking for ${email}:`, error);
           failedDeletions.push(email);
         }
       }
 
       if (failedDeletions.length === 0) {
         alert(`Successfully deleted ${selectedBookings.length} booking(s)`);
         
         setBookingData(prev => 
           prev.filter(booking => !selectedBookings.includes(booking.email))
         );
       } else {
         alert(
           `Deleted ${selectedBookings.length - failedDeletions.length} booking(s). ` +
           `Failed to delete ${failedDeletions.length} booking(s): ${failedDeletions.join(', ')}`
         );
         
         const successfulDeletions = selectedBookings.filter(email => !failedDeletions.includes(email));
         setBookingData(prev => 
           prev.filter(booking => !successfulDeletions.includes(booking.email))
         );
       }
 
       setSelectedBookings([]);
       setSelectAll(false);
 
     } catch (error) {
       console.error("Error during bulk delete:", error);
       alert("An error occurred while deleting bookings. Please try again.");
     } finally {
       setIsDeleting(false);
     }
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
 
   const statistics = useMemo(() => {
     const total = bookingData.length;
     const booked = bookingData.filter(b => b.status === "booked").length;
     const cancelled = bookingData.filter(b => b.status === "cancelled").length;
     
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
         [booking.email, booking.status]
           .map(field => `"${field}"`) 
 
           .join(",")
       ),
     ].join("\n");
     
     const blob = new Blob([csvContent], { type: "text/csv" });
     const url = window.URL.createObjectURL(blob);
     const link = document.createElement("a");
     link.href = url;
     link.download = `seat-bookings-${selectedDate || 'all'}.csv`;
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
       data: filteredBookings
     };
 
     const blob = new Blob([JSON.stringify(exportData, null, 2)], {
       type: "application/json",
     });
     const url = window.URL.createObjectURL(blob);
     const link = document.createElement("a");
     link.href = url;
     link.download = `seat-bookings-${selectedDate || 'all'}.json`;
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
  
return (
  <div className="min-h-screen w-full bg-amber-50 p-6 flex flex-col">
    <Toaster position="top-right" />
    <Header
      exportToCSV={exportToCSV}
      exportToJSON={exportToJSON}
      filteredBookings={filteredBookings}
      selectedDate={selectedDate}
      enableSlot={async () => {
        try {
          await enableSlot();
          toast.success("Slot enabled successfully!");
        } catch (err) {
          toast.error("Failed to enable slot.");
        }
      }}
      disableSlot={async () => {
        try {
          await disableSlot();
          toast.success("Slot disabled successfully!");
        } catch (err) {
          toast.error("Failed to disable slot.");
        }
      }}
      handleDeleteSlot={handleDeleteSlot}
      toast={toast}
    />
    <ReportFilter
      selectedDate={selectedDate}
      setSelectedDate={setSelectedDate}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      statusFilter={statusFilter}
      setStatusFilter={setStatusFilter}
      clearFilters={clearFilters}
    />
    <BulkActions
      selectedBookings={selectedBookings}
      isDeleting={isDeleting}
      handleDeleteSelected={handleDeleteSelected}
    />
    <Statistics statistics={statistics} />
    <BookingsTable
      filteredBookings={filteredBookings}
      selectAll={selectAll}
      handleSelectAll={handleSelectAll}
      selectedBookings={selectedBookings}
      handleSelectBooking={handleSelectBooking}
      getStatusColor={getStatusColor}
      isLoading={isLoading}
    />
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