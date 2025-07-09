export const exportToCSV = (filteredBookings, selectedDate) => {
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

export const exportToJSON = (filteredBookings, selectedDate) => {
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

export const getStatusColor = (status) => {
  switch (status) {
    case "booked":
      return "bg-green-100 text-green-800 border-green-300";
    case "cancelled":
      return "bg-red-100 text-red-800 border-red-300";
    default:
      return "bg-gray-100 text-gray-800 border-gray-300";
  }
};

export const formatDate = (dateString) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};