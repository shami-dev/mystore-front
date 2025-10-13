import { Outlet } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { Footer } from "./components/Footer";
import { useState } from "react";

export function MainLayout() {
  const [totalItems, setTotalItems] = useState(0);

  const handleAddToCart = () => setTotalItems((prev) => prev + 1);

  return (
    <>
      <div className="max-w-7xl mx-auto px-4">
        <NavBar totalItems={totalItems} />
      </div>
      <Outlet context={{ handleAddToCart, totalItems }} />
      <div className="bg-gray-300">
        <Footer />
      </div>
    </>
  );
}
