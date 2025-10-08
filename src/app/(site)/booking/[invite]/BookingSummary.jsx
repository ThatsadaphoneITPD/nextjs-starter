import { useMemo, useState } from "react";
import { Check, Calendar, Clock, MapPin, Users, Building } from "lucide-react";
import { equipmentOptions } from "./equipments";

function Section({ title, children, icon: Icon }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        {Icon && <Icon className="h-5 w-5 text-slate-600" />}
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      </div>
      {children}
    </section>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-slate-100 last:border-b-0">
      <span className="text-sm font-medium text-slate-600">{label}</span>
      <span className="text-sm text-slate-900">{value}</span>
    </div>
  );
}

export default function BookingSummary({
  bookingData,
  roomData,
  onBack,
  onConfirm,
}) {
  const finalBookingData = bookingData || defaultBookingData;

  // Extract room data from the correct structure
  const roomInfo = roomData?.formData || {
    meetingTitle: "Weekly Team Meeting",
    department: "IT Department",
    participants: "15",
  };

  const selectedItems = roomData?.selectedItems || [];
  const selectedTableFormat = roomData?.selectedTableFormat || "";

  const [isConfirming, setIsConfirming] = useState(false);

  const dateLabels = useMemo(() => {
    return finalBookingData.selectedBookings.map((booking) => {
      const locale = new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }).format(booking.date);

      const [startH, startM] = booking.startTime.split(":").map(Number);
      const [endH, endM] = booking.endTime.split(":").map(Number);

      const formatTime = (h, m) => {
        const isPM = h >= 12;
        const hh = ((h + 11) % 12) + 1;
        return `${hh}:${m.toString().padStart(2, "0")} ${isPM ? "pm" : "am"}`;
      };

      const startFormatted = formatTime(startH, startM);
      const endFormatted = formatTime(endH, endM);

      return { date: locale, time: `${startFormatted} - ${endFormatted}` };
    });
  }, [finalBookingData.selectedBookings]);

  const totalDuration = useMemo(() => {
    return finalBookingData.selectedBookings.reduce((total, booking) => {
      const [startH, startM] = booking.startTime.split(":").map(Number);
      const [endH, endM] = booking.endTime.split(":").map(Number);
      const startMinutes = startH * 60 + startM;
      const endMinutes = endH * 60 + endM;
      return total + (endMinutes - startMinutes);
    }, 0);
  }, [finalBookingData.selectedBookings]);

  const handleConfirmBooking = () => {
    setIsConfirming(true);
    setTimeout(() => {
      setIsConfirming(false);
      if (onConfirm) {
        onConfirm();
      }
    }, 1500);
  };

  const handleBackToBooking = () => {
    if (onBack) {
      onBack();
    } else {
      window.history.back();
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          Booking Summary
        </h1>
        <p className="text-slate-600">ກະລຸນາກວດສອບກ່ອນຈອງຫ້ອງ.</p>
      </div>

      <div className="flex flex-col gap-6">
        {/* Room Information */}
        <Section title="Room Details" icon={Building}>
          <div className="space-y-1">
            <InfoRow label="ຊື່ຫ້ອງ" value="Large Room 201" />
            <InfoRow label="ຫົວຂໍ້ການປະຊຸມ" value={roomInfo.meetingTitle} />
            <InfoRow
              label="ຈຳນວນຄົນເຂົ້າຮ່ວມ"
              value={`${roomInfo.participants} ຄົນ . ຕັ່ງເສີມ ${roomInfo.extraChairs} ບ່ອນ `}
            />
            <InfoRow label="ທີ່ຕັ້ງຫ້ອງ" value="Building A, 2nd Floor" />
          </div>
        </Section>

        {/* Date & Time Information */}
        <Section title="ວັນ ແລະ ເວລາທີ່ກຳນົດໄວ້ :" icon={Calendar}>
          <div className="space-y-4">
            {dateLabels.map((booking, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-slate-500" />
                  <span className="font-medium text-slate-900">
                    {booking.date}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-slate-500" />
                  <span className="text-slate-700">{booking.time}</span>
                </div>
              </div>
            ))}
            <div className="text-sm text-slate-600 text-center pt-2 border-t border-slate-200">
              ລວມເວລາທັງໝົດ : {Math.floor(totalDuration / 60)} ຊົ່ວໂມງ{" "}
              {totalDuration % 60} ນາທີ
            </div>
          </div>
        </Section>

        {/* Equipment */}
        <Section title="ສິ່ງຂອງ ແລະ ຮູບແບບໂຕະ " icon={Check}>
          <div className="space-y-3">
            <div>
              <h4 className="text-sm font-medium text-slate-700 mb-2">
                ສິ່ງຂອງທີ່ເລືອກໄວ້ :
              </h4>
              {selectedItems.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {selectedItems?.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                    >
                      {equipmentOptions.find((opt) => opt.value === item)
                        ?.label || item}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-500">ບໍ່ໄດ້ເລືອກໄວ້</p>
              )}
            </div>
            {selectedTableFormat && (
              <InfoRow label="Table Format" value={selectedTableFormat} />
            )}
          </div>
        </Section>

        {/* Special Notes */}
        <Section title="ຄຳຂໍເພີ່ມເຕີມ">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            {finalBookingData.notes ? (
              <p className="text-sm text-amber-800 leading-relaxed whitespace-pre-wrap">
                {finalBookingData.notes}
              </p>
            ) : (
              <p className="text-sm text-amber-800 leading-relaxed">
                ທ່ານຕ້ອງການອຸປະກອນເພີ່ມເຕີມຫຼືມີຄຳຮ້ອງຂໍເປັນພິເສດ.
              </p>
            )}
          </div>
        </Section>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            onClick={handleBackToBooking}
            className="flex-1 px-6 py-3 border border-slate-300 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-colors"
          >
            ກັບເພື່ອແກ້ໄຂ
          </button>
          <button
            onClick={handleConfirmBooking}
            disabled={isConfirming}
            className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-600 disabled:opacity-70 transition-colors shadow-lg shadow-blue-500/20"
          >
            {isConfirming ? "ຢືນຢັນ..." : "ຢືນຢັນການຈອງ"}
          </button>
        </div>
      </div>
    </div>
  );
}
