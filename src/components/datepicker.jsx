"use client";

import { useState, forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarIcon, XMarkIcon } from "@heroicons/react/24/outline";

const CustomInput = forwardRef(({ value, onClick, onClear }, ref) => (
  <div className="relative w-65">
    <button
      type="button"
      onClick={onClick}
      ref={ref}
      className="w-full flex items-center justify-between px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200"
    >
      <span className={`${!value ? "text-gray-400" : "text-gray-700"}`}>
        {value || "ຄົ້າຫາ ໄລຍະຫ້ອງ ມີຢູ່"}
      </span>
      <CalendarIcon className="w-5 h-5 text-gray-500 ml-2" />
    </button>

    {/* Custom clear button */}
    {value && onClear && (
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClear();
        }}
        className="absolute right-10 top-1/2 -translate-y-1/2 w-6 h-6 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center text-gray-600 transition-colors"
      >
        <XMarkIcon className="w-3 h-3" />
      </button>
    )}
  </div>
));

export default function TailwindDateRangePicker() {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  return (
    <div className="w-65">
      <DatePicker
        selected={startDate}
        onChange={(dates) => setDateRange(dates)}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        customInput={
          <CustomInput
            onClear={() => setDateRange([null, null])}
          />
        }
        monthsShown={2}
        isClearable={false} // disable default clear button
      />
    </div>
  );
}
