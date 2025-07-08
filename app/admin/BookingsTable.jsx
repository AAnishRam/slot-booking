import React from "react";

export default function BookingsTable({ bookings, isLoading, getStatusColor }) {
  if (isLoading) {
    return (
      <div className="bg-orange-100 rounded-lg border border-orange-200 overflow-hidden">
        <div className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto"></div>
          <p className="mt-2 text-orange-600">Loading bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-orange-100 rounded-lg border border-orange-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full divide-y divide-orange-300">
          <thead className="bg-orange-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-orange-700 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-orange-700 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-orange-200">
            {bookings.length > 0 ? (
              bookings.map((item, idx) => (
                <tr key={idx} className="bg-orange-50 hover:bg-orange-100">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="px-6 py-8 text-center text-orange-600">
                  No bookings found for the selected date and filters
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}