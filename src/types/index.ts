export type ProductType = {
  categoryName: string;
  productName: string;
  description: string;
  imageAlt: string;
  variants: ProductVariant[];
};

export type ProductVariant = {
  id: number;
  size: string;
  sku: string;
  price: string;
  sortOrder: number;
  stockQuantity: number;
};

export type UploadedImage = {
  id: number;
  file: File;
  preview: string;
  name: string;
};
