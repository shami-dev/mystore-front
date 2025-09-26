import { useState } from "react";
import { Modal } from "../components/Modal";
import { totalItems } from "../MainLayout";

const product1 = {
  id: 111,
  name: "Women's Dri-FIT Short-Sleeve Top",
  description: "Lightweight short-sleeve top with sweat-wicking fabric.",
  priceCents: 3299,
  imageUrl1:
    "https://res.cloudinary.com/djqdtvv7u/image/upload/v1758312817/Women_s_Dri-FIT_Short-Sleeve_Top_bbsruu.avif",
  imageAlt: "Women's Dri-FIT Short-Sleeve Top in White",
  variants: [
    {
      sku: "18101-XXS",
      size: "XXS",
      stockQuantity: 0,
    },
    {
      sku: "18101-XS",
      size: "XS",
      stockQuantity: 0,
    },
    {
      sku: "18101-S",
      size: "S",
      stockQuantity: 0,
    },
    {
      sku: "18101-M",
      size: "M",
      stockQuantity: 0,
    },
    {
      sku: "18101-L",
      size: "L",
      stockQuantity: 0,
    },
    {
      sku: "18101-XL",
      size: "XL",
      stockQuantity: 2,
    },
    {
      sku: "18101-XXL",
      size: "XXL",
      stockQuantity: 0,
    },
  ],
};

export function ProductDetailPage() {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const allOutOfStock =
    product1?.variants.every((variant) => variant.stockQuantity === 0) ?? false;

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto px-4">
      <div className="flex flex-col md:items-end">
        <img
          src={product1.imageUrl1}
          alt={product1.imageAlt}
          className="rounded-lg md:max-h-[480px] object-contain"
        />
      </div>

      <div className="flex flex-col gap-6 md:max-w-96">
        <div>
          <h1 className="text-xl font-semibold">{product1.name}</h1>
          <p className="text-gray-600">{product1.description}</p>
          <p className="text-xl text-gray-800 mt-2">
            €{(product1.priceCents / 100).toFixed(2)}
          </p>
        </div>

        {product1?.variants?.length ? (
          <div>
            <p className="mb-2 font-medium">Size</p>
            <div className="grid grid-cols-2 gap-3 max-w-60">
              {product1.variants.map((variant) => (
                <button
                  key={variant.sku}
                  onClick={() => setSelectedSize(variant.size)}
                  disabled={variant.stockQuantity === 0}
                  className={`px-3 py-1 rounded-md border border-gray-300 hover:border-gray-900 ${
                    selectedSize === variant.size
                      ? "border-gray-900"
                      : "border-gray-300"
                  } ${
                    variant.stockQuantity === 0
                      ? "opacity-40 cursor-not-allowed"
                      : ""
                  }`}
                >
                  {variant.size}
                </button>
              ))}
            </div>
          </div>
        ) : null}
        <Modal
          allOutOfStock={allOutOfStock}
          productName={product1.name}
          productSize={selectedSize}
          productPrice={product1.priceCents}
          productCount={totalItems}
        />
      </div>
    </div>
  );
}
