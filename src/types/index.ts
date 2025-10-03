export type ProductListType = {
  id: number;
  name: string;
  imageUrl1: string;
  imageUrl2: string;
  imageAlt: string;
  priceRange: {
    min: number;
    max: number;
  };
};

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
