import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5RM2rpdp4X3thtrRoSZ-plATqL9Hzvic",
  authDomain: "thinhphongdo-58625.firebaseapp.com",
  projectId: "thinhphongdo-58625",
  storageBucket: "thinhphongdo-58625.firebasestorage.app",
  messagingSenderId: "286171840855",
  appId: "1:286171840855:web:a345d9a65ece3b22a47e12",
  measurementId: "G-Q9YGHGXS68"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
let analytics = null;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

// Helper function to upload file (checks Cloudinary settings first, falls back to Firebase Storage)
export const uploadFileToStorage = async (file, folderPath = "products") => {
  if (!file) return "";

  try {
    const docRef = doc(db, "settings", "general");
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      const data = snap.data();
      if (data.cloudinaryCloudName && data.cloudinaryUploadPreset) {
        console.log("Cloudinary credentials found. Uploading to Cloudinary...");
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", data.cloudinaryUploadPreset);
        formData.append("folder", folderPath);

        const res = await fetch(`https://api.cloudinary.com/v1_1/${data.cloudinaryCloudName}/image/upload`, {
          method: "POST",
          body: formData
        });

        if (res.ok) {
          const resData = await res.json();
          return resData.secure_url;
        } else {
          console.error("Cloudinary upload request failed:", await res.text());
        }
      }
    }
  } catch (error) {
    console.error("Cloudinary configuration check failed, falling back to Firebase Storage:", error);
  }

  // Fallback to Firebase Storage
  console.log("Falling back to Firebase Storage upload...");
  const uniqueName = `${Date.now()}-${file.name}`;
  const fileRef = ref(storage, `${folderPath}/${uniqueName}`);
  await uploadBytes(fileRef, file);
  return await getDownloadURL(fileRef);
};

export { app, db, storage, analytics };
