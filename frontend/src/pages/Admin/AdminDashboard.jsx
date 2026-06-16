import React, { useState, useEffect } from 'react';
import { Package, Grid, TrendingUp, Eye } from 'lucide-react';
import { toast } from 'sonner';
import api from '../../services/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    activeProducts: 0,
    inactiveProducts: 0,
  });
  const [recentProducts, setRecentProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [resProducts, resCategories] = await Promise.all([
        api.get('/products'),
        api.get('/categories')
      ]);

      const products = resProducts.data;
      const categories = resCategories.data;

      setStats({
        totalProducts: products.length,
        totalCategories: categories.length,
        activeProducts: products.filter(p => p.status === true).length,
        inactiveProducts: products.filter(p => p.status === false).length,
      });

      // Get recent 5 products
      setRecentProducts(products.slice(0, 5));
    } catch (error) {
      console.error(error);
      toast.error('Lỗi khi tải dữ liệu dashboard');
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ icon: Icon, title, value, color }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-800">{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon size={24} className="text-white" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 mt-1">Xin chào! Đây là tổng quan hệ thống quản lý của bạn.</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={Package} 
          title="Tổng sản phẩm" 
          value={stats.totalProducts}
          color="bg-blue-600"
        />
        <StatCard 
          icon={Grid} 
          title="Danh mục" 
          value={stats.totalCategories}
          color="bg-purple-600"
        />
        <StatCard 
          icon={TrendingUp} 
          title="Đang bán" 
          value={stats.activeProducts}
          color="bg-green-600"
        />
        <StatCard 
          icon={Eye} 
          title="Tạm ngưng" 
          value={stats.inactiveProducts}
          color="bg-gray-600"
        />
      </div>

      {/* Recent Products */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-800">Sản phẩm gần đây</h2>
          <a href="/admin/products" className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors">
            Xem tất cả →
          </a>
        </div>

        {loading ? (
          <div className="px-6 py-8 text-center text-gray-500">
            Đang tải dữ liệu...
          </div>
        ) : recentProducts.length === 0 ? (
          <div className="px-6 py-8 text-center text-gray-500">
            Chưa có sản phẩm nào
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {recentProducts.map((product) => (
              <div key={product._id} className="px-6 py-4 hover:bg-gray-50 transition-colors flex items-center gap-4">
                {/* Image */}
                <div className="w-12 h-12 rounded-lg overflow-hidden border border-gray-200 bg-white flex-shrink-0">
                  {product.imageUrl ? (
                    <img loading="lazy" src={product.imageUrl} 
                      alt={product.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                      <Package size={20} />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-800 truncate">{product.name}</p>
                  <p className="text-sm text-gray-500">
                    {product.category?.name || 'Không rõ'} • {product.price ? `${product.price.toLocaleString('vi-VN')} đ` : 'Chưa có giá'}
                  </p>
                </div>

                {/* Status */}
                <div className="flex-shrink-0">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    product.status 
                      ? 'bg-green-50 text-green-700' 
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {product.status ? '✓ Đang bán' : 'Tạm ngưng'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl border border-red-200 p-6">
          <h3 className="text-lg font-bold text-red-900 mb-2">Thêm sản phẩm mới</h3>
          <p className="text-red-700 text-sm mb-4">Bổ sung sản phẩm vào hệ thống một cách nhanh chóng</p>
          <a 
            href="/admin/products" 
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
          >
            <Package size={18} />
            Quản lý sản phẩm
          </a>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200 p-6">
          <h3 className="text-lg font-bold text-purple-900 mb-2">Quản lý danh mục</h3>
          <p className="text-purple-700 text-sm mb-4">Tổ chức sản phẩm vào các danh mục phù hợp</p>
          <a 
            href="/admin/categories" 
            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
          >
            <Grid size={18} />
            Quản lý danh mục
          </a>
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h4 className="font-bold text-blue-900 mb-2">💡 Mẹo sử dụng</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Đảm bảo mỗi sản phẩm có hình ảnh chất lượng cao để tăng lực hấp dẫn</li>
          <li>• Cập nhật thông tin sản phẩm và giá thường xuyên để đồng bộ với hệ thống</li>
          <li>• Sử dụng danh mục rõ ràng để giúp khách hàng dễ dàng tìm kiếm sản phẩm</li>
          <li>• Kiểm tra các sản phẩm tạm ngưng và xóa nếu không cần thiết</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;