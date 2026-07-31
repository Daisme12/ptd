import { db } from "../config/firebase";
import { collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc, query, where, limit } from "firebase/firestore";

export const getProducts = async () => {
  const snapshot = await getDocs(collection(db, "products"));
  const products = [];
  const categoryIds = [...new Set(snapshot.docs.map(docSnap => docSnap.data().category).filter(Boolean))];
  const categoryMap = {};

  if (categoryIds.length > 0) {
    try {
      const catSnap = await getDocs(collection(db, "categories"));
      catSnap.forEach(cDoc => {
        categoryMap[cDoc.id] = { _id: cDoc.id, ...cDoc.data() };
      });
    } catch (e) {
      console.error("Lỗi lấy danh mục ở frontend:", e);
    }
  }

  snapshot.docs.forEach(docSnap => {
    const data = docSnap.data();
    products.push({
      _id: docSnap.id,
      ...data,
      category: categoryMap[data.category] || null
    });
  });
  return products;
};

export const getProductById = async (id) => {
  const snap = await getDoc(doc(db, "products", id));
  if (!snap.exists()) throw new Error("Product not found");
  const data = snap.data();
  let categoryData = null;

  if (data.category) {
    const catSnap = await getDoc(doc(db, "categories", data.category));
    if (catSnap.exists()) {
      categoryData = { _id: catSnap.id, ...catSnap.data() };
    }
  }

  return {
    _id: snap.id,
    ...data,
    category: categoryData
  };
};

export const getProductBySlug = async (slug) => {
  const q = query(
    collection(db, "products"),
    where("slug", "==", slug),
    where("status", "==", true),
    limit(1)
  );
  
  const snapshot = await getDocs(q);
  if (snapshot.empty) throw new Error("Không tìm thấy sản phẩm");

  const docSnap = snapshot.docs[0];
  const productData = docSnap.data();
  let categoryData = null;

  if (productData.category) {
    const catSnap = await getDoc(doc(db, "categories", productData.category));
    if (catSnap.exists()) {
      categoryData = { _id: catSnap.id, ...catSnap.data() };
    }
  }

  const product = {
    _id: docSnap.id,
    ...productData,
    category: categoryData
  };

  // Lấy sản phẩm liên quan
  let relatedProducts = [];
  if (productData.category) {
    const rq = query(
      collection(db, "products"),
      where("category", "==", productData.category),
      where("status", "==", true),
      limit(5)
    );
    const rSnapshot = await getDocs(rq);
    rSnapshot.forEach(rDoc => {
      if (rDoc.id !== docSnap.id && relatedProducts.length < 4) {
        relatedProducts.push({
          _id: rDoc.id,
          ...rDoc.data()
        });
      }
    });
  }

  // Lấy thêm sản phẩm nếu không đủ 4
  if (relatedProducts.length < 4) {
    const excludeIds = [docSnap.id, ...relatedProducts.map(p => p._id)];
    const aq = query(
      collection(db, "products"),
      where("status", "==", true),
      limit(10)
    );
    const aSnapshot = await getDocs(aq);
    aSnapshot.forEach(aDoc => {
      if (!excludeIds.includes(aDoc.id) && relatedProducts.length < 4) {
        relatedProducts.push({
          _id: aDoc.id,
          ...aDoc.data()
        });
      }
    });
  }

  // Populate categories cho related products
  const relatedCatIds = [...new Set(relatedProducts.map(p => p.category).filter(Boolean))];
  const relatedCatMap = {};
  if (relatedCatIds.length > 0) {
    const catsSnap = await getDocs(collection(db, "categories"));
    catsSnap.forEach(cDoc => {
      relatedCatMap[cDoc.id] = { _id: cDoc.id, name: cDoc.data().name, slug: cDoc.data().slug };
    });
  }

  relatedProducts = relatedProducts.map(p => ({
    ...p,
    category: relatedCatMap[p.category] || null
  }));

  return {
    success: true,
    data: product,
    relatedProducts
  };
};

export const createProduct = async (productData) => {
  const data = {
    ...productData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  const docRef = await addDoc(collection(db, "products"), data);
  return { _id: docRef.id, ...data };
};

export const updateProduct = async (id, productData) => {
  const docRef = doc(db, "products", id);
  const data = {
    ...productData,
    updatedAt: new Date().toISOString()
  };
  delete data._id;
  await updateDoc(docRef, data);
  return { _id: id, ...data };
};

export const deleteProduct = async (id) => {
  const docRef = doc(db, "products", id);
  await deleteDoc(docRef);
  return { message: "Deleted successfully" };
};