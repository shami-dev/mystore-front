import { Outlet } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { Footer } from "./components/Footer";
import { useState } from "react";

export function MainLayout() {
  const [totalItems, setTotalItems] = useState(0);

  const handleAddToCart = () => setTotalItems((prev) => prev + 1);

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <header className="max-w-7xl mx-auto w-full px-4">
          <NavBar totalItems={totalItems} />
        </header>

        <main className="flex-grow">
          <Outlet context={{ handleAddToCart, totalItems }} />
        </main>

        <footer className="bg-gray-300 mt-auto w-full">
          <Footer />
        </footer>
      </div>
    </>
  );
}
