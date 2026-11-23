import { createBrowserRouter, Navigate } from "react-router";
import { AuthLayout } from "@/layouts/AuthLayout";
import { MainLayout } from "@/layouts/MainLayout";
import { ProtectedRoute } from "@/features/auth";

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [{ path: "/login", lazy: () => import("@/pages/LoginPage") }],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [{ path: "/", lazy: () => import("@/pages/HomePage") }],
      },
    ],
  },
  { path: "*", element: <Navigate to="/" replace /> },
]);