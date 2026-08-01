# Stage 1: Build ứng dụng React với Node
FROM node:24-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

# Khai báo các đối số Build-time cho Vite
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build


# Stage 2: Serve với Nginx
FROM nginx:alpine

# Sao chép kết quả build từ Stage 1 vào thư mục gốc của Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Sao chép file cấu hình Nginx để hỗ trợ SPA Routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Mở cổng 80 cho container
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
