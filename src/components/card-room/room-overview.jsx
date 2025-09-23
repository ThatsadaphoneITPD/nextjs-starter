import React from 'react';

export default function RoomOverview({ roomData }) {
  if (!roomData || roomData.length === 0) {
    return <p>No room data available.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">ເລກຫ້ອງ</th>
            <th scope="col" className="px-6 py-3">ພະແນກ</th>
            <th scope="col" className="px-6 py-3">ຈຳນວນຄົນ</th>
            <th scope="col" className="px-6 py-3">ສິ່ງອຳນວຍຄວາມສະດວກ</th>
          </tr>
        </thead>
        <tbody>
          {roomData.map((room, index) => (
            <tr key={index} className="bg-white border-b hover:bg-gray-100">
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {room.roomNumber}
              </td>
              <td className="px-6 py-4">{room.department}</td>
              <td className="px-6 py-4">{room.capacity}</td>
              <td className="px-6 py-4">
                <div className="flex flex-wrap gap-2">
                  {room.equipment.map((item, i) => (
                    <span
                      key={i}
                      className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}