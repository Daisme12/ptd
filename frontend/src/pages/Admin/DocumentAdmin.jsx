import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, FileText, Settings, Link as LinkIcon, Save } from 'lucide-react';
import { toast } from 'sonner';
import SEO from "../../components/SEO";
import { 
  getCertificates, 
  createCertificate, 
  updateCertificate, 
  deleteCertificate,
  getGeneralSettings,
  updateGeneralSettings 
} from '../../services/documentService';

const DocumentAdmin = () => {
  const [certificates, setCertificates] = useState([]);
  const [profileUrl, setProfileUrl] = useState('');
  const [cloudinaryCloudName, setCloudinaryCloudName] = useState('');
  const [cloudinaryUploadPreset, setCloudinaryUploadPreset] = useState('');
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    pdf: '',
    order: 0,
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const [certs, settings] = await Promise.all([
        getCertificates(),
        getGeneralSettings()
      ]);
      setCertificates(certs);
      setProfileUrl(settings.profileUrl || '');
      setCloudinaryCloudName(settings.cloudinaryCloudName || '');
      setCloudinaryUploadPreset(settings.cloudinaryUploadPreset || '');
    } catch (error) {
      console.error(error);
      toast.error('Lỗi khi tải dữ liệu cài đặt');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSettingsSubmit = async (e) => {
    e.preventDefault();
    if (!profileUrl) {
      toast.error('Vui lòng nhập đường dẫn Hồ sơ năng lực');
      return;
    }
    try {
      setIsSavingSettings(true);
      await updateGeneralSettings({
        profileUrl,
        cloudinaryCloudName: cloudinaryCloudName.trim(),
        cloudinaryUploadPreset: cloudinaryUploadPreset.trim()
      });
      toast.success('Cập nhật cấu hình hệ thống thành công');
    } catch (error) {
      console.error(error);
      toast.error('Có lỗi xảy ra khi cập nhật cài đặt');
    } finally {
      setIsSavingSettings(false);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAdd = () => {
    setFormData({ id: '', name: '', pdf: '', order: certificates.length + 1 });
    setIsModalOpen(true);
  };

  const handleEdit = (cert) => {
    setFormData({
      id: cert.id,
      name: cert.name,
      pdf: cert.pdf,
      order: cert.order || 0,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa tài liệu này không?')) return;
    try {
      await deleteCertificate(id);
      toast.success('Xóa tài liệu thành công');
      fetchData();
    } catch (error) {
      console.error(error);
      toast.error('Có lỗi xảy ra khi xóa tài liệu');
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.pdf) {
      toast.error('Vui lòng nhập đầy đủ tên và đường dẫn tài liệu');
      return;
    }

    try {
      setIsSubmitting(true);
      if (formData.id) {
        // Update
        await updateCertificate(formData.id, {
          name: formData.name,
          pdf: formData.pdf,
          order: Number(formData.order) || 0,
        });
        toast.success('Cập nhật tài liệu thành công');
      } else {
        // Create
        await createCertificate({
          name: formData.name,
          pdf: formData.pdf,
          order: Number(formData.order) || 0,
        });
        toast.success('Thêm tài liệu mới thành công');
      }
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      console.error(error);
      toast.error('Lỗi khi lưu thông tin tài liệu');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <SEO title="Quản lý Tài liệu - Admin" noindex={true} />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Quản lý Tài liệu & Giấy tờ</h1>
          <p className="text-gray-600 mt-1">Cấu hình hồ sơ năng lực và các chứng nhận chất lượng của doanh nghiệp.</p>
        </div>
      </div>

      {/* 1. Profile PDF settings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
          <Settings className="text-red-600" size={20} />
          <h2 className="text-lg font-bold text-gray-800">Hồ Sơ Năng Lực (Profile)</h2>
        </div>
        <form onSubmit={handleSettingsSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Link Drive hoặc URL file PDF Hồ sơ năng lực
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                  <LinkIcon size={16} />
                </span>
                <input
                  type="text"
                  value={profileUrl}
                  onChange={(e) => setProfileUrl(e.target.value)}
                  placeholder="https://drive.google.com/file/d/... hoặc /Profile.pdf"
                  className="pl-10 w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cloudinary Cloud Name (Lưu ảnh miễn phí)
              </label>
              <input
                type="text"
                value={cloudinaryCloudName}
                onChange={(e) => setCloudinaryCloudName(e.target.value)}
                placeholder="VD: dpxxxxxxx"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cloudinary Upload Preset (Chế độ Unsigned)
              </label>
              <input
                type="text"
                value={cloudinaryUploadPreset}
                onChange={(e) => setCloudinaryUploadPreset(e.target.value)}
                placeholder="VD: preset_xxxxxx"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-gray-100">
            <span className="text-xs text-gray-500 max-w-lg">
              💡 Cấu hình Cloudinary giúp bạn lưu trữ hình ảnh tải lên miễn phí không giới hạn mà không cần nâng cấp gói lưu trữ Firebase. Hãy tạo preset chế độ Unsigned trong cài đặt Cloudinary của bạn.
            </span>
            <button
              type="submit"
              disabled={isSavingSettings}
              className="px-6 py-2.5 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-medium rounded-lg text-sm flex items-center gap-2 transition-colors shadow-sm shrink-0"
            >
              <Save size={16} />
              <span>{isSavingSettings ? 'Đang lưu...' : 'Lưu cấu hình'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* 2. Certificates List CRUD */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <FileText className="text-red-600" size={20} />
            <h2 className="text-lg font-bold text-gray-800">Danh sách Chứng chỉ & Giấy tờ (Kho lưu trữ)</h2>
          </div>
          <button
            onClick={handleAdd}
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg text-sm transition-colors shadow-sm"
          >
            <Plus size={16} />
            <span>Thêm tài liệu</span>
          </button>
        </div>

        {loading ? (
          <div className="py-8 text-center text-gray-500">Đang tải danh sách tài liệu...</div>
        ) : certificates.length === 0 ? (
          <div className="py-8 text-center text-gray-500">Chưa có tài liệu nào trong kho. Nhấn "Thêm tài liệu" để bắt đầu.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-600 text-xs font-semibold uppercase">
                  <th className="px-6 py-3 border-b border-gray-100">Thứ tự</th>
                  <th className="px-6 py-3 border-b border-gray-100">Tên tài liệu / Giấy tờ</th>
                  <th className="px-6 py-3 border-b border-gray-100">Đường dẫn (Drive / PDF URL)</th>
                  <th className="px-6 py-3 border-b border-gray-100 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                {certificates.map((cert) => (
                  <tr key={cert.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900 w-20">{cert.order}</td>
                    <td className="px-6 py-4 font-bold text-gray-800">{cert.name}</td>
                    <td className="px-6 py-4 max-w-xs truncate">
                      <span className="text-blue-600 hover:underline cursor-pointer select-all font-mono text-xs">
                        {cert.pdf}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="inline-flex gap-2">
                        <button
                          onClick={() => handleEdit(cert)}
                          className="p-2 hover:bg-gray-100 text-gray-600 rounded-lg hover:text-gray-900 transition-colors"
                          title="Sửa"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(cert.id)}
                          className="p-2 hover:bg-red-50 text-gray-600 rounded-lg hover:text-red-600 transition-colors"
                          title="Xóa"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Add / Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-bold text-gray-800 text-lg">
                {formData.id ? 'Cập nhật tài liệu' : 'Thêm tài liệu mới'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 bg-gray-100 hover:bg-red-50 hover:text-red-600 rounded-full transition-colors text-gray-500"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tên tài liệu / Giấy chứng nhận
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  placeholder="Ví dụ: ISO 22000:2018 - Đóng gói"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Đường dẫn tài liệu (URL Drive hoặc file PDF)
                </label>
                <input
                  type="text"
                  name="pdf"
                  value={formData.pdf}
                  onChange={handleFormChange}
                  placeholder="Nhập link Google Drive hoặc file tĩnh (ví dụ: /giayphep.pdf)"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                />
                <p className="mt-1 text-xs text-gray-400">
                  💡 Nhập link Drive để tránh làm nặng Hosting. Hãy đảm bảo cài đặt link ở chế độ "Bất kỳ ai có liên kết đều có thể xem".
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Thứ tự hiển thị
                </label>
                <input
                  type="number"
                  name="order"
                  value={formData.order}
                  onChange={handleFormChange}
                  placeholder="Số thứ tự"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg text-sm transition-colors"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg text-sm transition-colors shadow-sm"
                >
                  {isSubmitting ? 'Đang lưu...' : 'Lưu lại'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentAdmin;
