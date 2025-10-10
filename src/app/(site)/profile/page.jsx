"use client";
import { useState } from "react";

function Inside() {
  const User = [
    {
      id: "444444",
      user_name: "Medium Room",
      department: "IT"
    },
   
    {
      id: "123456",
      user_name: "John Doe",
      department: "IT"
    },
    {
      id: "666666",
      user_name: "Jane Smith",
      department: "TI"
    },
  ];

  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [department, setDepartment] = useState("");

  const handleIdChange = (e) => {
    const inputId = e.target.value;
    setUserId(inputId);

  
    const foundUser = User.find((user) => user.id === inputId);

   
    if (foundUser) {
      setUserName(foundUser.user_name);
      setDepartment(foundUser.department);
    } else {
     
      setUserName("");
      setDepartment("");
    }
  };

  return (
    <div>
      <div
        className=" p-1 col-span-2 min-h-[200px]"
        style={{ backgroundColor: "#FFFFFF" }}
      >
        <div className="flex flex-col space-y-2 px-2 py-1">
          <div>
            <label className="block text-blue-900 font-semibold mb-1">
              ພີມລະຫັດ ຟຟລ
            </label>
           <input
             type="text"
             className="text-black-800 border p-2 rounded w-full font-bold"
             value={userId}
             onChange={handleIdChange}
             maxLength={6}
           />
          </div>

          <div>
            <label className="block text-blue-900 font-semibold mb-1">
              ຊື່ ແລະ ນາມສະກຸນ
            </label>
            <input
              type="text"
              className=" text-black-800 border p-2 rounded w-full font-bold"
              value={userName}
              readOnly 
            />
          </div>

          <div>
            <label className="block text-blue-900 font-semibold mb-1">
              ມາຈາກພາກສ່ວນ
            </label>
            <input
              type="text"
              className=" text-black-800 border p-2 rounded w-full font-bold"
              value={department}
              readOnly 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BorderBox() {
  const [showInside, setShowInside] = useState(false);

  return (
    <div className="flex flex-col items-center">
      <div className="border-4 border-blue-900 rounded-lg w-full max-w-3xl min-h-[450px] mx-auto mt-8 shadow-lg overflow-hidden">
        <div className="grid grid-cols-3 h-full">
          <div
           className="col-span-1 min-h-[450px] flex items-center justify-center"
             style={{
             backgroundImage: "linear-gradient(to bottom, #041069, #131FA8, #272FF5)"
             }}
               >
         <img
        src="/edl1.png"
        alt="Logo"
        className="w-[180px] h-[180px] rounded-full"
        />
          </div>

          <div
            className="p-9 col-span-2 min-h-[450px]"
            style={{ backgroundColor: "#FFFFFF" }}
          >
            <div className="flex justify-between mb-6">
              <button
                type="button"
                onClick={() => setShowInside(true)}
                className="bg-blue-800 text-white py-2 rounded w-40 
                shadow-md transition-all duration-200 ease-in-out
                hover:scale-110 hover:shadow-xl"
              >
                ພາກສ່ວນພາຍໃນ
              </button>

              <button
                type="button"
                onClick={() => setShowInside(false)}
                className="bg-blue-800 text-white py-2 rounded w-40 
                shadow-md transition-all duration-200 ease-in-out
                hover:scale-110 hover:shadow-xl"
              >
                ພາກສ່ວນພາຍນອກ
              </button>
            </div>

            {showInside ? (
              <Inside />
            ) : (
              <div className="flex flex-col space-y-6 px-8 py-4">
                <div>
                  <label className="block text-blue-900 font-semibold mb-1">
                    ຊື່ ແລະ ນາມສະກູນ
                  </label>
                  <input type="text" className="border p-2 rounded w-full" />
                </div>
                <div>
                  <label className="block text-blue-900 font-semibold mb-1">
                    ເບີໂທຕຶດຕໍ່
                  </label>
                  <input type="text" className="border p-2 rounded w-full" />
                </div>
                <div>
                  <label className="block text-blue-900 font-semibold mb-1">
                    ຕຳແຫນ່ງ
                  </label>
                  <input type="text" className="border p-2 rounded w-full" />
                </div>
                <div>
                  <label className="block text-blue-900 font-semibold mb-1">
                    ມາຈາກພາກສ່ວນ
                  </label>
                  <input
                    type="text"
                    className="border p-2 rounded w-full"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="bg-blue-900 text-white py-2 rounded mx-7 mt-5 mb-5 w-30
          shadow-md transition-all duration-200 ease-in-out
           hover:scale-110 hover:shadow-xl"
      >
        ເຂົ້າຮ່ວມ
      </button>
    </div>
  );
}