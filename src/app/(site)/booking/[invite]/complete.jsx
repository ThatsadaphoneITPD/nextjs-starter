import { Check } from "lucide-react";

export default function Complete() {
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
        <div className="text-center mb-12">
          {/* Glow effect */}
          <div className="relative inline-block scale-110 md:scale-125">
            {/* Glow effect */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400
               rounded-full blur-4xl opacity-80 animate-pulse"
            ></div>

            {/* Image wrapper */}
            <div className="relative bg-white/10 backdrop-blur-md rounded-full p-5 md:p-6 shadow-2xl">
              <img
                src="/passed.png"
                alt="Success"
                className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-white shadow-xl"
              />
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mt-10 mb-4 drop-shadow-lg">
            ທ່ານ ຈອງສຳເລັດ ແລະ ຖ້າອະນຸມັດ
          </h1>

          {/* Subtext */}
          <p className="text-lg md:text-xl text-blue-200 font-medium tracking-wide">
            ກະລຸນາລໍຖ້າກຳລັງຕຽມຫ້ອງ...
          </p>
        </div>

        {/* Footer Note */}
        <div className="mt-6 text-center">
          <p className="text-sm text-blue-200">
            ທ່ານຈະໄດ້ຮັບອີເມວຢືນຢັນພາຍໃນ 5 ນາທີ
          </p>
        </div>
      </div>
    </div>
  );
}
