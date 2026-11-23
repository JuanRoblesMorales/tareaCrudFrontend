import { Link } from "react-router";

export function Component() {
  return (
    <div className="container min-vh-100 d-flex align-items-center justify-content-center">
      <div className="text-center" style={{ maxWidth: 460 }}>
        <h1 className="display-1 fw-bold text-primary">404</h1>
        <h2 className="h4 mb-3">Página no encontrada</h2>
        <p className="text-muted mb-4">
          La ruta a la que intentas acceder no existe o fue movida a otra dirección.
        </p>
        <Link to="/" className="btn btn-primary">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}