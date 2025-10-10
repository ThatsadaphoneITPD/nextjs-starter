export function Inside() {
  return (
    <div className="border-4 border-blue-900 rounded-lg w-full max-w-3xl min-h-[450px] mx-auto mt-3 shadow-lg overflow-hidden">
      <div className="grid grid-cols-3 h-full">
  
        <div
          className="p-9 col-span-1 min-h-[450px]"
          style={{ backgroundColor: "#131FA8" }} 
        >
          <h2 className="text-xl font-bold mb-4 text-white">Profile</h2>
          <img
            src="/edl1.png"
            alt="Logo"
            className="mb-8 w-60 h-45 rounded-full mx-auto min-h-[200px]"
          />
        </div>
        <div
          className=" p-9 col-span-2 min-h-[450px]"
          style={{ backgroundColor: "#FFFFFF" }} 
        >
          <div className="flex gap-25">
            <input
              type="text"
              placeholder="ຟຟລ"
              className="border p-3 rounded w-40 ml-3 text-blue-900 placeholder-blue-900"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 rounded w-40"
            >
              ຟຟລ
            </button>
          </div>
          <div className="flex flex-col space-y-6 px-8 py-4">
            <div>
              <label className="block text-blue-900 font-semibold mb-1">
                ຊື່ ແລະ ນາມສະກູນ
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
              <input type="text" className="border p-2 rounded w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
