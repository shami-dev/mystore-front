import { Link, useSearchParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Card } from "../components/Card";
import { getProductById, getProducts } from "../api/products";
import type { ProductListType } from "../types";
import { Loader } from "../components/Loader";
import { ErrorMessage } from "../components/ErrorMessage";

export function ProductListPage() {
  const queryClient = useQueryClient();

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

  if (isLoading) return <Loader />;
  if (isError) return <ErrorMessage message="Oops! Failed to load products." />;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 justify-items-center max-w-7xl mx-auto px-4">
      {products?.map((p) => (
        <Link
          to={`/products/${p.id}`}
          key={p.id}
          onMouseEnter={() =>
            queryClient.prefetchQuery({
              queryKey: ["product", p.id],
              queryFn: () => getProductById(p.id),
            })
          }
          onFocus={() =>
            queryClient.prefetchQuery({
              queryKey: ["product", p.id],
              queryFn: () => getProductById(p.id),
            })
          }
        >
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
