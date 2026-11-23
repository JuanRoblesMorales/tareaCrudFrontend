export interface User {
  username: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthContextValue {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () =>Promise<void>;
}