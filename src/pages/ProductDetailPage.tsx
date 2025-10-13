import { useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../api/products";
import type { ProductDetailType } from "../types";
import { Modal } from "../components/Modal";

type OutletContextType = {
  totalItems: number;
  handleAddToCart: () => void;
};

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { handleAddToCart, totalItems } = useOutletContext<OutletContextType>();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [hasError, setHasError] = useState(false);

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery<ProductDetailType>({
    queryKey: ["product", id],
    queryFn: () => getProductById(Number(id)),
    enabled: !!id,
  });

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (isError || !product)
    return <div className="text-center text-red-500">Product not found.</div>;

  const allOutOfStock = product.variants.every(
    (variant) => variant.stockQuantity === 0
  );

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto px-4">
      <div className="flex flex-col md:items-end">
        <img
          src={product.imageUrl1}
          alt={product.imageAlt}
          className="rounded-lg md:max-h-[480px] object-contain"
        />
      </div>

      <div className="flex flex-col gap-6 md:max-w-96">
        <div>
          <h1 className="text-xl font-semibold">{product.name}</h1>
          <p className="text-gray-600">{product.description}</p>
          {product.variants.length > 0 && (
            <p className="text-xl text-gray-800 mt-2">
              €{(product.variants[0].price / 100).toFixed(2)}
            </p>
          )}
        </div>

        {product?.variants?.length ? (
          <div>
            <p className={`mb-2 font-medium ${hasError ? "text-red-600" : ""}`}>
              Select size
            </p>
            <div
              className={`grid grid-cols-2 gap-3 max-w-60 pt-3 ${
                hasError ? "border border-red-600 rounded-md" : ""
              }`}
            >
              {product.variants.map((variant) => (
                <button
                  key={variant.sku}
                  onClick={() => setSelectedSize(variant.size)}
                  disabled={variant.stockQuantity === 0}
                  className={`px-3 py-1 rounded-md border hover:border-gray-900 ${
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
            {hasError && (
              <p className="mt-2 text-red-600">Please select a size.</p>
            )}
          </div>
        ) : null}

        <Modal
          allOutOfStock={allOutOfStock}
          productName={product.name}
          productSize={selectedSize}
          productPrice={product.variants[0]?.price ?? 0}
          totalItems={totalItems}
          onValidationError={setHasError}
          onAddToCart={handleAddToCart}
        />
      </div>
    </div>
  );
}
