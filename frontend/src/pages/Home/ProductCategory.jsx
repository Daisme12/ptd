import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../../services/categoryService";
import { LoaderCircle, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

const ProductCategory = ({ onDataLoaded }) => {
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [current, setCurrent] = useState(0);

    const len = category.length;
    const left = (current - 1 + len) % len;
    const right = (current + 1) % len;

    const handleNext = () => {
        setCurrent((prev) => (prev + 1) % len);
    };

    const handleBack = () => {
        setCurrent((prev) => (prev - 1 + len) % len);
    };

    useEffect(() => {
        getCategories()
        .then((data) => {
            console.log(data);
            setCategory(data);
        })
        .catch((error) => {
            console.error("Lỗi lấy danh mục:", error);
            setError("Không thể kết nối tới máy chủ");
        })
        .finally(() => {
            setLoading(false);
            if (onDataLoaded) onDataLoaded();
    });
    }, [onDataLoaded]);
    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
            <LoaderCircle className="w-10 h-10 text-red-600 animate-spin" />
            </div>
        );
    }
    if (error) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
            <p className="text-red-600 font-semibold">
                {error}
            </p>

            <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
            >
                Thử lại
            </button>
            </div>
        );
        }

    return (
        <div className="w-full">
            {/* ── DESKTOP & TABLET: 3D Cover Flow Carousel ── */}
            <div className="hidden md:flex flex-col items-center w-full max-w-7xl mx-auto">
                {/* Tabs Điều Hướng Ở Trên Đầu */}
                <div className="p-1.5 bg-gray-100/80 backdrop-blur-sm rounded-full overflow-hidden shadow-inner border border-gray-200/50 inline-flex z-5">
                    {category.map((p, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrent(i)}
                            className={`
                                relative px-8 py-3 rounded-full text-sm font-bold transition-all duration-300
                                ${i === current
                                    ? "bg-white text-red-600 shadow-[0_4px_20px_rgb(0,0,0,0.08)]"
                                    : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
                                }
                            `}
                        >
                            {p.name}
                            {i === current && (
                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-red-600 rounded-full"></div>
                            )}
                        </button>
                    ))}
                </div>

                <div className="relative w-full h-[600px] flex items-center justify-center" style={{ perspective: '1200px' }}>
                    
                    {/* Nút lùi */}
                    <button
                        onClick={handleBack}
                        className="absolute left-4 lg:left-16 z-50 w-14 h-14 bg-white/80 backdrop-blur-md rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-gray-600 hover:text-red-600 hover:scale-110 hover:bg-white transition-all duration-300 focus:outline-none"
                    >
                        <ChevronLeft size={28} />
                    </button>

                    {/* Cover Flow Cards */}
                    {category.map((cat, idx) => {
                        const len = category.length;
                        let offset = (idx - current) % len;
                        if (offset > Math.floor(len / 2)) offset -= len;
                        else if (offset < -Math.floor(len / 2)) offset += len;

                        const isCurrent = offset === 0;
                        const isVisible = Math.abs(offset) <= 1;

                        return (
                            <div 
                                key={cat._id}
                                onClick={() => setCurrent(idx)}
                                className={`absolute top-1/2 left-1/2 w-[280px] lg:w-[360px] rounded-[2rem] bg-white shadow-2xl overflow-hidden cursor-pointer group transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] border border-gray-100`}
                                style={{
                                    transform: `translate(-50%, -50%) translateX(${offset * 90}%) scale(${isCurrent ? 1 : 0.85}) rotateY(${offset * -35}deg)`,
                                    zIndex: 50 - Math.abs(offset),
                                    opacity: isVisible ? 1 : 0,
                                    pointerEvents: isVisible ? 'auto' : 'none'
                                }}
                            >
                                {/* Hình ảnh */}
                                <div className="h-[220px] lg:h-[260px] relative overflow-hidden bg-gray-100">
                                    <div className={`absolute inset-0 bg-black transition-opacity duration-700 z-10 ${isCurrent ? 'opacity-0' : 'opacity-20 group-hover:opacity-10'}`}></div>
                                    <img 
                                        src={cat.imageUrl} 
                                        alt={cat.name}
                                        className={`w-full h-full object-cover transition-transform duration-700 ease-out ${isCurrent ? 'scale-105' : 'scale-100'}`}
                                    />
                                </div>

                                {/* Nội dung */}
                                <div className="p-6 lg:p-8 text-left bg-white relative z-20">
                                    <h4 className={`font-extrabold text-xl lg:text-2xl text-gray-900 mb-3 transition-colors duration-300 ${isCurrent ? 'text-red-600' : 'group-hover:text-red-500'}`}>
                                        {cat.name}
                                    </h4>
                                    <p className="text-gray-500 text-sm lg:text-base line-clamp-2 mb-6 leading-relaxed">
                                        {cat.description}
                                    </p>
                                    
                                    <div className={`transition-all duration-500 transform ${isCurrent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                                        <Link
                                            to={`/products?category=${cat.slug}`}
                                            className="inline-flex items-center justify-center gap-2 w-full bg-red-50 text-red-600 hover:bg-red-600 hover:text-white px-6 py-3.5 rounded-xl font-bold transition-colors group/link"
                                        >
                                            Khám phá ngay
                                            <ArrowRight size={18} className="transition-transform group-hover/link:translate-x-1" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {/* Nút tiến */}
                    <button
                        onClick={handleNext}
                        className="absolute right-4 lg:right-16 z-50 w-14 h-14 bg-white/80 backdrop-blur-md rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-gray-600 hover:text-red-600 hover:scale-110 hover:bg-white transition-all duration-300 focus:outline-none"
                    >
                        <ChevronRight size={28} />
                    </button>
                </div>
            </div>

            {/* ── MOBILE: Horizontal Swipe Carousel (Native CSS Snap) ── */}
            <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory gap-5 pb-8 -mx-4 px-4 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                <style>{`
                    .scrollbar-hide::-webkit-scrollbar {
                        display: none;
                    }
                `}</style>
                {category.map((cat, idx) => (
                    <div 
                        key={cat._id}
                        data-aos="fade-up"
                        data-aos-delay={idx * 100}
                        className="snap-center shrink-0 w-[85vw] bg-white rounded-[2rem] overflow-hidden shadow-xl border border-gray-100 flex flex-col relative"
                    >
                        <div className="h-64 relative overflow-hidden">
                            <img 
                                src={cat.imageUrl} 
                                alt={cat.name}
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                            <h4 className="absolute bottom-5 left-5 text-2xl font-black text-white drop-shadow-md">
                                {cat.name}
                            </h4>
                        </div>
                        <div className="p-6 flex flex-col flex-1 bg-white relative z-10">
                            <p className="text-gray-500 text-sm mb-6 line-clamp-3 leading-relaxed">
                                {cat.description}
                            </p>
                            <Link
                                to={`/products?category=${cat.slug}`}
                                className="inline-flex items-center justify-center gap-2 w-full bg-red-50 text-red-600 hover:bg-red-600 hover:text-white px-6 py-4 rounded-xl font-bold transition-colors mt-auto"
                            >
                                Khám phá ngay
                                <ArrowRight size={18} />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default ProductCategory;
