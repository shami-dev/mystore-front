import { Link, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Card } from "../components/Card";
import { getProducts } from "../api/products";
import type { ProductListType } from "../types";

export function ProductListPage() {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("categoryId");

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery<ProductListType[]>({
    queryKey: ["products", categoryId],
    queryFn: () => getProducts(categoryId ? parseInt(categoryId) : undefined),
  });

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (isError)
    return (
      <div className="text-center text-red-500">Failed to load products.</div>
    );

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 justify-items-center max-w-7xl mx-auto px-4">
      {products?.map((p) => (
        <Link to={`/products/${p.id}`} key={p.id}>
          <Card
            name={p.name}
            priceRange={p.priceRange}
            imageUrl1={p.imageUrl1}
            imageAlt={p.imageAlt}
          />
        </Link>
      ))}
    </div>
  );
}
