import { Link } from "react-router-dom";

export function NavBarAdmin() {
  return (
    <div className="navbar p-0">
      <div className="navbar-start flex-2">
        <Link
          to="/internal-management/add-product"
          className="font-bold text-xl lg:text-2xl"
        >
          myStore <span className="font-normal italic">Admin Panel</span>
        </Link>
      </div>
      <div className="navbar-end flex-1">
        <Link
          to="products-admin"
          tabIndex={0}
          role="button"
          className="link link-hover m-1 text-base lg:text-lg"
        >
          All Products
        </Link>
      </div>
    </div>
  );
}
