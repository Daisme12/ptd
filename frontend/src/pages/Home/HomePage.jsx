import React, { useState, useEffect } from "react";
import { useNavigate,Link } from "react-router-dom";

import backgroundHome from "../../assets/imgs/background.webp"
import ISO from "../../assets/imgs/ISO.webp"
import Profile from "../../assets/imgs/Profile.webp"
import QR from "../../assets/imgs/QR.webp"
import Star from "../../assets/imgs/Star.webp"
import Intro from "../../assets/imgs/Intro.webp"
import { Award, ShieldPlus, Handshake, Lightbulb,BookOpen, Cpu, Tag, Truck, HeartHandshake 
  ,School, ShoppingBag, Store, Phone, Mail, MapPin, ChevronRight, LoaderCircle
 } from "lucide-react";
import { toast } from "sonner";


import "../../assets/styles/Home.css"

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ProductCategory from "./ProductCategory";
import SEO from "../../components/SEO";
import { createContact } from "../../services/contactService";

const PRODUCT_IMGS = [
    "/logos/hong-anh.webp",
    "/logos/5s.webp",
    "/logos/ubofood.webp",
    "/logos/bach-khoa.webp",
    "/logos/gtvt.webp",
];

const cards = [
    {
      icon: Award,
      title: "Chất lượng",
      desc: '"Tạo lên thương hiệu" – Cam kết từng suất ăn ngon nhất.',
    },
    {
      icon: ShieldPlus,
      title: "An toàn",
      desc: '"Đảm bảo sức khỏe" – Quy trình sơ chế khép kín 100%.',
    },
    {
      icon: Handshake,
      title: "Uy tín",
      desc: '"Xây dựng niềm tin" – Đồng hành cùng đối tác bền vững.',
    },
    {
      icon: Lightbulb,
      title: "Sáng tạo",
      desc: '"Không ngừng phát triển" – Thực đơn phong phú mỗi ngày.',
    },
  ];

  const services = [
      {
        icon: BookOpen,
        title: "Thực đơn dinh dưỡng",
        desc: "Thực đơn đa dạng, giàu dinh dưỡng, phù hợp mọi nhu cầu: ăn kiêng, giữ dáng, tăng cơ hay bồi bổ sức khỏe.",
        highlight: false,
      },
      {
        icon: Cpu,
        title: "Công nghệ 5.0",
        desc: "Ứng dụng đạt mức thông minh, chính xác, tiện lợi và an toàn.",
        highlight: false,
      },
      {
        icon: Tag,
        title: "Giá cả hợp lý",
        desc: "Bữa ăn chất lượng, giá hợp lý, nhiều ưu đãi giúp bạn tiết kiệm mà vẫn thưởng thức món ngon bổ dưỡng.",
        quote: '"Tối ưu chi phí cho đối tác doanh nghiệp và trường học."',
        highlight: true,
      },
      {
        icon: Truck,
        title: "Giao hàng nhanh",
        desc: "Đội ngũ vận chuyển chuyên nghiệp, đảm bảo thực đơn nóng hổi.",
        highlight: false,
      },
      {
        icon: HeartHandshake,
        title: "Phục vụ chu đáo",
        desc: "Luôn đặt sự hài lòng của khách hàng lên hàng đầu, đội ngũ nhân viên niềm nở, tận tâm và sẵn sàng đáp ứng mọi nhu cầu.",
        highlight: false,
      },
    ];
