import React from "react";
import { Trash2 } from "lucide-react";

export default function BulkActions({
  selectedBookings,
  isDeleting,
  handleDeleteSelected
}) {
  if (selectedBookings.length === 0) return null;
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-red-700 font-medium">
            {selectedBookings.length} booking(s) selected
          </span>
        </div>
        <button
          onClick={handleDeleteSelected}
          disabled={isDeleting}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Trash2 size={16} />
          {isDeleting ? "Deleting..." : "Delete Selected"}
        </button>
      </div>
    </div>
  );
}