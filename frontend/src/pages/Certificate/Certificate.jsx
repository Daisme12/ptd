import React, { useState,useEffect } from "react";

import { ShieldCheck, Award, Clock,Download, BadgeCheck, FileText, Globe, Leaf, X } from 'lucide-react';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import bgCertificate from '../../assets/imgs/bgCertificate.webp';

import chungChi from '../../assets/imgs/dongGoi.webp';
import soChe from '../../assets/imgs/soChe.webp';

export default function QualityPage() {
    const [open, setOpen] = useState(false);
    const [selectedPdf, setSelectedPdf] = useState("");

  return (
    <div>
    <Header solid />
      {/* Banner */}
      <div data-aos="fade" className="relative w-full h-72 lg:h-[460px] overflow-hidden">
        <img loading="lazy" src={bgCertificate}
          alt="banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/55 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-white text-3xl lg:text-5xl font-bold mb-4">
            Cam Kết Chất Lượng & An Toàn
          </h1>
          <p className="text-white/80 text-sm lg:text-base max-w-xl">
            Chúng tôi không chỉ cung cấp thực phẩm, chúng tôi cung cấp sự an tâm
            tuyệt đối qua từng khâu kiểm soát nghiêm ngặt.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white py-10 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {[
            { icon: ShieldCheck, value: '100%', label: 'Nguyên liệu sạch' },
            { icon: Award,       value: '05+',  label: 'Chứng chỉ quốc tế' },
            { icon: Clock,       value: '24/7', label: 'Kiểm soát quy trình' },
            { icon: BadgeCheck,  value: 'ISO',  label: 'Đạt chuẩn 22000' },
          ].map(({ icon: Icon, value, label }, index) => (
            <div data-aos="fade-up" data-aos-delay={index * 100} key={label} className="flex flex-col items-center gap-2">
              <Icon size={28} className="text-red-600" strokeWidth={1.5} />
              <p className="text-2xl font-bold text-red-600">{value}</p>
              <p className="text-sm text-gray-500">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Chứng nhận quốc tế */}
      <div className="bg-gray-50 py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div data-aos="fade-up" className="text-center mb-10">
            <h2 className="text-2xl font-bold uppercase tracking-wide">Chứng Nhận Quốc Tế</h2>
            <div className="w-12 h-1 bg-red-600 mx-auto mt-2" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[
                {
                img: soChe,
                title: 'ISO 22000:2018 - Chế Biến Thực Phẩm',
                desc: 'Chứng nhận hệ thống quản lý an toàn thực phẩm đối với hoạt động sản xuất bánh mì, bánh mì nhân, bánh hamburger, bánh phô mai, các sản phẩm từ bột bánh mì và chế biến các món ăn từ cơm.',                
                pdf: '/ISO_Chếbiến.pdf'
                },
                {
                img: chungChi,
                title: 'ISO 22000:2018 - Bảo Quản & Đóng Gói',
                desc: 'Chứng nhận hệ thống quản lý an toàn thực phẩm đối với hoạt động bảo quản, san lẻ, đóng gói, sơ chế và nấu chín thực phẩm, đảm bảo kiểm soát chất lượng trong toàn bộ quá trình cung ứng.',
                pdf: '/ISO_Sơchế.pdf'
                }
            ].map(({ img, title, desc, pdf }, index) => (
              <div data-aos="zoom-in" data-aos-delay={index * 100} key={title} className="bg-white rounded-2xl p-5 flex gap-4 shadow-sm border-l-4 border-red-600">
                <img loading="lazy" src={img} alt={title} className="w-20 h-30 object-cover  shrink-0" />
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">{title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-3">{desc}</p>
                  <button 
                    className="btn btn-primary p-3 text-white flex items-center gap-1 text-xs font-medium hover:underline"
                    onClick={() => {
                      setOpen(true);
                      setSelectedPdf(pdf);
                    }}
                  >
                    <FileText size={13} /> Xem chi tiết chứng chỉ
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chứng nhận cơ sở & nội địa */}
      <div className="bg-white py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div data-aos="fade-up" className="text-center mb-10">
            <h2 className="text-2xl font-bold uppercase tracking-wide">Chứng Nhận Cơ Sở & Nội Địa</h2>
            <div className="w-12 h-1 bg-red-600 mx-auto mt-2" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[
              {
                icon: ShieldCheck,
                title: 'An Toàn Thực Phẩm',
                desc: 'Được cấp Giấy chứng nhận cơ sở đủ điều kiện an toàn thực phẩm và tuân thủ nghiêm ngặt các quy định của cơ quan quản lý nhà nước.'
                },
                {
                icon: Leaf,
                title: 'Nguồn Gốc Minh Bạch',
                desc: 'Nguyên liệu được lựa chọn từ các nhà cung cấp uy tín, có hồ sơ truy xuất nguồn gốc rõ ràng và được kiểm soát chất lượng đầu vào.'
                },
                {
                icon: Globe,
                title: 'Kiểm Soát Chất Lượng',
                desc: 'Quy trình sản xuất, sơ chế, đóng gói và bảo quản được kiểm soát chặt chẽ nhằm đảm bảo chất lượng đồng nhất cho từng sản phẩm.'
                }
            ].map(({ icon: Icon, title, desc }, index) => (
              <div
            data-aos="fade-up" data-aos-delay={index * 100}
              key={title} 
              className="bg-white border border-gray-100 hover:border-red-200 hover:shadow-xl transition-all duration-300 rounded-2xl group p-6 flex flex-col items-center text-center gap-3">
                <div className="w-14 h-14 rounded-xl bg-white shadow-sm group-hover:bg-red-600 transition-all duration-300 flex items-center justify-center">
                    <Icon
                        size={24}
                        className="text-red-600 group-hover:text-white transition-all duration-300"
                        strokeWidth={1.5}
                    />                
                </div>
                <h3 className="font-bold text-gray-800">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA banner */}
      <div data-aos="fade-up" className="bg-gradient-to-r from-red-700 to-red-500 py-16 px-4 text-center">
        <h2 className="text-white text-2xl lg:text-4xl font-bold mb-8">
          Tin Tưởng Vào Sự Chuyên Nghiệp Của Chúng Tôi
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/Profile.pdf"
            download="Ho-so-nang-luc-Thinh-Phong-Do.pdf"
            className="
            inline-flex items-center gap-2
            px-6 py-3
            bg-yellow-500 text-white
            font-medium
            rounded-xl
            shadow-md
            hover:bg-yellow-600
            transition-all
            "
        >
            <Download size={18} />
            Tải hồ sơ năng lực
        </a>
            <a
            href="tel:0385540512"
            className="inline-block bg-white 
            text-red-700 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100"
          >
            📞 038.554.0512
          </a>
        </div>
      </div>

      {open && (
        <div
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
            onClick={() => setOpen(false)}
        >
            <div
            className="bg-white rounded-xl w-[90%] max-w-5xl h-[90vh] relative"
            onClick={(e) => e.stopPropagation()}
            >
            <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 z-10 bg-white rounded-full p-1 shadow"
            >
                <X size={24} />
            </button>

            <iframe
                src={selectedPdf}
                title="Certificate"
                className="w-full h-full rounded-xl"
            />
            </div>
        </div>
        )}
    <Footer />
    </div>
  )
}