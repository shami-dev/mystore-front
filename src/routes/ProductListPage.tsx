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

  if (!products || products.length === 0)
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="bg-base-200 rounded-md p-10 shadow-inner max-w-md">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-semibold mb-2">No products yet</h2>
          <p className="text-gray-500 mb-6">
            Your shop looks a bit empty. Let’s add your first product and make
            it shine!
          </p>
          <Link
            to="/internal-management/add-product"
            className="btn btn-outline btn-wide"
          >
            ➕ Create Product
          </Link>
        </div>
      </div>
    );

  return (
    <div className="py-8">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6 max-w-7xl mx-auto px-4">
        {products?.map((p) => (
          <Link
            to={`/products/${p.id}`}
            key={p.id}
            className="group"
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
    </div>
  );
}
