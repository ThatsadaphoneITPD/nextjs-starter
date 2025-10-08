"use client";
import React, { useState } from 'react';
import CardRoom from '@/components/card-room/card-room';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export default function Page() {
  const rooms = [
    { id: 1, path_image: "/mt-room.png", room_name: "ຫ້ອງ 101", avilable_date: "16-09-2025", time: "10:00 - 12:00", capacity: "6-10", status: "1", building: "ຕຶກສຳນັກງານໃຫຍ່", floor: "ຊັ້ນ 1" },
    { id: 2, path_image: "/room801.jpg", room_name: "ຫ້ອງ 801", avilable_date: "16-09-2025", time: "14:00 - 16:00", capacity: "100-150", status: "2", building: "ຕຶກສຳນັກງານໃຫຍ່", floor: "ຊັ້ນ 8" },
    { id: 3, path_image: "/room103.jpg", room_name: "ຫ້ອງ 103", avilable_date: "17-09-2025", time: "09:00 - 11:00", capacity: "100-150", status: "1", building: "ຕຶກສຳນັກງານໃຫຍ່ ", floor: "ຊັ້ນ 1" },
    { id: 4, path_image: "/room201.png", room_name: "ຫ້ອງ 303", avilable_date: "17-09-2025", time: "09:00 - 11:00", capacity: "100-150", status: "1", building: "ຕຶກສະຖາບັນ", floor: "ຊັ້ນ 3" },
    { id: 5, path_image: "/room202.jpg", room_name: "ຫ້ອງ 101", avilable_date: "16-09-2025", time: "10:00 - 12:00", capacity: "6-10", status: "1", building: "ຕຶກສະຖາບັນ", floor: "ຊັ້ນ 1" },
    { id: 6, path_image: "/room201.png", room_name: "ຫ້ອງ 201", avilable_date: "16-09-2025", time: "14:00 - 16:00", capacity: "100-150", status: "2", building: "ຕຶກສຳນັກງານໃຫຍ່", floor: "ຊັ້ນ 2" },
    { id: 7, path_image: "/room201.png", room_name: "ຫ້ອງ 201", avilable_date: "17-09-2025", time: "09:00 - 11:00", capacity: "100-150", status: "1", building: "ຕຶກສະຖາບັນ", floor: "ຊັ້ນ 2" },
    { id: 8, path_image: "/room201.png", room_name: "ຫ້ອງ 201", avilable_date: "16-09-2025", time: "14:00 - 16:00", capacity: "100-150", status: "2", building: "ຕຶກສຳນັກງານໃຫຍ່", floor: "ຊັ້ນ 2" },
    { id: 9, path_image: "/room801.jpg", room_name: "ຫ້ອງ 802", avilable_date: "17-09-2025", time: "09:00 - 11:00", capacity: "100-150", status: "1", building: "ຕຶກສຳນັກງານໃຫຍ່", floor: "ຊັ້ນ 8" },
    
  ];

  const [filterBuilding, setFilterBuilding] = useState('');
  const [filterFloor, setFilterFloor] = useState('');

  const handleBuildingChange = (e) => {
    const building = e.target.value;
    setFilterBuilding(building);
    setFilterFloor('');
  };

  const handleFloorChange = (e) => {
    setFilterFloor(e.target.value);
  };

  const filteredRooms = rooms.filter(room => {
    const buildingMatch = filterBuilding === '' || room.building.trim() === filterBuilding.trim();
    const floorMatch = filterFloor === '' || room.floor.trim() === filterFloor.trim();
    
    return buildingMatch && floorMatch;
  });

  const uniqueBuildings = [...new Set(rooms.map(room => room.building.trim()))];
 const uniqueFloors = filterBuilding 
    ? [...new Set(rooms.filter(room => room.building.trim() === filterBuilding.trim()).map(room => room.floor.trim()))] 
    // ใช้ .sort() เพื่อเรียงลำดับตัวเลข
    .sort((a, b) => {
        // ดึงตัวเลขออกจากสตริง "ຊັ້ນ X"
        // เช่น "ຊັ້ນ 1" จะกลายเป็น 1, "ຊັ້ນ 8" จะกลายเป็น 8
        const numA = parseInt(a.replace(/\D/g, ''), 10);
        const numB = parseInt(b.replace(/\D/g, ''), 10);
        
        // เปรียบเทียบตัวเลข: numA - numB จะเรียงจากน้อยไปมาก (1, 2, 8)
        return numA - numB;
    })
    : [];
  const formControlStyle = {minWidth: 120, bgcolor: 'white'};
  const filterContainerStyle = "p-2 rounded-lg flex flex-wrap gap-1 ";

  return (
    <div className="p-4">
      <section className="p-2">
        <div className={filterContainerStyle}>
          <FormControl sx={formControlStyle} size="small">
            <InputLabel>ຕຶກ</InputLabel>
            <Select value={filterBuilding} onChange={handleBuildingChange} label="ຕຶກ">
              <MenuItem value=""><em>ທັງໝົດ</em></MenuItem>
              {uniqueBuildings.map(building => (
                <MenuItem key={building} value={building}>{building}</MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Dropdown for Floor */}
          <FormControl sx={formControlStyle} size="small">
            <InputLabel>ຊັ້ນ</InputLabel>
            <Select value={filterFloor} onChange={handleFloorChange} label="ຊັ້ນ" disabled={!filterBuilding}>
              <MenuItem value=""><em>ທັງໝົດ</em></MenuItem>
              {uniqueFloors.map(floor => (
                <MenuItem key={floor} value={floor}>{floor}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </section>

      {/* Display Filtered Rooms */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 px-6 py-4">
        {filteredRooms.map(room => (
          <CardRoom
            key={room.id}
            path_image={room.path_image}
            room_name={room.room_name}
            avilable_date={room.avilable_date}
            time={room.time}
            capacity={room.capacity}
            status={room.status}
          />
        ))}
      </div>
    </div>
  );
}