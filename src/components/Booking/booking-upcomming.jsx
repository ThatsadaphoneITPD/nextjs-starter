"use client";
import React, { useState, useEffect } from "react";
import { BookingCard } from "@/components/Booking/BookingCard";

export default function BookingUpcoming({ bookings, onCancelBooking, onViewBooking }) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const calculateTimeRemaining = (bookingDate, bookingTime) => {
    try {
      // Handle if bookingDate is ISO format (from API)
      if (typeof bookingDate === 'string' && bookingDate.includes('T')) {
        const bookingDateTime = new Date(bookingDate);
        const now = new Date();
        const diff = bookingDateTime.getTime() - now.getTime();
        
        if (diff <= 0) {
          return "Ended";
        }
        
        const remainingHours = Math.floor(diff / (1000 * 60 * 60));
        const remainingMinutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        
        if (remainingHours > 0) {
          return `${remainingHours}h ${remainingMinutes}m`;
        } else {
          return `${remainingMinutes}m`;
        }
      }

      // Handle formatted date string (e.g., "Feb 4, 2026")
      const dateStr = String(bookingDate);
      const timeStr = String(bookingTime);

      const dateParts = dateStr.match(/(\w+)\s+(\d+),\s+(\d{4})/);
      if (!dateParts) {
        console.error("Invalid booking date format:", dateStr);
        return "N/A";
      }

      const [, monthStr, dayStr, yearStr] = dateParts;
      const monthIndex = new Date(Date.parse(monthStr + " 1, 2000")).getMonth();

      const timeMatchResult = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/);
      if (!timeMatchResult) {
        console.error("Invalid booking time format:", timeStr);
        return "N/A";
      }

      const [, hoursStr, minutesStr, period] = timeMatchResult;
      let hours = parseInt(hoursStr, 10);
      const minutes = parseInt(minutesStr, 10);

      if (period === 'PM' && hours !== 12) {
        hours += 12;
      }
      if (period === 'AM' && hours === 12) {
        hours = 0;
      }
      
      const bookingDateTime = new Date(
        parseInt(yearStr), 
        monthIndex, 
        parseInt(dayStr), 
        hours, 
        minutes
      );
      
      const now = new Date();
      const diff = bookingDateTime.getTime() - now.getTime();
      
      if (diff <= 0) {
        return "Ended";
      }
      
      const remainingHours = Math.floor(diff / (1000 * 60 * 60));
      const remainingMinutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      
      if (remainingHours > 0) {
        return `${remainingHours}h ${remainingMinutes}m`;
      } else {
        return `${remainingMinutes}m`;
      }
    } catch (e) {
      console.error("Error calculating time remaining:", e);
      return "N/A";
    }
  };

  const shouldShowCancelButton = (status) => {
    const noCancelStatuses = ['ພ້ອມແລ້ວ', 'ມື້ເປີດຫ້ອງ'];
    return !noCancelStatuses.includes(status);
  };

  const handleCancelBooking = (bookingId) => {
    if (onCancelBooking) {
      onCancelBooking(bookingId);
    }
  };

  const handleViewBooking = (bookingId) => {
    if (onViewBooking) {
      onViewBooking(bookingId);
    }
  };

  if (!bookings || bookings.length === 0) {
    return (
      <div className="rounded-lg p-4 sm:p-6">
        <div className="text-center py-8 sm:py-12">
          <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">📅</div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">ບໍ່ມີການຈອງທີ່ກຳລັງຈະມາເຖິງ</h3>
          <p className="text-gray-600 text-sm sm:text-base">ທ່ານບໍ່ມີການຈອງຫ້ອງປະຊຸມທີ່ກຳລັງຈະມາເຖິງໃນຂະນະນີ້</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 px-2 sm:px-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
        {bookings.map((booking) => (
          <BookingCard
            key={booking.id}
            booking={{
              ...booking,
              roomName: booking.title,
              timeRemaining: calculateTimeRemaining(booking.date, booking.time),
            }}
            handleCancel={shouldShowCancelButton(booking.status) ? handleCancelBooking : null}
            handleView={handleViewBooking}
            showCancelButton={shouldShowCancelButton(booking.status)}
          />
        ))}
      </div>
    </div>
  );
}