const HomePage = () => {
  const [activeTab, setActiveTab] = useState("Cơm nắm");
  const [scrolled, setScrolled] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [checked, setChecked] = useState([]);
  const [form, setForm] = useState({ name: "", phone: "", email: "", service: "", policy: "", note: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const handleSubmitConsultation = async (event) => {
    event.preventDefault();

    try {
      setIsSubmitting(true);

      await createContact({
        name: form.name,
        phone: form.phone,
        email: form.email,
        service: form.service,
        note: form.note,
        requestType: "partner_consultation",
        source: "home_consultation_form",
      });

      toast.success("Đã gửi yêu cầu tư vấn.");
      setForm({ name: "", phone: "", email: "", service: "", policy: "", note: "" });
    } catch (error) {
      console.error("Lỗi gửi yêu cầu tư vấn:", error);
      toast.error("Không thể gửi yêu cầu. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO 
        title="Trang Chủ" 
        description="Công ty Cổ phần Thương mại và Dịch vụ Thịnh Phong Đỗ chuyên cung cấp suất ăn công nghiệp, suất ăn trường học với quy trình đạt chuẩn ISO." 
      />
      {/* Header */}
      <Header />
      {/* Hero */}
      <section data-aos="fade" className="relative min-h-screen flex items-center justify-center px-4 pt-20 pb-12 overflow-hidden">
        {/* Background Image with smoother gradient overlay */}
        <div
          className="absolute inset-0 -z-20 bg-cover bg-center 
          lg:bg-fixed animate-[pulse_20s_ease-in-out_infinite]"
          style={{ backgroundImage: `url(${backgroundHome})` }}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/80 
        via-black/60 to-black/80 backdrop-blur-[2px]" />

        <div className="relative z-10 max-w-7xl mx-auto text-center w-full mt-10">
          {/* Brand */}
          <div data-aos="fade-down" data-aos-duration="1000" className="inline-block mb-6 px-6 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md">
            <p className="text-xs lg:text-sm text-white tracking-[0.25em] uppercase font-medium">
              <span className="text-red-500 font-bold">THỊNH PHONG ĐỖ</span> — Chuyên sản xuất, sơ chế và cung cấp suất ăn
            </p>
          </div>

          {/* Title */}
          <h1
            data-aos="fade-up" data-aos-duration="1000" data-aos-delay="100"
            className="mx-auto text-3xl sm:text-4xl lg:text-[54px] lg:leading-[1.3] font-extrabold 
            text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-white 
            uppercase mb-8 drop-shadow-lg"
          >
            CHUYÊN CUNG CẤP SUẤT ĂN &<br className="hidden lg:block"/> DỊCH VỤ CANTEEN CHO TRƯỜNG HỌC<br className="hidden lg:block"/> VÀ CHUỖI SIÊU THỊ
          </h1>

          {/* Description */}
          <p
            data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200"
            className="max-w-3xl mx-auto text-gray-300 text-sm lg:text-xl leading-relaxed mb-12 drop-shadow-md"
          >
            Quy trình sản xuất đạt tiêu chuẩn 
            <span className="font-bold text-red-500"> ISO 22000:2018</span>. Chúng tôi cam kết mang lại nguồn dinh dưỡng an toàn, minh bạch và chất lượng hàng đầu.
          </p>

          {/* CTA */}
          <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300" className="mb-10">
            <button
              onClick={() => navigate("/contact")}
              className="relative overflow-hidden group inline-flex items-center justify-center gap-3 px-8 py-4 lg:px-10 lg:py-5 bg-red-600 text-white font-bold text-sm lg:text-lg rounded-full hover:bg-red-700 transition-all duration-300 hover:shadow-[0_0_40px_rgba(220,38,38,0.4)] hover:-translate-y-1"
            >
              <span className="uppercase tracking-wider">Nhận tư vấn & báo giá</span>
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </button>
          </div>

          {/* Extra info Widgets (Glassmorphism) */}
          <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400" className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { img: QR, title: "Truy xuất nguồn gốc", desc: "Minh bạch, dễ kiểm tra qua QR" },
              { img: ISO, title: "ISO 22000:2018", desc: "Tiêu chuẩn an toàn thực phẩm", hasStar: true },
              { img: Profile, title: "Hồ sơ đầy đủ", desc: "Pháp lý & Kiểm định chất lượng" }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/15 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl group">
                <div className="w-16 h-16 shrink-0 rounded-xl overflow-hidden bg-white/20 p-0.5 relative shadow-inner">
                  <img loading="lazy" className="w-full h-full object-cover rounded-[10px] transition-transform duration-500 group-hover:scale-110" src={item.img} alt={item.title} />
                </div>
                <div className="flex flex-col items-start text-left">
                  <div className="flex items-center gap-2">
                    <p className="text-white font-bold text-sm lg:text-base">{item.title}</p>
                    {item.hasStar && <img src={Star} alt="Star" className="w-4 h-4 animate-spin-slow" />}
                  </div>
                  <span className="text-gray-400 text-xs lg:text-sm mt-0.5 line-clamp-2">{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto py-24">
        {/* Slogan */}
        <div className="mb-24 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {cards.map(({ icon: Icon, title, desc }, idx) => (
            <div
              key={idx}
              data-aos="fade-up"
              data-aos-delay={idx * 100}
              className="group relative flex flex-col gap-5 p-8 bg-white rounded-[2rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(220,38,38,0.1)] transition-all duration-500 hover:-translate-y-2 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-red-50 to-transparent rounded-bl-full -z-10 transition-transform duration-500 group-hover:scale-150"></div>
              
              {/* Icon box */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-50 to-red-100 group-hover:from-red-600 group-hover:to-red-700 flex items-center justify-center transition-colors duration-500 shadow-inner">
                <Icon size={28} className="text-red-600 group-hover:text-white transition-colors duration-500" strokeWidth={1.5} />
              </div>

              {/* Text */}
              <div className="flex flex-col gap-2 z-10">
                <p className="text-xl font-bold text-gray-900 group-hover:text-red-600 transition-colors">{title}</p>
                <span className="text-gray-500 text-sm leading-relaxed">{desc}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div data-aos="fade-right" className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-400 rounded-3xl transform rotate-3 scale-105 opacity-20 group-hover:rotate-6 transition-transform duration-500"></div>
            <img loading="lazy" src={Intro}
              alt="Giới thiệu công ty"
              className="relative w-full rounded-3xl object-cover shadow-2xl z-10 transition-transform duration-500 group-hover:-translate-y-2"
            />
            {/* Experience Badge */}
            <div className="absolute -bottom-8 -right-4 lg:-right-8 bg-white rounded-2xl p-6 shadow-[0_20px_50px_rgb(0,0,0,0.15)] z-20 flex items-center gap-4 animate-bounce-slow border border-gray-100">
              <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center">
                <Award className="text-red-600" size={28} />
              </div>
              <div className="flex flex-col">
                <p className="text-3xl font-black text-gray-900 leading-none">5<span className="text-red-600">+</span></p>
                <span className="text-gray-500 font-medium text-sm mt-1 uppercase tracking-wide">
                  Năm kinh nghiệm
                </span>
              </div>
            </div>
          </div>

          <div data-aos="fade-left" className="lg:pl-10 mt-12 lg:mt-0">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-red-600 font-semibold text-sm mb-6 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
              Về chúng tôi
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
              Hành Trình Mang Lại <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">Giá Trị Đích Thực</span>
            </h1>

            <h2 className="text-xl font-medium text-gray-800 mb-6 border-l-4 border-red-600 pl-4">
              Chất Lượng - Chất Riêng - Chất Sống
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed mb-10">
              Công ty đặt tại Long Biên – Hà Nội, tiên phong áp dụng công nghệ
              sản xuất 5.0, tự động hóa nhiều khâu nhằm nâng cao năng suất và
              chất lượng sản phẩm. Đội ngũ sản xuất tận tâm, chuyên nghiệp,
              luôn lấy an toàn thực phẩm và sự hài lòng của khách hàng làm kim
              chỉ nam phát triển.
            </p>

            <Link to="/about" className="inline-block">
              <button className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-[length:200%_auto] bg-gradient-to-r from-black via-gray-950 to-red-700 hover:bg-right text-white font-bold rounded-xl transition-all duration-500 shadow-md hover:shadow-[0_8px_25px_rgba(220,38,38,0.35)] hover:scale-[1.03] active:scale-[0.97] cursor-pointer">
                <span>Tìm hiểu thêm về Thịnh Phong Đỗ</span>
                <ChevronRight size={20} className="transition-transform group-hover:translate-x-1.5" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="relative bg-slate-900 overflow-hidden mt-10">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3"></div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Heading */}
          <div data-aos="fade-up" className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-sm font-bold tracking-[0.2em] text-red-500 uppercase mb-3">
              Dịch Vụ Cốt Lõi
            </h2>
            <h3 className="text-3xl lg:text-4xl font-extrabold text-white mb-6">
              Giải Pháp Toàn Diện Cho Bữa Ăn Chất Lượng
            </h3>
            <div className="w-16 h-1 bg-red-600 mx-auto rounded-full"></div>
          </div>
  
          {/* Grid: 2 cột trên, 2 cột dưới + 1 card highlight bên phải chiếm 2 hàng */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Hàng 1 trái: Thực đơn + Công nghệ */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {services
                .filter((s) => !s.highlight)
                .slice(0, 2)
                .map(({ icon: Icon, title, desc }, i) => (
                  <ServiceCard key={i} Icon={Icon} title={title} desc={desc} />
                ))}
            </div>
  
            {/* Card highlight: Giá cả hợp lý – chiếm 2 hàng */}
            {(() => {
              const s = services.find((x) => x.highlight);
              const Icon = s.icon;
              return (
                <div data-aos="fade-up" className="lg:row-span-2 relative group overflow-hidden bg-gradient-to-br from-red-600 to-red-800 rounded-3xl p-8 lg:p-10 flex flex-col shadow-2xl">
                  {/* Glass overlay effect */}
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-8 shadow-inner relative z-10">
                    <Icon size={32} className="text-white" strokeWidth={1.5} />
                  </div>
                  <h4 className="font-extrabold text-2xl lg:text-3xl text-white mb-4 relative z-10">{s.title}</h4>
                  <p className="text-white/80 text-lg leading-relaxed mb-8 relative z-10">{s.desc}</p>
                  
                  {s.quote && (
                    <div className="mt-auto relative z-10">
                      <div className="w-10 h-10 text-white/20 mb-2">
                        <svg fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/></svg>
                      </div>
                      <p className="text-lg italic text-white/90 font-medium">
                        {s.quote.replace(/"/g, '')}
                      </p>
                    </div>
                  )}
                </div>
              );
            })()}
  
            {/* Hàng 2 trái: Giao hàng + Phục vụ */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {services
                .filter((s) => !s.highlight)
                .slice(2, 4)
                .map(({ icon: Icon, title, desc }, i) => (
                  <ServiceCard key={i} Icon={Icon} title={title} desc={desc} />
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── List Products ── */}
      <section className="mx-auto pt-20">
        {/* Heading */}
        <div data-aos="fade-up" className="text-center mb-8">
          <p className="text-sm font-bold tracking-[0.2em] text-red-600 uppercase mb-3">
            Sản phẩm nổi bật
          </p>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-3">
            Khám Phá Danh Mục Sản Phẩm
          </h2>
          <div className="w-16 h-1 bg-red-600 mx-auto rounded-full mb-2"></div>
          <p className="text-base lg:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Mỗi sản phẩm là kết tinh của tâm huyết, sáng tạo và trách nhiệm, góp phần xây dựng uy tín và niềm tin vững chắc tới khách hàng.
          </p>
        </div>

        <ProductCategory onDataLoaded={() => setIsLoading(false)} />
      </section>

      {/* ── Achievement ── */}
      <section className="relative bg-slate-950  border-t border-white/5">
        <div className="container mx-auto px-4">
          <div data-aos="fade-up" className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-6">
              Những Con Số <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-300">Tự Hào</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              Minh chứng cho sự nỗ lực không ngừng nghỉ và cam kết mang lại chất lượng hoàn hảo cho từng đối tác của Thịnh Phong Đỗ.
            </p>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center mb-20">
            {[
              { icon: School, value: "168+", label: "Hệ thống Canteen", sub: "Trường học" },
              { icon: ShoppingBag, value: "100K+", label: "Sản phẩm", sub: "Mỗi tháng" },
              { icon: Store, value: "56+", label: "Hệ thống Siêu thị", sub: "Bán lẻ toàn quốc" },
            ].map((stat, idx) => (
              <div key={idx} data-aos="fade-up" data-aos-delay={idx * 100} className="relative group w-full max-w-sm">
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent rounded-3xl transform group-hover:scale-105 transition-transform duration-500"></div>
                <div className="relative p-8 flex flex-col items-center text-center border border-white/10 rounded-3xl backdrop-blur-sm hover:border-red-500/30 transition-colors duration-500">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-red-500/20 to-transparent flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                    <stat.icon size={40} className="text-red-400" strokeWidth={1.5} />
                  </div>
                  <p className="text-4xl lg:text-5xl font-black text-white mb-2 drop-shadow-[0_0_15px_rgba(248,113,113,0.5)]">{stat.value}</p>
                  <p className="text-lg font-bold text-gray-200">{stat.label}</p>
                  <p className="text-sm text-gray-500 mt-1">{stat.sub}</p>
                </div>
              </div>
            ))}
          </div>
  
          {/* Marquee */}
          <div className="w-full relative overflow-hidden py-10">
            {/* Gradient Masks for smooth fading edges */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-950 to-transparent z-10"></div>
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-950 to-transparent z-10"></div>
            
            <div className="animate-marquee flex gap-8 w-max items-center">
              {[...PRODUCT_IMGS, ...PRODUCT_IMGS, ...PRODUCT_IMGS,...PRODUCT_IMGS,...PRODUCT_IMGS,...PRODUCT_IMGS].map((src, i) => (
                <div key={i} className="w-48 h-24 p-4 bg-white/5 backdrop-blur-sm 
                border border-white/10 rounded-2xl shrink-0 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer group">
                  <img loading="lazy" src={src} alt="Đối tác" className="max-w-full max-h-full object-contain filter transition-all duration-300" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── HOTLINE ── */}
      <section className="container mx-auto py-24 px-4">
        <div data-aos="zoom-in" className="max-w-6xl mx-auto bg-white rounded-[2.5rem] shadow-[0_20px_60px_rgb(0,0,0,0.05)] border border-gray-100 overflow-hidden flex flex-col lg:flex-row">

          {/* Left - Gradient Red */}
          <div className="relative bg-gradient-to-br from-red-700 to-red-900 text-white p-10 lg:p-14 flex flex-col justify-between lg:w-[40%] shrink-0 overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/20 rounded-full blur-2xl translate-y-1/3 -translate-x-1/3"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl lg:text-4xl font-extrabold leading-tight mb-6">
                Bắt Đầu Hành Trình<br/><span className="text-red-200">Thành Công Cùng Nhau</span>
              </h2>
              <p className="text-base text-white/80 leading-relaxed mb-12">
                Hãy để chuyên gia của chúng tôi giúp bạn xây dựng phương án suất ăn tối ưu nhất cho đơn vị của mình.
              </p>
              <div className="flex flex-col gap-6 text-base">
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-red-700 transition-colors">
                    <Phone size={20} className="shrink-0" />
                  </div>
                  <a href="tel:0867099978" className="font-medium hover:underline">086.709.9978</a>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-red-700 transition-colors">
                    <Mail size={20} className="shrink-0" />
                  </div>
                  <span className="font-medium">phongthinhphat2024@gmail.com</span>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-red-700 transition-colors">
                    <MapPin size={20} className="shrink-0" />
                  </div>
                  <span className="font-medium">Thành phố Hà Nội, Việt Nam</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div className="flex-1 p-10 lg:p-14 bg-white flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Gửi yêu cầu tư vấn</h3>
            <form onSubmit={handleSubmitConsultation} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-gray-700">Họ và tên <span className="text-red-500">*</span></label>
                  <input
                    required
                    className="border border-gray-200 rounded-xl px-5 py-3.5 text-base outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-gray-50/50 hover:bg-white"
                    placeholder="Nguyễn Văn A"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-gray-700">Số điện thoại <span className="text-red-500">*</span></label>
                  <input
                    required
                    className="border border-gray-200 rounded-xl px-5 py-3.5 text-base outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-gray-50/50 hover:bg-white"
                    placeholder="0901 234 567"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-700">Email công ty</label>
                <input
                  type="email"
                  className="border border-gray-200 rounded-xl px-5 py-3.5 text-base outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-gray-50/50 hover:bg-white"
                  placeholder="ceo@company.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-700">Dịch vụ quan tâm</label>
                <div className="relative">
                  <select
                    className="w-full border border-gray-200 rounded-xl px-5 py-3.5 text-base outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-gray-50/50 hover:bg-white appearance-none text-gray-700 cursor-pointer"
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                  >
                    <option value="" disabled>-- Chọn dịch vụ --</option>
                    <option value="nha-may">Canteen Nhà Máy</option>
                    <option value="truong-hoc">Canteen Trường Học</option>
                    <option value="sieu-thi">Chuỗi Siêu Thị</option>
                    <option value="van-phong">Canteen Văn Phòng</option>
                  </select>
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-700">Lời nhắn</label>
                <textarea
                  rows={4}
                  className="border border-gray-200 rounded-xl px-5 py-3.5 text-base outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-gray-50/50 hover:bg-white resize-none"
                  placeholder="Chia sẻ nhu cầu của bạn..."
                  value={form.note}
                  onChange={(e) => setForm({ ...form, note: e.target.value })}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-red-600 hover:bg-red-700 active:bg-red-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all text-white font-bold text-lg py-4 rounded-xl mt-4 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                {isSubmitting ? "Đang gửi..." : "Gửi yêu cầu ngay"}
              </button>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

function ServiceCard({ Icon, title, desc }) {
  return (
    <div data-aos="fade-up" className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-t-3xl"></div>
      <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6 group-hover:bg-red-600 transition-colors duration-300 shadow-inner">
        <Icon size={24} className="text-red-400 group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
      </div>
      <h4 className="font-bold text-xl text-white mb-3">{title}</h4>
      <p className="text-gray-400 leading-relaxed text-sm lg:text-base">{desc}</p>
    </div>
  );
}
 

export default HomePage;
