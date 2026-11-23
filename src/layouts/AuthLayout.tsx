import { Outlet } from "react-router";

export function AuthLayout() {
  return (
    <div className="container min-vh-100 d-flex align-items-center justify-content-center">
      <div className="card shadow-sm p-4 w-100" style={{ maxWidth: 400 }}>
        <Outlet />
      </div>
    </div>
  );
}