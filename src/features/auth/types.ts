export interface User {
  username: string;
}
export type Role = "ADMIN" | "TEACHER" | "STUDENT";
export interface LoginCredentials {
  username: string;
  password: string;
  rol: Role;
}

export interface AuthContextValue {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () =>Promise<void>;
}