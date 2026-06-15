import dotenv from "dotenv";
dotenv.config();

import supabase from "../config/supabase.js";

const test = async () => {
  const { data, error } = await supabase.storage.listBuckets();

  if (error) {
    console.error(error);
    return;
  }

  console.log(data);
};

test();