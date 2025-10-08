import { useState, useEffect } from "react";
import Image from "next/image";
import { CheckIcon } from "@heroicons/react/24/solid";
import { equipmentOptions } from "./equipments";

export default function RoomCard({ onDataChange }) {
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedTableFormat, setSelectedTableFormat] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [formData, setFormData] = useState({
    meetingTitle: "",
    department: "",
    participants: "",
    extraChairs: "",
  });

  const tableFormatOptions = ["ຮູບແບບມາດຕະຖານ", "ແບບໂຕV", "ແບບໂຕU"];

  const isFormValid = () => {
    return (
      formData.meetingTitle.trim() !== "" &&
      formData.participants.trim() !== "" &&
      !isNaN(formData.participants) &&
      parseInt(formData.participants) > 0
    );
  };

  useEffect(() => {
    if (onDataChange) {
      onDataChange({
        isValid: isFormValid(),
        formData,
        selectedItems,
        selectedTableFormat,
      });
    }
  }, [formData, selectedItems, selectedTableFormat]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const toggleSelect = (value) => {
    setSelectedItems((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const removeSelectedItem = (value) => {
    setSelectedItems((prev) => prev.filter((item) => item !== value));
  };

  return (
    <article className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* Room Image */}
      <div className="relative h-40 w-full sm:h-48">
        <Image
          src="/room2.jpg"
          alt="Conference room"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="p-3 sm:p-4">
        {/* Header */}
        <header className="mb-4 flex items-center justify-between">
          <h1 className="text-base font-semibold text-slate-900 sm:text-lg">
            Large Room 201
          </h1>
          <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
            Available
          </span>
        </header>

        {/* Meeting Title */}
        <div className="mb-4 space-y-2">
          <h2 className="text-xs font-semibold text-slate-700 sm:text-sm">
            ຫົວຂໍ້ການປະຊຸມ
          </h2>
          <input
            type="text"
            value={formData.meetingTitle}
            onChange={(e) => handleInputChange("meetingTitle", e.target.value)}
            placeholder="ກະລຸນາໃສ່ຫົວຂໍ້ການປະຊຸມ"
            className={`w-full rounded-lg border px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 ${
              formData.meetingTitle.trim() === ""
                ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                : "border-slate-300 focus:border-blue-500 focus:ring-blue-200"
            }`}
          />
        </div>

        {/* Participants and Extra Chairs */}
        <div className="mb-4 grid gap-3 sm:grid-cols-2">
          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-slate-700 sm:text-sm">
              ຈຳນວນຜູ້ເຂົ້າຮ່ວມ
            </h3>
            <input
              type="number"
              value={formData.participants}
              onChange={(e) =>
                handleInputChange("participants", e.target.value)
              }
              min="1"
              placeholder="0"
              className={`w-full rounded-lg border px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 ${
                formData.participants.trim() === "" ||
                isNaN(formData.participants) ||
                parseInt(formData.participants) <= 0
                  ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                  : "border-slate-300 focus:border-blue-500 focus:ring-blue-200"
              }`}
            />
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-slate-700 sm:text-sm">
              ຕັ່ງເສີມ
            </h3>
            <input
              type="number"
              value={formData.extraChairs}
              onChange={(e) => handleInputChange("extraChairs", e.target.value)}
              min="0"
              placeholder="0"
              className={`w-full rounded-lg border px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 ${
                formData.extraChairs.trim() !== "" &&
                (isNaN(formData.extraChairs) ||
                  parseInt(formData.extraChairs) < 0)
                  ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                  : "border-slate-300 focus:border-blue-500 focus:ring-blue-200"
              }`}
            />
          </div>
        </div>

        {/* Room Configuration */}
        <div className="mb-6 rounded-xl">
          <div className="grid gap-6 sm:grid-cols-2 sm:items-start">
            {/* Equipment Selection */}
            <div className="flex flex-col">
              <h3 className="mb-2 text-sm font-semibold text-slate-700">
                ເລືອກສິ່ງທີ່ຕ້ອງການ
              </h3>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full h-[40px] rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm 
                     flex justify-between items-center hover:bg-slate-50 hover:border-slate-400 
                     hover:shadow-sm transition-all focus:outline-none focus:ring-2 
                     focus:ring-blue-200 focus:border-blue-500"
                >
                  <span className="text-slate-700">
                    {selectedItems.length > 0
                      ? `ເລືອກແລ້ວ ${selectedItems.length} ລາຍການ`
                      : "ເລືອກອຸປະກອນ"}
                  </span>
                  <svg
                    className={`w-4 h-4 text-slate-400 transition-transform ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {isDropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setIsDropdownOpen(false)}
                    />
                    <div className="absolute z-20 mt-1 w-full rounded-lg border border-slate-200 bg-white shadow-lg overflow-hidden">
                      <div className="max-h-48 overflow-y-auto">
                        {equipmentOptions.map((opt) => (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => toggleSelect(opt.value)}
                            className="w-full flex justify-between items-center px-3 py-2.5 text-sm hover:bg-slate-50 transition-colors"
                          >
                            <span className="text-slate-700">{opt.label}</span>
                            {selectedItems.includes(opt.value) && (
                              <CheckIcon className="h-4 w-4 text-green-600" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Selected Items Tags */}
              {selectedItems.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedItems.map((item) => {
                    const option = equipmentOptions.find(
                      (opt) => opt.value === item
                    );
                    return (
                      <span
                        key={item}
                        className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-2 py-1 text-xs text-blue-700 border border-blue-200"
                      >
                        <span className="font-medium">{option?.label}</span>
                        <button
                          type="button"
                          onClick={() => removeSelectedItem(item)}
                          className="hover:bg-blue-100 rounded-full p-0.5 transition-colors"
                          aria-label="Remove item"
                        >
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </span>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Table Format Selection */}
            <div className="flex flex-col">
              <label
                htmlFor="table-format"
                className="mb-2 text-sm font-semibold text-slate-700"
              >
                ຮູບແບບໂຕະທີ່ຕ້ອງການ
              </label>

              <select
                id="table-format"
                value={selectedTableFormat}
                onChange={(e) => setSelectedTableFormat(e.target.value)}
                className="w-full h-[40px] rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm 
                   text-slate-700 hover:border-slate-400 hover:shadow-sm transition-all 
                   focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              >
                <option value="" disabled>
                  ເລືອກຮູບແບບໂຕະ...
                </option>
                {tableFormatOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              {selectedTableFormat && (
                <div className="mt-2 flex items-start gap-2 p-2.5 bg-blue-50 rounded-lg border border-blue-200">
                  <svg
                    className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-xs text-blue-700">
                    <span className="font-semibold">{selectedTableFormat}</span>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="mb-3">
          <h3 className="mb-1 text-xs font-semibold text-slate-700">
            Location
          </h3>
          <p className="text-xs text-slate-600">Building A, 2nd Floor</p>
        </div>

        {/* Status Indicator */}
        <div
          className={`text-xs px-3 py-2 rounded-lg flex items-center gap-2 ${
            isFormValid()
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-amber-50 text-amber-700 border border-amber-200"
          }`}
        >
          <span className="text-base">{isFormValid() ? "✓" : "⚠"}</span>
          <span className="font-medium">
            {isFormValid() ? "ພ້ອມຈອງຫ້ອງ" : "ກະລຸນາໃສ່ຂໍ້ມູນໃຫ້ຄົບ"}
          </span>
        </div>
      </div>
    </article>
  );
}
