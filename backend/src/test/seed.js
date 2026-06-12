import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Category from '../models/Category.js';
import Product from '../models/Product.js';

// Load .env file
dotenv.config();

const categories = [
  { name: "Cơm" },
  { name: "Bánh Mì" },
  { name: "Kim Bap" }
];

const products = [
  // Cơm nắm
  { code: "CNTGMV", name: "Cơm Nắm Mix Vị", categoryName: "Cơm" },
  { code: "CNTGVB", name: "Cơm Nắm Vị Bò BBQ", categoryName: "Cơm" },
  { code: "CNTGVCH", name: "Cơm Nắm Vị Cá Hồi", categoryName: "Cơm" },
  { code: "CNTGVG", name: "Cơm Nắm Vị Gà Kem Bơ", categoryName: "Cơm" },
  { code: "CNTGVGPM", name: "Cơm Nắm Vị Gà Phô Mai", categoryName: "Cơm" },
  { code: "CNTGVGT", name: "Cơm Nắm Vị Gà Teriyaki", categoryName: "Cơm" },
  { code: "CNTGVTC", name: "Cơm Nắm Vị Thanh Cua", categoryName: "Cơm" },
  { code: "CNTGVT", name: "Cơm Nắm Vị Tôm Kem Bơ", categoryName: "Cơm" },

  // Sandwich
  { code: "ST-SWB", name: "Sandwich Bò BBQ Phô Mai", categoryName: "Bánh Mì" },
  { code: "ST-SWG", name: "Sandwich Gà Tenders", categoryName: "Bánh Mì" },
  { code: "ST-SWGT", name: "Sandwich Gà Teriyaki", categoryName: "Bánh Mì" },
  { code: "ST-SWPMK", name: "Sandwich Phô Mai Kẹp", categoryName: "Bánh Mì" },

  // Hamburger
  { code: "HB001", name: "Bánh Mỳ Chả Y", categoryName: "Bánh Mì" },
  { code: "HB002", name: "Vỏ Bánh Hamburger", categoryName: "Bánh Mì" },
  { code: "HB003", name: "Bánh Hamburger Thập Cẩm", categoryName: "Bánh Mì" },

  // Kim Bap
  { code: "KB001", name: "Kim Bap Chiên Thanh Cua", categoryName: "Kim Bap" },
  { code: "KB002", name: "Kim Bap Chiên Thanh Gà Phô Mai", categoryName: "Kim Bap" },
  { code: "KB003", name: "Kim Bap Thanh Cua", categoryName: "Kim Bap" },
  { code: "KB004", name: "Kim Bap Thanh Gà Phô Mai", categoryName: "Kim Bap" }
];

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
        console.log('MongoDB connected for seeding');

        // Xoá dữ liệu cũ (tuỳ chọn) để tránh trùng lặp khi chạy nhiều lần
        await Category.deleteMany({});
        await Product.deleteMany({});
        console.log('Đã xoá dữ liệu cũ');

        // Thêm danh mục
        const insertedCategories = await Category.insertMany(categories);
        console.log('Đã thêm dữ liệu Danh mục');

        // Tạo map để lấy ID danh mục dễ dàng
        const categoryMap = {};
        insertedCategories.forEach(category => {
            categoryMap[category.name] = category._id;
        });

        // Định dạng lại sản phẩm với ID danh mục tương ứng
        const formattedProducts = products.map(product => ({
            name: product.name,
            category: categoryMap[product.categoryName],
            // Product schema doesn't have "code" in the model provided, so we'll store code in description if needed, or update model. 
            // Looking back at Product.js, it has: category, name, description, imageUrl, price, status. 
            // So we might skip "code" or put it in description. Let's put in description to not lose data.
            description: `Mã sản phẩm: ${product.code}`,
            price: 0
        }));

        // Thêm sản phẩm
        await Product.insertMany(formattedProducts);
        console.log('Đã thêm dữ liệu Sản phẩm');

        console.log('Seed dữ liệu thành công!');
        process.exit(0);
    } catch (error) {
        console.error('Lỗi khi seed dữ liệu:', error);
        process.exit(1);
    }
};

seedData();