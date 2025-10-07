import React from 'react';
import { Calendar, Clock } from 'lucide-react';

export function BookingCard({ booking, handleCancel, handleView, showCancelButton = true }) {
  // Safety check for undefined booking
  if (!booking) {
    return (
      <div className="rounded-lg shadow-lg overflow-hidden bg-white p-4">
        <p className="text-gray-500 text-center">No booking data available</p>
      </div>
    );
  }

  const { status, timeRemaining, roomName, date, time, image, id } = booking;

  // Status color mapping
  let statusColor = "";
  if (status === "ກຳລັງກຽມ") {
    statusColor = "bg-orange-400";
  } else if (status === "ພ້ອມແລ້ວ") {
    statusColor = "bg-blue-400";
  } else if (status === "ມື້ເປີດຫ້ອງ") {
    statusColor = "bg-yellow-400";
  } else if (status === "ກຳລັງລໍຖ້າ") {
    statusColor = "bg-purple-400";
  }

  const onCancelClick = () => {
    if (handleCancel) {
      handleCancel(id);
    }
  };

  const onViewClick = () => {
    if (handleView) {
      handleView(id);
    }
  };

  return (
    <div className="rounded-lg shadow-lg overflow-hidden bg-white relative hover:shadow-xl transition-shadow duration-300">
      {/* Image Section */}
      <div className="relative h-40 sm:h-48 w-full">
        <img
          src={image || 'room1.png'}
          alt={roomName}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'room1.png';
          }}
        />

        {/* Status Badge */}
        <div className={`absolute top-2 sm:top-4 left-2 sm:left-4 ${statusColor} text-white text-xs font-semibold px-2 sm:px-3 py-1 rounded-full shadow-md`}>
          {status}
        </div>

        {/* Time Remaining Badge */}
        {timeRemaining && (
          <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 bg-blue-800 text-white text-xs sm:text-sm font-semibold px-2 sm:px-3 py-1 rounded shadow-md">
            ເລີ່ມໃນເວລາ {timeRemaining}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-3 sm:p-4">
        <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-3 text-gray-900 line-clamp-2">
          {roomName}
        </h3>
        
        <div className="flex items-center text-gray-600 mb-2">
          <Calendar className="mr-2 flex-shrink-0" size={16} />
          <span className="text-sm">{date}</span>
        </div>
        
        <div className="flex items-center text-gray-600 mb-3 sm:mb-4">
          <Clock className="mr-2 flex-shrink-0" size={16} />
          <span className="text-sm">{time}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch space-y-2 sm:space-y-0 sm:space-x-2">
          <button 
            className="flex-1 bg-blue-800 text-white py-2 px-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 text-sm active:scale-95"
            onClick={onViewClick}
          >
            ເບິ່ງລາຍລະອຽດ
          </button>
          
          {showCancelButton && (
            <button 
              className="flex-1 border-2 border-blue-900 text-blue-900 py-2 px-3 rounded-lg font-semibold hover:bg-blue-50 transition duration-300 text-sm active:scale-95"
              onClick={onCancelClick}
            >
              ຍົກເລີກ
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookingCard;