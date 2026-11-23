import { isAxiosError } from "axios";
import { api } from "@/lib/axios";
import type { CreateSubjectRequest, Subject } from "../types";

export async function getSubjectsRequest(): Promise<Subject[]> {
  const { data } = await api.get<Subject[]>("/subjects");
  return data;
}

export async function getMySubjectsRequest(): Promise<Subject[]> {
  const { data } = await api.get<Subject[]>("/subjects/my-subjects");
  return data;
}

export async function createSubjectRequest(payload: CreateSubjectRequest): Promise<Subject> {
  try {
    const { data } = await api.post<Subject>("/subjects", payload);
    return data;
  } catch (err) {
    if (isAxiosError(err)) {
      throw new Error(err.response?.data?.message || "Error al crear la materia");
    }
    throw new Error("No se pudo conectar con el servidor");
  }
}

export async function enrollSubjectRequest(subjectId: number): Promise<void> {
  try {
    await api.post(`/subjects/${subjectId}/enroll`);
  } catch (err) {
    if (isAxiosError(err)) {
      throw new Error(err.response?.data?.message || "No se pudo completar la inscripción");
    }
    throw new Error("No se pudo conectar con el servidor");
  }
}