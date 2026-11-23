import { useAuth } from "@/features/auth";
import { SubjectTable, useSubjects } from "@/features/subject";

export function Component() {
  const { user } = useAuth();
  const { state, reload } = useSubjects();

  const canCreate = user?.role === "TEACHER" || user?.role === "ADMIN";

  return (
    <div className="card shadow-sm">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h2 className="h5 mb-0">Gestión de Asignaturas</h2>
        {canCreate && (
          <button className="btn btn-primary btn-sm">+ Nueva Asignatura</button>
        )}
      </div>

      <div className="card-body">
        {state.status === "loading" && (
          <div className="d-flex align-items-center gap-2 text-muted">
            <div className="spinner-border spinner-border-sm" role="status" />
            <span>Cargando asignaturas...</span>
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

        {state.status === "success" && (
          <SubjectTable subjects={state.subjects} />
        )}
      </div>
    </div>
  );
}