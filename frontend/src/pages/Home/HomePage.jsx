import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import backgroundHome from "../../assets/imgs/background.png"
import ISO from "../../assets/imgs/ISO.png"
import Profile from "../../assets/imgs/Profile.png"
import QR from "../../assets/imgs/QR.png"
import Star from "../../assets/imgs/Star.png"
import Intro from "../../assets/imgs/Intro.png"
import { Award, ShieldPlus, Handshake, Lightbulb,BookOpen, Cpu, Tag, Truck, HeartHandshake 
  ,School, ShoppingBag, Store, Phone, Mail, MapPin
 } from "lucide-react";
import { toast } from "sonner";


import "../../assets/styles/Home.css"

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ProductCategory from "./ProductCategory";
import { createContact } from "../../services/contactService";

const PRODUCT_IMGS = [
    "/logos/hong-anh.png",
    "/logos/5s.png",
    "/logos/ubofood.jpg",
    "/logos/bach-khoa.png",
    "/logos/gtvt.jpg",
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
    <div>
      {/* Header */}
      <Header />
      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center px-4">
        {/* Background */}
        <div
          className="absolute inset-0 -z-20 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: `url(${backgroundHome})`,
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 -z-10 bg-black/60" />

        <div className="max-w-6xl text-center">
          {/* Brand */}
          <div className="py-4 w-fit mx-auto border-y border-white/40">
            <p className="text-[12px] md:text-base text-white/80 tracking-[0.2em] uppercase">
              <span className="font-bold">
                THỊNH PHONG ĐỖ
              </span>
              {" "} - Chuyên sản xuất, sơ chế và cung cấp suất ăn
            </p>
          </div>

          {/* Title */}
          <h1
            className="mx-auto mt-[50px] mb-[10px] md:mb-[30px] 
            text-2xl md:text-[45px]
          font-bold text-white uppercase mb-8"
          >
            CHUYÊN CUNG CẤP SUẤT ĂN & DỊCH VỤ CANTEEN
            CHO TRƯỜNG HỌC VÀ CHUỖI SIÊU THỊ
          </h1>

          {/* Description */}
          <p
            className="md:my-[20px] max-w-3xl text-[12px] 
            mx-auto text-white/85 mb-[10px]
            md:text-lg leading-relaxed md:mb-14"
          >
            THỊNH PHONG ĐỖ cung cấp suất ăn, thực phẩm chế biến sẵn và
            dịch vụ canteen với quy trình sản xuất đạt tiêu chuẩn
            <span className="font-semibold text-white">
              {" "}ISO 22000:2018
            </span>,
            đảm bảo an toàn thực phẩm, truy xuất nguồn gốc minh bạch và
            giao hàng đúng thời gian cam kết.
          </p>

          {/* Extra info */}
          <div className='mx-auto my-[30px] flex md:gap-20 sm:gap-15 flex-wrap justify-center'>
            <div className='flex items-center gap-[20px] flex align-items-center gap-10'>
              <img className="w-[70px] h-[70px] object-cover rounded-[20px]" src={QR} alt="QR sản phẩm" />
              <div className='flex flex-col items-start text-white'>
                <p className="text-[14px] md:text-[16px] font-bold">Truy xuất nguồn gốc</p>
                <span className="text-[10px] md:text-[14px]">Minh bạch, dễ kiểm tra</span>
              </div>
            </div>
            <div className='flex items-center gap-[20px] flex align-items-center gap-10'>
              <img className="w-[70px] h-[70px] object-cover rounded-[20px]" src={ISO} alt="ISO" />
              <div className='flex flex-col items-start text-white'>
                <div className='flex items-center w-[160px] h-[30px] overflow-hidden gap-[10px]'>
                  <p className="text-[14px] md:text-[16px] font-bold">ISO</p>
                  <img className="w-[70px] h-[70px] object-cover rounded-[20px]" src={Star} alt="Star" />
                </div>
                <span className="text-[10px] md:text-[14px]">Tiêu chuẩn ISO 22000:2018</span>
              </div>
            </div>
            <div className='flex items-center gap-[20px] flex align-items-center gap-10'>
              <img className="w-[70px] h-[70px] object-cover rounded-[20px]" src={Profile} alt="Profile" />
              <div className='flex flex-col items-start text-white' >
                <p className="text-[14px] md:text-[16px] font-bold">Hồ sơ sản phẩm đầy đủ</p>
                <span className="text-[10px] md:text-[14px]">Pháp lý & Kiểm định chất lượng</span>
              </div>
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={() => navigate("/contact")}
            className="btn btn-primary text-[12px] md:text-base rounded-md md:mt-3 p-4 text-white uppercase tracking-widest"
          >
            Nhận tư vấn & báo giá
          </button>
        </div>
      </section>

      <section className="container mx-auto">
        {/* Slogan */}
        <div className="mb-15 mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
          {cards.map(({ icon: Icon, title, desc }, idx) => (
            <div
              key={idx}
              className="flex flex-col border-b-4 border-b-red-200 hover:border-b-red-600 
              gap-4 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm group
              transition-all duration-300
              "
              
            >
              {/* Icon box */}
              <div className="w-12 h-12 rounded-xl bg-red-50 group-hover:bg-red-600 flex items-center justify-center">
                <Icon size={22} className="text-red-600 group-hover:text-white" strokeWidth={1.5} />
              </div>

              {/* Text */}
              <div className="flex flex-col gap-1">
                <p className="font-semibold text-red-600">{title}</p>
                <span className="text-gray-500 text-sm leading-relaxed">{desc}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Intro */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img
              src={Intro}
              alt="Giới thiệu công ty"
              className="w-full rounded-2xl object-cover"
            />

            <div className="absolute border-l-4 border-l-yellow-600 bottom-5 right-5 bg-white rounded-xl px-6 py-4 shadow-lg">
              <div className="flex flex-col gap-1">
                <p className="text-2xl font-bold text-red-600">5+</p>
                <span className="text-gray-500 text-sm">
                  Năm kinh nghiệm
                </span>
              </div>
            </div>
          </div>

          <div>
            <h1 className="text-3xl text-red-600 font-bold uppercase tracking-widest">
              Giới Thiệu Về Công Ty
            </h1>

            <div className="w-20 h-1 bg-primary my-4"></div>

            <h2 className="text-[18px] text-gray-400 mb-4">
              Chất Lượng - Chất Sống - Chất Riêng
            </h2>

            <p className="text-gray-600 leading-8 mb-8">
              Công ty đặt tại Long Biên – Hà Nội, tiên phong áp dụng công nghệ
              sản xuất 5.0, tự động hóa nhiều khâu nhằm nâng cao năng suất và
              chất lượng sản phẩm. Đội ngũ sản xuất tận tâm, chuyên nghiệp,
              luôn lấy an toàn thực phẩm và sự hài lòng của khách hàng làm kim
              chỉ nam phát triển.
            </p>

            <a href="/intro">
            <button className="btn btn-primary text-white px-6 py-3 rounded-lg">
                Tìm hiểu thêm
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="container mx-auto bg-gray-900">
        {/* Heading */}
        <div className="text-center mb-10 ">
          <p className="text-2xl font-bold tracking-widest text-white uppercase mb-1">
            Dịch vụ của chúng tôi
          </p>
          <p className="text-sm text-gray-400">Dịch vụ tốt nhất cho bạn</p>
        </div>
 
        {/* Grid: 2 cột trên, 2 cột dưới + 1 card highlight bên phải chiếm 2 hàng */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Hàng 1 trái: Thực đơn + Công nghệ */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              <div className="md:row-span-2 bg-red-600 rounded-2xl p-6 flex flex-col gap-4 text-white">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <Icon size={22} className="text-white" strokeWidth={1.5} />
                </div>
                <p className="font-semibold text-lg">{s.title}</p>
                <p className="text-sm text-white/85 leading-relaxed">{s.desc}</p>
                {s.quote && (
                  <p className="mt-auto text-sm italic text-white/70 border-t border-white/20 pt-4">
                    {s.quote}
                  </p>
                )}
              </div>
            );
          })()}
 
          {/* Hàng 2 trái: Giao hàng + Phục vụ */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {services
              .filter((s) => !s.highlight)
              .slice(2, 4)
              .map(({ icon: Icon, title, desc }, i) => (
                <ServiceCard key={i} Icon={Icon} title={title} desc={desc} />
              ))}
          </div>
        </div>
      </section>

      {/* ── List Products ── */}
      <section className="container mx-auto mb-20">
        {/* Heading */}
        <div className="text-center mb-8">
          <p className="text-2xl font-bold tracking-widest tracking-widest text-red-600 uppercase mb-1">
            Danh sách sản phẩm
          </p>
          <p className="text-sm text-gray-400 max-w-lg mx-auto">
            Mỗi sản phẩm là kết tinh của tâm huyết, sáng tạo và trách nhiệm góp phần xây dựng uy tín và niềm tin vững chắc tới khách hàng
          </p>
        </div>

        <ProductCategory />
      </section>

      {/* ── Achievement ── */}
      <section className="container bg-gray-900">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold tracking-widest tracking-widest text-white uppercase mb-1">
            Thành tựu của chúng tôi
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Cùng khám phá những con số nổi bật thể hiện năng lực và kinh nghiệm của Thịnh Phong Đỗ
            <br />
            Đây chính là cam kết cho chất lượng và uy tín mà chúng tôi mang đến cho bạn
          </p>
        </div>
 
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 justify-items-center">
          {/* Stat 1 */}
          <div className="flex items-center gap-5">
            <School size={56} className="text-white/90" strokeWidth={1.5} />
            <div>
              <p className="text-3xl font-bold text-white/90 leading-none">168+</p>
              <p className="font-semibold text-gray-400 mt-1 leading-snug">Hệ thống Canteen<br />trường học</p>
            </div>
          </div>
 
          {/* Stat 2 */}
          <div className="flex items-center gap-5">
            <ShoppingBag size={56} className="text-white/90" strokeWidth={1.5} />
            <div>
              <p className="text-3xl font-bold text-white/90 leading-none">100.000+</p>
              <p className="font-semibold text-gray-400 mt-1 leading-snug">Sản phẩm/tháng</p>
            </div>
          </div>
 
 
          {/* Stat 3 */}
          <div className="flex items-center gap-5">
            <Store size={56} className="text-white/90" strokeWidth={1.5} />

            <div>
              <p className="text-3xl font-bold text-white/90 leading-none">56+</p>
              <p className="font-semibold text-gray-400 mt-1 leading-snug">Hệ thống Siêu thị<br />bán lẻ</p>
            </div>
          </div>
        </div>
 
        {/* Marquee */}
        <div className="overflow-hidden mt-20 -mx-4">
          <div className="flex gap-3 animate-marquee" style={{ width: "max-content" }}>
            {[...PRODUCT_IMGS, ...PRODUCT_IMGS, ...PRODUCT_IMGS, ...PRODUCT_IMGS].map((src, i) => (
              <img key={i} src={src} alt="Sản phẩm" className="w-36 h-20  object-contain bg-white/80 rounded-2xl shrink-0" />
            ))}
          </div>
          <style>{`@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}.animate-marquee{animation:marquee 30s linear infinite;}`}</style>
        </div>
      </section>

      {/* ── HOTLINE ── */}
      <section className="container">
      <div className="max-w-full mx-auto bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row">

        {/* Left - đỏ */}
        <div className="bg-red-700 text-white p-8 flex flex-col 
        justify-between md:w-100 shrink-0">
          <div>
            <h2 className="text-2xl font-bold leading-snug mb-4">
              Liên hệ tư vấn giải pháp
            </h2>
            <p className="text-sm text-white/80 leading-relaxed mb-8">
              Hãy để chuyên gia của chúng tôi giúp bạn xây dựng phương án suất ăn tối ưu nhất cho đơn vị của mình.
            </p>
            <div className="flex flex-col gap-4 text-sm">
              <div className="flex items-center gap-3">
                <Phone size={16} className="shrink-0" />
                <span>028 3840 0000</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="shrink-0" />
                <span>phongthinhphat2024@gmail.com</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={16} className="shrink-0 mt-0.5" />
                <span>Thành phố Hà Nội, Việt Nam</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right - form */}
        <form onSubmit={handleSubmitConsultation} className="flex-1 p-8 flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-600">Họ và tên</label>
              <input
                className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-red-200 placeholder-gray-300"
                placeholder="Nguyễn Văn A"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-600">Số điện thoại</label>
              <input
                className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-red-200 placeholder-gray-300"
                placeholder="0901 234 567"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-600">Email công ty</label>
            <input
              className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-red-200 placeholder-gray-300"
              placeholder="ceo@company.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-600">Dịch vụ quan tâm</label>
            <select
              className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-red-200 text-gray-700 appearance-none bg-white"
              value={form.service}
              onChange={(e) => setForm({ ...form, service: e.target.value })}
            >
              <option value="">Canteen Nhà Máy</option>
              <option value="truong-hoc">Canteen Trường Học</option>
              <option value="sieu-thi">Chuỗi Siêu Thị</option>
              <option value="van-phong">Canteen Văn Phòng</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-600">Lời nhắn</label>
            <textarea
              rows={4}
              className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-red-200 placeholder-gray-300 resize-none"
              placeholder="Chia sẻ nhu cầu của bạn..."
              value={form.note}
              onChange={(e) => setForm({ ...form, note: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-red-700 hover:bg-red-800 active:scale-[0.98] transition-all text-white font-bold text-sm py-4 rounded-xl mt-1"
          >
            {isSubmitting ? "Đang gửi..." : "Gửi yêu cầu ngay"}
          </button>
        </form>

      </div>
      </section>
      <Footer />
    </div>
  );
}

function ServiceCard({ Icon, title, desc }) {
  return (
    <div className="bg-white border-red-100 rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col gap-3">
      <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
        <Icon size={20} className="text-red-700" strokeWidth={1.5} />
      </div>
      <p className="font-semibold text-gray-800 text-sm">{title}</p>
      <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
    </div>
  );
}
 

export default HomePage;
