"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { SearchIcon, HomeIcon, CalendarIcon } from "lucide-react";
import TailwindDateRangePicker from "@/components/datepicker";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import LoginIcon from "@mui/icons-material/Login";
import Image from "next/image";

const menuItems = [
  { label: "ໜ້າຫຼັກ", href: "/", icon: HomeIcon },
  { label: "ຫ້ອງປະຊຸມ", href: "/rooms", icon: CalendarIcon },
  { label: "ການຈອງຫ້ອງ", href: "/booking", icon: CalendarIcon },
];

export default function AppTopbar() {
  const currPath = usePathname();
  const router = useRouter();

  return (
    <>
      {/* Desktop Topbar */}
      <header className="sticky top-0 z-50 hidden md:flex w-full bg-gradient-to-r from-[#041069] via-[#131FA8] to-[#051482] border-b shadow-md px-6 py-3 items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center gap-3 font-bold text-lg text-white">
          <Image
            src="/edl_logo.ico" // 👉 replace with your image path in public folder
            alt="MeetingRoom Logo"
            width={40} // matches w-10
            height={40} // matches h-10
          />
          <span>MeetingRoom</span>
        </div>

        {/* Center: Navigation */}
        <nav className="flex items-center gap-6 text-white">
          {menuItems.map((item) => {
            const isActive = currPath === item.href;
            const Icon = item.icon;

            return (
              <button
                key={item.href}
                onClick={() => router.push(item.href)}
                className={`
                  relative flex items-center gap-1 px-2 py-1
                  rounded-md
                  transition-all duration-200
                  hover:text-[#FBC224]
                  after:content-[''] after:absolute after:left-0 after:bottom-0
                  after:w-full after:h-[2px] after:bg-[#FBC224]
                  after:origin-left after:transition-transform after:duration-300
                  ${isActive ? "text-[#FBC224] after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"}
                `}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right: Search + Date + Login */}
        <div className="flex items-center gap-4">
          {/* Tailwind DateRangePicker */}
          <TailwindDateRangePicker />

          {/* Search input */}
          <div className="relative hidden sm:block">
            <input
              type="text"
              placeholder="Search..."
              className="w-64 pl-10 pr-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 placeholder-gray-400 shadow-sm
              focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
            />
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>

          {/* Login Button */}
          <Stack direction="row" spacing={1} >
            <IconButton
              onClick={() => router.push("/login")}
              aria-label="login"
              sx={{
                color: "white",
                '&:hover': {
                  transform: "scale(1.5)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                },
                transition: "all 0.2s ease-in-out",
                p: 1.5,
                borderRadius: "0.5rem",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              }}
            >
              <LoginIcon fontSize="medium" />
            </IconButton>
          </Stack>
        </div>
      </header>

      {/* Mobile Bottom Navbar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around bg-gradient-to-r from-[#041069] via-[#131FA8] to-[#051482] text-white py-2 px-4 shadow-inner md:hidden">
        {menuItems.map((item) => {
          const isActive = currPath === item.href;
          const Icon = item.icon;

          return (
            <button
              key={item.href}
              onClick={() => (window.location.href = item.href)}
              className={`flex flex-col items-center text-xs transition-colors ${isActive ? "text-[#FBC224]" : "text-white hover:text-[#FBC224]"
                }`}
            >
              <Icon className="h-5 w-5 mb-1" />
              {item.label}
            </button>
          );
        })}
        <Stack direction="row" spacing={1} >
          <IconButton
            onClick={() => router.push("/login")}
            aria-label="login"
            sx={{
              color: "white",
              '&:hover': {
                transform: "scale(1.5)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              },
              transition: "all 0.2s ease-in-out",
              p: 1.5,
              borderRadius: "0.5rem",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          >
            <LoginIcon fontSize="medium" />
          </IconButton>
        </Stack>
      </nav>
    </>
  );
}
