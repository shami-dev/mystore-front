import type { ProductListType } from "../types";
import type { ProductInput } from "../validation/product";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export async function addProduct(params: ProductInput) {
  try {
    const res = await fetch(`${API_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData?.error || "Failed to create product");
    }

    return await res.json();
  } catch (err) {
    console.error("addProduct error:", err);
    throw err;
  }
}

export async function getProducts(): Promise<ProductListType[]> {
  try {
    const response = await fetch(`${API_URL}/products`);
    if (!response.ok) {
      throw new Error(`Error fetching products: ${response.statusText}`);
    }
    const data: ProductListType[] = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return [];
  }
}
