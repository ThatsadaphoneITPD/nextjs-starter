"use client";
import { useState } from "react";
import { Check } from "lucide-react";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export function FlipCard({ showInside, setShowInside, handleInsideSubmit, handleOutsideSubmit }) {
  return (
    <div >
      {/* flip container */}
      <div style={{ perspective: "1000px" }} className="relative w-full h-[450px]">
        <div
          style={{
            transformStyle: "preserve-3d",
            transition: "transform 0.8s",
            transform: showInside ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
          className="relative w-full h-full"
        >
          <div
            style={{
              backfaceVisibility: "hidden",
              position: "absolute",
              width: "100%",
            }}
            className="bg-white p-8 rounded"
          >
            <div className="flex flex-col md:flex-row justify-end gap-4 mb-4 -mt-5 w-full pr-0">
              <button 
                type="button"
                onClick={() => setShowInside(!showInside)}
                className={`"bg-white text-black border-2 border-blue-900 flex items-center justify-center py-1 px-4 rounded w-fit text-sm shadow-sm transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-md flex-row gap-1`}
              >
               <img
             src="/out-house.svg"
              alt="Logo"
                  className="w-5 h-5 object-contain bg-blue-1000"
                />
                <span>ພາຍໃນ</span>
              </button>
            </div>
            <div className="flex items-center mb-1 space-x-4 -mt-10">
              <img src="/edl1.png" alt="Logo" className="w-14 h-14 rounded-full" />
              <h1 className="text-2xl font-bold">ລົງທະບຽນຫ້ອງປະຊູມ</h1>
            </div>
            {/* ພາຍນອກ */}
            <div className="flex flex-col space-y-1 items-start">
              <label className="block text-blue-900 font-semibold mb-1">ຊື່ ແລະ ນາມສະກູນ</label>
              <input type="text" className="border p-1 rounded w-90" />
              <label className="block text-blue-900 font-semibold mb-1">ເບີໂທຕຶດຈໍ່</label>
              <input type="text" className="border p-1 rounded w-90" />
              <label className="block text-blue-900 font-semibold mb-1">ຕຳແຫນ່ງ</label>
              <input type="text" className="border p-1 rounded w-90" />
              <label className="block text-blue-900 font-semibold mb-1">ມາຈາກພາກສ່ວນ</label>
              <input type="text" className="border p-1 rounded w-90" />
              <button
                type="submit"
                onClick={handleOutsideSubmit}
                className="bg-blue-900 text-white py-3 rounded w-90 mt-6 shadow-md transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-xl"
              >
                ເຂົ້າຮ່ວມ
              </button>
            </div>
          </div>

          {/* ດ້ານຫຼັງ */}
          <div
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              position: "absolute",
              width: "100%",
            }}
            className="bg-white p-8 rounded h-full"
          >
            <InsideFrom 
              onSubmitSuccess={handleInsideSubmit} 
              showInside={showInside}
              setShowInside={setShowInside}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function SucceedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950 flex items-center justify-center p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-500"></div>
      </div>

      <div className="max-w-2xl w-full relative z-10">
        {/* Success Icon with Glow */}
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-cyan-400 rounded-full blur-2xl opacity-60 animate-pulse"></div>
            <div className="relative w-32 h-32 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-3xl flex items-center justify-center mx-auto shadow-2xl transform hover:scale-105 transition-transform duration-300">
              <Check className="h-16 w-16 text-white stroke-[3]" />
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mt-8 mb-3">
            ລົງທະບຽນສຳເລັດແລ້ວ
          </h1>
        </div>

        {/* Footer Note */}
        <div className="mt-6 text-center">
          <p className="text-sm text-blue-200">
            ຂະໄດ້ຮິບອີ່ເມວຍືນຍິນອີກ 2 ນາທີ
          </p>
        </div>
      </div>
    </div>
  );
}

