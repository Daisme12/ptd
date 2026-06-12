import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import bgContact from '../../assets/imgs/bgContact.png';

const ProductPage = () => {
  const [products] = useState([
    {
      id: 1,
      name: "Cơm Nắm Cá Ngừ",
      image:
        "https://images.unsplash.com/photo-1579871494447-9811cf80d66c",
      desc: "Nhân cá ngừ đậm đà, phù hợp cho bữa ăn nhanh.",
    },
    {
      id: 2,
      name: "Cơm Nắm Thịt Kho",
      image:
        "https://images.unsplash.com/photo-1553621042-f6e147245754",
      desc: "Hương vị truyền thống được nhiều khách hàng yêu thích.",
    },
    {
      id: 3,
      name: "Cơm Nắm Cá Hồi",
      image:
        "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f",
      desc: "Nguyên liệu tươi ngon và giàu dinh dưỡng.",
    },
    {
      id: 4,
      name: "Cơm Cuộn Xúc Xích",
      image:
        "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351",
      desc: "Món ăn tiện lợi cho học sinh và nhân viên văn phòng.",
    },
    {
      id: 5,
      name: "Cơm Nắm Kim Chi",
      image:
        "https://images.unsplash.com/photo-1607301405390-d831c242f59b",
      desc: "Hương vị Hàn Quốc hấp dẫn.",
    },
    {
      id: 6,
      name: "Cơm Nắm Trứng Muối",
      image:
        "https://images.unsplash.com/photo-1512058564366-18510be2db19",
      desc: "Béo ngậy và đậm vị.",
    },
  ]);

  return (
    <>
      <Header />

      {/* Hero */}
      <section className="relative h-[460px]"
              style={{
                backgroundImage:
                  `url(${bgContact})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}>
        
         <div className="absolute inset-0 bg-black/60"></div>

        <div className="absolute bottom-0 container mx-auto px-4 ">
          <p className="text-sm text-gray-200 mb-2">
            TRANG CHỦ / DANH MỤC SẢN PHẨM
          </p>

          <h1 className="text-4xl font-bold text-red-500 mb-4">
            Thực Đơn Tươi Ngon & An Toàn
          </h1>

          <p className="max-w-2xl text-gray-200">
            Khám phá danh mục sản phẩm đa dạng được chế biến từ nguồn
            nguyên liệu sạch, đảm bảo tiêu chuẩn ISO cho mọi bữa ăn.
          </p>
        </div>
      </section>

      {/* Product Area */}
      <section className="bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-[260px_1fr] gap-8">

            {/* Sidebar */}
            <aside>
              <div className="bg-white rounded-xl shadow p-5">
                <h3 className="font-bold mb-4">
                  Danh Mục
                </h3>

                <div className="space-y-2">
                  <button className="w-full text-left px-4 py-3 bg-red-600 text-white rounded">
                    Cơm Nắm Việt
                  </button>

                  <button className="w-full text-left px-4 py-3 hover:bg-gray-100 rounded">
                    Cơm Cuộn
                  </button>

                  <button className="w-full text-left px-4 py-3 hover:bg-gray-100 rounded">
                    Sandwich
                  </button>

                  <button className="w-full text-left px-4 py-3 hover:bg-gray-100 rounded">
                    Trà Sữa
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow p-5 mt-6">
                <h4 className="font-semibold text-red-600 mb-3">
                  Cam Kết ISO 22000
                </h4>

                <p className="text-sm text-gray-600">
                  Mọi quy trình sản xuất đều được kiểm soát nghiêm ngặt.
                </p>
              </div>
            </aside>

            {/* Products */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <p className="text-sm text-gray-500">
                  Hiển thị 12 sản phẩm
                </p>

                <select className="border rounded px-3 py-2">
                  <option>Mặc định</option>
                  <option>Mới nhất</option>
                  <option>Tên A-Z</option>
                </select>
              </div>

              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-52 w-full object-cover"
                    />

                    <div className="p-4">
                      <h3 className="font-bold text-red-600 mb-2">
                        {item.name}
                      </h3>

                      <p className="text-sm text-gray-600 mb-4">
                        {item.desc}
                      </p>

                      <button className="w-full border border-red-600 text-red-600 py-2 rounded hover:bg-red-600 hover:text-white transition">
                        Xem chi tiết
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center gap-2 mt-10">
                <button className="w-10 h-10 border rounded">
                  1
                </button>

                <button className="w-10 h-10 border rounded">
                  2
                </button>

                <button className="w-10 h-10 border rounded">
                  3
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Section */}
      <section className="bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8">

            {/* Form */}
            <div className="bg-white shadow-xl rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-red-600 mb-4">
                Nhận Tư Vấn Đối Tác
              </h2>

              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Họ và tên"
                  className="w-full border rounded-lg p-3"
                />

                <input
                  type="text"
                  placeholder="Số điện thoại"
                  className="w-full border rounded-lg p-3"
                />

                <input
                  type="email"
                  placeholder="Email"
                  className="w-full border rounded-lg p-3"
                />

                <textarea
                  rows="5"
                  placeholder="Nội dung"
                  className="w-full border rounded-lg p-3"
                />

                <button className="w-full bg-red-600 text-white py-3 rounded-lg">
                  Gửi Yêu Cầu
                </button>
              </form>
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center">
              <span className="inline-block bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm mb-4 w-fit">
                HỢP TÁC BỀN VỮNG
              </span>

              <h2 className="text-5xl font-bold mb-6">
                Kết Nối Hệ Sinh Thái
                <br />
                Thực Phẩm Sạch
              </h2>

              <p className="text-gray-600 mb-8">
                Đồng hành cùng nhà cung cấp, trường học và doanh nghiệp
                nhằm xây dựng hệ sinh thái thực phẩm an toàn.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="border-l-4 border-red-600 pl-4">
                  <h3 className="text-4xl font-bold text-red-600">
                    500+
                  </h3>
                  <p>Điểm cung ứng</p>
                </div>

                <div className="border-l-4 border-yellow-500 pl-4">
                  <h3 className="text-4xl font-bold text-yellow-600">
                    24/7
                  </h3>
                  <p>Hỗ trợ đối tác</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default ProductPage;