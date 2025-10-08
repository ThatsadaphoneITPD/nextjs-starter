// src/app/booking/page.tsx
export default function BookingPage() {
  return (
    <main className="max-w-lg mx-auto p-4 space-y-6">
      {/* Header */}
      <header className="text-center">
        <h1 className="text-2xl font-bold">Small Room 201</h1>
        <p className="text-gray-500">6–10 People • Wi-Fi • Projector</p>
        <p className="text-gray-500">Building A, 2nd Floor</p>
      </header>

      {/* Room Image */}
      <div className="rounded-lg overflow-hidden shadow-md">
        <img
          src="/room201.jpg"
          alt="Small Room 201"
          className="w-full h-48 object-cover"
        />
      </div>

      {/* Detailed Information */}
      <section className="glass p-4 rounded-lg space-y-4">
        <div>
          <h2 className="font-semibold text-lg">Description</h2>
          <p className="text-gray-600">
            A modern, well-lit meeting space ideal for team discussions,
            presentations, and client meetings. Equipped with a high-resolution
            projector, fast Wi-Fi, and comfortable seating.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-lg">Amenities</h2>
          <ul className="list-disc list-inside text-gray-600">
            <li>High-speed Wi-Fi</li>
            <li>Projector & Screen</li>
            <li>Whiteboard & Markers</li>
            <li>Air Conditioning</li>
            <li>Complimentary Water & Coffee</li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold text-lg">Booking Policies</h2>
          <ul className="list-disc list-inside text-gray-600">
            <li>Minimum booking: 1 hour</li>
            <li>Free cancellation up to 24 hours before</li>
            <li>Late arrivals may result in reduced booking time</li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold text-lg">Contact</h2>
          <p className="text-gray-600">
            For assistance, call <span className="font-medium">+856 21 123 456</span>  
            or email <span className="font-medium">booking@company.com</span>
          </p>
        </div>

        <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
          Book Now
        </button>
      </section>
    </main>
  );
}