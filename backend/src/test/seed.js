import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Category from '../models/Category.js';
import Product from '../models/Product.js';
import createSlug from '../utils/slugify.js';

// Load .env file
dotenv.config();

const categories = [
  {
    name: "Cơm nắm",
    description: "Dòng sản phẩm chủ lực với nhiều hương vị đặc trưng.",
    imageUrl: "https://res.cloudinary.com/dzz1nibmx/image/upload/v1781283629/ptd_project/categories/eef2j5rqdrslu7wcip77.png"
  },
  {
    name: "Cơm cuộn",
    description: "Sự kết hợp hoàn hảo giữa cơm và các loại nhân tươi.",
    imageUrl: "https://res.cloudinary.com/dzz1nibmx/image/upload/v1781283632/ptd_project/categories/jquhvkm6gjtj6y8rfiz9.png"
  },
  {
    name: "Sandwich",
    description: "Bánh mì kẹp nhân đa dạng, tiện lợi cho bữa sáng và giải lao.",
    imageUrl: "https://res.cloudinary.com/dzz1nibmx/image/upload/v1781283631/ptd_project/categories/qe7ti3co0mnixs2m4pwp.png"
  },
  {
    name: "Trà sữa",
    description: "Thức uống giải nhiệt yêu thích của giới trẻ và học sinh.",
    imageUrl: "https://res.cloudinary.com/dzz1nibmx/image/upload/v1781283634/ptd_project/categories/oqeupkboafzmyifwaqtx.avif"
  }
];

const sampleImageUrl = "https://res.cloudinary.com/dzz1nibmx/image/upload/v1780914867/xl5cgkiahgwnl4njvvvv.png";

const products = [
  // Cơm nắm
  { code: "CNTGMV", name: "Cơm Nắm Mix Vị", categoryName: "Cơm nắm" },
  { code: "CNTGVB", name: "Cơm Nắm Vị Bò BBQ", categoryName: "Cơm nắm" },
  { code: "CNTGVCH", name: "Cơm Nắm Vị Cá Hồi", categoryName: "Cơm nắm" },
  { code: "CNTGVG", name: "Cơm Nắm Vị Gà Kem Bơ", categoryName: "Cơm nắm" },
  { code: "CNTGVGPM", name: "Cơm Nắm Vị Gà Phô Mai", categoryName: "Cơm nắm" },
  { code: "CNTGVGT", name: "Cơm Nắm Vị Gà Teriyaki", categoryName: "Cơm nắm" },
  { code: "CNTGVTC", name: "Cơm Nắm Vị Thanh Cua", categoryName: "Cơm nắm" },
  { code: "CNTGVT", name: "Cơm Nắm Vị Tôm Kem Bơ", categoryName: "Cơm nắm" },

  // Sandwich & Hamburger (Gộp chung vào Sandwich do danh mục Bánh Mì đã được đổi tên)
  { code: "ST-SWB", name: "Sandwich Bò BBQ Phô Mai", categoryName: "Sandwich" },
  { code: "ST-SWG", name: "Sandwich Gà Tenders", categoryName: "Sandwich" },
  { code: "ST-SWGT", name: "Sandwich Gà Teriyaki", categoryName: "Sandwich" },
  { code: "ST-SWPMK", name: "Sandwich Phô Mai Kẹp", categoryName: "Sandwich" },
  { code: "HB001", name: "Bánh Mỳ Chả Y", categoryName: "Sandwich" },
  { code: "HB002", name: "Vỏ Bánh Hamburger", categoryName: "Sandwich" },
  { code: "HB003", name: "Bánh Hamburger Thập Cẩm", categoryName: "Sandwich" },

  // Cơm cuộn (Kim Bap)
  { code: "KB001", name: "Kim Bap Chiên Thanh Cua", categoryName: "Cơm cuộn" },
  { code: "KB002", name: "Kim Bap Chiên Thanh Gà Phô Mai", categoryName: "Cơm cuộn" },
  { code: "KB003", name: "Kim Bap Thanh Cua", categoryName: "Cơm cuộn" },
  { code: "KB004", name: "Kim Bap Thanh Gà Phô Mai", categoryName: "Cơm cuộn" },

  // Trà sữa
  { code: "TS001", name: "Trà sữa trân châu đường đen", categoryName: "Trà sữa" },
  { code: "TS002", name: "Trà sữa Matcha", categoryName: "Trà sữa" }
];

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
        console.log('MongoDB connected for seeding');

        const categoryCount = await Category.countDocuments();
        const productCount = await Product.countDocuments();

        if (categoryCount > 0 || productCount > 0) {
            await Category.deleteMany({});
            await Product.deleteMany({});
            console.log('Đã xoá dữ liệu cũ');
        } else {
            console.log('Chưa có dữ liệu cũ, bỏ qua bước xoá');
        }

        // Thêm danh mục
        const formattedCategories = categories.map(category => ({
            ...category,
            slug: createSlug(category.name)
        }));

        const insertedCategories = await Category.insertMany(formattedCategories);
        console.log('Đã thêm dữ liệu Danh mục');

        // Tạo map để lấy ID danh mục dễ dàng
        const categoryMap = {};
        insertedCategories.forEach(category => {
            categoryMap[category.name] = category._id;
        });

        // Định dạng lại sản phẩm với ID danh mục tương ứng
        const formattedProducts = products.map(product => ({
            name: product.name,
            slug: createSlug(product.name),
            category: categoryMap[product.categoryName],
            // Product schema doesn't have "code" in the model provided, so we'll store code in description if needed, or update model. 
            // Looking back at Product.js, it has: category, name, description, imageUrl, price, status. 
            // So we might skip "code" or put it in description. Let's put in description to not lose data.
            description: `Mã sản phẩm: ${product.code}`,
            imageUrl: sampleImageUrl,
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
