# PTD Project - Website Công ty Thịnh Phong Đỗ

Dự án này là một ứng dụng Web Fullstack được xây dựng cho công ty **Thịnh Phong Đỗ**, chuyên sản xuất, sơ chế, cung cấp suất ăn và dịch vụ canteen cho trường học, nhà máy và chuỗi siêu thị.

Ứng dụng cung cấp các tính năng quản lý sản phẩm, danh mục, tin nhắn liên hệ từ khách hàng (hệ thống Admin) và giao diện giới thiệu sản phẩm, dịch vụ cho khách hàng.

Hệ thống bao gồm 2 phần chính:
- **Backend:** Node.js (Express) kết nối với MongoDB.
- **Frontend:** React (sử dụng Vite).

## 📂 Cấu trúc thư mục

- `backend/`: Chứa toàn bộ mã nguồn của server API, xử lý logic và kết nối cơ sở dữ liệu.
- `frontend/`: Chứa mã nguồn của giao diện người dùng (Client).

## 🚀 Hướng dẫn cài đặt và khởi chạy

Dưới đây là các bước để chạy dự án trên máy (local).

### 1. Cài đặt thư viện (Dependencies)

Mở terminal và chạy lệnh cài đặt cho cả 2 thư mục:

```bash
# Cài đặt cho Backend
cd backend
npm install

# Cài đặt cho Frontend
cd ../frontend
npm install
```

### 2. Cấu hình biến môi trường (.env)

Cả frontend và backend đều cần các cấu hình môi trường riêng:
- **Backend (`backend/.env`)**: Bạn cần cấu hình các thông số như `PORT`, `MONGODB_CONNECTION_STRING`, `SUPABASE_URL`, v.v...
- **Frontend (`frontend/.env`)**: Cấu hình `VITE_API_URL` để trỏ tới địa chỉ của Backend (thường là `http://localhost:5001`).

### 3. Khởi chạy ứng dụng

Bạn cần mở 2 cửa sổ terminal riêng biệt để chạy song song:

**Khởi chạy Backend:**
```bash
cd backend
npm run dev
```

**Khởi chạy Frontend:**
```bash
cd frontend
npm run dev
```
