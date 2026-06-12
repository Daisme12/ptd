NODE_ENV = mặc định là development khi lên web là production

DEV TOOL 
nodemon rest khi cập nhật ( chỉ thay đổi js và không dùng thi )
  "devDependencies": {
    "nodemon": "^3.1.14"
  } 
  không đẩy lên production không cần thiết thì viết vào đây
  
1 STATIC FIle - đặt tên public cho phép client xem (css,js,img,)
app.user(express.static('public))

Mô hình MVC
Design Patten 
Mô hình MVC
model - view - controller

controllers
models
routes
services
middleware
migration: cấu hình database
seeder: tạo data 
config

