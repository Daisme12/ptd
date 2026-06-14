import { Link } from 'react-router-dom'
import logo from '../assets/imgs/Logo.png'
import logoAvatar from '../assets/imgs/logoAvatar.png'

export default function Footer() {
  return (
    <div>
      <div className="bg-gray-800 mt-5 flex flex-col md:flex-row justify-between px-5 md:px-24 py-10 md:py-16 gap-10 text-white">

        {/* Left */}
        <div className="flex flex-col items-start gap-3">
          <img src={logo} alt="logo" className="w-52 mb-2" />
          <h2 className="font-bold text-base uppercase">Công Ty TNHH Phong Thịnh Đỗ</h2>
          <p className="text-sm"><strong>Địa chỉ:</strong> Số 215 ngõ 264 Ngọc Thuỵ, P.Bồ Đề, TP.Hà Nội</p>
          <p className="text-sm"><strong>Mã số thuế:</strong> 0110655263</p>
          <p className="text-sm"><strong>SĐT:</strong> 038.554.0512</p>
          <p className="text-sm"><strong>Email:</strong> phongthinhphat2024@gmail.com</p>
        </div>

        {/* Middle */}
        <div className="text-left">
          <h2 className="text-lg font-bold uppercase text-red-600 mt-0 md:mt-6 mb-5">Chính sách</h2>
          <ul className="flex flex-col gap-3">
            {[
              { label: "Đại lý phân phối", to: "/policy/distributor" },
              { label: "Chính sách đổi trả", to: "/policy/return" },
              { label: "Chính sách giao hàng", to: "/policy/shipping" },
            ].map(({ label, to }) => (
              <li key={to} className="text-sm cursor-pointer transition-all duration-300 hover:text-red-600 hover:translate-x-2">
                <Link to={to}>{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* FB Card */}
        <div className="w-[360px] h-[150px] relative rounded-md overflow-hidden shadow-md cursor-pointer bg-gray-400 shrink-0">
          <div className="absolute inset-0 bg-black/35 text-white flex flex-col justify-between p-3">
            <div className="flex items-start gap-3">
              <img src={logoAvatar} alt="avatar" className="w-14 h-14 rounded" />
              <h4 className="font-bold text-base pt-2 w-44 text-left">Chickenly - Ăn Vặt Vân Vân</h4>
            </div>
            <div className="flex gap-2">
              <button className="bg-red-600 hover:bg-red-800 text-white text-xs px-3 py-1.5 rounded transition-colors">
                👍 Theo dõi Trang
              </button>
              <button className="bg-[#f0f2f5] hover:bg-red-800 hover:text-white text-black text-xs px-3 py-1.5 rounded transition-colors">
                🔗 Chia sẻ
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Copyright */}
      <div className="bg-gray-900 border-t border-gray-600 py-5 text-center text-white font-semibold text-sm">
        Copyright © 2026 Công Ty TNHH Phong Thịnh Đỗ
      </div>
    </div>
  )
}