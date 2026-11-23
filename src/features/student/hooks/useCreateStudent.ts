import { useState } from "react";
import { registerStudentRequest } from "../api/studentApi";
import type { createStudentRequest } from "../types";

export function useCreateStudent() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createStudent = async (payload: createStudentRequest) => {
    setIsLoading(true);
    setError(null);
    try{

        const response = await registerStudentRequest(payload);
        return response;
    }catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Error inesperado");
        throw err;
    } finally {
        setIsLoading(false);
    }
  };
  return { createStudent, isLoading, error };
}  