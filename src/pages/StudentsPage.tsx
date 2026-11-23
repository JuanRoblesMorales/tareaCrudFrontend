import { StudentTable, useStudents } from "@/features/student";

export function Component() {
  const { state, reload } = useStudents();

  return (
    <div className="card shadow-sm">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h2 className="h5 mb-0">Gestión de Estudiantes</h2>
        <button className="btn btn-primary btn-sm">+ Nuevo Estudiante</button>
      </div>

      <div className="card-body">
        {state.status === "loading" && (
          <div className="d-flex align-items-center gap-2 text-muted">
            <div className="spinner-border spinner-border-sm" role="status" />
            <span>Cargando estudiantes...</span>
          </div>
        )}

        {state.status === "error" && (
          <div className="alert alert-danger d-flex justify-content-between align-items-center mb-0">
            <span>{state.message}</span>
            <button className="btn btn-outline-danger btn-sm" onClick={reload}>
              Reintentar
            </button>
          </div>
        )}

        {state.status === "success" && <StudentTable students={state.students} />}
      </div>
    </div>
  );
}
