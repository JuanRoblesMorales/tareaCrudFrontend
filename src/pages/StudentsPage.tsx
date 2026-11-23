export function Component() {
  return (
    <div className="card shadow-sm">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h2 className="h5 mb-0">Gestión de Estudiantes</h2>
        <button className="btn btn-primary btn-sm">+ Nuevo Estudiante</button>
      </div>
      <div className="card-body">
        <p className="text-muted mb-0">Aquí se listarán los estudiantes registrados.</p>
      </div>
    </div>
  );
}