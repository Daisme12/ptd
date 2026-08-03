import React, { useState, useEffect, useRef } from 'react';
import { Plus, Edit2, Trash2, X, Image as ImageIcon, FileText, CheckCircle2, XCircle, Search } from 'lucide-react';
import { toast } from 'sonner';
import SEO from "../../components/SEO";
import { getProducts, createProduct, updateProduct, deleteProduct } from '../../services/productService';
import { getCategories } from '../../services/categoryService';
import { uploadFileToStorage } from '../../config/firebase';

const ProductAdmin = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    _id: '',
    name: '',
    category: '',
    price: '',
    description: '',
    status: true,
    declarationPdf: '',
    testResultPdf: '',
    qrImageUrlText: '',
    qrLink: '',
  });
  
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState('');
  const [selectedQrImage, setSelectedQrImage] = useState(null);
  const [previewQrImage, setPreviewQrImage] = useState('');
  
  const imageInputRef = useRef(null);
  const qrImageInputRef = useRef(null);

  // Fetch data
  const fetchData = async () => {
    try {
      setLoading(true);
      const [productsData, categoriesData] = await Promise.all([
        getProducts(),
        getCategories()
      ]);
      setProducts(productsData);
      setCategories(categoriesData);
    } catch (error) {
      console.error(error);
      toast.error('Lỗi khi tải dữ liệu');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle form input
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  // Handle image select
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // Open modal for Add
  const handleAdd = () => {
    setFormData({ 
      _id: '', 
      name: '', 
      category: categories.length > 0 ? categories[0]._id : '', 
      price: '', 
      description: '',
      status: true,
      declarationPdf: '',
      testResultPdf: '',
      imageUrlText: '',
      qrImageUrlText: '',
      qrLink: '',
    });
    setSelectedImage(null);
    setPreviewImage('');
    setSelectedQrImage(null);
    setPreviewQrImage('');
    setIsModalOpen(true);
  };

  // Open modal for Edit
  const handleEdit = (product) => {
    const declarationDoc = product.documents?.find(d => d.title === "Bản công bố sản phẩm");
    const testResultDoc = product.documents?.find(d => d.title === "Phiếu kết quả xét nghiệm");

    setFormData({
      _id: product._id,
      name: product.name,
      category: product.category ? product.category._id : '',
      price: product.price || '',
      description: product.description || '',
      status: product.status !== undefined ? product.status : true,
      declarationPdf: declarationDoc ? declarationDoc.fileUrl : '',
      testResultPdf: testResultDoc ? testResultDoc.fileUrl : '',
      imageUrlText: product.imageUrl || '',
      qrImageUrlText: product.qrImageUrl || '',
      qrLink: product.qrLink || '',
    });
    setSelectedImage(null);
    setPreviewImage(product.imageUrl || '');
    setSelectedQrImage(null);
    setPreviewQrImage(product.qrImageUrl || '');
    setIsModalOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    if (imageInputRef.current) imageInputRef.current.value = '';
    if (qrImageInputRef.current) qrImageInputRef.current.value = '';
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.category) {
      toast.error('Vui lòng điền đầy đủ Tên và Danh mục');
      return;
    }

    try {
      setIsSubmitting(true);

      // 1. Lấy hoặc upload hình ảnh
      let imageUrl = formData.imageUrlText ? formData.imageUrlText.trim() : '';

      if (selectedImage) {
        try {
          imageUrl = await uploadFileToStorage(selectedImage, "products");
        } catch (uploadError) {
          console.error("Upload error:", uploadError);
          toast.error("Không thể tải tệp lên. Đang sử dụng link ảnh trực tiếp.");
        }
      }

      if (!imageUrl && previewImage) {
        imageUrl = previewImage;
      }

      if (!imageUrl) {
        toast.error('Vui lòng chọn tệp ảnh hoặc nhập đường dẫn hình ảnh (URL)');
        setIsSubmitting(false);
        return;
      }

      // 1b. Lấy hoặc upload mã QR Code (nếu có)
      let qrImageUrl = formData.qrImageUrlText ? formData.qrImageUrlText.trim() : '';

      if (selectedQrImage) {
        try {
          qrImageUrl = await uploadFileToStorage(selectedQrImage, "products");
        } catch (uploadError) {
          console.error("QR Code Upload error:", uploadError);
          toast.error("Không thể tải ảnh QR Code lên.");
        }
      }

      // 2. Chuẩn bị tài liệu PDF
      const documents = [];
      if (formData.declarationPdf && formData.declarationPdf.trim() !== "") {
        documents.push({
          title: "Bản công bố sản phẩm",
          fileUrl: formData.declarationPdf.trim()
        });
      }
      if (formData.testResultPdf && formData.testResultPdf.trim() !== "") {
        documents.push({
          title: "Phiếu kết quả xét nghiệm",
          fileUrl: formData.testResultPdf.trim()
        });
      }

      // 3. Tạo slug ở frontend
      const createSlug = (str) => {
        if (!str) return '';
        return str
          .toLowerCase()
          .trim()
          .replace(/[áàảãạăắằẳẵặâấầẩẫậ]/g, 'a')
          .replace(/[éèẻẽẹêếềểễệ]/g, 'e')
          .replace(/[íìỉĩị]/g, 'i')
          .replace(/[óòỏõọôốồổỗộơớờởỡợ]/g, 'o')
          .replace(/[úùủũụưứừửữự]/g, 'u')
          .replace(/[ýỳỷỹỵ]/g, 'y')
          .replace(/đ/g, 'd')
          .replace(/[^a-z0-9 -]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-');
      };

      const productPayload = {
        name: formData.name,
        category: formData.category,
        description: formData.description || '',
        price: formData.price ? Number(formData.price) : 0,
        status: formData.status,
        imageUrl: imageUrl,
        qrImageUrl: qrImageUrl,
        qrLink: formData.qrLink ? formData.qrLink.trim() : '',
        documents: documents,
        slug: createSlug(formData.name)
      };

      if (formData._id) {
        await updateProduct(formData._id, productPayload);
        toast.success('Cập nhật sản phẩm thành công');
      } else {
        await createProduct(productPayload);
        toast.success('Thêm sản phẩm thành công');
      }

      handleCloseModal();
      fetchData();
    } catch (error) {
      console.error(error);
      toast.error(error.message || 'Có lỗi xảy ra');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      try {
        await deleteProduct(id);
        toast.success('Xóa sản phẩm thành công');
        fetchData();
      } catch (error) {
        console.error(error);
        toast.error('Lỗi khi xóa sản phẩm');
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100">
      <SEO title="Quản Lý Sản Phẩm" noindex={true} />
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-100">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Quản lý Sản phẩm</h2>
          <p className="text-sm text-gray-500 mt-1">Thêm, sửa, xóa danh sách sản phẩm</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm"
        >
          <Plus size={20} />
          <span>Thêm sản phẩm</span>
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-6 py-4 font-semibold text-gray-600">Hình ảnh</th>
              <th className="px-6 py-4 font-semibold text-gray-600">Tên sản phẩm</th>
              <th className="px-6 py-4 font-semibold text-gray-600">Danh mục</th>
              <th className="px-6 py-4 font-semibold text-gray-600">Giá</th>
              <th className="px-6 py-4 font-semibold text-gray-600">Trạng thái</th>
              <th className="px-6 py-4 font-semibold text-gray-600 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                  Đang tải dữ liệu...
                </td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                  Chưa có sản phẩm nào.
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-200 bg-white">
                      {product.imageUrl ? (
                        <img loading="lazy" src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                          <ImageIcon size={24} />
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-800">{product.name}</p>
                    <p className="text-xs text-gray-500 mt-1">{product.documents?.length || 0} tài liệu PDF</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                      {product.category?.name || 'Không rõ'}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {product.price ? `${product.price.toLocaleString('vi-VN')} đ` : '-'}
                  </td>
                  <td className="px-6 py-4">
                    {product.status ? (
                      <span className="flex items-center gap-1.5 text-sm text-green-600 font-medium">
                        <CheckCircle2 size={16} /> Đang bán
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-sm text-gray-500 font-medium">
                        <XCircle size={16} /> Tạm ngưng
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => handleEdit(product)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Sửa"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Xóa"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-8">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50">
              <h3 className="text-lg font-bold text-gray-800">
                {formData._id ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm mới'}
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Cột trái */}
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tên sản phẩm *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600 focus:border-red-600 transition-all outline-none"
                      placeholder="Nhập tên..."
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Danh mục *</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600 focus:border-red-600 transition-all outline-none bg-white"
                      required
                    >
                      <option value="">-- Chọn danh mục --</option>
                      {categories.map(cat => (
                        <option key={cat._id} value={cat._id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Giá (VNĐ)</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600 focus:border-red-600 transition-all outline-none"
                      placeholder="VD: 25000"
                    />
                  </div>
                  
                  <div>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="status"
                        checked={formData.status}
                        onChange={handleChange}
                        className="w-5 h-5 text-red-600 rounded border-gray-300 focus:ring-red-600"
                      />
                      <span className="text-sm font-medium text-gray-700">Đang bán (Hiển thị)</span>
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows="3"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600 focus:border-red-600 transition-all outline-none resize-none"
                      placeholder="Nhập mô tả sản phẩm..."
                    ></textarea>
                  </div>
                </div>

                {/* Cột phải: Files */}
                <div className="space-y-5">
                  {/* Image Upload */}
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                    <label className="block text-sm font-medium text-gray-700 mb-3">Ảnh sản phẩm *</label>
                    <div className="flex flex-col gap-4">
                      {previewImage ? (
                        <div className="w-full h-32 rounded-lg overflow-hidden border border-gray-300 relative">
                          <img loading="lazy" src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="w-full h-32 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center bg-white text-gray-400">
                          <ImageIcon size={32} />
                        </div>
                      )}
                      <div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          ref={imageInputRef}
                          className="block w-full text-sm text-gray-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                            file:bg-red-50 file:text-red-700
                            hover:file:bg-red-100 cursor-pointer mb-3"
                        />
                        <div className="text-xs text-gray-400 font-bold mb-1 text-center">HOẶC DÁN LINK ẢNH TRỰC TIẾP</div>
                        <input
                          type="text"
                          name="imageUrlText"
                          value={formData.imageUrlText || ''}
                          onChange={(e) => {
                            handleChange(e);
                            if (e.target.value) {
                              setPreviewImage(e.target.value);
                            }
                          }}
                          placeholder="https://example.com/image.png"
                          className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600 focus:border-red-600 transition-all outline-none text-xs bg-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* QR Code Section */}
                  <div className="bg-purple-50/50 p-4 rounded-xl border border-purple-100 space-y-4">
                    <h4 className="text-sm font-bold text-purple-800 flex items-center gap-2">
                      <ImageIcon size={16} /> Mã QR & Liên Kết (Không bắt buộc)
                    </h4>
                    <div className="flex flex-col gap-4">
                      {previewQrImage ? (
                        <div className="w-full h-32 rounded-lg overflow-hidden border border-purple-200 relative bg-white flex items-center justify-center bg-white">
                          <img loading="lazy" src={previewQrImage} alt="QR Preview" className="h-full object-contain" />
                          <button
                            type="button"
                            onClick={() => {
                              setPreviewQrImage('');
                              setSelectedQrImage(null);
                              setFormData(prev => ({ ...prev, qrImageUrlText: '' }));
                              if (qrImageInputRef.current) qrImageInputRef.current.value = '';
                            }}
                            className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      ) : (
                        <div className="w-full h-24 rounded-lg border-2 border-dashed border-purple-200 flex items-center justify-center bg-white text-gray-400">
                          <ImageIcon size={24} />
                          <span className="text-xs ml-2">Chưa có mã QR</span>
                        </div>
                      )}
                      <div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              setSelectedQrImage(file);
                              setPreviewQrImage(URL.createObjectURL(file));
                            }
                          }}
                          ref={qrImageInputRef}
                          className="block w-full text-xs text-gray-500
                            file:mr-4 file:py-1.5 file:px-3
                            file:rounded-full file:border-0
                            file:text-xs file:font-semibold
                            file:bg-purple-50 file:text-purple-700
                            hover:file:bg-purple-100 cursor-pointer mb-2"
                        />
                        <div className="text-[10px] text-purple-600 font-bold mb-1 text-center">HOẶC DÁN LINK ẢNH QR TRỰC TIẾP</div>
                        <input
                          type="text"
                          name="qrImageUrlText"
                          value={formData.qrImageUrlText || ''}
                          onChange={(e) => {
                            handleChange(e);
                            if (e.target.value) {
                              setPreviewQrImage(e.target.value);
                            } else {
                              setPreviewQrImage('');
                            }
                          }}
                          placeholder="https://example.com/qr-image.png"
                          className="w-full px-3 py-2 rounded-lg border border-purple-200 focus:ring-2 focus:ring-purple-600 focus:border-purple-600 transition-all outline-none text-xs bg-white"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Đường dẫn liên kết (Link trang đích)</label>
                        <input
                          type="url"
                          name="qrLink"
                          value={formData.qrLink || ''}
                          onChange={handleChange}
                          placeholder="https://example.com/target-page"
                          className="w-full px-3 py-2 rounded-lg border border-purple-200 focus:ring-2 focus:ring-purple-600 focus:border-purple-600 outline-none text-xs bg-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* PDF Uploads */}
                  <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100 space-y-4">
                    <h4 className="text-sm font-bold text-yellow-800 flex items-center gap-2">
                      <FileText size={16} /> Tài liệu pháp lý (Google Drive Link)
                    </h4>
                    
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Bản công bố sản phẩm</label>
                      <input
                        type="url"
                        name="declarationPdf"
                        value={formData.declarationPdf}
                        onChange={handleChange}
                        placeholder="Nhập link Google Drive của bản công bố..."
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none text-xs bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Phiếu kết quả xét nghiệm</label>
                      <input
                        type="url"
                        name="testResultPdf"
                        value={formData.testResultPdf}
                        onChange={handleChange}
                        placeholder="Nhập link Google Drive của phiếu xét nghiệm..."
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none text-xs bg-white"
                      />
                    </div>
                    
                    <p className="text-[11px] text-yellow-700 leading-relaxed italic">
                      Dán link tài liệu đã được chia sẻ ở chế độ "Bất kỳ ai có đường liên kết đều có thể xem" trên Google Drive.
                    </p>
                  </div>
                </div>

              </div>

              <div className="pt-6 mt-6 flex gap-3 border-t border-gray-100 justify-end">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-6 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-2.5 text-white bg-red-600 rounded-lg hover:bg-red-700 font-medium transition-colors disabled:opacity-50 flex items-center justify-center min-w-[140px]"
                >
                  {isSubmitting ? 'Đang xử lý...' : 'Lưu sản phẩm'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductAdmin;
