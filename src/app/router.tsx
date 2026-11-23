import { createBrowserRouter } from "react-router";
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
        children: [
          { path: "/", lazy: () => import("@/pages/HomePage") },
          { path: "/students", lazy: () => import("@/pages/StudentsPage") },
          { path: "/signatures", lazy: () => import("@/pages/SignaturesPage") }
        ],
      },
    ],
  },
  // Ruta comoda para manejar rutas no encontradas y redirigir al inicio
  { 
    path: "*",
    lazy: () => import("@/pages/NotFoundPage"),
  },
]);