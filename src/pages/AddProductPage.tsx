import { NavBarAdmin } from "../components/NavBarAdmin";

export function AddProductPage() {
  return (
    <>
      <div className="bg-gray-600">
        <div className="max-w-7xl mx-auto px-4">
          <NavBarAdmin />
        </div>
      </div>
      <div className="bg-inherit max-w-7xl mx-auto px-4">
        <h1>Welcome to the AddProduct page!</h1>
      </div>
    </>
  );
}
