"use client";
import React, { useState } from 'react';
import CardRoom from '@/components/card-room/card-room';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function Page() {
  const rooms = [
    { id: 1, path_image: "/mt-room.png", room_name: "Room101", avilable_date: "16-09-2025", time: "10:00 - 12:00", capacity: "6-10", status: "1", building: "ຕຶກສຳນັກງານໃຫຍ່", floor: "ຊັ້ນ 1" },
    { id: 2, path_image: "/room801.jpg", room_name: "Room801", avilable_date: "16-09-2025", time: "14:00 - 16:00", capacity: "100-150", status: "2", building: "ຕຶກສຳນັກງານໃຫຍ່", floor: "ຊັ້ນ 8" },
    { id: 3, path_image: "/room103.jpg", room_name: "Room103", avilable_date: "17-09-2025", time: "09:00 - 11:00", capacity: "100-150", status: "1", building: "ຕຶກສຳນັກງານໃຫຍ່ ", floor: "ຊັ້ນ 1" },
    { id: 4, path_image: "/room201.png", room_name: "Room303", avilable_date: "17-09-2025", time: "09:00 - 11:00", capacity: "100-150", status: "1", building: "ຕຶກສະຖາບັນ", floor: "ຊັ້ນ 3" },
    { id: 5, path_image: "/room202.jpg", room_name: "Room101", avilable_date: "16-09-2025", time: "10:00 - 12:00", capacity: "6-10", status: "1", building: "ຕຶກສະຖາບັນ", floor: "ຊັ້ນ 1" },
    { id: 6, path_image: "/room201.png", room_name: "Room201", avilable_date: "16-09-2025", time: "14:00 - 16:00", capacity: "100-150", status: "2", building: "ຕຶກສຳນັກງານໃຫຍ່", floor: "ຊັ້ນ 2" },
    { id: 7, path_image: "/room201.png", room_name: "Room201", avilable_date: "17-09-2025", time: "09:00 - 11:00", capacity: "100-150", status: "1", building: "ຕຶກສະຖາບັນ", floor: "ຊັ້ນ 2" },
    { id: 8, path_image: "/room201.png", room_name: "Room201", avilable_date: "16-09-2025", time: "14:00 - 16:00", capacity: "100-150", status: "2", building: "ຕຶກສຳນັກງານໃຫຍ່", floor: "ຊັ້ນ 2" },
    { id: 9, path_image: "/room801.jpg", room_name: "Room801", avilable_date: "17-09-2025", time: "09:00 - 11:00", capacity: "100-150", status: "1", building: "ຕຶກສະຖາບັນ", floor: "ຊັ້ນ 1" }
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
    : [];

  const formControlStyle = { m: 1, minWidth: 120, height: 40, bgcolor: 'white' };
  
 
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