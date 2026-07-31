import { db } from "../config/firebase";
import { collection, addDoc, getDocs, doc, deleteDoc, query, orderBy } from "firebase/firestore";

export const createContact = async (contactData) => {
  const data = {
    fullName: contactData.fullName || contactData.name || "",
    phone: contactData.phone || "",
    email: contactData.email || "",
    service: contactData.service || "",
    requestType: contactData.requestType || "partner_consultation",
    source: contactData.source || "",
    status: contactData.status || "new",
    message: contactData.message || contactData.note || contactData.content || "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  const docRef = await addDoc(collection(db, "contacts"), data);
  return { _id: docRef.id, ...data };
};

export const getContacts = async () => {
  const q = query(collection(db, "contacts"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(docSnap => ({ _id: docSnap.id, ...docSnap.data() }));
};

export const deleteContact = async (id) => {
  const docRef = doc(db, "contacts", id);
  await deleteDoc(docRef);
  return { message: "Deleted contact successfully" };
};
