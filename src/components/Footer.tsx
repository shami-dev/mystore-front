import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="footer footer-center p-4 mt-5">
      <aside>
        <p className="text-xs lg:text-sm">
          Copyright © {new Date().getFullYear()} - All right reserved by myStore
          Ltd
        </p>
        <div>
          <Link
            to={"/internal-management/add-product"}
            className="link link-primary italic"
          >
            Admin
          </Link>
        </div>
      </aside>
    </footer>
  );
}
