"use client"
import React, { useState, useCallback } from "react";
import RoomCard from "./RoomCard";
import BookingCard from "../BookingCard";
import BookingSummary from "./BookingSummary";
import Complete from "./Complete";

export default function Page() {
  const [currentStep, setCurrentStep] = useState('booking')
  const [bookingData, setBookingData] = useState(null)
  const [roomData, setRoomData] = useState(null)

  const handleBookingSubmit = useCallback((data) => {
    setBookingData(data)
    setCurrentStep('summary')
  }, [])

  const handleRoomDataChange = useCallback((data) => {
    setRoomData(data)
  }, [])

  const handleBackToBooking = useCallback(() => {
    setCurrentStep('booking')
  }, [])

  const handleConfirmBooking = useCallback(() => {
    setCurrentStep('complete')
  }, [])

  const handleNewBooking = useCallback(() => {
    setCurrentStep('booking')
    setBookingData(null)
    setRoomData(null)
  }, [])

  if (currentStep === 'complete') {
    return (
      <Complete 
        bookingData={bookingData}
        roomData={roomData}
        onNewBooking={handleNewBooking}
      />
    )
  }

  if (currentStep === 'summary') {
    return (
      <BookingSummary 
        bookingData={bookingData}
        roomData={roomData}
        onBack={handleBackToBooking}
        onConfirm={handleConfirmBooking}
      />
    )
  }

  return (
    <main className="mx-auto max-w-6xl px-3 py-4 sm:px-4 sm:py-5 lg:px-6 lg:py-6">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-5">
        <RoomCard onDataChange={handleRoomDataChange} />
        <BookingCard 
          onBookingSubmit={handleBookingSubmit} 
          roomData={roomData}
        />
      </div>
    </main>
  )
}