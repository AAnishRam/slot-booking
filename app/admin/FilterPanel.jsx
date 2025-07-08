import React from "react";
import { Calendar, Search, Filter } from "lucide-react";

export default function FilterPanel({
  selectedDate,
  setSelectedDate,
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
}) {
  return (
    <div className="bg-orange-100 border border-orange-300 rounded-lg p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-orange-700 mb-2">
            <Calendar size={16} className="inline mr-1" /> Select Date
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={e => setSelectedDate(e.target.value)}
            className="w-full px-3 py-2 bg-white border border-orange-300 rounded-md"
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
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 bg-white border border-orange-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-orange-700 mb-2">
            <Filter size={16} className="inline mr-1" /> Status
          </label>
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2 bg-white border border-orange-300 rounded-md"
          >
            <option value="all">All Status</option>
            <option value="booked">Booked</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>
    </div>
  );
}