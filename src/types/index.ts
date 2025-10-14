export type ProductDetailType = {
  id: number;
  name: string;
  description: string;
  imageUrl1: string;
  imageUrl2: string;
  imageAlt: string;
  variants: {
    sku: string;
    size: string;
    stockQuantity: number;
    price: number;
  }[];
};

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

export type NavBarProps = {
  totalItems: number;
};

export type CategoryType = {
  id: number;
  name: string;
};
