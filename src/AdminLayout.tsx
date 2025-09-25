import { Outlet } from "react-router-dom";
import { NavBarAdmin } from "./components/NavBarAdmin";
import { Footer } from "./components/Footer";

export function AdminLayout() {
  return (
    <>
      <div className="bg-gray-600">
        <div className="max-w-7xl mx-auto px-4">
          <NavBarAdmin />
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4">
        <Outlet />
      </div>
      <div className="bg-gray-300">
        <Footer />
      </div>
    </>
  );
}
