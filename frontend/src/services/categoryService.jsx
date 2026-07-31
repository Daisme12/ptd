import { db } from "../config/firebase";
import { collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc, query, orderBy } from "firebase/firestore";

export const getCategories = async () => {
  const q = query(collection(db, "categories"), orderBy("name", "asc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(docSnap => ({ _id: docSnap.id, ...docSnap.data() }));
};

export const getCategoryById = async (id) => {
  const docRef = doc(db, "categories", id);
  const snap = await getDoc(docRef);
  if (!snap.exists()) throw new Error("Category not found");
  return { _id: snap.id, ...snap.data() };
};

export const createCategory = async (categoryData) => {
  const data = {
    ...categoryData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  const docRef = await addDoc(collection(db, "categories"), data);
  return { _id: docRef.id, ...data };
};

export const updateCategory = async (id, categoryData) => {
  const docRef = doc(db, "categories", id);
  const data = {
    ...categoryData,
    updatedAt: new Date().toISOString()
  };
  delete data._id;
  await updateDoc(docRef, data);
  return { _id: id, ...data };
};

export const deleteCategory = async (id) => {
  const docRef = doc(db, "categories", id);
  await deleteDoc(docRef);
  return { message: "Delete category successfully" };
};
