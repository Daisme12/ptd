import { db } from "../config/firebase";
import { collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc, setDoc, query, orderBy } from "firebase/firestore";

// --- CRUD for Certificates list ---
export const getCertificates = async () => {
  const q = query(collection(db, "certificates"), orderBy("order", "asc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() }));
};

export const createCertificate = async (certData) => {
  const data = {
    ...certData,
    order: Number(certData.order) || 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  const docRef = await addDoc(collection(db, "certificates"), data);
  return { id: docRef.id, ...data };
};

export const updateCertificate = async (id, certData) => {
  const docRef = doc(db, "certificates", id);
  const data = {
    ...certData,
    order: Number(certData.order) || 0,
    updatedAt: new Date().toISOString()
  };
  delete data.id;
  await updateDoc(docRef, data);
  return { id, ...data };
};

export const deleteCertificate = async (id) => {
  const docRef = doc(db, "certificates", id);
  await deleteDoc(docRef);
  return { message: "Delete certificate successfully" };
};

// --- Profile URL (Hồ sơ năng lực) settings ---
export const getProfileUrl = async () => {
  try {
    const docRef = doc(db, "settings", "general");
    const snap = await getDoc(docRef);
    if (snap.exists() && snap.data().profileUrl) {
      return snap.data().profileUrl;
    }
  } catch (error) {
    console.error("Error getting profile url:", error);
  }
  return "/Profile.pdf"; // Fallback to local default file
};

export const updateProfileUrl = async (url) => {
  const docRef = doc(db, "settings", "general");
  await setDoc(docRef, {
    profileUrl: url,
    updatedAt: new Date().toISOString()
  }, { merge: true });
  return url;
};

// --- General Settings helper ---
export const getGeneralSettings = async () => {
  try {
    const docRef = doc(db, "settings", "general");
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return snap.data();
    }
  } catch (error) {
    console.error("Error getting general settings:", error);
  }
  return {};
};

export const updateGeneralSettings = async (settingsData) => {
  const docRef = doc(db, "settings", "general");
  const data = {
    ...settingsData,
    updatedAt: new Date().toISOString()
  };
  await setDoc(docRef, data, { merge: true });
  return data;
};
