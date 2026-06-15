import api from "./api";

export const getProducts = async () => {
  const response = await api.get("/products");
  return response.data;
};

export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const getProductBySlug = async (slug) => {
  const response = await api.get(`/products/slug/${slug}`);
  return response.data;
};