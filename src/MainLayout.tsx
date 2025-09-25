import { Outlet } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { Footer } from "./components/Footer";

const totalItems: number = 9;

export function MainLayout() {
  return (
    <>
      <div className="max-w-7xl mx-auto px-4">
        <NavBar totalItems={totalItems} />
        <Outlet />
      </div>
      <div className="bg-gray-300">
        <Footer />
      </div>
    </>
  );
}
