import { Link } from "react-router-dom";

export type NavBarProps = {
  totalItems: number;
};

export function NavBar({ totalItems }: NavBarProps) {
  return (
    <div className="navbar p-0 lg:my-5">
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden pl-0 pr-4 mr-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="text-base">Categories</a>
              <ul className="p-2">
                <li>
                  <a className="text-sm">Apparel</a>
                </li>
                <li>
                  <a className="text-sm">Accessories (coming soon)</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <Link to="/" className="font-bold text-xl lg:text-2xl">
          myStore
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <div className="dropdown dropdown-hover">
          <div
            tabIndex={0}
            role="button"
            className="link link-hover m-1 text-lg"
          >
            Categories
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm text-base"
          >
            <li>
              <a>Apparel</a>
            </li>
            <li>
              <a>Accessories (coming soon)</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />{" "}
              </svg>
              <span className="badge badge-sm indicator-item">
                {totalItems}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
