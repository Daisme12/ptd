import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { ShieldCheck, Award, Clock, Download, BadgeCheck, FileText, Globe, Leaf, X, Eye, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import bgCertificate from '../../assets/imgs/bgCertificate.webp';
import chungChi from '../../assets/imgs/dongGoi.webp';
import soChe from '../../assets/imgs/soChe.webp';

import { documents } from '../../data/documents.jsx';

export default function QualityPage() {
    const [open, setOpen] = useState(false);
    const [selectedPdf, setSelectedPdf] = useState("");
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setPageNumber(1);
    }

    return (
        <div className="bg-white">
            <Header solid />

            {/* ── 1. Hero Banner ── */}
            <div className="relative w-full h-[450px] lg:h-[550px] overflow-hidden bg-slate-950">
                <img loading="lazy" src={bgCertificate}
                    alt="banner"
                    className="absolute inset-0 w-full h-full object-cover scale-105 opacity-60"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-900/50 to-slate-950"></div>

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10 pt-16">
                    <span data-aos="fade-down" className="px-5 py-2 rounded-full bg-red-600/20 border border-red-500/30 text-red-400 text-xs font-bold tracking-[0.2em] uppercase mb-6 backdrop-blur-md">
                        Chất Lượng Quốc Tế
                    </span>
                    <h1 data-aos="fade-up" className="text-white text-4xl lg:text-6xl font-black mb-6 drop-shadow-2xl max-w-4xl leading-tight">
                        Cam Kết Chất Lượng & <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-400">An Toàn Tuyệt Đối</span>
                    </h1>
                    <p data-aos="fade-up" data-aos-delay="100" className="text-gray-300 text-base lg:text-xl max-w-2xl leading-relaxed">
                        Chúng tôi không chỉ cung cấp thực phẩm, chúng tôi trao gửi sự an tâm thông qua các tiêu chuẩn kiểm định khắt khe nhất thế giới.
                    </p>
                </div>
            </div>

            {/* ── 2. Floating Stats ── */}
            <div className="relative z-20 px-4 -mt-16 lg:-mt-20 mb-16">
                <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-6 lg:p-8 border border-gray-100">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center lg:divide-x divide-gray-100">
                        {[
                            { icon: ShieldCheck, value: '100%', label: 'Nguyên liệu sạch' },
                            { icon: Award, value: '05+', label: 'Năm kinh nghiệm' },
                            { icon: Clock, value: '24/7', label: 'Kiểm soát quy trình' },
                            { icon: BadgeCheck, value: 'ISO', label: 'Đạt chuẩn 22000' },
                        ].map(({ icon: Icon, value, label }, index) => (
                            <div data-aos="zoom-in" data-aos-delay={index * 100} key={label} className="flex flex-col items-center gap-2">
                                <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-red-600 mb-1">
                                    <Icon size={24} strokeWidth={2} />
                                </div>
                                <p className="text-2xl lg:text-3xl font-black text-gray-900">{value}</p>
                                <p className="text-xs lg:text-sm text-gray-500 font-bold uppercase tracking-wide">{label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── 3. Chứng Nhận Quốc Tế (ISO) ── */}
            <div className="py-20 px-4 bg-slate-50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-600/5 rounded-full blur-[100px] pointer-events-none"></div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div data-aos="fade-up" className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-4">
                            CHỨNG NHẬN QUỐC TẾ
                        </h2>
                        <div className="w-16 h-1.5 bg-red-600 mx-auto rounded-full" />
                        <p className="mt-4 text-gray-500 max-w-2xl mx-auto text-lg">Sự bảo chứng cao nhất cho hệ thống quản lý chất lượng và an toàn thực phẩm.</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
                        {[
                            {
                                img: soChe,
                                title: 'ISO 22000:2018 - Chế Biến Thực Phẩm',
                                desc: 'Hệ thống quản lý an toàn thực phẩm đối với hoạt động sản xuất và chế biến.',
                                pdf: '/ISO_Chếbiến.pdf'
                            },
                            {
                                img: chungChi,
                                title: 'ISO 22000:2018 - Bảo Quản & Đóng Gói',
                                desc: 'Hệ thống quản lý an toàn thực phẩm đối với hoạt động bảo quản, san lẻ và đóng gói.',
                                pdf: '/ISO_Sơchế.pdf'
                            }
                        ].map(({ img, title, desc, pdf }, index) => (
                            <div
                                data-aos="fade-up" data-aos-delay={index * 150}
                                key={title}
                                className="group bg-white rounded-3xl p-5 lg:p-6 shadow-lg hover:shadow-xl border border-gray-100 flex flex-col sm:flex-row gap-6 items-center transition-all duration-300 relative overflow-hidden"
                            >
                                <div className="relative shrink-0">
                                    <img loading="lazy" src={img} alt={title} className="w-28 lg:w-32 object-cover rounded-xl shadow-[0_10px_20px_rgb(220,38,38,0.1)] group-hover:scale-105 transition-transform duration-500 relative z-10" />
                                </div>

                                <div className="flex-1 relative z-10 text-center sm:text-left">
                                    <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2 leading-snug">{title}</h3>
                                    <p className="text-gray-500 leading-relaxed mb-4 text-sm">{desc}</p>

                                    <button
                                        onClick={() => { setOpen(true); setSelectedPdf(pdf); }}
                                        className="inline-flex items-center justify-center sm:justify-start gap-2 px-5 py-2.5 bg-red-50 text-red-600 rounded-lg text-sm font-bold hover:bg-red-600 hover:text-white transition-all duration-300 group/btn w-full sm:w-auto"
                                    >
                                        <FileText size={16} />
                                        <span>Xem chi tiết</span>
                                        <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── 4. Chứng Nhận Cơ Sở & Nội Địa ── */}
            <div className="py-24 px-4 bg-white relative">
                <div className="max-w-7xl mx-auto">
                    <div data-aos="fade-up" className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-4">
                            TIÊU CHUẨN NỘI ĐỊA
                        </h2>
                        <div className="w-16 h-1.5 bg-red-600 mx-auto rounded-full" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: ShieldCheck,
                                title: 'An Toàn Thực Phẩm',
                                desc: 'Giấy chứng nhận cơ sở đủ điều kiện an toàn thực phẩm, tuân thủ nghiêm ngặt các quy định của nhà nước.'
                            },
                            {
                                icon: Leaf,
                                title: 'Nguồn Gốc Minh Bạch',
                                desc: 'Nguyên liệu từ các nhà cung cấp uy tín, có hồ sơ truy xuất nguồn gốc rõ ràng và kiểm soát đầu vào.'
                            },
                            {
                                icon: Globe,
                                title: 'Kiểm Soát Quy Trình',
                                desc: 'Sản xuất, sơ chế, đóng gói và bảo quản được kiểm soát chặt chẽ nhằm đảm bảo chất lượng đồng nhất.'
                            }
                        ].map(({ icon: Icon, title, desc }, index) => (
                            <div
                                data-aos="fade-up" data-aos-delay={index * 100}
                                key={title}
                                className="bg-red-50/50 rounded-[2rem] p-8 lg:p-10 text-center flex flex-col items-center group hover:bg-red-50 hover:shadow-[0_15px_40px_rgba(220,38,38,0.08)] border border-transparent hover:border-red-200 transition-all duration-500 relative overflow-hidden"
                            >
                                <div className="w-20 h-20 rounded-2xl bg-white shadow-md flex items-center justify-center mb-6 group-hover:bg-red-600 group-hover:-translate-y-2 transition-all duration-500 relative z-10">
                                    <Icon size={32} className="text-red-600 group-hover:text-white relative z-10 transition-colors duration-500" strokeWidth={2} />
                                </div>
                                <h3 className="font-extrabold text-xl text-gray-900 mb-3 relative z-10">{title}</h3>
                                <p className="text-gray-600 leading-relaxed text-sm relative z-10">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── 5. Hồ Sơ & Giấy Tờ (Digital Vault) ── */}
            <div className="py-24 px-4 bg-slate-50 relative overflow-hidden border-t border-gray-100">
                <div className="absolute bottom-0 left-0 w-full h-[500px] bg-gradient-to-t from-red-600/5 to-transparent pointer-events-none"></div>
                <div className="max-w-4xl mx-auto relative z-10">
                    <div data-aos="fade-up" className="text-center mb-16">
                        <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-4">
                            KHO LƯU TRỮ TÀI LIỆU
                        </h2>
                        <div className="w-16 h-1.5 bg-red-600 mx-auto rounded-full" />
                        <p className="mt-4 text-gray-500 text-lg">Hệ thống hồ sơ năng lực và các giấy tờ minh bạch luôn sẵn sàng.</p>
                    </div>

                    <div className="space-y-4">
                        {documents.map((doc, idx) => (
                            <div
                                data-aos="fade-right" data-aos-delay={idx * 100}
                                key={doc.id}
                                className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-red-200 px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between transition-all duration-300 hover:translate-x-2"
                            >
                                <div className="flex items-center gap-5 mb-5 sm:mb-0 w-full sm:w-auto">
                                    <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center shrink-0 group-hover:bg-red-600 group-hover:shadow-[0_0_20px_rgba(220,38,38,0.3)] transition-all duration-300">
                                        <FileText className="text-red-600 group-hover:text-white transition-colors" size={24} />
                                    </div>
                                    <span className="font-bold text-gray-800 text-lg">
                                        {doc.name}
                                    </span>
                                </div>

                                <div className="flex gap-3 w-full sm:w-auto">
                                    <button
                                        onClick={() => { setSelectedPdf(doc.pdf); setOpen(true); }}
                                        className="flex-1 sm:flex-none px-6 py-3 bg-slate-100 hover:bg-slate-200 text-gray-700 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors"
                                    >
                                        <Eye size={18} />
                                        <span>Xem</span>
                                    </button>

                                    <a
                                        href={doc.pdf}
                                        download
                                        className="flex-1 sm:flex-none px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-red-600/20 hover:shadow-lg hover:-translate-y-0.5"
                                    >
                                        <Download size={18} />
                                        <span>Tải về</span>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-28 relative max-w-3xl mx-auto group">
                        {/* Các lớp layer xếp chồng phía sau (Stacked Layers - Xoè như bộ bài khi Hover) */}
                        <div className="absolute inset-0 bg-red-100 rounded-[3rem] -z-20 transition-all duration-500 origin-center group-hover:-rotate-3 group-hover:scale-[1.02] border border-red-200"></div>
                        <div className="absolute inset-0 bg-red-50 rounded-[3rem] -z-10 transition-all duration-500 origin-center group-hover:rotate-3 group-hover:scale-[1.02] border border-red-100"></div>
                        
                        {/* Glow phát sáng */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[150%] bg-red-600/5 blur-[100px] -z-30 rounded-full pointer-events-none"></div>

                        <div className="w-full text-center p-10 lg:p-14 bg-white rounded-[3rem] shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-red-50 relative overflow-hidden z-10">
                            <div className="absolute -top-20 -right-20 w-64 h-64 bg-red-50 rounded-full blur-3xl pointer-events-none"></div>
                            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-slate-50 rounded-full blur-3xl pointer-events-none"></div>
                            
                            <h3 className="text-2xl lg:text-3xl font-black text-gray-900 mb-4 relative z-10">Khám Phá Sản Phẩm Sạch</h3>
                            <p className="text-gray-500 max-w-xl mx-auto mb-10 relative z-10 text-lg leading-relaxed">
                                Tất cả sản phẩm được sản xuất theo quy trình đạt chuẩn ISO 22000:2018, đảm bảo chất lượng và an toàn tuyệt đối.
                            </p>
                            <Link
                                to="/products"
                                className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-2xl hover:from-red-700 hover:to-red-600 transition-all duration-300 font-bold text-lg relative z-10 shadow-[0_10px_30px_rgba(220,38,38,0.3)] hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(220,38,38,0.4)]"
                            >
                                Đến trang Sản Phẩm <ArrowRight size={20} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── 6. CTA Banner (Red) ── */}
            <div data-aos="fade-up" className="bg-gradient-to-r from-red-700 to-red-500 py-16 px-4 text-center border-t border-red-800/30 shadow-inner">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-white text-3xl lg:text-4xl font-bold mb-6">
                        Tin Tưởng Vào Sự Chuyên Nghiệp Của Chúng Tôi
                    </h2>
                    <p className="text-red-100 text-base lg:text-lg mb-8 max-w-2xl mx-auto">
                        Hãy liên hệ ngay để nhận báo giá chi tiết và tư vấn giải pháp cung ứng thực phẩm toàn diện.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <a
                            href="/Profile.pdf"
                            download="Ho-so-nang-luc-Thinh-Phong-Do.pdf"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-all duration-300"
                        >
                            <Download size={18} />
                            Tải hồ sơ năng lực
                        </a>
                        <a
                            href="tel:0385540512"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-red-700 font-bold px-8 py-3.5 rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-lg"
                        >
                            📞 038.554.0512
                        </a>
                    </div>
                </div>
            </div>

            {/* ── 7. PDF Modal ── */}
            {open && (
                <div
                    className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                    onClick={() => setOpen(false)}
                >
                    <div
                        className="bg-white rounded-[2rem] w-full max-w-5xl h-[90vh] relative shadow-2xl overflow-hidden flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header Modal */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white">
                            <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                                <FileText className="text-red-600" size={20} /> Chi tiết văn bản
                            </h3>
                            <button
                                onClick={() => setOpen(false)}
                                className="bg-gray-100 hover:bg-red-100 hover:text-red-600 text-gray-500 rounded-full p-2 transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Content Modal */}
                        <div className="flex-1 overflow-y-auto bg-gray-50/50 flex justify-center py-8 px-4">
                            {selectedPdf && (
                                <Document
                                    file={selectedPdf}
                                    onLoadSuccess={onDocumentLoadSuccess}
                                    className="flex flex-col items-center gap-4"
                                    loading={
                                        <div className="flex items-center justify-center h-full gap-3 text-red-600 font-medium">
                                            <div className="w-6 h-6 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                                            Đang tải tài liệu...
                                        </div>
                                    }
                                >
                                    <Page
                                        pageNumber={pageNumber}
                                        renderTextLayer={false}
                                        renderAnnotationLayer={false}
                                        className="shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-xl overflow-hidden bg-white max-w-full"
                                        width={Math.min(window.innerWidth * 0.85, 800)}
                                    />
                                </Document>
                            )}
                        </div>

                        {/* Footer Modal */}
                        <div className="border-t border-gray-100 bg-white p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="w-full sm:w-1/3 flex justify-start">
                                {/* Dành cho khoảng trống */}
                            </div>
                            
                            <div className="w-full sm:w-1/3 flex items-center justify-center gap-4 bg-slate-50 px-4 py-2 rounded-xl">
                                {numPages > 1 && (
                                    <>
                                        <button
                                            onClick={() => setPageNumber(prev => Math.max(prev - 1, 1))}
                                            disabled={pageNumber <= 1}
                                            className="p-2 rounded-lg bg-white shadow-sm border border-gray-200 hover:bg-gray-50 disabled:opacity-50 transition-all"
                                        >
                                            <ChevronLeft size={20} />
                                        </button>
                                        <span className="text-sm font-bold text-gray-700 whitespace-nowrap">
                                            Trang {pageNumber} / {numPages}
                                        </span>
                                        <button
                                            onClick={() => setPageNumber(prev => Math.min(prev + 1, numPages))}
                                            disabled={pageNumber >= numPages}
                                            className="p-2 rounded-lg bg-white shadow-sm border border-gray-200 hover:bg-gray-50 disabled:opacity-50 transition-all"
                                        >
                                            <ChevronRight size={20} />
                                        </button>
                                    </>
                                )}
                            </div>

                            <div className="w-full sm:w-1/3 flex items-center justify-center sm:justify-end gap-3">
                                <button onClick={() => setOpen(false)} className="px-6 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold transition-colors w-full sm:w-auto">
                                    Đóng
                                </button>
                                <a href={selectedPdf} download className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-red-600/30 w-full sm:w-auto">
                                    <Download size={18} />
                                    Tải xuống
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
            <Footer />
        </div>
    );
}