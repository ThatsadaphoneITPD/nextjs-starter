"use client";
import React, { useState, useEffect } from "react";
import {
  MapPin, Calendar, Clock, Building, Monitor, Users, User,
  Smartphone, Copy, X, ArrowLeft, Check, RefreshCw, Power,
} from "lucide-react";

const InvitePopup = ({ isOpen, onClose, roomName, roomId }) => {
  const [qrCodeUrl, setQrCodeUrl] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const meetingLink = `https://meet.app/room/${roomId || roomName?.replace(/\s+/g, "-").toLowerCase() || "801"}`;

  useEffect(() => {
    if (isOpen && !qrCodeUrl) {
      generateQRCode();
    }
  }, [isOpen]);

  const generateQRCode = async () => {
    setIsGenerating(true);
    try {
      const canvas = document.createElement("canvas");
      const size = 256;
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");

      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, size, size);
      ctx.fillStyle = "#000000";

      const moduleSize = 8;
      const modules = size / moduleSize;
      for (let i = 0; i < modules; i++) {
        for (let j = 0; j < modules; j++) {
          if (Math.random() > 0.5) {
            ctx.fillRect(i * moduleSize, j * moduleSize, moduleSize, moduleSize);
          }
        }
      }

      const dataUrl = canvas.toDataURL();
      setQrCodeUrl(dataUrl);
    } catch (error) {
      console.error("Error generating QR code:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  // MUI Modal Style
  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    maxWidth: '90%',
    bgcolor: 'background.paper',
    borderRadius: 3,
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      {isOpen && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1300,
            padding: '16px'
          }}
          onClick={onClose}
        >
          <div 
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '24px',
              maxWidth: '400px',
              width: '100%',
              position: 'relative',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={onClose} 
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#9CA3AF',
                padding: '4px'
              }}
              onMouseEnter={(e) => e.target.style.color = '#4B5563'}
              onMouseLeave={(e) => e.target.style.color = '#9CA3AF'}
            >
              <X size={20} />
            </button>
            
            <div style={{ textAlign: 'center' }}>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#1F2937',
                marginBottom: '24px',
                paddingRight: '24px'
              }}>
                {roomName || "Mental Health in the Digital Age"}
              </h2>
              
              <div style={{ marginBottom: '16px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '12px'
                }}>
                  <Smartphone style={{ color: '#4B5563', marginRight: '8px' }} size={18} />
                  <span style={{ fontSize: '1rem', color: '#374151' }}>Scan QR Code</span>
                </div>
                
                <div style={{
                  width: '192px',
                  height: '192px',
                  backgroundColor: 'white',
                  border: '2px solid #D1D5DB',
                  margin: '0 auto 16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '8px',
                  padding: '8px'
                }}>
                  {isGenerating ? (
                    <div style={{
                      width: '32px',
                      height: '32px',
                      border: '2px solid #1E3A8A',
                      borderTopColor: 'transparent',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }} />
                  ) : qrCodeUrl ? (
                    <img src={qrCodeUrl} alt="QR Code" style={{ width: '100%', height: '100%' }} />
                  ) : (
                    <span style={{ color: '#9CA3AF', fontSize: '0.875rem' }}>Loading...</span>
                  )}
                </div>
              </div>
            </div>
            
            <style>{`
              @keyframes spin {
                to { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        </div>
      )}
    </div>
  );
};

export default function BookingDetailPage({ booking, onBack, onCompleteBooking }) {
  const [showInvitePopup, setShowInvitePopup] = useState(false);
  const [showCopyLink, setShowCopyLink] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [currentBooking, setCurrentBooking] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [lastFetch, setLastFetch] = useState(null);
  const [fetchCount, setFetchCount] = useState(0);
  const [error, setError] = useState(null);

  const fetchBookingData = async () => {
    setError(null);
    if (booking) {
      setCurrentBooking(booking);
      setIsLoading(false);
      setLastFetch(new Date());
      setFetchCount((prev) => prev + 1);
    } else {
      try {
        const response = await fetch("https://68a7da1fbb882f2aa6dc9cc1.mockapi.io/Room");
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        if (data && data.length > 0) {
          setCurrentBooking(data[0]);
        }
        setLastFetch(new Date());
        setFetchCount((prev) => prev + 1);
        console.log("Booking data fetched successfully:", data);
      } catch (error) {
        console.error("Could not fetch booking:", error);
        setError(error.message);
        setCurrentBooking({
          id: "1",
          title: "Medium Room 801",
          meetingTitle: "Mental Health in the Digital Age",
          date: "Sep 9, 2025",
          time: "1:00 PM",
          endTime: "5:00 PM",
          department: "Application ICT",
          participants: [
            { name: "ນາງ ສົມໃຈ", role: "host" },
            { name: "ທ້າວ ບຸນມີ", role: "participant" },
            { name: "ນາງ ແສງດາວ", role: "participant" },
          ],
          amenities: ["TV", "microphone", "coffee", "water"],
          status: "ກຳລັງກຽມ",
        });
        setLastFetch(new Date());
        setFetchCount((prev) => prev + 1);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchBookingData();
  }, [booking]);

  useEffect(() => {
    let intervalId;
    if (autoRefresh) {
      intervalId = setInterval(() => {
        console.log("Auto-refreshing booking data...");
        fetchBookingData();
      }, 5000);
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
        console.log("Interval cleared");
      }
    };
  }, [autoRefresh, booking]);

  const handleToggleAutoRefresh = () => {
    setAutoRefresh(!autoRefresh);
    if (!autoRefresh) {
      fetchBookingData();
    }
  };

  const handleManualRefresh = () => {
    fetchBookingData();
  };

  const handleCompleteBooking = () => {
    if (!currentBooking) return;
    const bookingData = {
      id: currentBooking.id,
      title: currentBooking.title,
      meetingTitle: currentBooking.meetingTitle,
      date: currentBooking.date,
      time: currentBooking.time,
      endTime: currentBooking.endTime,
      department: currentBooking.department,
      participants: currentBooking.participants,
      status: "complete",
      completedAt: new Date().toISOString(),
    };
    console.log("Complete booking clicked with data:", bookingData);
    if (onCompleteBooking) {
      onCompleteBooking(bookingData);
    } else {
      alert(`Booking ${currentBooking.title} has been completed successfully!`);
    }
  };

  const handleCopyClick = () => {
    if (!currentBooking) return;
    const meetingLink = `https://meet.app/room/${currentBooking.id}`;
    navigator.clipboard.writeText(meetingLink).then(() => {
      setShowCopyLink(true);
      setCopySuccess(true);
      setTimeout(() => {
        setShowCopyLink(false);
        setCopySuccess(false);
      }, 3000);
    }).catch(() => {
      setShowCopyLink(true);
      setCopySuccess(false);
      setTimeout(() => {
        setShowCopyLink(false);
      }, 3000);
    });
  };

  const handleInviteClick = () => {
    setShowInvitePopup(true);
  };

  const handleCloseInvite = () => {
    setShowInvitePopup(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading booking details...</p>
        </div>
      </div>
    );
  }

  if (!currentBooking) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No booking data available</p>
          <button onClick={onBack} className="mt-4 px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800">
            ກັບຄືນ
          </button>
        </div>
      </div>
    );
  }

  const meetingLink = `https://meet.app/room/${currentBooking.id}`;
  const participants = Array.isArray(currentBooking.participants) ? currentBooking.participants : [];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-4 pb-2">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <button onClick={onBack || (() => console.log("Go back clicked"))} className="flex items-center px-4 py-2 text-gray-700 font-medium rounded-lg hover:bg-white transition duration-300 shadow-sm bg-white">
            <ArrowLeft className="mr-2" size={16} />
            ກັບຄືນ
          </button>
         
        </div>
        {autoRefresh && (
          <div className="mt-3 p-2 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-xs text-green-800 text-center">⏱️ Auto-refreshing every <strong>5 seconds</strong></p>
          </div>
        )}
        {error && (
          <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-xs text-red-800 text-center">❌ Error: {error}</p>
          </div>
        )}
      </div>
      <div className="my-3 flex flex-col lg:flex-row gap-4 lg:max-w-6xl lg:mx-auto px-4 sm:px-6">
        <div className="flex-1 bg-white rounded-lg shadow-lg border overflow-hidden">
          <div className="relative">
            <div className="h-48 sm:h-64 bg-gradient-to-r from-amber-50 to-orange-100">
              <img src={currentBooking.image || "room1.png"} alt="Room" className="w-full h-full object-cover" onError={(e) => { e.target.src = "room1.png"; }} />
            </div>
            <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-yellow-500 text-white text-xs sm:text-sm font-medium px-2 sm:px-3 py-1 rounded-full">
              {currentBooking.status || "ກຳລັງກຽມ"}
            </div>
            <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 bg-blue-900 text-white text-xs sm:text-sm font-medium px-2 sm:px-3 py-1 rounded">
              ເລີ່ມໃນເວລາ {currentBooking.time || "13:50m"}
            </div>
          </div>
          <div className="p-4 sm:p-6">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">
              ຫົວຂໍ້ການປະຊຸມ: {currentBooking.meetingTitle || "Mental Health in the Digital Age"}
            </h2>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
              {currentBooking.title || "Medium Room 801"}
            </h1>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center text-gray-700">
                <MapPin className="mr-3 text-blue-600 flex-shrink-0" size={16} />
                <span className="font-medium text-sm sm:text-base">{currentBooking.floor || "8"} Floor</span>
              </div>
              <div className="flex items-center text-gray-700">
                <Calendar className="mr-3 text-blue-600 flex-shrink-0" size={16} />
                <span className="text-sm sm:text-base">{currentBooking.date || "09/09/2025"}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <Clock className="mr-3 text-blue-600 flex-shrink-0" size={16} />
                <span className="text-sm sm:text-base">{currentBooking.time || "13:00PM"}-{currentBooking.endTime || "17:00PM"}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <Building className="mr-3 text-blue-600 flex-shrink-0" size={16} />
                <span className="text-sm sm:text-base">ພະແນກ: {currentBooking.department || "Application ICT"}</span>
              </div>
              <div className="flex items-start text-gray-700">
                <Monitor className="mr-3 text-blue-600 flex-shrink-0 mt-0.5" size={16} />
                <span className="text-sm sm:text-base">ສິ່ງອຳນວຍຄວາມສະດວກ: {Array.isArray(currentBooking.amenities) ? currentBooking.amenities.join(", ") : "TV, microphone, coffee, water"}</span>
              </div>
              <div className="flex items-center text-gray-700">
                <Users className="mr-3 text-blue-600 flex-shrink-0" size={16} />
                <span className="text-sm sm:text-base">ຈຳນວນຜູ່ເຂົ້າຮ່ວມ: {participants.length} ຄົນ</span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-80 bg-white rounded-lg shadow-lg border overflow-hidden">
          <div className="bg-blue-900 text-white p-3 sm:p-4">
            <div className="flex justify-between items-center gap-2">
              <h3 className="font-semibold text-sm sm:text-base">ລາຍຊື່ຜູ້ເຂົ້າຮ່ວມ</h3>
              <button onClick={handleToggleAutoRefresh} className={`flex items-center px-2 py-1 rounded text-xs font-medium transition ${autoRefresh ? "bg-green-500 hover:bg-green-600 text-white" : "bg-white/20 hover:bg-white/30 text-white"}`}>
                <Power size={12} className="mr-1" />
                {autoRefresh ? "Real time" : "OFF"}
                {autoRefresh && <span className="ml-1 w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>}
              </button>
            </div>
          </div>
          <div className="p-3 sm:p-4">
            <div className="mb-3">
              <p className="text-xs sm:text-sm text-gray-600">ຈໍານວນຄົນທັງຫມົດ: {participants.length}</p>
            </div>
            <div className="space-y-2 max-h-48 sm:max-h-64 overflow-y-auto">
              {participants.length > 0 ? (
                participants.map((participant, index) => {
                  const participantName = typeof participant === "object" ? participant.name || `ຜູ້ເຂົ້າຮ່ວມ ${index + 1}` : `ຜູ້ເຂົ້າຮ່ວມ ${participant}`;
                  const participantRole = typeof participant === "object" ? participant.role : index === 0 ? "host" : "participant";
                  return (
                    <div key={index} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                      <div className="flex items-center space-x-2 flex-1">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${participantRole === "host" ? "bg-blue-900" : "bg-blue-600"}`}>
                          <User className="text-white" size={14} />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-gray-900">{participantName}</span>
                          <span className="text-xs text-gray-500">{participantRole === "host" ? "ເຈົ້າພາບ" : "ຜູ້ເຂົ້າຮ່ວມ"}</span>
                        </div>
                      </div>
                      <span className="text-xs text-gray-400">
                        {lastFetch ? `${lastFetch.getHours()}:${String(lastFetch.getMinutes()).padStart(2, "0")}` : `10:${String(5 + index).padStart(2, "0")}`}
                      </span>
                    </div>
                  );
                })
              ) : (
                <p className="text-sm text-gray-500 text-center py-4">ບໍ່ມີຜູ້ເຂົ້າຮ່ວມ</p>
              )}
            </div>
            <div className="mt-4 sm:mt-6 space-y-3">
              <button onClick={handleCompleteBooking} className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 sm:py-2 px-4 rounded-lg transition duration-300 text-sm sm:text-base">
                ເສັດສິ້ນການຈອງ
              </button>
              {showCopyLink && (
                <div className="bg-gray-50 border rounded-lg p-3 mb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center flex-1 min-w-0">
                      {copySuccess ? <Check size={14} className="text-green-600 mr-2 flex-shrink-0" /> : <Copy size={14} className="text-blue-900 mr-2 flex-shrink-0" />}
                      <span className="text-xs sm:text-sm text-gray-700 truncate">{meetingLink}</span>
                    </div>
                    <span className="text-xs text-green-600 ml-2 flex-shrink-0">{copySuccess ? "Copied!" : "Failed"}</span>
                  </div>
                </div>
              )}
              <div className="flex space-x-2">
                <button onClick={handleCopyClick} className="flex-1 bg-blue-900 hover:bg-blue-700 text-white font-semibold py-2.5 sm:py-2 px-3 sm:px-4 rounded-lg transition duration-300 flex items-center justify-center text-sm sm:text-base">
                  <Copy size={14} className="mr-1 sm:mr-2" />
                  Copy
                </button>
                <button onClick={handleInviteClick} className="flex-1 bg-blue-900 hover:bg-blue-700 text-white font-semibold py-2.5 sm:py-2 px-3 sm:px-4 rounded-lg transition duration-300 flex items-center justify-center text-sm sm:text-base">
                  <Smartphone size={14} className="mr-1 sm:mr-2" />
                  QR
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <InvitePopup isOpen={showInvitePopup} onClose={handleCloseInvite} roomName={currentBooking.meetingTitle} roomId={currentBooking.id} />
    </div>
  );
}