import { useMemo, useState } from 'react'

// Date utility functions
const addMonths = (date, amount) => {
  const result = new Date(date)
  result.setMonth(result.getMonth() + amount)
  return result
}

const format = (date, formatStr) => {
  if (formatStr === 'MMMM yyyy') {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  }
  if (formatStr === 'd') {
    return date.getDate().toString()
  }
  return date.toString()
}

const isSameDay = (date1, date2) => {
  return date1.getDate() === date2.getDate() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getFullYear() === date2.getFullYear()
}

const isSameMonth = (date1, date2) => {
  return date1.getMonth() === date2.getMonth() &&
         date1.getFullYear() === date2.getFullYear()
}

const isToday = (date) => {
  const today = new Date()
  return isSameDay(date, today)
}

const startOfMonth = (date) => {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

const startOfWeek = (date) => {
  const result = new Date(date)
  const day = result.getDay()
  result.setDate(result.getDate() - day)
  return result
}

const addDays = (date, amount) => {
  const result = new Date(date)
  result.setDate(result.getDate() + amount)
  return result
}

export default function Calendar({ selectedBookings, onChange }) {
  const [month, setMonth] = useState(() => {
    return startOfMonth(new Date())
  })
  
  const weeks = useMemo(() => {
    const start = startOfWeek(startOfMonth(month))
    const total = 42
    
    return Array.from({ length: total }, (_, i) => {
      return addDays(start, i)
    })
  }, [month])

  const currentBooked = [
    "2025/10/04", "2025/10/06",  "2025/10/19", "2025/10/20", "2025/10/21", 
  ]

  const isDateBooked = (date) => {
    const dateStr = `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`
    return currentBooked.includes(dateStr)
  }

  const handleDateClick = (clickedDate) => {
    // Prevent clicking on already booked dates
    if (isDateBooked(clickedDate)) {
      return
    }

    const existingIndex = selectedBookings.findIndex(booking => isSameDay(booking.date, clickedDate))
    
    if (existingIndex !== -1) {
      // Remove the booking if it's already selected
      const newBookings = selectedBookings.filter((_, index) => index !== existingIndex)
      onChange(newBookings)
    } else {
      // Add new booking with default times
      const newBooking = {
        date: new Date(clickedDate),
        startTime: '08:30',
        endTime: '11:30'
      }
      
      let newBookings = [...selectedBookings, newBooking]
      
      // If we have more than 3 bookings, remove the oldest one
      if (newBookings.length > 3) {
        newBookings = newBookings.slice(1)
      }
      
      onChange(newBookings)
    }
  }
  
  return (
    <div className="w-full rounded-xl border border-slate-200 bg-white p-4 shadow-lg">
      <div className="mb-3 flex items-center justify-between">
        <button 
          onClick={() => setMonth(addMonths(month, -1))} 
          className="rounded-md px-2 py-1.5 text-slate-700 hover:bg-slate-100 transition-colors"
        >
          ‹
        </button>
        <div className="text-sm font-medium text-slate-900">
          {format(month, 'MMMM yyyy')}
        </div>
        <button 
          onClick={() => setMonth(addMonths(month, 1))} 
          className="rounded-md px-2 py-1.5 text-slate-700 hover:bg-slate-100 transition-colors"
        >
          ›
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-1 text-center text-xs text-slate-500">
        {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => 
          <div key={d} className="py-1">{d}</div>
        )}
      </div>
      
      <div className="mt-1 grid grid-cols-7 gap-1">
        {weeks.map((d, i) => {
          const currentMonth = isSameMonth(d, month)
          const selected = selectedBookings.some(booking => isSameDay(booking.date, d))
          const today = isToday(d)
          const booked = isDateBooked(d)
          
          return (
            <button
              key={i}
              onClick={() => handleDateClick(d)}
              disabled={booked}
              className={[
                'aspect-square rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors relative',
                currentMonth ? 'text-slate-900' : 'text-slate-400',
                booked ? 'bg-[#85a5ff] text-white cursor-not-allowed' :
                selected ? 'bg-blue-500 text-white' : 
                today ? 'ring-1 ring-blue-200' : 
                'hover:bg-slate-100'
              ].join(' ')}
            >
              {format(d, 'd')}
              {selected && (
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-600 rounded-full border border-white"></div>
              )}
              {/* {booked && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-0.5 h-full bg-red-300 rotate-45 absolute"></div>
                </div>
              )} */}
            </button>
          )
        })}
      </div>
      
      {selectedBookings.length > 0 && (
        <div className="mt-3 text-xs text-slate-600">
          Selected: {selectedBookings.length}/3 dates
        </div>
      )}
    </div>
  )
}