import dotenv from 'dotenv';
import { db } from '../config/firebase.js';
import createSlug from '../utils/slugify.js';

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
const sampleDeclarationPdf = "https://res.cloudinary.com/dzz1nibmx/image/upload/v1780914867/ptd_project/docs/sample_declaration.pdf";
const sampleTestResultPdf = "https://res.cloudinary.com/dzz1nibmx/image/upload/v1780914867/ptd_project/docs/sample_test_result.pdf";

const products = [
  // Cơm nắm
  {
    code: "CNTGMV", name: "Cơm Nắm Mix Vị", categoryName: "Cơm nắm",
    description: "Cơm nắm tổng hợp nhiều vị trong một phần, phù hợp cho bữa ăn nhanh đa dạng.",
    price: 25000
  },
  {
    code: "CNTGVB", name: "Cơm Nắm Vị Bò BBQ", categoryName: "Cơm nắm",
    description: "Cơm nắm nhân bò BBQ đậm đà, hương vị nướng quyến rũ.",
    price: 28000
  },
  {
    code: "CNTGVCH", name: "Cơm Nắm Vị Cá Hồi", categoryName: "Cơm nắm",
    description: "Cơm nắm nhân cá hồi tươi ngon, giàu Omega-3 bổ dưỡng.",
    price: 32000
  },
  {
    code: "CNTGVG", name: "Cơm Nắm Vị Gà Kem Bơ", categoryName: "Cơm nắm",
    description: "Cơm nắm nhân gà kem bơ béo ngậy, thơm ngon khó cưỡng.",
    price: 27000
  },
  {
    code: "CNTGVGPM", name: "Cơm Nắm Vị Gà Phô Mai", categoryName: "Cơm nắm",
    description: "Cơm nắm nhân gà phô mai kéo sợi, yêu thích của học sinh.",
    price: 28000
  },
  {
    code: "CNTGVGT", name: "Cơm Nắm Vị Gà Teriyaki", categoryName: "Cơm nắm",
    description: "Cơm nắm nhân gà sốt Teriyaki chuẩn Nhật, vị ngọt mặn hài hòa.",
    price: 27000
  },
  {
    code: "CNTGVTC", name: "Cơm Nắm Vị Thanh Cua", categoryName: "Cơm nắm",
    description: "Cơm nắm nhân thanh cua mayo, vị biển tươi mát.",
    price: 25000
  },
  {
    code: "CNTGVT", name: "Cơm Nắm Vị Tôm Kem Bơ", categoryName: "Cơm nắm",
    description: "Cơm nắm nhân tôm kem bơ thơm lừng, hấp dẫn từ miếng đầu tiên.",
    price: 30000
  },

  // Sandwich & Hamburger
  {
    code: "ST-SWB", name: "Sandwich Bò BBQ Phô Mai", categoryName: "Sandwich",
    description: "Sandwich nhân bò BBQ kết hợp phô mai tan chảy, đậm đà hương vị.",
    price: 35000
  },
  {
    code: "ST-SWG", name: "Sandwich Gà Tenders", categoryName: "Sandwich",
    description: "Sandwich gà tenders giòn rụm, kèm rau tươi và sốt đặc biệt.",
    price: 32000
  },
  {
    code: "ST-SWGT", name: "Sandwich Gà Teriyaki", categoryName: "Sandwich",
    description: "Sandwich gà Teriyaki ngọt mặn, kết hợp rau xanh tươi mát.",
    price: 33000
  },
  {
    code: "ST-SWPMK", name: "Sandwich Phô Mai Kẹp", categoryName: "Sandwich",
    description: "Sandwich phô mai kẹp đơn giản nhưng hấp dẫn, phù hợp bữa sáng.",
    price: 25000
  },
  {
    code: "HB001", name: "Bánh Mỳ Chả Y", categoryName: "Sandwich",
    description: "Bánh mỳ truyền thống kẹp chả lụa thơm ngon.",
    price: 20000
  },
  {
    code: "HB002", name: "Vỏ Bánh Hamburger", categoryName: "Sandwich",
    description: "Vỏ bánh hamburger mềm xốp, sản xuất từ nguyên liệu sạch.",
    price: 8000
  },
  {
    code: "HB003", name: "Bánh Hamburger Thập Cẩm", categoryName: "Sandwich",
    description: "Hamburger thập cẩm đầy đặn với thịt, rau và sốt đặc biệt.",
    price: 38000
  },

  // Cơm cuộn (Kim Bap)
  {
    code: "KB001", name: "Kim Bap Chiên Thanh Cua", categoryName: "Cơm cuộn",
    description: "Kim bap chiên giòn nhân thanh cua, lớp vỏ giòn rụm bên ngoài.",
    price: 30000
  },
  {
    code: "KB002", name: "Kim Bap Chiên Thanh Gà Phô Mai", categoryName: "Cơm cuộn",
    description: "Kim bap chiên nhân gà phô mai kéo sợi, ăn vặt tuyệt vời.",
    price: 32000
  },
  {
    code: "KB003", name: "Kim Bap Thanh Cua", categoryName: "Cơm cuộn",
    description: "Kim bap cuộn thanh cua truyền thống kiểu Hàn Quốc.",
    price: 28000
  },
  {
    code: "KB004", name: "Kim Bap Thanh Gà Phô Mai", categoryName: "Cơm cuộn",
    description: "Kim bap cuộn gà phô mai, nhân đầy đặn, vị béo ngậy.",
    price: 30000
  },

  // Trà sữa
  {
    code: "TS001", name: "Trà sữa trân châu đường đen", categoryName: "Trà sữa",
    description: "Trà sữa trân châu đường đen thơm ngọt, trân châu dẻo dai.",
    price: 25000
  },
  {
    code: "TS002", name: "Trà sữa Matcha", categoryName: "Trà sữa",
    description: "Trà sữa Matcha Nhật Bản, vị trà xanh thanh mát hòa quyện sữa béo.",
    price: 28000
  }
];

