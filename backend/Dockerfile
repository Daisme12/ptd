# Sử dụng NodeJS phiên bản LTS nhẹ
FROM node:20-alpine

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Sao chép package.json và package-lock.json để tận dụng cache của Docker
COPY package*.json ./

# Cài đặt dependencies (bỏ qua devDependencies cho môi trường production)
RUN npm ci --only=production

# Sao chép toàn bộ mã nguồn backend vào container
COPY . .

# Mở cổng port của backend
EXPOSE 5001

# Khởi chạy ứng dụng
CMD ["npm", "start"]
