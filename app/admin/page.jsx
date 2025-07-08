"use client";
import { useAdminBookings } from "./useAdminBookings";
import Header from "./Header";
import ReportFilter from "./Filter";
import BulkActions from "./BulkActions";
import Statistics from "./Statistics";
import BookingsTable from "./BookingsTable";
import { Toaster } from "react-hot-toast";
import { formatDate, getStatusColor, exportToCSV, exportToJSON } from "./utils";
import ErrorBoundary from "@/components/ErrorBoundary";

export default function AdminPage() {
  const props = useAdminBookings();

  return (
    <div className="min-h-screen w-full bg-amber-50 p-6 flex flex-col">
      <Toaster position="top-right" />
      <Header
        exportToCSV={() =>
          exportToCSV(props.filteredBookings, props.selectedDate)
        }
        exportToJSON={() =>
          exportToJSON(props.filteredBookings, props.selectedDate)
        }
        filteredBookings={props.filteredBookings}
        selectedDate={props.selectedDate}
        enableSlot={props.enableSlot}
        disableSlot={props.disableSlot}
        handleDeleteSlot={props.handleDeleteSlot}
        toast={props.toast}
      />
      <ReportFilter
        selectedDate={props.selectedDate}
        setSelectedDate={props.setSelectedDate}
        searchTerm={props.searchTerm}
        setSearchTerm={props.setSearchTerm}
        statusFilter={props.statusFilter}
        setStatusFilter={props.setStatusFilter}
        clearFilters={props.clearFilters}
      />
      <BulkActions
        selectedBookings={props.selectedBookings || []}
        isDeleting={props.isDeleting}
        handleDeleteSelected={props.handleDeleteSelected}
      />
      <Statistics statistics={props.statistics} />

      {props.error ? (
        <div className="bg-red-100 text-red-700 p-4 rounded mt-4">
          Could not load bookings. Please check your connection or try again
          later.
        </div>
      ) : (
        <ErrorBoundary>
          <BookingsTable
            filteredBookings={props.filteredBookings || []}
            selectAll={props.selectAll}
            handleSelectAll={props.handleSelectAll}
            selectedBookings={props.selectedBookings || []}
            handleSelectBooking={props.handleSelectBooking}
            getStatusColor={getStatusColor}
            isLoading={props.isLoading}
          />
        </ErrorBoundary>
      )}

      <div className="mt-8 text-center text-sm text-orange-600">
        {props.selectedDate && (
          <span className="text-orange-800 font-medium">
            Showing results for: {formatDate(props.selectedDate)}
          </span>
        )}
        {props.filteredBookings?.length > 0 && (
          <span className="ml-4">
            ({props.filteredBookings.length} of {props.bookingData?.length || 0}{" "}
            records)
          </span>
        )}
      </div>
    </div>
  );
}
