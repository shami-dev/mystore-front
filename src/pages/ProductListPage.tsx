import { Link } from "react-router-dom";
import { Card } from "../components/Card";
import { getProducts } from "../api/products";
import { useEffect, useState } from "react";
import type { ProductListType } from "../types";

export function ProductListPage() {
  const [products, setProducts] = useState<ProductListType[]>([]);

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
    });
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 justify-items-center max-w-7xl mx-auto px-4">
      {products.map((p) => (
        <Link to={`/products/${p.id}`} key={p.id}>
          <Card
            key={p.id}
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
