import React, { useState } from "react";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaShieldAlt,
  FaLeaf,
  FaClipboardCheck,
  FaTruck,
} from "react-icons/fa";

import { Download } from "lucide-react";
import { toast } from "sonner";
import bgContact from '../../assets/imgs/bgContact.webp';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { createContact } from "../../services/contactService";

const ContactPage = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "suat-an-truong-hoc",
    note: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsSubmitting(true);

      await createContact({
        name: form.name,
        phone: form.phone,
        email: form.email,
        service: form.service,
        note: form.note,
        requestType: "contact",
        source: "contact_page",
      });

      toast.success("Đã gửi thông tin liên hệ.");
      setForm({
        name: "",
        phone: "",
        email: "",
        service: "suat-an-truong-hoc",
        note: "",
      });
    } catch (error) {
      console.error("Lỗi gửi thông tin liên hệ:", error);
      toast.error("Không thể gửi thông tin. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      {/* Hero */}
      <section
        data-aos="fade"
        className="relative h-[460px] flex items-center justify-center text-center"
        style={{
          backgroundImage:
            `url(${bgContact})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 text-white px-4">

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Liên Hệ Với Chúng Tôi
          </h1>

          <p className="max-w-2xl mx-auto text-white/90">
            Chúng tôi luôn sẵn sàng lắng nghe và đồng hành cùng quý đối tác
            trong việc cung cấp giải pháp suất ăn công nghiệp chất lượng cao.
          </p>
        </div>
      </section>

      {/* Contact */}
      <section className="bg-gray-100">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">

            {/* Left */}
            <div className="space-y-6">
              <div data-aos="fade-right" className="bg-white rounded-xl p-8 shadow">
                <h2 className="text-2xl font-bold text-red-600 mb-8">
                  Thông Tin Liên Hệ
                </h2>

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <FaMapMarkerAlt className="text-red-600 mt-1" />
                    <div>
                      <h4 className="font-semibold">Địa chỉ</h4>
                      <p className="text-gray-600">
                        Số 215 Ngõ 264 Ngọc Thuỵ, P.Bồ Đề, Hà Nội
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <FaPhoneAlt className="text-red-600 mt-1" />
                    <div>
                      <h4 className="font-semibold">Điện thoại</h4>
                      <p className="text-gray-600">035.854.5062</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <FaEnvelope className="text-red-600 mt-1" />
                    <div>
                      <h4 className="font-semibold">Email</h4>
                      <p className="text-gray-600">
                        phongthinhphat2024@gmail.com
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <FaClock className="text-red-600 mt-1" />
                    <div>
                      <h4 className="font-semibold">Giờ làm việc</h4>
                      <p className="text-gray-600">
                        Chủ nhật - Thứ 6 | 05:00 - 23:00
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div data-aos="zoom-in" className="bg-white rounded-xl overflow-hidden shadow">
                <iframe
                  title="Google Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1995.418515300421!2d105.87342056567527!3d21.04938896178182!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135abd4e14e8b1f%3A0xb223380368e5986a!2zMjE1IE5nLiAyNjQgxJAuIE5n4buNYyBUaOG7pXksIELhu5MgxJDhu4EsIEjDoCBO4buZaSwgVmlldG5hbQ!5e0!3m2!1sen!2snl!4v1781198027362!5m2!1sen!2snl" 
                  className="w-full h-[300px]"
                ></iframe>
              </div>
            </div>

            {/* Right */}
            <div data-aos="zoom-in" className="bg-white rounded-xl p-8 shadow">
              <h2 className="text-2xl font-bold mb-2">
                Gửi Tin Nhắn Cho Chúng Tôi
              </h2>

              <p className="text-gray-600 mb-8">
                Phản hồi của bạn là động lực để chúng tôi hoàn thiện mỗi ngày.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Họ và tên"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="border rounded-lg px-4 py-3 w-full"
                  />

                  <input
                    type="text"
                    placeholder="Số điện thoại"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="border rounded-lg px-4 py-3 w-full"
                  />
                </div>

                <input
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="border rounded-lg px-4 py-3 w-full"
                />

                <select
                  value={form.service}
                  onChange={(e) => setForm({ ...form, service: e.target.value })}
                  className="border rounded-lg px-4 py-3 w-full"
                >
                  <option value="suat-an-truong-hoc">Suất ăn trường học</option>
                  <option value="suat-an-cong-nghiep">Suất ăn công nghiệp</option>
                  <option value="dich-vu-canteen">Dịch vụ canteen</option>
                  <option value="khac">Khác</option>
                </select>

                <textarea
                  rows="6"
                  placeholder="Nội dung liên hệ"
                  value={form.note}
                  onChange={(e) => setForm({ ...form, note: e.target.value })}
                  className="border rounded-lg px-4 py-3 w-full"
                ></textarea>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg transition disabled:opacity-60"
                >
                  {isSubmitting ? "Đang gửi..." : "Gửi Thông Tin"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Quality */}
      <section className="bg-white">
        <div className="container mx-auto px-6">
          <h2 data-aos="fade-up" className="text-3xl font-bold text-center text-red-600 mb-12">
            Cam Kết Chất Lượng
          </h2>

          <div className="grid md:grid-cols-4 gap-8">
            <div data-aos="fade-up" data-aos-delay="0" className="text-center">
              <FaShieldAlt className="mx-auto text-4xl text-red-600 mb-4" />
              <h3 className="font-semibold">ISO 22000</h3>
            </div>

            <div data-aos="fade-up" data-aos-delay="100" className="text-center">
              <FaClipboardCheck className="mx-auto text-4xl text-red-600 mb-4" />
              <h3 className="font-semibold">ATTP</h3>
            </div>

            <div data-aos="fade-up" data-aos-delay="200" className="text-center">
              <FaTruck className="mx-auto text-4xl text-red-600 mb-4" />
              <h3 className="font-semibold">Nguồn Gốc Rõ Ràng</h3>
            </div>

            <div data-aos="fade-up" data-aos-delay="300" className="text-center">
              <FaLeaf className="mx-auto text-4xl text-red-600 mb-4" />
              <h3 className="font-semibold">Thân Thiện Môi Trường</h3>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section data-aos="fade-up" className="bg-red-700 text-center text-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-4">
            Sẵn Sàng Hợp Tác Cùng Chúng Tôi?
          </h2>

          <p className="max-w-2xl mx-auto mb-8 text-white/90">
            Liên hệ ngay để nhận tư vấn và báo giá phù hợp với nhu cầu của doanh
            nghiệp, trường học hoặc chuỗi bán lẻ.
          </p>

           <div className="flex flex-wrap justify-center gap-4">

          <a
            href="tel:0385540512"
            className="inline-block bg-white 
            text-red-700 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100"
          >
            📞 038.554.0512
          </a>
          <a
            href="/Profile.pdf"
            download="Ho-so-nang-luc-Thinh-Phong-Do.pdf"
            className="
            inline-flex items-center gap-2
            px-6 py-3
            bg-red-600 text-white
            font-medium
            rounded-xl
            shadow-md
            hover:bg-red-700
            transition-all
            "
        >
            <Download size={18} />
            Tải hồ sơ năng lực
        </a>
        </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default ContactPage;
