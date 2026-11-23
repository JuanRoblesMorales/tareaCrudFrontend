import { CreateStudentForm, StudentTable, useStudents } from "@/features/student";
import { useState } from "react";

export function Component() {
  const { state, reload } = useStudents();
  const [showForm, setShowForm] = useState(false);

  const handleCreated = () => {
    setShowForm(false); 
    reload();           
  };

  return (
    <div className="card shadow-sm">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h2 className="h5 mb-0">Gestión de Estudiantes</h2>
        <button
          className={`btn btn-sm ${showForm ? "btn-outline-secondary" : "btn-primary"}`}
          onClick={() => setShowForm((prev) => !prev)}
        >
          {showForm ? "Cancelar" : "+ Nuevo Estudiante"}
        </button>
      </div>
      
      <div className="card-body">
        {/* Formulario desplegable controlado por React */}
        {showForm && (
          <div className="border rounded p-3 mb-4 bg-light">
            <h3 className="h6 mb-3">Registrar Nuevo Estudiante</h3>
            <CreateStudentForm onSuccess={handleCreated} />
          </div>
        )}
      
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
