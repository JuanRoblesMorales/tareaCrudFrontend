import { api } from "@/lib/axios";
import type { Student } from "../types";

export async function getStudents(): Promise<Student[]> {
  const { data } = await api.get<Student[]>("/students");
  return data;
}
