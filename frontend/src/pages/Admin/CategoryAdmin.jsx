import React, { useState, useEffect, useRef } from 'react';
import { Plus, Edit2, Trash2, X, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import api from '../../services/api';

const CategoryAdmin = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    _id: '',
    name: '',
    description: '',
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState('');

  const fileInputRef = useRef(null);

  // Fetch categories
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await api.get('/categories');
      setCategories(res.data);
    } catch (error) {
      console.error(error);
      toast.error('Lỗi khi tải danh sách danh mục');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle form input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle file select
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // Open modal for Add
  const handleAdd = () => {
    setFormData({ _id: '', name: '', description: '' });
    setSelectedFile(null);
    setPreviewImage('');
    setIsModalOpen(true);
  };

  // Open modal for Edit
  const handleEdit = (category) => {
    setFormData({
      _id: category._id,
      name: category.name,
      description: category.description || '',
    });
    setSelectedFile(null);
    setPreviewImage(category.imageUrl || '');
    setIsModalOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Submit form (Add or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name) {
      toast.error('Vui lòng nhập tên danh mục');
      return;
    }

    try {
      setIsSubmitting(true);
      
      const submitData = new FormData();
      submitData.append('name', formData.name);
      submitData.append('description', formData.description);
      if (selectedFile) {
        submitData.append('image', selectedFile);
      }

      if (formData._id) {
        // Cập nhật
        await api.put(`/categories/${formData._id}`, submitData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        toast.success('Cập nhật danh mục thành công');
      } else {
        // Thêm mới
        if (!selectedFile && !previewImage) {
           toast.error('Vui lòng chọn ảnh cho danh mục');
           setIsSubmitting(false);
           return;
        }
        await api.post('/categories', submitData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        toast.success('Thêm danh mục thành công');
      }

      handleCloseModal();
      fetchCategories();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete category
  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa danh mục này? Các sản phẩm thuộc danh mục có thể bị ảnh hưởng.')) {
      try {
        await api.delete(`/categories/${id}`);
        toast.success('Xóa danh mục thành công');
        fetchCategories();
      } catch (error) {
        console.error(error);
        toast.error('Lỗi khi xóa danh mục');
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-100">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Quản lý Danh mục</h2>
          <p className="text-sm text-gray-500 mt-1">Thêm, sửa, xóa các danh mục sản phẩm</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm"
        >
          <Plus size={20} />
          <span>Thêm danh mục</span>
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-6 py-4 font-semibold text-gray-600">Hình ảnh</th>
              <th className="px-6 py-4 font-semibold text-gray-600">Tên danh mục</th>
              <th className="px-6 py-4 font-semibold text-gray-600">Mô tả</th>
              <th className="px-6 py-4 font-semibold text-gray-600">Slug</th>
              <th className="px-6 py-4 font-semibold text-gray-600 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                  Đang tải dữ liệu...
                </td>
              </tr>
            ) : categories.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                  Chưa có danh mục nào.
                </td>
              </tr>
            ) : (
              categories.map((category) => (
                <tr key={category._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-200 bg-white">
                      {category.imageUrl ? (
                        <img loading="lazy" src={category.imageUrl} alt={category.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                          <ImageIcon size={24} />
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-800">{category.name}</td>
                  <td className="px-6 py-4 text-gray-600 max-w-xs truncate" title={category.description}>
                    {category.description || '-'}
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-sm">{category.slug}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => handleEdit(category)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Sửa"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(category._id)}
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50">
              <h3 className="text-lg font-bold text-gray-800">
                {formData._id ? 'Cập nhật danh mục' : 'Thêm danh mục mới'}
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tên danh mục *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600 focus:border-red-600 transition-all outline-none"
                  placeholder="Nhập tên danh mục..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600 focus:border-red-600 transition-all outline-none resize-none"
                  placeholder="Nhập mô tả..."
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hình ảnh</label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 overflow-hidden relative group">
                    {previewImage ? (
                      <img loading="lazy" src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon className="text-gray-400" size={24} />
                    )}
                  </div>
                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      ref={fileInputRef}
                      className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-red-50 file:text-red-700
                        hover:file:bg-red-100 cursor-pointer"
                    />
                    <p className="text-xs text-gray-500 mt-2">Định dạng JPG, PNG, WEBP (Tối đa 5MB)</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex gap-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-4 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2.5 text-white bg-red-600 rounded-lg hover:bg-red-700 font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? 'Đang xử lý...' : 'Lưu danh mục'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryAdmin;
