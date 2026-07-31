import React from 'react'
import { useEffect, useRef, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SEO from "../../components/SEO";

import bannerVideo from '../../assets/banner_intro.mp4'
import video_intro from '../../assets/video_intro.mp4'
import chatLuong from '../../assets/imgs/chatluong.webp';
import chatSong from '../../assets/imgs/chatSong.webp';
import chatRieng from '../../assets/imgs/chatRieng.webp';
import ly from '../../assets/imgs/ly.webp';
import GiayTo from '../../assets/imgs/GiayKinhDoanh.webp';
import profilePdf from "/Profile.pdf";

import { Download, ExternalLink, ChevronLeft, ChevronRight, FileText, Eye } from "lucide-react";
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { getProfileUrl } from "../../services/documentService";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const isGoogleDriveLink = (url) => {
  return url && (url.includes('drive.google.com') || url.includes('docs.google.com'));
};

const getGoogleDrivePreviewUrl = (url) => {
  if (!url) return '';
  const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (match && match[1]) {
    const fileId = match[1];
    return `https://drive.google.com/file/d/${fileId}/preview`;
  }
  return url;
};

export default function Intro() {
    const videoRef = useRef(null);
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [openPdf, setOpenPdf] = useState(false);
    const [profileUrl, setProfileUrl] = useState("/Profile.pdf");

    function onDocumentLoadSuccess({ numPages }) {
      setNumPages(numPages);
      setPageNumber(1);
    }

    useEffect(() => {
        const fetchProfile = async () => {
            const url = await getProfileUrl();
            setProfileUrl(url);
        };
        fetchProfile();
    }, []);

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
    <div className="bg-slate-50 min-h-screen">
      <SEO 
        title="Về Chúng Tôi" 
        description="Tìm hiểu về Thịnh Phong Đỗ - Đơn vị hàng đầu trong việc cung cấp suất ăn công nghiệp và suất ăn trường học với quy trình chuẩn ISO." 
      />
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
                        { title: 'Chất Riêng', desc: '"Sống đúng với bản thân"',  highlight: true ,img: chatRieng },
                        { title: 'Chất Sống', desc: '"Tạo lên sự khác biệt trong sản phẩm"', img: chatSong },
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

                {/* Hồ sơ năng lực */}
                <div data-aos="fade-up" className="mt-5 mb-10 w-full max-w-5xl mx-auto px-4">
                  <div className="text-center mb-12">
                    <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 uppercase tracking-tight mb-4">
                      Hồ Sơ <span className="text-red-600">Năng Lực</span>
                    </h1>
                    <div className="w-16 h-1.5 bg-red-600 mx-auto rounded-full mb-6" />
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
                      Khám phá năng lực sản xuất, tiêu chuẩn chất lượng và những giá trị mà Thịnh Phong Đỗ đã xây dựng trong suốt quá trình phát triển.
                    </p>
                  </div>

                  <div className="relative bg-white rounded-3xl p-6 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 flex flex-col items-center">
                    
                    {/* Header Controls for inline viewer */}
                    <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-gray-50 p-4 rounded-2xl border border-gray-200">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 shrink-0">
                          <FileText size={20} />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-800 text-sm sm:text-base line-clamp-1">Profile_ThinhPhongDo.pdf</h3>
                          <p className="text-xs text-gray-500">Tài liệu giới thiệu năng lực công ty</p>
                        </div>
                      </div>
                      
                      <div className="hidden md:flex gap-3 w-full sm:w-auto shrink-0">
                        <button
                          onClick={() => {
                            if (isGoogleDriveLink(profileUrl)) {
                              window.open(profileUrl, '_blank');
                            } else {
                              setOpenPdf(true);
                            }
                          }}
                          className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-xl hover:bg-gray-800 transition-all shadow-md hover:shadow-lg"
                        >
                          {isGoogleDriveLink(profileUrl) ? <ExternalLink size={18} /> : <Eye size={18} />}
                          {isGoogleDriveLink(profileUrl) ? "Mở Drive" : "Phóng to"}
                        </button>
                        <a
                          href={profileUrl}
                          download="Ho-so-nang-luc-Thinh-Phong-Do.pdf"
                          target={isGoogleDriveLink(profileUrl) ? "_blank" : undefined}
                          rel={isGoogleDriveLink(profileUrl) ? "noopener noreferrer" : undefined}
                          className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 bg-red-600 text-white text-sm font-medium rounded-xl hover:bg-red-700 transition-all shadow-md hover:shadow-lg"
                        >
                          <Download size={18} /> Tải về
                        </a>
                      </div>
                    </div>

                    {/* PDF Viewer */}
                    <div className="w-full bg-gray-100 rounded-2xl p-4 lg:p-8 flex flex-col items-center border border-gray-200 shadow-inner">
                      {isGoogleDriveLink(profileUrl) ? (
                        <div className="w-full h-[700px] lg:h-[800px] border border-gray-300 rounded-2xl overflow-hidden shadow-md">
                          <iframe
                            src={getGoogleDrivePreviewUrl(profileUrl)}
                            className="w-full h-full border-0 pointer-events-none lg:pointer-events-auto"
                            allow="autoplay"
                            title="Google Drive Profile Viewer"
                          />
                        </div>
                      ) : (
                        <>
                          <Document
                              file={profileUrl}
                              onLoadSuccess={onDocumentLoadSuccess}
                              className="flex justify-center w-full"
                              loading={
                                <div className="py-20 flex flex-col items-center gap-4">
                                  <div className="w-10 h-10 border-4 border-red-200 border-t-red-600 rounded-full animate-spin"></div>
                                  <p className="text-gray-500 font-medium">Đang tải hồ sơ năng lực...</p>
                                </div>
                              }
                          >
                              <Page 
                                  pageNumber={pageNumber} 
                                  renderTextLayer={false}
                                  renderAnnotationLayer={false}
                                  className="shadow-xl rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl max-w-full"
                                  width={Math.min(window.innerWidth * 0.8, 450)}
                              />
                          </Document>
                          
                          {numPages > 1 && (
                            <div className="flex items-center justify-center gap-4 sm:gap-6 mt-8 bg-white px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-md border border-gray-100">
                              <button 
                                  onClick={() => setPageNumber(prev => Math.max(prev - 1, 1))}
                                  disabled={pageNumber <= 1}
                                  className="p-1 sm:p-2 rounded-full hover:bg-gray-100 text-gray-700 disabled:opacity-30 transition-colors"
                              >
                                  <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
                              </button>
                              <span className="text-sm font-bold text-gray-800 min-w-[80px] sm:min-w-[100px] text-center">
                                  Trang {pageNumber} / {numPages}
                              </span>
                              <button 
                                  onClick={() => setPageNumber(prev => Math.min(prev + 1, numPages))}
                                  disabled={pageNumber >= numPages}
                                  className="p-1 sm:p-2 rounded-full hover:bg-gray-100 text-gray-700 disabled:opacity-30 transition-colors"
                              >
                                  <ChevronRight size={20} className="sm:w-6 sm:h-6" />
                              </button>
                            </div>
                          )}
                        </>
                      )}
                      
                      {/* BIG MOBILE BUTTON UNDERNEATH */}
                      {profileUrl && (
                        <div className="w-full mt-6 block md:hidden">
                          <button
                            onClick={() => window.open(profileUrl, '_blank')}
                            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm uppercase tracking-wider"
                          >
                            <ExternalLink size={18} />
                            {isGoogleDriveLink(profileUrl) ? "Mở xem trên Google Drive" : "Mở xem tài liệu"}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
            </section>
        <section data-aos="fade-up" className="bg-red-700 container-app  text-center text-white">
        <div className="mx-auto px-6 py-15 ">
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
                    hover:bg-white/10 
                    "
                >
                    <Download size={18} />
                    Tải hồ sơ năng lực
                </a>
                </div>
        </div>
      </section>

      {openPdf && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-6xl h-[90vh] flex flex-col overflow-hidden shadow-2xl relative">
            <div className="flex items-center justify-between px-5 py-4 border-b">
              <h3 className="font-bold text-lg">Hồ Sơ Năng Lực</h3>
              <button 
                onClick={() => setOpenPdf(false)} 
                onTouchEnd={(e) => { e.preventDefault(); setOpenPdf(false); }}
                className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 bg-gray-100 overflow-y-auto flex flex-col items-center py-4">
              <Document
                  file="/Profile.pdf"
                  onLoadSuccess={onDocumentLoadSuccess}
                  className="flex justify-center"
                  loading={<div className="py-10">Đang tải tài liệu...</div>}
              >
                  <Page 
                      pageNumber={pageNumber} 
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                      className="shadow-sm max-w-full"
                      width={Math.min(window.innerWidth * 0.85, 400)}
                  />
              </Document>
            </div>

            <div className="border-t bg-white p-4 grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
              <div className="hidden sm:block"></div>
              <div className="flex items-center justify-center gap-4">
                {numPages > 1 && (
                  <>
                    <button 
                        onClick={() => setPageNumber(prev => Math.max(prev - 1, 1))}
                        disabled={pageNumber <= 1}
                        className="p-2 rounded-full border hover:bg-gray-50 disabled:opacity-50"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <span className="text-sm font-medium whitespace-nowrap">
                        Trang {pageNumber} / {numPages}
                    </span>
                    <button 
                        onClick={() => setPageNumber(prev => Math.min(prev + 1, numPages))}
                        disabled={pageNumber >= numPages}
                        className="p-2 rounded-full border hover:bg-gray-50 disabled:opacity-50"
                    >
                        <ChevronRight size={20} />
                    </button>
                  </>
                )}
              </div>
              
              <div className="flex items-center justify-center sm:justify-end gap-3">
                <button 
                  onClick={() => setOpenPdf(false)} 
                  onTouchEnd={(e) => { e.preventDefault(); setOpenPdf(false); }}
                  className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 font-medium whitespace-nowrap cursor-pointer"
                >
                  Đóng
                </button>
                <a href="/Profile.pdf" download="Ho-so-nang-luc-Thinh-Phong-Do.pdf" className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium flex items-center gap-2 whitespace-nowrap">
                  <Download size={16} />
                  Tải xuống
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

            <Footer />
        </div>
    )
}