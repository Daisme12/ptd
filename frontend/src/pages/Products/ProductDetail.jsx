import { ShieldCheck, FileCheck, FileText, Download, LoaderCircle, Eye, FileQuestion } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProductBySlug } from "../../services/productService";
import Header from "../../components/Header";
import Footer from "../../components/Footer";


const steps = [
  { num: '01', title: 'Tuyển Chọn Nguyên Liệu', desc: 'Gạo Nhật cao cấp và cá ngừ đại dương được kiểm định đầu vào khắt khe.', highlight: false },
  { num: '02', title: 'Sơ Chế Vô Trùng', desc: 'Hệ thống phòng sạch class 10.000 đảm bảo môi trường không nhiễm khuẩn.', highlight: false },
  { num: '03', title: 'Chế Biến Khép Kín', desc: 'Quy trình nấu gạo và phối trộn nhân hoàn toàn tự động hóa.', highlight: false },
  { num: '04', title: 'Đóng Gói Màng 3 Lớp', desc: 'Công nghệ màng bao đặc biệt giữ rong biển luôn giòn tan đến khi sử dụng.', highlight: true },
]

export default function ProductDetail() {
  const { slug } = useParams();

  const [productNow, setProductNow] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [downloading, setDownloading] = useState(null);
  const [previewDoc, setPreviewDoc] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await getProductBySlug(slug);

        setProductNow(response.data);
        setRelatedProducts(
          response.relatedProducts || []
        );
      } catch (error) {
        console.error(error);

        setError(
          "Không thể lấy thông tin sản phẩm"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [slug]);

  const getDocumentConfig = (title) => {
    if (title.toLowerCase().includes('công bố') || title.toLowerCase().includes('declaration')) {
      return {
        icon: ShieldCheck,
        bg: 'bg-yellow-50',
        iconColor: 'text-yellow-600',
        defaultDesc: 'Hồ sơ pháp lý công bố tiêu chuẩn chất lượng sản phẩm theo quy định của Ban An toàn thực phẩm.',
      };
    }
    if (title.toLowerCase().includes('xét nghiệm') || title.toLowerCase().includes('test result')) {
      return {
        icon: FileText,
        bg: 'bg-red-50',
        iconColor: 'text-red-600',
        defaultDesc: 'Kết quả phân tích định kỳ về vi sinh, hóa lý và dư lượng chất bảo quản.',
      };
    }
    return {
      icon: FileText,
      bg: 'bg-blue-50',
      iconColor: 'text-blue-600',
      defaultDesc: 'Tài liệu liên quan đến sản phẩm',
    };
  };

  const handleDownload = async (fileUrl, fileName) => {
    try {
      setDownloading(fileUrl);
      const response = await fetch(fileUrl);
      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName || 'document.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download error:', error);
      alert('Lỗi khi tải file');
    } finally {
      setDownloading(null);
    }
  };

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

    <div className="bg-grey-600">
      <div>
        <Header solid />
      </div>
      {/* Hero */}
      <div className="container-app mt-25">
        <div className="flex flex-col lg:flex-row gap-10 items-center">
          <div data-aos="fade-right" className="flex-1">
            <span className="inline-block bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
              {productNow?.category?.name}
            </span>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{productNow?.name}</h1>
            <p className="text-gray-500 leading-relaxed mb-4">{productNow?.description}</p>

            {/* Trạng thái */}
            <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${productNow?.status ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
              {productNow?.status ? 'Đang kinh doanh' : 'Ngừng kinh doanh'}
            </span>
          </div>

          <div data-aos="fade-left" className="flex-1 flex justify-center">
            <img loading="lazy" src={productNow?.imageUrl}
              alt={productNow?.name}
              className="w-full max-w-xs lg:max-w-sm rounded-2xl object-cover shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Hồ sơ pháp lý */}
      <div data-aos="fade-up" className="container-app my-10 border-t border-gray-100">
        <div className="flex items-start justify-between mb-2 py-5">
          <h2 className="text-xl font-bold uppercase tracking-wide">Hồ Sơ Pháp Lý & Kiểm Nghiệm</h2>
          <div className="flex gap-2 text-red-600">
            <ShieldCheck size={20} />
            <FileText size={20} />
          </div>
        </div>
        <p className="text-gray-500 text-sm mb-8 max-w-xl">
          Chúng tôi cam kết minh bạch 100% về chất lượng. Mọi lô sản phẩm đều trải qua quy trình kiểm định nghiêm ngặt từ các phòng thí nghiệm đạt chuẩn ISO.
        </p>

        {productNow?.documents && productNow.documents.length > 0 ? (
          <div className="space-y-6">
            {/* Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {productNow.documents.map((doc) => {
                const config = getDocumentConfig(doc.title);
                const Icon = config.icon;
                const hasUrl = doc.fileUrl && doc.fileUrl.trim() !== '';

                return (
                  <div key={doc._id} className="bg-white border border-gray-200 rounded-2xl p-5 flex gap-4 hover:shadow-md transition-shadow">
                    <div className={`w-10 h-10 rounded-xl ${config.bg} flex items-center justify-center shrink-0`}>
                      <Icon size={20} className={config.iconColor} strokeWidth={1.5} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 mb-1">{doc.title}</h3>
                      <p className="text-sm text-gray-500 leading-relaxed mb-3">{config.defaultDesc}</p>
                      
                      {hasUrl ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleDownload(doc.fileUrl, `${doc.title}.pdf`)}
                            disabled={downloading === doc.fileUrl}
                            className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white text-xs font-medium px-4 py-2 rounded-lg transition-colors"
                          >
                            {downloading === doc.fileUrl ? (
                              <>
                                <LoaderCircle size={12} className="animate-spin" /> Đang tải...
                              </>
                            ) : (
                              <>
                                <Download size={12} /> Tải PDF
                              </>
                            )}
                          </button>
                          <button
                            onClick={() => setPreviewDoc(doc)}
                            className="flex items-center gap-1.5 bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs font-medium px-4 py-2 rounded-lg transition-colors"
                            title="Chuyển đến tài liệu này"
                          >
                            <Eye size={12} /> Xem nhanh
                          </button>
                        </div>
                      ) : (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 inline-block">
                          <p className="text-yellow-800 text-xs font-semibold">Sẽ cập nhật thêm</p>
                          <p className="text-yellow-700 text-xs mt-1">Tài liệu này đang được hoàn thiện</p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* PDF Viewer - Iframe hiển thị luôn */}
            {productNow.documents.some(doc => doc.fileUrl && doc.fileUrl.trim() !== '') && (
              <div className="mt-8 bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-lg">
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-4 lg:px-6 py-3 lg:py-4 border-b border-gray-200 flex items-center justify-between gap-2">
                  <h3 className="font-semibold text-gray-800 text-sm lg:text-lg truncate">
                    Xem tài liệu: {previewDoc && previewDoc.fileUrl ? previewDoc.title : productNow.documents.find(d => d.fileUrl && d.fileUrl.trim() !== '')?.title}
                  </h3>
                  <button
                    onClick={() => setPreviewDoc(null)}
                    className="flex-shrink-0 text-gray-500 hover:text-gray-700 transition-colors text-xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200"
                  >
                    ✕
                  </button>
                </div>

                {/* Tabs for switching documents */}
                <div className="px-4 lg:px-6 py-3 border-b border-gray-200 flex gap-2 flex-wrap bg-gray-50 overflow-x-auto">
                  {productNow.documents.filter(doc => doc.fileUrl && doc.fileUrl.trim() !== '').map((doc) => (
                    <button
                      key={doc._id}
                      onClick={() => setPreviewDoc(doc)}
                      className={`px-3 lg:px-4 py-2 rounded-lg text-xs lg:text-sm font-medium transition-all flex-shrink-0 ${
                        (previewDoc?._id === doc._id || (!previewDoc && productNow.documents.indexOf(doc) === 0))
                          ? 'bg-red-600 text-white shadow-md'
                          : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      {doc.title}
                    </button>
                  ))}
                </div>

                {/* Iframe Container */}
                <div className="bg-gray-50 p-4 lg:p-6">
                  <div className="bg-white rounded-lg border border-gray-300 overflow-hidden shadow-inner">
                    <iframe
                      src={`${(previewDoc && previewDoc.fileUrl ? previewDoc : productNow.documents.find(d => d.fileUrl && d.fileUrl.trim() !== '')).fileUrl}#toolbar=1`}
                      title={previewDoc?.title}
                      className="w-full h-[400px] sm:h-[500px] lg:h-[600px] lg:h-[800px] border-none"
                    />
                  </div>
                </div>

                {/* Action Footer */}
                <div className="px-4 lg:px-6 py-3 lg:py-4 border-t border-gray-200 bg-gray-50 flex flex-col sm:flex-row justify-end gap-2 sm:gap-3">
                  <button
                    onClick={() => {
                      const currentDoc = previewDoc && previewDoc.fileUrl ? previewDoc : productNow.documents.find(d => d.fileUrl && d.fileUrl.trim() !== '');
                      handleDownload(currentDoc.fileUrl, `${currentDoc.title}.pdf`);
                    }}
                    disabled={downloading}
                    className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-medium transition-colors text-sm"
                  >
                    <Download size={16} />
                    {downloading ? 'Đang tải...' : 'Tải xuống'}
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 text-center">
            <FileQuestion size={40} className="mx-auto text-gray-400 mb-3" />
            <p className="text-gray-700 font-medium">Chưa có tài liệu đính kèm</p>
            <p className="text-gray-500 text-sm mt-1">Tài liệu pháp lý sẽ được cập nhật sớm</p>
          </div>
        )}
      </div>

      {/* Quy trình */}
      <div className="bg-gray-900 py-16 px-4 mt-15">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-white text-2xl font-bold mb-3">Quy Trình Chế Biến An Toàn</h2>
          <p className="text-gray-400 text-sm">
            Kiểm soát chặt chẽ từng khâu từ nguyên liệu đầu vào đến đóng gói thành phẩm tại nhà máy đạt chuẩn HACCP.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map(({ num, title, desc, highlight }, index) => (
            <div key={num}
              data-aos="fade-right"
              data-aos-delay={index * 150}
              className="flex flex-col items-center text-center gap-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm ${highlight ? 'bg-yellow-400 text-gray-900' : 'bg-red-600'}`}>
                {num}
              </div>
              <h4 className="text-white text-sm font-semibold uppercase">{title}</h4>
              <p className="text-gray-400 text-xs leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Sản phẩm tương tự */}
      <div className="container-app my-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold">Sản phẩm tương tự</h2>
          <Link to={`/products?category=${productNow.category.slug}`} className="text-red-600 text-sm font-medium hover:underline">Xem tất cả →</Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {relatedProducts.map((item, index) => (
            <Link
              to={`/products/${item.slug}`}
              key={item._id}
              data-aos="zoom-in"
              data-aos-delay={index * 200}
              className="
                group
                block
                bg-white
                rounded-2xl
                border border-gray-200
                overflow-hidden
                shadow-sm
                hover:shadow-xl
                hover:-translate-y-1
                hover:border-red-500
                transition-all
                duration-300
              "
            >
              <div className="overflow-hidden h-44">
                <img loading="lazy" src={item.imageUrl}
                  alt={item.name}
                  className="
                    w-full
                    h-full
                    object-cover
                    group-hover:scale-105
                    transition-transform
                    duration-300
                  "
                />
              </div>

              <div className="p-4">
                <h4 className="font-semibold text-gray-800 text-sm mb-2 line-clamp-2">
                  {item.name}
                </h4>

                <p className="text-gray-500 text-xs leading-relaxed mb-3 line-clamp-3">
                  {item.description}
                </p>

                <span className="text-red-600 text-sm font-medium group-hover:underline">
                  Chi tiết →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />

      {/* PDF Preview Modal - Fullscreen */}
      {previewDoc && (
        <div className="hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-6xl h-[90vh] flex flex-col overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between px-5 py-4 border-b">
              <h3 className="font-bold text-lg">{previewDoc.title}</h3>
              <button onClick={() => setPreviewDoc(null)} className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center">
                ✕
              </button>
            </div>

            <div className="flex-1">
              <iframe src={`${previewDoc.fileUrl}#toolbar=1`} title={previewDoc.title} className="w-full h-full" />
            </div>

            <div className="border-t p-4 flex justify-end gap-3">
              <button onClick={() => setPreviewDoc(null)} className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300">
                Đóng
              </button>
              <button onClick={() => handleDownload(previewDoc.fileUrl, `${previewDoc.title}.pdf`)} className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white flex items-center gap-2">
                <Download size={16} />
                Tải xuống
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}