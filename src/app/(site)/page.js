"use client";
import { useState } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CardAvilableRooms from '@/components/card-room/CardAvilableRooms';
import CardBooking from '@/components/card-room/card-book';
import RoomOverview from '@/components/card-room/room-overview';
import Modal from "@mui/material/Modal";
import RoomPopup from "@/components/room-book/room-popup";

export default function Home() {
  const [currentItem, setItem] = useState();
  const [openModal, setModadl] = useState(false);
  const [filterTime, setFilterTime] = useState('');
  const [filterDuration, setFilterDuration] = useState('');
  const [filterCapacity, setFilterCapacity] = useState('');
  const [filterAmenities, setFilterAmenities] = useState('');

  const availableRooms = [
    { id: 1, room_number: 801, path_image: "/mt-room.png", room_name: "ຫ້ອງ 801", avilable_date: "2025-02-04", time: "8:00AM", capacity: "6-10", status: 1 },
    { id: 2, room_number: 302, path_image: "/room201.png", room_name: "ຫ້ອງ 302", avilable_date: "2025-02-05", time: "8:30AM", capacity: "50-100", status: 1 },
    { id: 3, room_number: 303, path_image: "/room201.png", room_name: "ຫ້ອງ 303", avilable_date: "2025-02-05", time: "13:00PM", capacity: "15-20", status: 1 },
    { id: 4, room_number: 304, path_image: "/room801.jpg", room_name: "ຫ້ອງ 304", avilable_date: "2025-02-05", time: "13:00PM", capacity: "15-20", status: 1 },
    { id: 5, room_number: 305, path_image: "/room801.jpg", room_name: "ຫ້ອງ 305", avilable_date: "2025-02-05", time: "14:00PM", capacity: "15-20", status: 1 },
  ];

  const upcomingBookings = [
    { title: 'ສຸຂະພາບຈິດໃນຍຸກດິຈິຕ້ອນ', roomNumber: 'ຫ້ອງ 201', date: 'Feb 4, 2025', time: '10:00AM-11:00AM', capacity: '100-150' },
    { title: 'ການສຶກສາ ແລະ ຮຽນອອນໄລນ໌', roomNumber: 'ຫ້ອງ 801', date: 'Feb 4, 2025', time: '10:00AM-11:00AM', capacity: '100-150' },
  ];

  const roomOverview = [
    { roomNumber: 'ຫ້ອງ 102', department: 'IT Department', capacity: '10 ຄົນ', equipment: ['Projector', 'Extra Chairs', 'Drink Service'] },
    { roomNumber: 'ຫ້ອງ 201', department: 'IT Department', capacity: '10 ຄົນ', equipment: ['Projector', 'Extra Chairs', 'Drink Service'] },
    { roomNumber: 'ຫ້ອງ 801', department: 'IT Department', capacity: '10 ຄົນ', equipment: ['Projector', 'Extra Chairs', 'Drink Service'] },
  ];

  // ฟังก์ชัน clear filter
  const handleClear = (setter) => (event) => {
    event.stopPropagation();
    setter('');
  };

  // ฟังก์ชันเปลี่ยนค่าแต่ละ dropdown
  const handleChangeTime = (e) => setFilterTime(e.target.value);
  const handleChangeDuration = (e) => setFilterDuration(e.target.value);
  const handleChangeCapacity = (e) => setFilterCapacity(e.target.value);
  const handleChangeAmenities = (e) => setFilterAmenities(e.target.value);
  const handleModal = (item) => {
    console.log("item", item);
    setItem(item);
    setTimeout(() => {
      setModadl(true);
    }, 300);
  };

  const closeModal = () => {
    setModadl(false);
  };


  // ✅ ฟังก์ชันใหม่: รองรับ 13:00PM และเวลา 24 ชั่วโมง
  const convertTo24Hour = (timeStr) => {
    const match = timeStr.match(/(\d+):(\d+)(AM|PM)?/i);
    if (!match) return -1;

    let [hour, minute, modifier] = [parseInt(match[1], 10), parseInt(match[2], 10), match[3]];

    // ถ้าไม่มี AM/PM แสดงว่าเป็นเวลา 24 ชม. อยู่แล้ว
    if (!modifier) return hour;

    // ถ้าเกิน 12 ให้ถือว่าเป็น 24 ชม. อยู่แล้ว เช่น 13PM
    if (hour > 12) return hour;

    if (modifier.toUpperCase() === "PM" && hour !== 12) hour += 12;
    if (modifier.toUpperCase() === "AM" && hour === 12) hour = 0;

    return hour;
  };

  const filteredRooms = availableRooms.filter(room => {
    const roomHour = convertTo24Hour(room.time);
    const timeMatch = (filterTime === '' || filterTime === 'ທັງໝົດ') ||
      (filterTime === 'ພາກເຊົ້າ' && roomHour >= 8 && roomHour < 12) ||
      (filterTime === 'ພາກແລງ' && roomHour >= 12 && roomHour < 18);
    const capacityMatch = !filterCapacity || room.capacity === filterCapacity;

    return timeMatch && capacityMatch;
  });

  const formControlStyle = { m: 1, minWidth: 120, bgcolor: 'white', borderRadius: 2 };
  const style = {position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: "1rem"};

  return (
    <div className="bg-gray-50 min-h-screen">
      <Modal
        open={openModal}
        onClose={closeModal}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 500 }}>
          <RoomPopup itemRow={currentItem} onClose={closeModal} />
        </Box>
      </Modal>

      {/* Header */}
      <section className="cover-home flex items-center justify-center h-60 sm:h-80 md:h-96 bg-[#131FA8]">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center">Meeting Room</h1>
      </section>

      {/* Filter Section */}
      <section className="p-4">
        <div className="flex flex-row flex-wrap gap-2 items-stretch justify-center">
          {[{
            label: 'ຊ່ວງ', value: filterTime, onChange: handleChangeTime, options: ['ພາກເຊົ້າ', 'ພາກແລງ'], setter: setFilterTime
          }, {
            label: 'ຊົ່ວໂມງປະຊຸມ', value: filterDuration, onChange: handleChangeDuration, options: ['1ຊົ່ວໂມງ', '2ຊົ່ວໂມງ', '3ຊົ່ວໂມງ'], setter: setFilterDuration
          }, {
            label: 'ຈຳນວນຄົນ', value: filterCapacity, onChange: handleChangeCapacity, options: ['6-10', '15-20', '100-150'], setter: setFilterCapacity
          }, {
            label: 'ບໍລິການ', value: filterAmenities, onChange: handleChangeAmenities, options: ['projector', 'whiteboard', 'DrinkService', 'ExtraChair'], setter: setFilterAmenities
          }].map((filter, idx) => (
            <Box key={idx} sx={{ position: 'relative', flex: '1 1 auto', minWidth: 120, maxWidth: 'calc(50% - 4px)' }}>
              <FormControl sx={formControlStyle} size="small" fullWidth>
                <InputLabel>{filter.label}</InputLabel>
                <Select
                  value={filter.value}
                  onChange={filter.onChange}
                  label={filter.label}
                  sx={{
                    pr: filter.value && filter.value !== '/' && filter.value !== 'ທັງໝົດ' ? '40px !important' : undefined
                  }}
                >
                  {filter.options.map((opt, i) => (
                    <MenuItem key={i} value={opt === '/' || opt === 'ທັງໝົດ' ? '' : opt}>
                      {opt === '/' ? 'ທັງໝົດ' : opt}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {(filter.value && filter.value !== '/' && filter.value !== 'ທັງໝົດ') && (
                <IconButton
                  size="small"
                  onClick={handleClear(filter.setter)}
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 32,
                    p: 0.5,
                    zIndex: 10,
                    color: 'rgba(0, 0, 0, 0.54)',
                    '&:hover': { color: '#131FA8' },
                  }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              )}
            </Box>
          ))}
        </div>
      </section>

      {/* Available Rooms */}
      <section className="p-4">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-[#131FA8]">ຫ້ອງວ່າງ</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredRooms.map((room, idx) => (
            <CardAvilableRooms key={idx} {...room} onClick={() => { handleModal(room) }} />
          ))}
        </div>
      </section>

      {/* Upcoming Bookings */}
      <section className="p-4">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-[#131FA8]">ວາລະທີ່ດຳເນີນງານຢູ່</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {upcomingBookings.map((booking, idx) => (
            <CardBooking key={idx} {...booking} />
          ))}
        </div>
      </section>

      {/* Room Overview */}
      <section className="p-4 overflow-x-auto">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-[#131FA8]">ພາບລວມຫ້ອງຂອງມື້ນີ້</h2>
        <div className="min-w-full sm:min-w-[600px]">
          <RoomOverview roomData={roomOverview} />
        </div>
      </section>
    </div>
  );
}