const seedFirestore = async () => {
  try {
    if (!db) {
      throw new Error("Không thể kết nối đến Firestore. Vui lòng kiểm tra lại cấu hình hoặc tệp serviceAccountKey.json.");
    }

    console.log("Bắt đầu xóa dữ liệu cũ trên Firestore...");
    
    // Xóa categories
    const categoriesSnapshot = await db.collection("categories").get();
    const catDeletePromises = categoriesSnapshot.docs.map(doc => doc.ref.delete());
    await Promise.all(catDeletePromises);
    console.log("Đã xóa xong danh mục cũ.");

    // Xóa products
    const productsSnapshot = await db.collection("products").get();
    const prodDeletePromises = productsSnapshot.docs.map(doc => doc.ref.delete());
    await Promise.all(prodDeletePromises);
    console.log("Đã xóa xong sản phẩm cũ.");

    console.log("Đang import Danh mục mới...");
    const categoryMap = {};
    for (const cat of categories) {
      const slug = createSlug(cat.name);
      const docRef = await db.collection("categories").add({
        name: cat.name,
        description: cat.description,
        imageUrl: cat.imageUrl,
        slug: slug,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      categoryMap[cat.name] = docRef.id;
      console.log(`Đã thêm danh mục: ${cat.name} (ID: ${docRef.id})`);
    }

    console.log("Đang import Sản phẩm mới...");
    for (const prod of products) {
      const slug = createSlug(prod.name);
      const catId = categoryMap[prod.categoryName] || "";
      const docRef = await db.collection("products").add({
        code: prod.code,
        name: prod.name,
        slug: slug,
        category: catId,
        description: prod.description,
        imageUrl: sampleImageUrl,
        price: prod.price,
        status: true,
        documents: [
          {
            title: "Bản công bố sản phẩm",
            fileUrl: sampleDeclarationPdf
          },
          {
            title: "Phiếu kết quả xét nghiệm",
            fileUrl: sampleTestResultPdf
          }
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      console.log(`Đã thêm sản phẩm: ${prod.name} (ID: ${docRef.id})`);
    }

    console.log("\n>>> Đã đẩy dữ liệu thử nghiệm lên Firebase Firestore thành công! <<<");
    process.exit(0);
  } catch (error) {
    console.error("Lỗi khi đẩy dữ liệu lên Firestore:", error);
    process.exit(1);
  }
};

seedFirestore();
