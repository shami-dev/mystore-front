import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { MainLayout } from "./MainLayout.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AddProductPage } from "./routes/AddProductPage.tsx";
import { ProductListPage } from "./routes/ProductListPage.tsx";
import { ProductDetailPage } from "./routes/ProductDetailPage.tsx";
import { NotFoundPage } from "./routes/NotFoundPage.tsx";
import { HomePage } from "./routes/HomePage.tsx";
import { AdminLayout } from "./AdminLayout.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

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
        path: "products",
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
    path: "/internal-management",
    element: <AdminLayout />,
    children: [
      {
        path: "add-product",
        element: <AddProductPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
