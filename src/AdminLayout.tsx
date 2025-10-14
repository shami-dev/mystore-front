import { Outlet } from "react-router-dom";
import { NavBarAdmin } from "./components/NavBarAdmin";
import { Footer } from "./components/Footer";

export function AdminLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-gray-600">
        <div className="max-w-7xl mx-auto px-4">
          <NavBarAdmin />
        </div>
      </div>
      <div className="bg-base-100 flex-grow">
        <div className="max-w-7xl mx-auto px-4">
          <Outlet />
        </div>
      </div>
      <div className="bg-base-200">
        <Footer />
      </div>
    </div>
  );
}
