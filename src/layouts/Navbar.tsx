import { useAuth } from "@/features/auth";
import { NavLink } from "react-router";


export function Navbar() {
    const { user, logout } = useAuth();
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
            Sharp App
        </NavLink>

        <div className="navbar-nav me-auto flex-row gap-3">
          <NavLink className="nav-link" to="/" end>
            Inicio
          </NavLink>
          <NavLink className="nav-link" to="/students">
            Estudiantes
          </NavLink>
          <NavLink className="nav-link" to="/signatures">
            Asignaturas
          </NavLink>
        </div>

        <div className="d-flex align-items-center gap-3">
          <span className="text-white-50 small">{user?.username}</span>
          <button className="btn btn-outline-light btn-sm" onClick={logout}>
            Salir
          </button>
        </div> 
      </div>
    </nav>
  );
}