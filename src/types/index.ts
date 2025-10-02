export type ProductType = {
  categoryId: string;
  name: string;
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
  stockQuantity: string;
};

export type UploadedImage = {
  id: number;
  file: File;
  preview: string;
  url?: string;
  name: string;
};
