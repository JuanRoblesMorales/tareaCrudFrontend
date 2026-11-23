import type { Subject } from "../types";

interface SubjectTableProps {
  subjects: Subject[];
}

export function SubjectTable({ subjects }: SubjectTableProps) {
  if (subjects.length === 0) {
    return (
      <p className="text-muted text-center my-4 mb-0">
        No hay asignaturas registradas por el momento.
      </p>
    );
  }

  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle mb-0">
        <thead className="table-light">
          <tr>
            <th>Código</th>
            <th>Nombre de la Asignatura</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((subject) => (
            <tr key={subject.subjectId}>
              <td>
                <span className="badge bg-secondary">{subject.code}</span>
              </td>
              <td className="fw-medium">{subject.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}