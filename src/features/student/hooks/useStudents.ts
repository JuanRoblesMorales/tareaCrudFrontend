import { useEffect, useState } from "react";
import { toApiError } from "@/lib/apiError";
import { getStudents } from "../api/studentApi";
import type { Student } from "../types";

type StudentsState =
  | { status: "loading" }
  | { status: "success"; students: Student[] }
  | { status: "error"; message: string };

/** Carga la lista de estudiantes al montar. `reload()` la vuelve a pedir. */
export function useStudents() {
  const [state, setState] = useState<StudentsState>({ status: "loading" });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false; // evita actualizar el estado si el componente ya se desmontó

    getStudents()
      .then((students) => {
        if (!cancelled) setState({ status: "success", students });
      })
      .catch((err: unknown) => {
        if (!cancelled) setState({ status: "error", message: toApiError(err).message });
      });

    return () => {
      cancelled = true;
    };
  }, [attempt]);

  const reload = () => {
    setState({ status: "loading" });
    setAttempt((n) => n + 1);
  };

  return { state, reload };
}
                                                                           