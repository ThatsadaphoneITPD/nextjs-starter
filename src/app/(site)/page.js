"use client";
import { useState } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CardAvilableRooms from '@/components/card-room/CardAvilableRooms';
import CardBooking from '@/components/card-room/card-book'; 
import RoomOverview from '@/components/card-room/room-overview';

export default function Home() {
  const [filterTime, setFilterTime] = useState('');
  const [filterDuration, setFilterDuration] = useState('');
  const [filterCapacity, setFilterCapacity] = useState('');
  const [filterAmenities, setFilterAmenities] = useState('');

  // Dummy data (unchanged)
  const availableRooms = [
    { path_image: "/mt-room.png", room_name: "ຫ້ອງ 801", avilable_date: "2025-02-04", time: "8:00AM", capacity: "6-10", status: 1 },
    { path_image: "/room201.png", room_name: "ຫ້ອງ 302", avilable_date: "2025-02-05", time: "8:30AM", capacity: "50-1", status: 1 },
    { path_image: "/room201.png", room_name: "ຫ້ອງ 302", avilable_date: "2025-02-05", time: "13:00PM", capacity: "15-20", status: 1 },
    { path_image: "/room801.jpg", room_name: "ຫ້ອງ 302", avilable_date: "2025-02-05", time: "13:00PM", capacity: "15-20", status: 2 },
    { path_image: "/room801.jpg", room_name: "ຫ້ອງ 302", avilable_date: "2025-02-05", time: "14:00PM", capacity: "15-20", status: 2 },
  ];
  
  const upcomingBookings = [
    { title: 'ສຸຂະພາບຈິດໃນຍຸກດິຈິຕ້ອນ', roomNumber: 'ຫ້ອງ 201', date: 'Feb 4, 2025', time: '10:00AM-11:00AM', capacity: '100-150' },
    { title: 'ການສຶກສາ ແລະ ຮຽນອອນໄລນ໌', roomNumber: 'ຫ້ອງ 801', date: 'Feb 4, 2025', time: '10:00AM-11:00AM', capacity: '100-150' },
  ];

  const roomOverview = [
    { roomNumber: 'ຫ້ອງ 102', department: 'IT Department', capacity: '10 ຄົນ', equipment: ['Projector', 'Extra Chairs', 'Drink Service'] },
    { roomNumber: 'ຫ້ອງ 201', department: 'IT Department', capacity: '10 ຄົນ', equipment: ['Projector', 'Extra Chairs', 'Drink Service'] },
    { roomNumber: 'ຫ້ອງ 801', department: 'IT Department', capacity: '10 ຄົນ', equipment: ['Projector', 'Extra Chairs', 'Drink Service'] },
    { roomNumber: 'ຫ້ອງ 101', department: 'IT Department', capacity: '10 ຄົນ', equipment: ['Projector', 'Extra Chairs'] },
    { roomNumber: 'ຫ້ອງ 201', department: 'IT Department', capacity: '10 ຄົນ', equipment: ['Projector', 'Extra Chairs'] },
    { roomNumber: 'ຫ້ອງ 801', department: 'IT Department', capacity: '10 ຄົນ', equipment: ['Projector', 'Extra Chairs'] },
  ];

  const handleChangeTime = (e) => setFilterTime(e.target.value);
  const handleChangeDuration = (e) => setFilterDuration(e.target.value);
  const handleChangeCapacity = (e) => setFilterCapacity(e.target.value);
  const handleChangeAmenities = (e) => setFilterAmenities(e.target.value);

  const filteredRooms = availableRooms.filter(room => {
    // Logic for filtering by time
    const timeMatch = (() => {
      if (!filterTime) return true;
      const hour = parseInt(room.time.split(':')[0]);
      if (filterTime === 'Morning') return hour >= 8 && hour < 12;
      if (filterTime === 'Afternoon') return hour >= 12 && hour < 18;
      return true;
    })();

    // Logic for filtering by capacity
    const capacityMatch = (() => {
      if (!filterCapacity) return true;
      if (filterCapacity === '6-10') return room.capacity === '6-10';
      if (filterCapacity === '15-20') return room.capacity === '15-20';
      if (filterCapacity === '100-150') return room.capacity === '100-150';
      return true;
    })();

  

    return timeMatch && capacityMatch;
  });

  const handleSearch = () => {
    console.log("Search parameters:", { filterTime, filterDuration, filterCapacity, filterAmenities });
  };
  const filterContainerStyle = " p-2 rounded-lg flex flex-wrap gap-1 items-center justify-center";
  const formControlStyle = { m: 1, minWidth: 120, height: 40, bgcolor: 'white' };
  

  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="cover-home flex items-center justify-center h-screen bg-[#131FA8]">
        <h1 className=" text-5xl font-bold text-[#131FA8]">
          Meeting Room
        </h1>
      </section>
      
      <section className="p-2">
        
        {/* Filter Section */}
        <div className={filterContainerStyle}>
          {/* Time Dropdown */}
          <FormControl sx={formControlStyle} size="small">
            <InputLabel>ຊ່ວງ</InputLabel>
            <Select value={filterTime} onChange={handleChangeTime} label="Time">
           
              <MenuItem value="/">ທັງໝົດ</MenuItem>
              <MenuItem value="Morning">ພາກເຊົ້າ</MenuItem>
              <MenuItem value="Afternoon">ພາກແລງ</MenuItem>
            </Select>
          </FormControl>
          
          {/* Duration Dropdown */}
          <FormControl sx={formControlStyle} size="small">
            <InputLabel>ຊົ່ວໂມງປະຊຸມ</InputLabel>
            <Select value={filterDuration} onChange={handleChangeDuration} label="Duration">
               <MenuItem value="/">--</MenuItem>
              <MenuItem value="1hr">1 ຊົ່ວໂມງ</MenuItem>
              <MenuItem value="2hr">2 ຊົ່ວໂມງ</MenuItem>
              <MenuItem value="3hr">3 ຊົ່ວໂມງ</MenuItem>
            </Select>
          </FormControl>
          
          {/* Capacity Dropdown */}
          <FormControl sx={formControlStyle} size="small">
            <InputLabel>ຈຳນວນຄົນ</InputLabel>
            <Select value={filterCapacity} onChange={handleChangeCapacity} label="Capacity">
               <MenuItem value="/">--</MenuItem>
              <MenuItem value="6-10">6-10 ຄົນ</MenuItem>
              <MenuItem value="15-20">15-20 ຄົນ</MenuItem>
              <MenuItem value="100-150">100-150 ຄົນ</MenuItem>
            </Select>
          </FormControl>

          {/* Amenities Dropdown */}
          <FormControl sx={formControlStyle} size="small">
            <InputLabel>ບໍລິການ</InputLabel>
            <Select value={filterAmenities} onChange={handleChangeAmenities} label="Amenities">
              <MenuItem value="/">--</MenuItem>
              <MenuItem value="projector">Projector</MenuItem>
              <MenuItem value="whiteboard">Whiteboard</MenuItem>
              <MenuItem value="DrinkService">Drink Service</MenuItem>
              <MenuItem value="ExtraChair">Extra Chair</MenuItem>
            </Select>
          </FormControl>

          {/* Search Button */}
          {/* <Button
            variant="contained"
            sx={buttonStyle}
            onClick={handleSearch}
          >
            <SearchIcon sx={{ mr: 1 }} /> ຄົ້ນຫາ
          </Button> */}
        </div>
        </section>

        <section className="p-8">
        <h2 className="text-2xl font-bold mb-4  text-[#131FA8]">ຫ້ອງວ່າງ</h2>

        <div className="avilable-room grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {filteredRooms.map((room, idx) => (
            <div key={idx} className="flex justify-center">
              <CardAvilableRooms {...room} />
            </div>
          ))}
        </div>
        </section>
      
      <section className="p-8">
        <h2 className="text-2xl font-bold mb-4 text-[#131FA8]">ວາລະທີ່ດຳເນີນງານຢູ່</h2>
        <div className="flex flex-wrap gap-4">
          {upcomingBookings.map((booking, index) => (
            <CardBooking
              key={index}
              title={booking.title}
              date={booking.date}
              time={booking.time}
              capacity={booking.capacity}
              roomNumber={booking.roomNumber}
            />
          ))}
        </div>
      </section>

      <section className="p-8">
        <h2 className="text-2xl font-bold mb-4 text-[#131FA8]">ພາບລວມຫ້ອງຂອງມື້ນີ້</h2>
        <RoomOverview roomData={roomOverview} />
      </section>
    </div>
  );
}