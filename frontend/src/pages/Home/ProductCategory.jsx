import React, { useState } from "react";
import { Link } from "react-router-dom";

import COMNAM from "../../assets/imgs/comNam.png";
import SANDWICH from "../../assets/imgs/sandwich.png";
import KIMBAP from "../../assets/imgs/KIMBAP.png";
import TRASUA from "../../assets/imgs/traSua.png";

const ProductCategory = () => {
    const [products] = useState([
        { id: 1, name: "Cơm nắm", image: COMNAM, desc: "Dòng sản phẩm chủ lực với nhiều hương vị đặc trưng." },
        { id: 2, name: "Cơm cuộn", image: KIMBAP, desc: "Sự kết hợp hào giữa cơm và các loại nhân tươi." },
        { id: 3, name: "Sandwich", image: SANDWICH, desc: "Bánh mì kẹp nhân đa dạng, tiện lợi cho bữa sáng và giải lao." },
        { id: 4, name: "Trà sữa", image: TRASUA, desc: "Thức uống giải nhiệt yêu thích của giới trẻ và học sinh." },
    ]);

    const [current, setCurrent] = useState(0);

    const len = products.length;
    const left = (current - 1 + len) % len;
    const right = (current + 1) % len;

    const handleNext = () => {
        setCurrent((prev) => (prev + 1) % len);
    };

    const handleBack = () => {
        setCurrent((prev) => (prev - 1 + len) % len);
    };

    return (
        <div className="text-center">
            {/* Tabs */}
            <div className="hidden md:flex mb-10 flex-wrap justify-center gap-4">
                {products.map((p, i) => (
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
                <div className="md:hidden grid grid-cols-1 gap-4">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm group"
                        >
                            <div className="overflow-hidden h-52">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>

                            <div className="p-5 text-left">
                                <p className="font-semibold text-gray-800 mb-1">
                                    {product.name}
                                </p>

                                <p className="text-sm text-gray-500 mb-3 leading-relaxed">
                                    {product.desc}
                                </p>

                                <Link
                                    to={`/products/${product.id}`}
                                    className="text-sm font-medium text-red-600 hover:underline"
                                >
                                    Xem chi tiết
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Desktop */}
                <div className="hidden md:flex items-center justify-center gap-8">
                    <button
                        onClick={handleBack}
                        className="w-12 h-12 rounded-full border border-gray-200 hover:bg-red-600 hover:text-white transition"
                    >
                        ←
                    </button>

                    {/* Left */}
                    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm group w-80 opacity-70">
                        <div className="overflow-hidden h-48">
                            <img
                                src={products[left].image}
                                alt={products[left].name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>

                        <div className="p-5 text-left">
                            <p className="font-semibold text-gray-800 mb-1">
                                {products[left].name}
                            </p>

                            <p className="text-sm text-gray-500 mb-3 leading-relaxed">
                                {products[left].desc}
                            </p>

                            <Link
                                to={`/products/${products[left].id}`}
                                className="text-sm font-medium text-red-600 hover:underline"
                            >
                                Xem chi tiết
                            </Link>
                        </div>
                    </div>

                    {/* Center */}
                    <div
                        className="
                            bg-white rounded-2xl overflow-hidden
                            border border-gray-100 shadow-lg
                            group w-80 scale-105
                        "
                    >
                        <div className="overflow-hidden h-56">
                            <img
                                src={products[current].image}
                                alt={products[current].name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>

                        <div className="p-5 text-left">
                            <p className="font-semibold text-gray-800 mb-1">
                                {products[current].name}
                            </p>

                            <p className="text-sm text-gray-500 mb-3 leading-relaxed">
                                {products[current].desc}
                            </p>

                            <Link
                                to={`/products/${products[current].id}`}
                                className="text-sm font-medium text-red-600 hover:underline"
                            >
                                Xem chi tiết
                            </Link>
                        </div>
                    </div>

                    {/* Right */}
                    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm group w-80 opacity-70">
                        <div className="overflow-hidden h-56">
                            <img
                                src={products[right].image}
                                alt={products[right].name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>

                        <div className="p-5 text-left">
                            <p className="font-semibold text-gray-800 mb-1">
                                {products[right].name}
                            </p>

                            <p className="text-sm text-gray-500 mb-3 leading-relaxed">
                                {products[right].desc}
                            </p>

                            <Link
                                to={`/products/${products[right].id}`}
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
