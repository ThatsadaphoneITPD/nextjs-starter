"use client";
import { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function LoginPage() {
  const router = useRouter();
  const User = [
    {
      Email: "44481",
      Password: "556677",
    },
  ];

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // ✅ state สำหรับสลับ

  const handleLogin = (e) => {
    e.preventDefault();
    const foundUser = User.find(
      (user) => user.Email === email && user.Password === password
    );

    if (foundUser) {
      toast.success("ເຂົ້າສູ່ລະບົບສຳເລັດແລ້ວ!");
      setTimeout(() => {
        router.push("/");
      }, 3000);
    } else {
      toast.error("password ບໍ່ຖືກຕ້ອງ");
    }
  };

  return (
     <div
       className="h-screen bg-center bg-cover flex items-center justify-center"
       style={{
       backgroundImage: "url('/edl555.jpg')",
      }}
     >
      <div  className="h-screen w-screen bg-center bg-cover flex items-center justify-center" style={{backgroundColor: "rgba(39, 49, 245, 0.28)", backdropFilter: "blur(2px)"}}>
        <div className="w-80 max-w-md h-[400px] bg-white rounded-lg shadow-md border border-gray-400">
          <div className="relative flex items-center justify-center mb-5 mt-[55px]">
            <img
              src="/edl1.png"
              alt="Logo"
              className="w-14 h-14 rounded-full absolute left-3"
            />
            <h1 className="text-2xl font-bold">ລະບົບຈອງຫ້ອງປະຊຸມ</h1>
          </div>
          <form onSubmit={handleLogin} className="flex flex-col mt-14">
            <div className="flex flex-col gap-5 mx-8">
              {/* Employee ID */}
              <input
                placeholder="ລະຫັດພະນັກງານ"
                className="border p-2 rounded"
                value={email}
                onChange={(e) => {
                  const input = e.target.value;
                  if (input.length <= 6) {
                    setEmail(input);
                  }
                }}
                maxLength={6}
              />
              {/* Password with toggle */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="border p-2 rounded w-full pr-10"
                  maxLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-2 flex items-center text-gray-600"
                >
                  {showPassword ? <VisibilityOffIcon /> : <RemoveRedEyeIcon />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue-700 text-white py-2 rounded mx-8 mt-10
                shadow-md transition-all duration-100 ease-in-out
                hover:scale-105 hover:shadow-xl"
            >
              ເຂົ້າສູ່ລະບົບ
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
