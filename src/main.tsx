import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { MainLayout } from "./MainLayout.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AddProductPage } from "./pages/AddProductPage.tsx";
import { ProductListPage } from "./pages/ProductListPage.tsx";
import { ProductDetailPage } from "./pages/ProductDetailPage.tsx";
import { NotFoundPage } from "./pages/NotFoundPage.tsx";
import { HomePage } from "./pages/HomePage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/products",
        element: <ProductListPage />,
      },
      {
        path: "products/:id",
        element: <ProductDetailPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
  {
    path: "internal-management/add-product",
    element: <AddProductPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
