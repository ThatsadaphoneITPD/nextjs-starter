"use client";
import { useState } from "react"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CardAvilableRooms from './../../components/card-room/card-avilable-rooms';

export default function Home() {
  const [time, settime] = useState('');
  const dummyRooms = [
    {
      path_image: "/mt-room.png",
      room_name: "Medium Room 801",
      avilable_date: "2025-02-04",
      time: "12:00PM",
      capacity: "6–10",
      status: 1,
    },
    {
      path_image: "/mt-room.png",
      room_name: "Large Room 302",
      avilable_date: "2025-02-05",
      time: "5:00PM",
      capacity: "15–20",
      status: 2,
    },
  ];


  const handleChange = (e) => {
    settime(e.target.value);
  };

  return (
    <div className="">
      <section className="cover-home flex items-center justify-center h-screen">
        <h1 className="text">
          Meeting Room
        </h1>
      </section>
      <section className="fiter-home" >
        <FormControl sx={{ m: 1, minWidth: 80 }}>
          <InputLabel id="demo-simple-select-autowidth-label">Time</InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={time}
            onChange={handleChange}
            autoWidth
            label="time"
          >
            <MenuItem value=""> <em>ວ່າງ</em></MenuItem>
            <MenuItem value={20}>ພາກເຊົ້າ</MenuItem>
            <MenuItem value={21}>ພາກແລງ</MenuItem>
          </Select>
        </FormControl>
      </section>
      <section className="avilable-room grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {dummyRooms.map((room, idx) => (
          <div key={idx} className="flex justify-center">
            <CardAvilableRooms {...room} />
          </div>
        ))}
      </section>
    </div>
  );
}
