import React, { useState,useEffect,useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import bgProduct from '../../assets/imgs/bgProduct.webp';
import { getProducts, getProductById } from "../../services/productService";
import { getCategories } from "../../services/categoryService";
import { createContact } from "../../services/contactService";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";


  const ProductPage = () => {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const productGridRef = useRef(null);
    
    const [keyword, setKeyword] = useState("");
    const [sort, setSort] = useState("default");
    const [partnerForm, setPartnerForm] = useState({
      name: "",
      phone: "",
      email: "",
      service: "suat-an-truong-hoc",
      note: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const location = useLocation();

    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 9;

    const selectedCategory = new URLSearchParams(
      location.search
    ).get("category");

    useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [categoriesData, productsData] =
          await Promise.all([
            getCategories(),
            getProducts(),
          ]);

        setCategory(categoriesData);
        setProducts(productsData);
      } catch (error) {
        console.error(error);
        setError("Không thể kết nối tới máy chủ");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

    const filteredProducts = products.filter((item) => {
      const matchCategory = selectedCategory
        ? item.category?.slug === selectedCategory
        : true;

      const matchKeyword = item.name
        .toLowerCase()
        .includes(keyword.toLowerCase());

      return matchCategory && matchKeyword;
    });
    const finalProducts = [...filteredProducts];

    if (sort === "az") {
      finalProducts.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sort === "za") {
      finalProducts.sort((a, b) => b.name.localeCompare(a.name));
    }

    const totalPages = Math.ceil(
      finalProducts.length / productsPerPage
    );

    const startIndex = (currentPage - 1) * productsPerPage;

    const currentProducts =
      finalProducts.slice(
        startIndex,
        startIndex + productsPerPage
      );

    useEffect(() => {
      setCurrentPage(1);
      setKeyword("");
    }, [selectedCategory]);

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

    const handlePartnerSubmit = async (event) => {
      event.preventDefault();

      try {
        setIsSubmitting(true);

        await createContact({
          name: partnerForm.name,
          phone: partnerForm.phone,
          email: partnerForm.email,
          service: partnerForm.service,
          note: partnerForm.note,
          requestType: "partner_consultation",
          source: "products_page",
        });

        toast.success("Đã gửi yêu cầu tư vấn đối tác.");
        setPartnerForm({
          name: "",
          phone: "",
          email: "",
          service: "suat-an-truong-hoc",
          note: "",
        });
      } catch (error) {
        console.error("Lỗi gửi yêu cầu tư vấn đối tác:", error);
        toast.error("Không thể gửi yêu cầu. Vui lòng thử lại.");
      } finally {
        setIsSubmitting(false);
      }
    };
    const handlePageChange = (page) => {
      setCurrentPage(page);

      productGridRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    };
    const currentCategory = category.find(
      (c) => c.slug === selectedCategory
    );

  return (
    <>
      <Header solid/>

      {/* Hero */}
      <section data-aos="fade" className="relative h-[460px]"
              style={{
                backgroundImage:
                  `url(${bgProduct})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}>
        
         <div className="absolute inset-0 bg-black/60"></div>

        <div className="absolute bottom-0 container mx-auto px-4 ">
          <p className="text-sm text-gray-200 uppercase mb-2">
            TRANG CHỦ / DANH MỤC SẢN PHẨM / {currentCategory ? currentCategory.name : "Tất cả"}
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
      <section
        ref={productGridRef}
        className=" p-[20px] lg:px-[100px] lg:py-[40px] max-w-[1410px] mx-auto">
        <div className="mx-auto px-4">
          <div className="bg-white rounded-2xl lg:mb-[30px]  shadow-sm border border-gray-100 p-4 mb-6">
            <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
              <input
                type="text"
                placeholder="🔍 Tìm kiếm sản phẩm..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="
                  w-full lg:w-220
                  border border-gray-200
                  rounded-xl
                  px-4 py-3
                  focus:outline-none
                  focus:ring-2
                  focus:ring-red-200
                  focus:border-red-500
                "
              />

              <div className="flex items-center gap-4">
                <span className="text-gray-500 text-sm">
                  {finalProducts.length} sản phẩm
                </span>

                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="
                    border border-gray-200
                    rounded-xl
                    px-4 py-3
                    bg-white
                    focus:outline-none
                    focus:ring-2
                    focus:ring-red-200
                    focus:border-red-500
                    text-red-500  
                  "
                >
                  <option value="newest">Mới nhất</option>
                    <option value="az">Tên A-Z</option>
                    <option value="za">Tên Z-A</option>
                </select>
              </div>
            </div>
          </div>
          <div className="grid lg:grid-cols-[260px_1fr] gap-8">

            {/* Sidebar */}
            <aside data-aos="fade-right">
              <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
                <h3 className="font-bold text-lg text-gray-800 mb-4 pb-3 border-b">
                  Danh Mục Sản Phẩm
                </h3>

              <div className="space-y-2">
                <Link
                  to="/products"
                  className={`block w-full px-4 py-3 rounded-xl transition
                    ${
                      !selectedCategory
                        ? "bg-red-600 text-white"
                        : "hover:bg-red-50"
                    }`}
                >
                  Tất cả sản phẩm
                </Link>

                {category.map((category) => (
                  <Link
                    key={category._id}
                    to={`/products?category=${category.slug}`}
                    className={`block w-full px-4 py-3 rounded-xl transition
                      ${
                        selectedCategory === category.slug
                          ? "bg-red-600 text-white"
                          : "hover:bg-red-50"
                      }`}
                  >
                    {category.name}
                  </Link>
                ))}
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
              <div
              data-aos="fade-up"
              className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {currentProducts.map((item, index) => (
                  <div
                    key={item._id}
                    className="  bg-white
                          border border-gray-200
                          hover:border-red-600
                          rounded-xl
                          overflow-hidden
                          shadow-sm
                          hover:shadow-xl
                          hover:-translate-y-1
                          transition-all
                          duration-300"
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="h-52 w-full object-cover"
                    />

                    <div className="p-4">
                      <h3 className="font-bold text-red-600 mb-2">
                        {item.name}
                      </h3>

                      <p className="text-sm text-gray-600 mb-4">
                        {item.description}
                      </p>

                      <Link to={`/products/${item.slug}`} 
                      className="w-full btn border border-red-600 
                      text-red-600 py-2 
                      rounded hover:bg-red-600 
                      hover:text-white transition">
                        Xem chi tiết
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center gap-2 mt-10">
                <button
                  disabled={currentPage === 1}
                  onClick={() =>
                    handlePageChange((prev) => prev - 1)
                  }
                  className="px-4 py-2 border rounded disabled:opacity-50"
                >
                  ←
                </button>

                {[...Array(totalPages)].map((_, index) => {
                  const page = index + 1;

                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-10 h-10 rounded border transition
                        ${
                          currentPage === page
                            ? "bg-red-600 text-white border-red-600"
                            : "hover:bg-gray-100"
                        }`}
                    >
                      {page}
                    </button>
                  );
                })}

                <button
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    handlePageChange((prev) => prev + 1)
                  }
                  className="px-4 py-2 border rounded disabled:opacity-50"
                >
                  →
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
            <div data-aos="zoom-in" className="bg-white shadow-xl rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-red-600 mb-4">
                Nhận Tư Vấn Đối Tác
              </h2>

              <form onSubmit={handlePartnerSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Họ và tên"
                  value={partnerForm.name}
                  onChange={(e) => setPartnerForm({ ...partnerForm, name: e.target.value })}
                  className="w-full border rounded-lg p-3"
                />

                <input
                  type="text"
                  placeholder="Số điện thoại"
                  value={partnerForm.phone}
                  onChange={(e) => setPartnerForm({ ...partnerForm, phone: e.target.value })}
                  className="w-full border rounded-lg p-3"
                />

                <input
                  type="email"
                  placeholder="Email"
                  value={partnerForm.email}
                  onChange={(e) => setPartnerForm({ ...partnerForm, email: e.target.value })}
                  className="w-full border rounded-lg p-3"
                />

                <select
                  value={partnerForm.service}
                  onChange={(e) => setPartnerForm({ ...partnerForm, service: e.target.value })}
                  className="border rounded-lg px-4 py-3 w-full"
                >
                  <option value="suat-an-truong-hoc">Suất ăn trường học</option>
                  <option value="suat-an-cong-nghiep">Suất ăn công nghiệp</option>
                  <option value="dich-vu-canteen">Dịch vụ canteen</option>
                  <option value="khac">Khác</option>
                </select>

                <textarea
                  rows="5"
                  placeholder="Nội dung"
                  value={partnerForm.note}
                  onChange={(e) => setPartnerForm({ ...partnerForm, note: e.target.value })}
                  className="w-full border rounded-lg p-3"
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-red-600 text-white py-3 rounded-lg disabled:opacity-60"
                >
                  {isSubmitting ? "Đang gửi..." : "Gửi Yêu Cầu"}
                </button>
              </form>
            </div>

            {/* Content */}
            <div data-aos="fade-left" className="flex flex-col justify-center">
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
