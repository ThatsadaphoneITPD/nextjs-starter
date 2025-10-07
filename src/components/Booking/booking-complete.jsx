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

const CheckCircleIcon = ({ className = "w-16 h-16" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export default function BookingComplete({ bookings, onViewBooking, onBookAgain }) {
  
  const handleViewClick = (booking) => {
    if (onViewBooking) {
      onViewBooking(booking.id, booking);
    } else {
      console.log('View booking:', booking);
    }
  };

  const handleBookAgainClick = (booking) => {
    if (onBookAgain) {
      onBookAgain(booking);
    } else {
      console.log('Book again:', booking);
      alert(`Redirecting to book "${booking.title}" again...`);
    }
  };

  if (!bookings || bookings.length === 0) {
    return (
      <div className="text-center py-8 sm:py-12 px-4">
        <div className="flex justify-center mb-3 sm:mb-4">
          <CheckCircleIcon className="w-12 h-12 sm:w-16 sm:h-16 text-green-500" />
        </div>
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">ການຈອງໄດ້ສິ້ນສຸດ</h3>
        <p className="text-gray-600 text-sm sm:text-base">ຍັງບໍ່ມີການຈອງທີ່ສຳເລັດ</p>
        <div className="mt-4 sm:mt-6">
          <button 
            onClick={() => window.location.href = '/booking'}
            className="bg-blue-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm sm:text-base"
          >
            ສ້າງການຈອງໃຫມ່
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 px-4 sm:px-0">
      {/* Bookings Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
        {bookings.map((booking) => (
          <div key={booking.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            {/* Room Image with Badge */}
            <div className="relative h-44 sm:h-48 w-full">
              <img
                src={booking.image || 'room1.png'}
                alt={booking.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'room1.png';
                }}
              />
              
              {/* Completed Badge - Top Left, Blue with rounded corner */}
              <div className="absolute top-1.5 sm:top-2 md:top-4 left-1.5 sm:left-2 md:left-4 bg-blue-900 text-white text-xs font-semibold px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-1 rounded-full shadow-lg">
                ເສັດສິ້ນແລ້ວ
              </div>
            </div>

            {/* Card Content */}
            <div className="p-4">
              {/* Room Title */}
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3">
                {booking.title}
              </h3>
              
              {/* Date */}
              <div className="flex items-center text-gray-600 mb-2">
                <CalendarIcon className="w-4 h-4 mr-2" />
                <span className="text-sm">{booking.date}</span>
              </div>

              {/* Time */}
              <div className="flex items-center text-gray-600 mb-4">
                <ClockIcon className="w-4 h-4 mr-2" />
                <span className="text-sm">{booking.time}</span>
              </div>

              {/* View Details Button */}
              <button 
                onClick={() => handleViewClick(booking)}
                className="w-full bg-white border-2 border-blue-600 text-blue-600 py-2.5 px-4 rounded-lg hover:bg-blue-50 transition-colors duration-200 text-sm font-semibold"
              >
                ຈອງອີກຄັ້ງ
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}