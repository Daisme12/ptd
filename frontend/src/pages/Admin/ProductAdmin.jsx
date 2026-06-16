import React, { useState, useEffect, useRef } from 'react';
import { Plus, Edit2, Trash2, X, Image as ImageIcon, FileText, CheckCircle2, XCircle } from 'lucide-react';
import { toast } from 'sonner';
import api from '../../services/api';

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
  });
  
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState('');
  
  const [selectedDeclarationPdf, setSelectedDeclarationPdf] = useState(null);
  const [selectedTestResultPdf, setSelectedTestResultPdf] = useState(null);

  const imageInputRef = useRef(null);
  const declarationInputRef = useRef(null);
  const testResultInputRef = useRef(null);

  // Fetch data
  const fetchData = async () => {
    try {
      setLoading(true);
      const [resProducts, resCategories] = await Promise.all([
        api.get('/products'),
        api.get('/categories')
      ]);
      setProducts(resProducts.data);
      setCategories(resCategories.data);
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

  // Handle PDF select
  const handlePdfChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      if (type === 'declaration') {
        setSelectedDeclarationPdf(file);
      } else {
        setSelectedTestResultPdf(file);
      }
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
      status: true
    });
    setSelectedImage(null);
    setPreviewImage('');
    setSelectedDeclarationPdf(null);
    setSelectedTestResultPdf(null);
    setIsModalOpen(true);
  };

  // Open modal for Edit
  const handleEdit = (product) => {
    setFormData({
      _id: product._id,
      name: product.name,
      category: product.category ? product.category._id : '',
      price: product.price || '',
      description: product.description || '',
      status: product.status !== undefined ? product.status : true,
    });
    setSelectedImage(null);
    setPreviewImage(product.imageUrl || '');
    setSelectedDeclarationPdf(null);
    setSelectedTestResultPdf(null);
    setIsModalOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    if (imageInputRef.current) imageInputRef.current.value = '';
    if (declarationInputRef.current) declarationInputRef.current.value = '';
    if (testResultInputRef.current) testResultInputRef.current.value = '';
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
      
      const submitData = new FormData();
      submitData.append('name', formData.name);
      submitData.append('category', formData.category);
      submitData.append('description', formData.description || '');
      if (formData.price) submitData.append('price', formData.price);
      submitData.append('status', formData.status);
      
      if (selectedImage) submitData.append('image', selectedImage);
      if (selectedDeclarationPdf) submitData.append('declarationPdf', selectedDeclarationPdf);
      if (selectedTestResultPdf) submitData.append('testResultPdf', selectedTestResultPdf);

      if (formData._id) {
        await api.put(`/products/${formData._id}`, submitData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        toast.success('Cập nhật sản phẩm thành công');
      } else {
        if (!selectedImage && !previewImage) {
           toast.error('Vui lòng chọn ảnh sản phẩm');
           setIsSubmitting(false);
           return;
        }
        await api.post('/products', submitData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        toast.success('Thêm sản phẩm thành công');
      }

      handleCloseModal();
      fetchData();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      try {
        await api.delete(`/products/${id}`);
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
                        <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
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
                          <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
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
                            hover:file:bg-red-100 cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>

                  {/* PDF Uploads */}
                  <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100 space-y-4">
                    <h4 className="text-sm font-bold text-yellow-800 flex items-center gap-2">
                      <FileText size={16} /> Tài liệu pháp lý (PDF)
                    </h4>
                    
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Bản công bố sản phẩm</label>
                      <input
                        type="file"
                        accept="application/pdf"
                        onChange={(e) => handlePdfChange(e, 'declaration')}
                        ref={declarationInputRef}
                        className="block w-full text-xs text-gray-500 file:mr-2 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-medium file:bg-white file:text-gray-700 border border-gray-200 rounded p-1 bg-white cursor-pointer"
                      />
                      {selectedDeclarationPdf && <p className="text-[11px] text-green-600 mt-1">Đã chọn: {selectedDeclarationPdf.name}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Phiếu kết quả xét nghiệm</label>
                      <input
                        type="file"
                        accept="application/pdf"
                        onChange={(e) => handlePdfChange(e, 'testResult')}
                        ref={testResultInputRef}
                        className="block w-full text-xs text-gray-500 file:mr-2 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-medium file:bg-white file:text-gray-700 border border-gray-200 rounded p-1 bg-white cursor-pointer"
                      />
                      {selectedTestResultPdf && <p className="text-[11px] text-green-600 mt-1">Đã chọn: {selectedTestResultPdf.name}</p>}
                    </div>
                    
                    <p className="text-[11px] text-yellow-700 leading-relaxed italic">
                      Nếu để trống, file cũ trên hệ thống (nếu có) sẽ được giữ nguyên. Chỉ hỗ trợ file .pdf.
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
