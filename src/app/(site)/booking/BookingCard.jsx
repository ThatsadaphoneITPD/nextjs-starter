import { useMemo, useState } from 'react'
import Calendar from './[invite]/Calendar'
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { equipmentOptions } from "../booking/[invite]/equipments";

function Section({ title, children }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
      <h3 className="mb-2 text-xs font-semibold text-slate-700 sm:text-sm">{title}</h3>
      {children}
    </section>
  )
}

export default function BookingCard({ itemRow, onBookingSubmit, roomData }) {
  const defaultBookings = useMemo(() => [
    {
      date: new Date(2025, 1, 4, 10, 0, 0),
      startTime: '08:30',
      endTime: '11:30'
    }
  ], [])
  
  const [selectedBookings, setSelectedBookings] = useState(defaultBookings)
  const [isPending, setIsPending] = useState(false)
  const [status, setStatus] = useState(null)
  const [notes, setNotes] = useState('')

  const isBookingEnabled = () => {
    const roomValid = roomData && roomData.isValid
    const bookingsValid = selectedBookings.length > 0
    return roomValid && bookingsValid
  }

  const updateBookingTime = (bookingIndex, field, value) => {
    const newBookings = [...selectedBookings]
    newBookings[bookingIndex] = {
      ...newBookings[bookingIndex],
      [field]: value
    }
    setSelectedBookings(newBookings)
  }

  const dateLabels = useMemo(() => {
    return selectedBookings.map(booking => {
      const locale = new Intl.DateTimeFormat('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      }).format(booking.date)
      
      const [startH, startM] = booking.startTime.split(':').map(Number)
      const [endH, endM] = booking.endTime.split(':').map(Number)
      
      const formatTime = (h, m) => {
        const isPM = h >= 12
        const hh = ((h + 11) % 12) + 1
        return `${hh}:${m.toString().padStart(2,'0')} ${isPM ? 'pm' : 'am'}`
      }
      
      const startFormatted = formatTime(startH, startM)
      const endFormatted = formatTime(endH, endM)
      
      return `${locale}, ${startFormatted} - ${endFormatted}`
    })
  }, [selectedBookings])

  const dateLabel = useMemo(() => {
    if (dateLabels.length === 1) return dateLabels[0]
    if (dateLabels.length === 2) return `${dateLabels[0]} and ${dateLabels[1]}`
    if (dateLabels.length === 3) return `${dateLabels[0]}, ${dateLabels[1]} and ${dateLabels[2]}`
    return ''
  }, [dateLabels])

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!isBookingEnabled()) {
      setStatus('Please complete all required meeting details first')
      return
    }
    
    setStatus(null)
    setIsPending(true)
        
    setTimeout(() => {
      setIsPending(false)
      
      const bookingData = {
        selectedBookings,
        dateLabel,
        dateLabels,
        roomData: roomData,
        notes: notes
      }
      
      if (onBookingSubmit) {
        onBookingSubmit(bookingData)
      }
      
      setStatus('Room booked successfully!')
    }, 800)
  }

  return (
    <div className="w-full">
      <div className="flex flex-col gap-3 sm:gap-4">
        <Section title="ກຳນົດວັນ ແລະ ເວລາທີ່ຕ້ອງການ :">
          <Calendar 
            selectedBookings={selectedBookings}
            onChange={setSelectedBookings}
          />
          
          {selectedBookings.length > 0 && (
            <div className="mt-3 space-y-2">
              <div className="text-xs font-medium text-slate-700">ເວລາທີ່ເລືອກໄວ້ :</div>
              {selectedBookings.map((booking, index) => (
                <div key={index} className="rounded-lg border border-slate-200 bg-slate-50 p-2">
                  <div className="mb-1.5 text-xs font-medium text-slate-600">
                    {new Intl.DateTimeFormat('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric' 
                    }).format(booking.date)}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                      <label className="text-xs text-slate-700">ເລີ່ມປະຊູຸມ</label>
                      <input
                        type="time"
                        value={booking.startTime}
                        onChange={(e) => updateBookingTime(index, 'startTime', e.target.value)}
                        className="w-26 rounded-md border border-slate-300 bg-white px-2 py-1 text-xs text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-200"
                      />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <label className="text-xs text-slate-700">ຈົບປະຊຸມ</label>
                      <input
                        type="time"
                        value={booking.endTime}
                        onChange={(e) => updateBookingTime(index, 'endTime', e.target.value)}
                        className="w-26 rounded-md border border-slate-300 bg-white px-2 py-1 text-xs text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-200"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Section>

        <Section title="ຄຳຂໍເພີ່ມເຕີມ (ຖ້າມີ) :">
          <TextareaAutosize
            aria-label="minimum height"
            minRows={4}
            placeholder="ທ່ານຕ້ອງການອຸປະກອນເພີ່ມເຕີມຫຼືມີຄໍາຮ້ອງຂໍເປັນພິເສດ ..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-2.5 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-200"
          />
        </Section>

        {/* Compact Status */}
        {roomData && (
          <div className={`text-xs px-2.5 py-1.5 rounded-lg ${
            roomData.isValid 
              ? 'bg-green-50 text-green-700 border border-green-200' 
              : 'bg-amber-50 text-amber-700 border border-amber-200'
          }`}>
            {roomData.isValid 
              ? '✓ ພ້ອມຈອງຫ້ອງ' 
              : '⚠ ຍັງຈອງບໍ່ໃດ້'}
          </div>
        )}

        <div>
          <button
            onClick={handleSubmit}
            disabled={isPending || !isBookingEnabled()}
            className={`w-full rounded-lg px-4 py-2.5 text-sm font-semibold text-white shadow-md transition ${
              isBookingEnabled() 
                ? 'bg-blue-500 shadow-blue-500/20 hover:bg-blue-600' 
                : 'bg-gray-400 shadow-gray-400/20 cursor-not-allowed'
            } disabled:opacity-70`}
          >
            {isPending ? 'ຈອງຫ້ອງນີ້...' : 'ຈອງຫ້ອງ'}     
          </button>
          
          <p className="mt-2 text-center text-xs text-slate-600">{dateLabel}</p>
          
          {!isBookingEnabled() && !isPending && (
            <p className="mt-2 rounded-lg bg-red-50 px-2.5 py-1.5 text-center text-xs text-red-700 ring-1 ring-red-200">
              ກະລຸນາໃສ່ຂໍ້ມູນໃຫ້ຄົບຖ່ວນ
            </p>
          )}
          
          {status && (
            <p className={`mt-2 rounded-lg px-2.5 py-1.5 text-center text-xs ring-1 ${
              status.includes('successfully') 
                ? 'bg-emerald-50 text-emerald-700 ring-emerald-200'
                : 'bg-red-50 text-red-700 ring-red-200'
            }`}>
              {status}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}