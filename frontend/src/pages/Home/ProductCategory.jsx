import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../../services/categoryService";
import { LoaderCircle } from "lucide-react";

const ProductCategory = () => {
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
    });
    }, []);
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
        <div className="text-center">
            {/* Tabs */}
            <div className="hidden lg:flex mb-10 flex-wrap justify-center gap-4">
                {category.map((p, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`
                            px-6 py-2 rounded-3xl border  transition
                            ${i === current
                                ? "bg-red-600 text-white border-red-600"
                                : "bg-white text-black hover:bg-gray-100 border-gray-300"
                            }
            `}
                    >
                        {p.name}
                    </button>
                ))}
            </div>

            {/* Slider */}
            <div className="relative">
                {/* Mobile */}
                <div className="lg:hidden grid grid-cols-1 gap-4">
                    {category.map((product, idx) => (
                        <div
                            key={product._id}
                            data-aos="fade-up"
                            data-aos-delay={idx * 100}
                            className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm group"
                        >
                            <div className="overflow-hidden h-52">
                                <img
                                    src={product.imageUrl}
                                    alt={product.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>

                            <div className="p-5 text-left">
                                <p className="font-semibold text-gray-800 mb-1">
                                    {product.name}
                                </p>

                                <p className="text-sm text-gray-500 mb-3 leading-relaxed">
                                    {product.description}
                                </p>

                                <Link
                                    to={`/products?category=${product.slug}`}
                                    className="text-sm font-medium text-red-600 hover:underline"
                                >
                                    Xem chi tiết
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Desktop */}
                <div className="hidden lg:flex items-center justify-center gap-8">
                    <button
                        onClick={handleBack}
                        className="w-12 h-12 rounded-full border border-gray-200 
                        hover:bg-red-600 hover:text-white transition"
                    >
                        ←
                    </button>

                    {/* Left */}
                    <div data-aos="fade-up" data-aos-delay="0" className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm group w-80 opacity-70">
                        <div className="overflow-hidden h-53">
                            <img
                                src={category[left].imageUrl}
                                alt={category[left].name}
                                className="w-full h-full object-cover 
                                group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>

                        <div className="p-5 text-left">
                            <p className="font-semibold text-gray-800 mb-1">
                                {category[left].name}
                            </p>

                            <p className="text-sm text-gray-500 mb-3 leading-relaxed">
                                {category[left].description}
                            </p>

                            <Link
                                to={`/products?category=${category[left].slug}`}
                                className="text-sm font-medium text-red-600 hover:underline"
                            >
                                Xem chi tiết
                            </Link>
                        </div>
                    </div>

                    {/* Center */}
                    <div
                        data-aos="fade-up" data-aos-delay="100"
                        className="
                            bg-white rounded-2xl overflow-hidden
                            border border-gray-100 shadow-lg
                            group w-80 scale-105
                        "
                    >
                        <div className="overflow-hidden h-56">
                            <img
                                src={category[current].imageUrl}
                                alt={category[current].name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>

                        <div className="p-5 text-left">
                            <p className="font-semibold text-gray-800 mb-1">
                                {category[current].name}
                            </p>

                            <p className="text-sm text-gray-500 mb-3 leading-relaxed">
                                {category[current].description}
                            </p>

                            <Link
                                to={`/products?category=${category[current].slug}`}
                                className="text-sm font-medium text-red-600 hover:underline"
                            >
                                Xem chi tiết
                            </Link>
                        </div>
                    </div>

                    {/* Right */}
                    <div data-aos="fade-up" data-aos-delay="200" className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm group w-80 opacity-70">
                        <div className="overflow-hidden h-53">
                            <img
                                src={category[right].imageUrl}
                                alt={category[right].name}
                                className="w-full h-full object-cover 
                                group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>

                        <div className="p-5 text-left">
                            <p className="font-semibold text-gray-800 mb-1">
                                {category[right].name}
                            </p>

                            <p className="text-sm text-gray-500 mb-3 leading-relaxed">
                                {category[right].description}
                            </p>

                            <Link
                                to={`/products?category=${category[right].slug}`}
                                className="text-sm font-medium text-red-600 hover:underline"
                            >
                                Xem chi tiết
                            </Link>
                        </div>
                    </div>


                    <button
                        onClick={handleNext}
                        className="w-12 h-12 rounded-full border border-gray-200 hover:bg-red-600 hover:text-white transition"
                    >
                        →
                    </button>
                </div>
            </div>

        </div>
    );
};

export default ProductCategory;
