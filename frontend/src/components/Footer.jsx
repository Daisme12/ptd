import { Link } from 'react-router-dom'
import { ChevronRight, ThumbsUp, Share2, MapPin, Phone, Mail, CheckCircle2 } from 'lucide-react'
import logo from '../assets/imgs/Logo.webp'
import bg from '../assets/imgs/background.webp'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-slate-950 text-white border-t border-white/5">
      {/* Decorative Glow Elements */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-red-600/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-red-800/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

      <div className="relative z-10 mx-auto px-6 lg:px-[80px] py-10 lg:py-16">
        <div data-aos="fade-up" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">

          {/* Left - Brand & Contact Info */}
          <div className="lg:col-span-5 flex flex-col items-start gap-6">
            <Link to="/" className="inline-block group">
              <img loading="lazy" src={logo} alt="logo" className="w-56 mb-2 transition-transform duration-500 group-hover:scale-105 group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" />
            </Link>
            
            <h2 className="font-extrabold text-xl lg:text-2xl tracking-wide uppercase text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
              Công Ty TNHH Phong Thịnh Đỗ
            </h2>
            
            <div className="flex flex-col gap-4 text-gray-400 text-sm lg:text-base w-full max-w-md">
              <div className="flex items-start gap-3 group cursor-default">
                <div className="mt-1 w-6 h-6 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-red-600/20 group-hover:text-red-500 transition-colors">
                  <MapPin size={14} />
                </div>
                <p className="leading-relaxed group-hover:text-gray-200 transition-colors"><strong className="text-white">Địa chỉ:</strong> Số 215 ngõ 264 Ngọc Thuỵ, P.Bồ Đề, TP.Hà Nội</p>
              </div>

              <div className="flex items-center gap-3 group cursor-default">
                <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-red-600/20 group-hover:text-red-500 transition-colors">
                  <CheckCircle2 size={14} />
                </div>
                <p className="group-hover:text-gray-200 transition-colors"><strong className="text-white">Mã số thuế:</strong> 0110655263</p>
              </div>

              <div className="flex items-center gap-3 group cursor-default">
                <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-red-600/20 group-hover:text-red-500 transition-colors">
                  <Phone size={14} />
                </div>
                <p className="group-hover:text-gray-200 transition-colors"><strong className="text-white">SĐT:</strong> <a href="tel:0867099978" className="hover:text-red-400 transition-colors">086.709.9978</a></p>
              </div>

              <div className="flex items-center gap-3 group cursor-default">
                <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-red-600/20 group-hover:text-red-500 transition-colors">
                  <Mail size={14} />
                </div>
                <p className="group-hover:text-gray-200 transition-colors"><strong className="text-white">Email:</strong> <a href="mailto:phongthinhphat2024@gmail.com" className="hover:text-red-400 transition-colors">phongthinhphat2024@gmail.com</a></p>
              </div>
            </div>
          </div>

          {/* Middle - Policies */}
          <div className="lg:col-span-3 lg:pl-8">
            <h2 className="text-lg font-bold uppercase text-red-500 mb-6 tracking-wider">Chính sách</h2>
            <ul className="flex flex-col gap-4">
              {[
                { label: "Đại lý phân phối", to: "/policy/distributor" },
                { label: "Chính sách đổi trả", to: "/policy/return" },
                { label: "Chính sách giao hàng", to: "/policy/shipping" },
              ].map(({ label, to }) => (
                <li key={to}>
                  <Link 
                    to={to} 
                    className="group flex items-center text-gray-400 hover:text-white transition-all duration-300 w-fit"
                  >
                    <span className="w-0 overflow-hidden group-hover:w-5 transition-all duration-300 ease-out flex items-center">
                      <ChevronRight size={16} className="text-red-500" />
                    </span>
                    <span className="text-base group-hover:translate-x-1 transition-transform duration-300">{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right - FB Card Widget */}
          <div className="lg:col-span-4 flex lg:justify-end">
            <div className="w-full max-w-[360px]">
              <h2 className="text-lg font-bold uppercase text-red-500 mb-6 tracking-wider">Kết nối với chúng tôi</h2>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer"
                className="group block w-full h-[160px] relative rounded-3xl overflow-hidden shadow-2xl transition-transform duration-500 hover:-translate-y-2 border border-white/10"
              >
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${bg})` }}
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
                
                {/* Content */}
                <div className="absolute inset-0 p-5 flex flex-col justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl overflow-hidden transition-colors">
                      <img loading="lazy" src="/logoAvatar.webp" alt="avatar" className="w-full h-full object-cover" />
                    </div>
                    <h4 className="font-bold text-white text-base leading-tight pt-1 drop-shadow-md">
                      Chickenly - Ăn Vặt Vân Vân
                    </h4>
                  </div>
                  
                  <div className="flex gap-3">
                    <button className="flex items-center gap-1.5 bg-red-600/90 hover:bg-red-500 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-all backdrop-blur-sm shadow-lg">
                      <ThumbsUp size={14} /> Theo dõi
                    </button>
                    <button className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-all backdrop-blur-md border border-white/5 shadow-lg">
                      <Share2 size={14} /> Chia sẻ
                    </button>
                  </div>
                </div>
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Copyright */}
      <div className="relative z-10 bg-black/40 border-t py-6 border-white/5 backdrop-blur-sm">
        <div className="mx-auto text-center text-gray-500 text-sm font-medium">
          Copyright © {new Date().getFullYear()} Công Ty TNHH Phong Thịnh Đỗ. All rights reserved.
        </div>
      </div>
    </footer>
  )
}