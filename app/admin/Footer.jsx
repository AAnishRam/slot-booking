import React from "react";

export default function Footer() {
  return (
    <footer className="mt-8 text-center text-sm text-orange-600">
      &copy; {new Date().getFullYear()} Seat Booking Admin
    </footer>
  );
}