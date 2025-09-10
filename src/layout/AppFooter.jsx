import Image from "next/image";

export default function AppFooter() {
    return (
        <footer className="hidden md:block w-full bg-gradient-to-r from-[#041069] via-[#131FA8] to-[#051482] text-white py-4 text-center shadow-inner">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                {/* Left side: Logo or name */}
                <div className="text-center md:text-left">
                    <Image
                        src="/edl_logo.ico" // 👉 replace with your image path in public folder
                        alt="MeetingRoom Logo"
                        width={40} // matches w-10
                        height={40} // matches h-10
                    />
                    <p className="text-sm opacity-80">© {new Date().getFullYear()}- EDL OFFICE</p>
                </div>

                {/* Right side: Links */}
                <nav className="flex flex-col gap-1 text-sm text-white text-left">
                    <a className="text-lg font-semibold">
                        ຕິດຕໍ່ - ປະສາງານ
                    </a>
                    <a href="tel:+8562012345678" className="hover:text-[#FBC224] transition-colors">
                        Tel: +856 20 1234 5678
                    </a>
                    <a href="mailto:info@example.com" className="hover:text-[#FBC224] transition-colors">
                        Email: info@example.com
                    </a>
                    <span className="hover:text-[#FBC224] transition-colors">
                        Address: ສຳໜັກງານໃຫຍ່ມ ໂຊກປາຫຼວງ,<br /> ນະຄອນຫຼວງວຽງຈັນ, Laos
                    </span>
                </nav>

            </div>
        </footer>
    );
}
