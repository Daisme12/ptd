import React from 'react'
import { useEffect, useRef } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import bannerVideo from '../../assets/banner_intro.mp4'
import video_intro from '../../assets/video_intro.mp4'
import chatLuong from '../../assets/imgs/chatluong.webp';
import chatSong from '../../assets/imgs/chatSong.webp';
import chatRieng from '../../assets/imgs/chatRieng.webp';
import ly from '../../assets/imgs/ly.webp';
import GiayTo from '../../assets/imgs/GiayKinhDoanh.webp';
import profilePdf from "/Profile.pdf";

import { Download,ExternalLink } from "lucide-react";

export default function Intro() {
    const videoRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;
        const observer = new IntersectionObserver(
            ([entry]) => { entry.isIntersecting ? video.play() : video.pause(); },
            { threshold: 0.5 }
        );
        if (video) observer.observe(video);
        return () => observer.disconnect();
    }, []);

    return (
        <div>
            <Header solid/>

            {/* Banner */}
            <div data-aos="fade" className="relative w-full h-[460px] overflow-hidden">
                <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
                    <source src={bannerVideo} type="video/mp4" />
                </video>
                <div className="absolute inset-0 h-[90px] bg-black/20 flex items-center justify-center z-20" />

                <div className="absolute inset-0 bg-black/30 z-10">
                    <h1 className="absolute bottom-10 left-10 lg:left-24 text-white 
        text-3xl  lg:text-5xl font-bold uppercase tracking-widest">
                        Nơi Khởi Nguồn Đam Mê
                    </h1>
                </div>
            </div>

            <section className="container">
                <div data-aos="fade-left" className="text-left">
                    <h1 data-aos="fade-up" className="text-3xl font-bold text-red-600 uppercase mb-6">
                        Giới thiệu
                    </h1>

                    <p className="text-gray-600 leading-relaxed text-xl mb-4">
                        <strong>Công ty Thịnh Phong Đỗ</strong> là đơn vị sản xuất, sơ chế và chế biến sản phẩm thực phẩm,
                        cam kết mang đến những sản phẩm <strong>chất lượng cao, an toàn và bền vững.</strong> Với phương châm
                        <strong> "3 Chất" – Chất Lượng, Chất Riêng và Chất Sống,</strong> chúng tôi không chỉ đảm bảo chất lượng
                        vượt trội mà còn tạo nên dấu ấn khác biệt, nâng tầm trải nghiệm và giá trị sống cho khách hàng.
                    </p>

                    <p className="text-gray-600 leading-relaxed text-xl">
                        Đầu tư vào <strong>công nghệ hiện đại, quy trình khép kín và nguyên liệu chọn lọc,</strong> Thịnh Phong Đỗ
                        luôn đặt <strong>uy tín và sự hài lòng của khách hàng</strong> làm trọng tâm, đồng thời khẳng định trách
                        nhiệm đối với cộng đồng và môi trường.
                    </p>
                    </div>

                <div className="mt-10">

                <h2 data-aos="fade-up" className="text-3xl font-bold text-red-600 uppercase mt-10">
                    Với Slogan 3 Chất
                </h2>
                

                {/* Slogan 3 chất */}
                <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-20">
                    {[
                        { title: 'Chất Lượng', desc: '"Tạo lên thương hiệu"', img: chatLuong },
                        { title: 'Chất Sống', desc: '"Tạo lên sự khác biệt trong sản phẩm"', highlight: true, img: chatSong },
                        { title: 'Chất Riêng', desc: '"Sống đúng với bản thân"', img: chatRieng },
                    ].map(({ title, desc, highlight, img }, index) => (
                        <div data-aos="fade-up" data-aos-delay={index * 100} key={title} className={`
                            lg:my-10 my-5 flex flex-col items-center 
                            text-center p-5 rounded-2xl  
                            ${highlight ? 'bg-red-600 text-white shadow-lg scale-105' : 'bg-gray-50'}`}>
                            <img src={img} alt={title} className="w-32 h-32 object-contain" loading="lazy" />
                            <h4 className={`text-lg font-bold ${highlight ? 'text-white' : 'text-gray-800'}`}>{title}</h4>
                            <p className={`text-sm ${highlight ? 'text-white/85' : 'text-gray-500'}`}>{desc}</p>
                        </div>
                    ))}
                </div>
                </div>

                <div className="my-10">
                {/* Tầm nhìn */}
                <h2 data-aos="fade-up" className="text-3xl font-bold text-red-600 mb-12">
                    Tầm Nhìn
                </h2>

                <div className="relative lg:min-h-[480px]">

                    {/* Box trên */}
                    <div data-aos="fade-left" className="w-full lg:w-[60%] border-2 border-red-500 rounded-[30px] p-10">
                        <p className="text-xl leading-relaxed text-gray-800">
                            Thịnh Phong Đỗ hướng đến trở thành đơn vị dẫn đầu trong cung ứng
                            suất ăn công nghiệp sạch, an toàn, nói không với chất bảo quản,
                            vì sức khỏe cộng đồng
                        </p>
                    </div>

                    {/* Ảnh */}
                    <div
                        data-aos="fade-right"
                        className="
                            mt-10 flex justify-center lg:mt-0
                            lg:absolute lg:right-0 lg:top-[-50px] lg:z-20
                        "
                    >
                        <div className="relative">
                            <img
                                src={ly}
                                alt="Trần Khánh Ly"
                                loading="lazy"
                                className="w-[500px] max-w-[350px] lg:max-w-[500px] object-contain"
                            />

                            <div
                                className="
                                    absolute bottom-0 left-1/2 -translate-x-1/2
                                    bg-red-700 text-white
                                    py-3
                                    rounded-md text-center
                                    min-w-[200px]
                                    lg:min-w-[350px]
                                "
                            >
                                <p className="text-base lg:text-lg font-bold uppercase">
                                    Phó Giám Đốc
                                </p>
                                <p className="text-xl lg:text-2xl font-extrabold uppercase">
                                    Trần Khánh Ly
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Box quote */}
                    <div
                        data-aos="fade-left"
                        className="
                            mt-10 border-2 border-red-500 rounded-[30px] p-8
                            lg:absolute lg:left-0 lg:top-[210px]
                            lg:w-[80%] lg:p-12
                            lg:z-10
                        "
                    >
                        <p className="text-lg lg:text-xl italic leading-relaxed text-gray-700 lg:w-[67%]">
                            "Với 15 năm kinh nghiệm trong ngành F&B, chúng tôi không ngừng
                            đổi mới và áp dụng công nghệ 5.0 vào quy trình sản xuất nhằm
                            nâng cao chất lượng suất ăn công nghiệp."
                        </p>
                    </div>
                </div>
                </div>

                {/* Sứ mệnh */}
                <div className="py-15 border-t border-gray-100">
                    <h1 data-aos="fade-up" className="text-3xl font-bold text-red-600 uppercase mb-4">Sứ Mệnh</h1>
                    <p data-aos="fade-up" className="text-gray-600 mb-10 max-w-2xl">
                        Thịnh Phong Đỗ ra đời với sứ mệnh mang đến những sản phẩm chất lượng cao với giá thành hợp lý,
                        phục vụ nhu cầu thực phẩm của người Việt.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { title: 'Với Khách Hàng', desc: 'Cung cấp thực phẩm an toàn - chất lượng - dinh dưỡng, đáp ứng nhu cầu tiêu dùng hiện đại.' },
                            { title: 'Với Đối Tác Phân Phối', desc: 'Hợp tác bền vững, đảm bảo lợi ích hài hòa, mở rộng mạng lưới phân phối.' },
                            { title: 'Với Người Lao Động', desc: 'Tạo môi trường làm việc chuyên nghiệp, nâng cao tay nghề, đảm bảo quyền lợi.' },
                            { title: 'Với Xã Hội', desc: 'Góp phần phát triển nền nông nghiệp sạch, tham gia các chương trình cộng đồng vì sức khỏe và môi trường.' },
                        ].map(({ title, desc }, index) => (
                            <div data-aos="fade-up" data-aos-delay={index * 100} key={title} className="bg-white border-t-2 border-red-600 rounded-2xl p-6 shadow-sm">
                                <h4 className="font-bold text-red-600 uppercase text-sm mb-3">{title}</h4>
                                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Video */}
                <div className="py-15 border-t border-gray-100 text-center">
                    <h1 data-aos="fade-up" className="text-3xl font-bold text-red-600 uppercase mb-8">Hành Trình Đến Tới Ước Mơ</h1>
                    <video data-aos="fade-up" ref={videoRef} autoPlay controls muted playsInline loop className="w-full rounded-2xl shadow-md">
                        <source src={video_intro} type="video/mp4" />
                    </video>
                </div>

                {/* Cơ sở pháp lý */}
                <div className="py-15 border-t bg-red-700 border-gray-100 text-center">
                    <h1 data-aos="fade-up" className="text-3xl font-bold text-white uppercase mb-8">Cơ Sở Pháp Lý</h1>
                    <img data-aos="zoom-in" src={GiayTo} alt="Giấy phép kinh doanh" className="mx-auto rounded-2xl shadow-md max-w-lg w-full" loading="lazy" />
                </div>
            <div data-aos="fade-up" className="flex flex-col gap-4 items-center mt-20">
            <iframe
                src="/Profile.pdf"
                className="w-full h-[80vh]"
                title="Profile"
            />
            </div>
            </section>
        <section data-aos="fade-up" className="bg-red-700 container text-center text-white">
        <div className="mx-auto px-6">
          <h2 className="text-4xl font-bold mb-4">
           Tin Tưởng Vào Sự Chuyên Nghiệp Của Chúng Tôi
          </h2>

          <p className="max-w-2xl mx-auto mb-8 text-white/90">
           Khám phá năng lực sản xuất, tiêu chuẩn chất lượng và những
        giá trị mà Thịnh Phong Đỗ đã xây dựng trong suốt quá trình phát triển.
          </p>

           <div className="flex flex-wrap justify-center gap-4">
                <a
                    href="https://heyzine.com/flip-book/64666fe1b1.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                    inline-flex items-center gap-2
                    px-6 py-3
                    bg-white text-red-600
                    border border-red-600
                    font-medium
                    rounded-xl
                    shadow-md
                    hover:bg-red-100
                    transition-all
                    "
                >
                    <ExternalLink size={18} />
                    Xem online
                </a>

                <a
                    href="/Profile.pdf"
                    download="Ho-so-nang-luc-Thinh-Phong-Do.pdf"
                    className="
                    inline-flex items-center gap-2
                    px-6 py-3
                    text-white
                    font-medium
                    rounded-xl
                    shadow-md
                    border-2
                    border-white
                    hover:border-2 hover:border-gray-700
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
        </div>
    )
}