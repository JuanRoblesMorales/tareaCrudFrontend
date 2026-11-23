import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

export function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login({ username, password });
      navigate("/", { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error inesperado");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="alert alert-danger py-2">{error}</div>}

      <div className="mb-3">
        <label htmlFor="username" className="form-label">Nombre de usuario</label>
        <input id="username" type="username" className="form-control" required
          value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>

      <div className="mb-3">
        <label htmlFor="password" className="form-label">Contraseña</label>
        <input id="password" type="password" className="form-control" required
          value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>

      <button type="submit" className="btn btn-primary w-100" disabled={loading}>
        {loading ? "Ingresando..." : "Ingresar"}
      </button>
    </form>
  );
}