import { useAuth } from "@/features/auth";

export function Component() {
  const { user } = useAuth();
  return <h1 className="h3">Bienvenido, {user?.name} 👋</h1>;
}