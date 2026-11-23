import type { Student } from "../types";

export function StudentTable({ students }: { students: Student[] }) {
  if (students.length === 0) {
    return <p className="text-muted mb-0">Aún no hay estudiantes registrados.</p>;
  }

  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle mb-0">
        <thead>
          <tr>
            <th>Cédula</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Materias</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td>{s.cedula}</td>
              <td>
                {s.name} {s.lastName}
              </td>
              <td>{s.email}</td>
              <td>
                {s.subjects.length === 0 ? (
                  <span className="text-muted">—</span>
                ) : (
                  s.subjects.map((subject) => (
                    <span key={subject.id} className="badge text-bg-secondary me-1" title={subject.name}>
                      {subject.code}
                    </span>
                  ))
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
