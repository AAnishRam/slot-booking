"use client";

import React from "react";
import Sidebar from "./Sidebar";
import CalenderComponent from "./Calender";

import Header from "./Header";

import {
  Search,
  RefreshCw,
  ChevronRight,
  Calendar,
  Users,
  MessageSquare,
  Settings,
  ChevronLeft,
  Clock,
  MapPin,
  Building,
  Check,
  Plus,
  Edit3,
  Trash2,
} from "lucide-react";
import TodoList from "./TodoList";
import ContentArea from "./ContentArea";

const Dashboard = ({ logo, userName = "Anish Ram A", userInitials = "AR" }) => {
  const currentDate = new Date();
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const currentDayName = dayNames[currentDate.getDay()];

  return (
    <div className="w-full bg-amber-50 p-6 mx-auto">
      <div className="flex">
        <Sidebar logo={logo} />

        <div className="flex-1 p-8">
          <Header
            currentDayName={currentDayName}
            userName={userName}
            userInitials={userInitials}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <ContentArea />

            <div className="space-y-6">
              <CalenderComponent />
              <TodoList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
