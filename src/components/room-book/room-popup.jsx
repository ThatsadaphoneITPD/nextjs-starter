'use client';
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import {
  ChevronLeft,
  Users,
  Wifi,
  Monitor,
  MapPin,
  ChevronRight,
} from "lucide-react";

export default function RoomPopup({ itemRow, onClose }) {
  console.log("itemRow", itemRow);
   const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(6);
  const [currentMonth, setCurrentMonth] = useState("September");
  const [selectedTime, setSelectedTime] = useState("8:00 - 11:00 am");

  // Extract room data from itemRow or use defaults
  const roomData = {
    room_name: itemRow?.room_name || "Small Room 201",
    capacity: itemRow?.capacity || "6 - 10 People",
    building: itemRow?.building || "Building A",
    floor: itemRow?.floor || "2nd Floor",
    equipment: itemRow?.equipment || ["Wi-fi", "Projector", "Screen"],
    path_image: itemRow?.path_image || null,
    bookedDates: itemRow?.bookedDates || [4, 9, 11],
    user: itemRow?.user || "Deppoper",
    userId: itemRow?.userId || "584887",
  };

  // Generate calendar days for September 2024
  const generateCalendarDays = () => {
    const days = [];
    const daysInMonth = 30;
    const startDay = 1; // September 1st is a Sunday (0)

    // Previous month days
    for (let i = 0; i < startDay; i++) {
      days.push({
        day: 31 - startDay + i + 1,
        isCurrentMonth: false,
        isPrevMonth: true,
      });
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({ day, isCurrentMonth: true, isPrevMonth: false });
    }

    // Next month days to fill the grid
    const remainingDays = 42 - days.length; // 6 weeks * 7 days
    for (let day = 1; day <= remainingDays; day++) {
      days.push({ day, isCurrentMonth: false, isPrevMonth: false });
    }

    return days;
  };

  const calendarDays = generateCalendarDays();
  const weekDays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

  const handleDateClick = (day, isCurrentMonth) => {
    if (isCurrentMonth) {
      setSelectedDate(day);
    }
  };

  const handleBooking = () => {
    router.push(`/booking/${itemRow?.room_number}`);
    onClose();
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    // <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="">
      {/* Header */}
      <div className="bg-blue-600 text-white px-2 py-2 flex items-center flex-shrink-0 rounded-lg">
        <button onClick={handleClose} className="mr-2">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <h1 className="text-base font-medium">Meeting Room Details</h1>
      </div>

      {/* Room Image */}
      <div className="relative flex-shrink-0">
        <div className="h-24 w-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
          {roomData.path_image ? (
            <img
              src={roomData.path_image}
              alt="Room"
              className="h-full w-full object-cover rounded-t-lg"
            />
          ) : (
            <div className="text-gray-400">No Image Available</div>
          )}
        </div>
      </div>

      {/* Room Info */}
      <div className="px-4 py-3 flex-1 flex flex-col overflow-hidden">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-light text-gray-800">
            {roomData.room_name}
          </h2>
          <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs font-medium">
            {roomData.capacity}
          </span>
        </div>

        {/* Equipment */}
        <div className="flex items-start mb-2">
          <div className="bg-blue-100 p-1 rounded mr-2">
            <Monitor className="w-3 h-3 text-blue-600" />
          </div>
          <div>
            <div className="font-medium text-gray-700 text-xs">Equipment:</div>
            <div className="text-gray-600 text-xs">
              {roomData.equipment.join(", ")}
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center mb-3">
          <div className="bg-blue-100 p-1 rounded mr-2">
            <MapPin className="w-3 h-3 text-blue-600" />
          </div>
          <div className="font-medium text-gray-700 text-xs">
            {roomData.building} . {roomData.floor}
          </div>
        </div>

        {/* Calendar */}
        <div className="border-t pt-2 flex-1 flex flex-col overflow-hidden">
          <div className="flex items-center justify-between mb-2 px-2">
            <ChevronLeft className="w-3 h-3 text-gray-400" />
            <h3 className="text-sm font-medium text-gray-800">
              {currentMonth}
            </h3>
            <ChevronRight className="w-3 h-3 text-gray-400" />
          </div>

          {/* Week Days */}
          <div className="grid grid-cols-7 gap-0.5 mb-1 px-2">
            {weekDays.map((day, index) => (
              <div
                key={index}
                className="text-center text-xs text-gray-500 py-0.5"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-0.5 mb-2 flex-1 px-2">
            {calendarDays.slice(0, 28).map((dateObj, index) => {
              const isSelected =
                dateObj.day === selectedDate && dateObj.isCurrentMonth;
              const isBooked =
                roomData.bookedDates.includes(dateObj.day) &&
                dateObj.isCurrentMonth;
              const isWeekend = index % 7 >= 5;

              return (
                <button
                  key={index}
                  onClick={() =>
                    handleDateClick(dateObj.day, dateObj.isCurrentMonth)
                  }
                  className={`
                      aspect-square flex items-center justify-center text-xs rounded transition-all
                      ${
                        isSelected
                          ? "bg-blue-100 text-blue-600 font-medium"
                          : isBooked
                          ? "bg-blue-600 text-white font-medium"
                          : dateObj.isCurrentMonth
                          ? isWeekend
                            ? "text-blue-400 hover:bg-blue-50"
                            : "text-gray-700 hover:bg-gray-100"
                          : "text-gray-300"
                      }
                    `}
                >
                  {dateObj.day}
                </button>
              );
            })}
          </div>

          {/* Booking Details */}
          <div className="bg-gray-100 rounded-lg p-2 mb-2 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-gray-600">
                  User: {roomData.user}
                </div>
                <div className="text-xs text-gray-600">
                  ID: {roomData.userId}
                </div>
              </div>
              <div className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                {selectedTime}
              </div>
            </div>
          </div>

          {/* Booking Button */}
          <button
            onClick={handleBooking}
            className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex-shrink-0"
          >
            Booking
          </button>
        </div>
      </div>
    </div>
    // </div>
  );
}
