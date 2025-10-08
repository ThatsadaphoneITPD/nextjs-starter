"use client";

import React from "react";
import BookingUpcoming from "../../../components/Booking/booking-upcomming";
import BookingCancel from "../../../components/Booking/booking-cancel";
import BookingComplete from "../../../components/Booking/booking-complete";
import BookingDetailPage from "../../../components/Booking/booking-detail";

// API service functions
const API_BASE_URL = 'https://68a7da1fbb882f2aa6dc9cc1.mockapi.io';

const getAllBookings = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/Room`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw error;
  }
};

const updateBookingAPI = async (id, bookingData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/Room/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error updating booking ${id}:`, error);
    throw error;
  }
};

export default function Page() {
  const [status, setStatus] = React.useState('upcoming');
  const [currentView, setCurrentView] = React.useState('list');
  const [selectedBooking, setSelectedBooking] = React.useState(null);
  const [bookings, setBookings] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const getRandomStatue = () =>{
    const statuses = ['ກຳລັງກຽມ', 'ກຳລັງລໍຖ້າ', 'ມື້ເປີດຫ້ອງ','ພ້ອມແລ້ວ'];
    const randomIndex = Math.floor(Math.random() * statuses.length);
    return statuses[randomIndex];
  }

  // Fetch bookings from API on component mount
  React.useEffect(() => {
    const fetchBookings = async () => {
      try {
        setIsLoading(true);
        const data = await getAllBookings();
        
        // Transform API data to match your component structure
        const transformedData = data.map(item => ({
          id: item.id,
          title: item.title || item.roomName || 'Unknown Room',
          status: getRandomStatue(),
          date: item.date || new Date().toLocaleDateString(),
          time: item.time || '00:00 AM',
          endTime: item.endTime || '00:00 AM',
          duration: item.duration || '0h',
          image: item.image || 'room1.png',
          participants: item.participants || [],
          meetingTitle: item.meetingTitle || 'Meeting',
          department: item.department || 'General',
          amenities: item.amenities || [],
          description: item.description || '',
        }));
        
        setBookings(transformedData);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch bookings:', err);
        setError('Failed to load bookings. Using default data.');
        
        // Fallback to default data if API fails
        setBookings([
          {
            id: '1',
            title: 'Medium Room 801',
            status: 'ກຳລັງກຽມ',
            date: 'Feb 4, 2026',
            time: '10:00 AM',
            endTime: '11:30 AM',
            duration: '1h 30m',
            image: 'room1.png',
            participants: [
              { name: 'Somphop phanmachuk' },
              { name: 'Jane Smith' },
            ],
            meetingTitle: 'Mental Health in the Digital Age',
            department: 'Application ICT',
            amenities: ['TV', 'microphone', 'coffee', 'water'],
            description: 'A detailed discussion on the impact of digital technology on mental health.'
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    setCurrentView('list');
  };

  // Cancel booking and update API
  const cancelBooking = async (id) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        const bookingToUpdate = bookings.find(b => b.id === id);
        if (bookingToUpdate) {
          // Update in API
          await updateBookingAPI(id, { ...bookingToUpdate, status: 'cancel' });
          
          // Update local state
          setBookings(prevBookings =>
            prevBookings.map(booking =>
              booking.id === id ? { ...booking, status: 'cancel' } : booking
            )
          );
        }
      } catch (error) {
        console.error('Failed to cancel booking:', error);
        alert('Failed to cancel booking. Please try again.');
      }
    }
  };

  // Complete booking and update API
  const completeBooking = async (bookingDataOrId) => {
    let bookingId;
    let additionalData = {};
    
    if (typeof bookingDataOrId === 'object' && bookingDataOrId.id) {
      bookingId = bookingDataOrId.id;
      additionalData = {
        completedAt: bookingDataOrId.completedAt || new Date().toISOString(),
      };
    } else {
      bookingId = bookingDataOrId;
      additionalData = {
        completedAt: new Date().toISOString()
      };
    }

    try {
      const bookingToUpdate = bookings.find(b => b.id === bookingId);
      if (bookingToUpdate) {
        // Update in API
        await updateBookingAPI(bookingId, {
          ...bookingToUpdate,
          status: 'complete',
          ...additionalData
        });
        
        // Update local state
        setBookings(prevBookings =>
          prevBookings.map(booking =>
            booking.id === bookingId 
              ? { ...booking, status: 'complete', ...additionalData }
              : booking
          )
        );
        
        setCurrentView('list');
        setStatus('complete');
      }
    } catch (error) {
      console.error('Failed to complete booking:', error);
      alert('Failed to complete booking. Please try again.');
    }
  };

  const viewBookingDetail = (id) => {
    const booking = bookings.find(b => b.id === id);
    if (booking) {
      setSelectedBooking(booking);
      setCurrentView('detail');
    }
  };

  const backToList = () => {
    setCurrentView('list');
    setSelectedBooking(null);
  };

  const getBookingsByStatus = (status) => {
    if (status === 'upcoming') {
      return bookings.filter(b => b.status !== 'cancel' && b.status !== 'complete');
    }
    return bookings.filter(b => b.status === status);
  };

const getButtonClasses = (buttonStatus) => {
  let baseClasses = "px-4 py-2 rounded-full shadow-md transition-all duration-200 ease-in-out text-sm";
  if (status === buttonStatus) {
    return `${baseClasses} bg-yellow-400 text-blue-800 font-bold transform scale-105`;
  } else {
    return `${baseClasses} bg-white text-blue-800 hover:bg-blue-200 hover:transform hover:scale-102 border border-2 border-blue-800`;
  }
};

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading bookings...</p>
        </div>
      </div>
    );
  }

  // Show detail page
  if (currentView === 'detail') {
    return (
      <BookingDetailPage 
        booking={selectedBooking}
        onBack={backToList}
        onCompleteBooking={completeBooking}
      />
    );
  }

  const renderContent = () => {
    switch(status) {
      case 'upcoming':
        return (
          <BookingUpcoming 
            bookings={getBookingsByStatus('upcoming')}
            onCancelBooking={cancelBooking}
            onViewBooking={viewBookingDetail}
          />
        );
      case 'complete':
        return (
          <BookingComplete 
            bookings={getBookingsByStatus('complete')}
          />
        );
      case 'cancel':
        return (
          <BookingCancel 
            bookings={getBookingsByStatus('cancel')}
          />
        );
      default:
        return (
          <BookingUpcoming
            bookings={getBookingsByStatus('upcoming')}
            onCancelBooking={cancelBooking}
            onViewBooking={viewBookingDetail}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto">
        {/* Error message */}
        {error && (
          <div className="mx-4 mt-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
            {error}
          </div>
        )}
        
      <div className="flex justify-center space-x-3 mb-6 p-4">
  <button 
    onClick={() => handleStatusChange('upcoming')} 
    className={getButtonClasses('upcoming')}
  >
    ກຳລັງຈອງ
  </button>
  <button 
    onClick={() => handleStatusChange('complete')} 
    className={getButtonClasses('complete')}
  >
    ສໍາເລັດ
  </button>
  <button 
    onClick={() => handleStatusChange('cancel')} 
    className={getButtonClasses('cancel')}
  >
    ຍົກເລີກ
  </button> 
</div>
        {renderContent()}
      </div>
    </div>
  );
}