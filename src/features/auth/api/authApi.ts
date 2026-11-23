import { isAxiosError } from "axios";
import { api } from "@/lib/axios";
import type { LoginCredentials, User } from "../types";

export async function loginRequest(credentials: LoginCredentials): Promise<User> {
  try {
    const { data } = await api.post<{ message: string; username: string }>(
      "/auth/login",
      credentials
    );
    return { username: data.username };
  } catch (err) {
    if (isAxiosError(err) && err.response?.status === 401) {
      throw new Error("Credenciales inválidas");
    }
    throw new Error("No se pudo conectar con el servidor");
  }
}

export async function logoutRequest(): Promise<void> {
  await api.post("/auth/logout");
}