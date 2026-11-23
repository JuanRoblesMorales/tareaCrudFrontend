import { Outlet } from "react-router";
import { useAuth } from "@/features/auth";

export function MainLayout() {
  const { user, logout } = useAuth();

  return (
    <>
      <nav className="navbar navbar-dark bg-dark px-3">
        <span className="navbar-brand">Mi App</span>
        <div className="d-flex align-items-center gap-3">
          <span className="text-white-50">{user?.name}</span>
          <button className="btn btn-outline-light btn-sm" onClick={logout}>
            Salir
          </button>
        </div>
      </nav>
      <main className="container py-4">
        <Outlet />
      </main>
    </>
  );
}