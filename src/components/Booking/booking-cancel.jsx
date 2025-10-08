"use client";
import React from 'react';

const CalendarIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z" />
  </svg>
);

const ClockIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const BookingCancel = ({ bookings }) => {
  if (!bookings || bookings.length === 0) {
    return (
      <div className="text-center py-6 sm:py-8 md:py-12 px-3 sm:px-4">
        <div className="text-3xl sm:text-4xl md:text-6xl mb-2 sm:mb-3 md:mb-4">❌</div>
        <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-2 px-2">
          ການຈອງທີ່ຍົກເລີກ
        </h3>
        <p className="text-gray-600 text-xs sm:text-sm md:text-base px-2">
          ບໍ່ມີການຈອງທີ່ຖືກຍົກເລີກ
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3 sm:space-y-4 md:space-y-6 px-2 sm:px-4 md:px-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        {bookings.map((booking) => (
          <div key={booking.id} className="rounded-lg shadow-lg overflow-hidden bg-white relative hover:shadow-xl transition-shadow duration-300">
            {/* Enhanced Mobile Room Image */}
            <div className="relative h-32 xs:h-36 sm:h-40 md:h-48 w-full">
              <img
                src='room1.png'
                alt={booking.title}
                className="w-full h-full object-cover"
              />

              {/* Mobile-friendly Cancelled Badge */}
              <div className="absolute top-1.5 sm:top-2 md:top-4 left-1.5 sm:left-2 md:left-4 bg-red-500 text-white text-xs font-semibold px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-1 rounded-full shadow-lg">
                ຍົກເລີກແລ້ວ
              </div>
            </div>

            {/* Enhanced Mobile Content */}
            <div className="p-2 xs:p-3 sm:p-4">
              <h3 className="text-sm xs:text-base sm:text-lg font-bold mb-1 sm:mb-2 line-clamp-2 leading-tight">
                {booking.title}
              </h3>
              
              <div className="flex flex-col xs:flex-row xs:items-center text-gray-600 mb-2 sm:mb-3 text-xs sm:text-sm space-y-1 xs:space-y-0 xs:space-x-3">
                <span className="flex items-center">
                  <CalendarIcon className="w-3 h-3 mr-1" />
                  {booking.date}
                </span>
                <span className="flex items-center">
                  <ClockIcon className="w-3 h-3 mr-1" />
                  {booking.time}
                </span>
              </div>

              {/* Note section */}
              <div className="mb-2 sm:mb-3">
                <span className="text-xs sm:text-sm text-gray-700 italic">
                  ໝາຍເຫດ: ການປະຊຸມມີການປ່ຽນແປງ
                </span>
              </div>

              {/* Mobile Action Button */}
              <div className="mt-2 sm:mt-3 md:mt-4">
                <button 
                  className="w-full bg-white border border-blue-600 text-blue-600 py-2 px-3 rounded-lg hover:bg-blue-50 transition-colors duration-200 text-xs sm:text-sm font-medium active:scale-95"
                >
                  ຈອງອີກຄັ້ງ
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingCancel;