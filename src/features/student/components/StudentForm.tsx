import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { useCreateStudent } from "../hooks/useCreateStudent";

interface createStudenFormProps {
  onSuccess?: () => void;
}

export function CreateStudentForm({ onSuccess }: createStudenFormProps) {
  const { createStudent, loading, error } = useCreateStudent();
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cedula, setCedula] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const created = await createStudent({ name, lastName, cedula, email });

    if (created) {
      // Limpia los campos tras guardar con éxito
      setName("");
      setLastName("");
      setCedula("");
      setEmail("");
      onSuccess?.();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="alert alert-danger py-2">{error}</div>}

      <div className="mb-3">
        <label htmlFor="name" className="form-label">Nombre del estudiante</label>
        <input id="name" type="name" className="form-control" required
          value={name} onChange={(e) => setName(e.target.value)} />
      </div>
    
      <div className="mb-3">
        <label htmlFor="lastName" className="form-label">Apellido del estudiante</label>
        <input id="lastName" type="lastName" className="form-control" required
          value={lastName} onChange={(e) => setLastName(e.target.value)} />
      </div>

      <div className="mb-3">
        <label htmlFor="cedula" className="form-label">Cédula</label>
        <input id="cedula" type="cedula" className="form-control" required
          value={cedula} onChange={(e) => setCedula(e.target.value)} />
      </div>

      <div className="mb-3">
        <label htmlFor="email" className="form-label">Correo electrónico</label>
        <input id="email" type="email" className="form-control" required
          value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>

      <button type="submit" className="btn btn-primary w-100" disabled={loading}>
        {loading ? "Cargando..." : "Registrar estudiante"}
      </button>
    </form>
  );
}