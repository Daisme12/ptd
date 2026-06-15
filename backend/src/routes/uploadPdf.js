import fs from "fs";
import supabase from "../config/supabase.js";

const uploadPdfToSupabase = async (file) => {
  const fileName = `${Date.now()}-${file.originalname}`;

  const { error } = await supabase.storage
    .from("ptd-pdf")
    .upload(fileName, file.buffer, {
      contentType: "application/pdf",
      upsert: false,
    });

  if (error) {
    throw error;
  }

  const { data } = supabase.storage
    .from("ptd-pdf")
    .getPublicUrl(fileName);

  return data.publicUrl;
};

const uploadPdfToSupabase = async (file) => {
    const fileBuffer = fs.readFileSync(file.path);

    const fileName = `${Date.now()}-${file.originalname}`;

    const { error } = await supabase.storage
        .from("ptd-pdf")
        .upload(fileName, fileBuffer, {
            contentType: "application/pdf",
            upsert: false,
        });

    if (error) {
        throw error;
    }

    const { data } = supabase.storage
        .from("ptd-pdf")
        .getPublicUrl(fileName);

    return data.publicUrl;
};
export { uploadPdf, uploadPdfToSupabase };