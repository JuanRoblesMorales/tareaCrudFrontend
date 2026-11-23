import { LoginForm } from "@/features/auth";

export function Component() {
  return (
    <>
      <h1 className="h4 text-center mb-3">Iniciar sesión</h1>
      <LoginForm />
      <p className="text-muted small text-center mt-3 mb-0">
        Demo: demo@demo.com / 123456
      </p>
    </>
  );
}