function InsideFrom({ onSubmitSuccess, showInside, setShowInside}) {
  const User = [
    { id: "444444", user_name: "Medium Room", department: "IT" },
    { id: "123456", user_name: "John Doe", department: "IT" },
    { id: "666666", user_name: "Jane Smith", department: "IT" },
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userId && userName && department) {
      onSubmitSuccess();
    } else {
      alert("กรุณากรอกรหัสพนักงาน");
    }
  };

  return (
    <div>
        <div className="flex flex-col md:flex-row justify-end gap-3 mb-3 -mt-3 w-full pr-0">
          <button 
            type="button"
            onClick={() => setShowInside(!showInside)}
            className={`bg-blue-900 border-2 border-blue-900 text-white flex items-center justify-center py-1 px-1 rounded w-fit text-sm shadow-sm transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-md flex-row gap-1`}
          >
            <img
             src="/In-house.svg"
              alt="Logo"
                  className="w-5 h-5 object-contain bg-blue-1000"
                />
            <span>ພາຍນອກ</span>
          </button>
        </div>  
            <div className="flex items-center mb-1 space-x-4 -mt-10">
               <img src="/edl1.png" alt="Logo" className="w-14 h-14 rounded-full" />
              <h1 className="text-2xl font-bold">ລົງທະບຽນຫ້ອງປະຊູມ</h1>
            </div>
            {/* ພາຍນອກ */}
            <div className="flex flex-col space-y-2 items-start">
              <label className="block text-blue-900 font-semibold mb-2">ລະຫັດພະນັກງານ</label>
              <input type="text" className="text-black border p-2 rounded w-90 font-bold" value={userId} onChange={handleIdChange} maxLength={6} />
              <label className="block text-blue-900 font-semibold mb-2"> ຊື່ ແລະ ນາມສະກູນ</label>
              <input type="text" disabled={true} className="text-black border p-2 rounded w-90 font-bold" value={userName} readOnly />
              <label className="block text-blue-900 font-semibold mb-2">ມາຈາກພາກສ່ວນ</label>
              <input type="text" className="border p-2 rounded w-90 font-bold"  value={department} readOnly />
              <button type="submit" onClick={handleSubmit} className="bg-blue-900 text-white py-3 rounded w-90 mt-6 shadow-md transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-xl">
                ເຂົ້າຮ່ວມ
              </button>
            </div>
    </div>
  );
}

export default function Page() {
  const [showInside, setShowInside] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleOutsideSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(true);
  };

  const handleInsideSubmit = () => {
    setShowSuccess(true);
  };

  // Show success page
  if (showSuccess) {
    return <SucceedPage />;
  }

  return (
    <div
      className="min-h-screen bg-center bg-cover flex items-center justify-center p-4"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('/edl555.jpg')",
      }}
    >
      <div className="absolute top-3 left-0 w-full px-2">
        <div className="flex flex-col items-center space-y-2">
          <div className="text-white py-1 px-2 rounded ">
            <h1 className="font-bold text-xl md:text-2xl text-white">
              ຫ້ອງ : 301
            </h1>
          </div>
          <div className="text-white py-1 px-2 rounded ">
            <h2 className="font-semibold text-lg md:text-xl text-white">
             ຫົວຂໍ້ : ເດັກເກີກງານ
            </h2>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center w-full max-w-2xl">
        <div className="rounded-lg w-full  overflow-hidden ">
          <div className="grid grid-cols-1 md:grid-cols-3 w-full">
            <div
              className="min-h-[150px] md:min-h-[200px] flex flex-col items-center justify-center relative"
              style={{ backgroundImage: "linear-gradient(to bottom, #041069, #131FA8, #272FF5)",}}
            >
              <div className="flex flex-col items-center justify-center mt-16">
                <img
                  src="/edl1.png"
                  alt="Logo"
                  className="w-[160px] h-[150px] md:w-[150px] md:h-[150px] mt-[-50px]"
                />
              </div>
            </div>

           <div className="col-span-2 ">
                <FlipCard
                    showInside={showInside}
                    setShowInside={setShowInside}
                    handleInsideSubmit={handleInsideSubmit}
                    handleOutsideSubmit={handleOutsideSubmit}
                />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}