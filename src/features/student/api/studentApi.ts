import { api } from "@/lib/axios";
import type { Student } from "../types";
import type { createStudentRequest } from "../types";

export async function getStudents(): Promise<Student[]> {
  const { data } = await api.get<Student[]>("/students");
  return data;
}

export async function registerStudentRequest(payload: createStudentRequest): Promise<Student> {
  const { data } = await api.post<Student>("/students", payload);
  return data;
}