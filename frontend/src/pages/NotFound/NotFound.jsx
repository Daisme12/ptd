import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const NotFound = () => {
  return (
    <div className="flex flex-col min-h-screen 
    bg-gray-900">

      {/* Background cho Header */}
      <div className=" bg-gray-900">
        <Header />
      </div>

      {/* Nội dung 404 */}
      <main className="flex-1 flex items-center my-40 justify-center px-6 py-20">
        <div className="text-center max-w-lg">
          <h1 className="text-8xl lg:text-9xl font-extrabold text-red-600">
            404
          </h1>

          <h2 className="mt-4 text-2xl lg:text-3xl font-bold text-gray-200">
            Trang không tồn tại
          </h2>

          <p className="mt-4 text-gray-400 leading-relaxed">
            Xin lỗi, trang bạn đang tìm kiếm có thể đã bị xóa,
            đổi tên hoặc hiện không khả dụng.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition"
            >
              Về trang chủ
            </Link>

            <button
              onClick={() => window.history.back()}
              className="px-6 py-3 border border-gray-300 text-gray-300 hover:text-red-600 rounded-lg font-medium hover:bg-gray-100 transition"
            >
              Quay lại
            </button>
          </div>
        </div>
      </main>

      <Footer/>
    </div>
  );
};

export default NotFound;