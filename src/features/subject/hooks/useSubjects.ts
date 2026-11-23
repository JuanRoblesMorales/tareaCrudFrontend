import { useState, useEffect, useCallback } from "react";
import { getSubjectsRequest } from "../api/subjectApi";
import type { Subject } from "../types";

type SubjectsState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "success"; subjects: Subject[] };

export function useSubjects() {
  const [state, setState] = useState<SubjectsState>({ status: "loading" });

  const loadSubjects = useCallback(async () => {
    setState({ status: "loading" });
    try {
      const data = await getSubjectsRequest();
      setState({ status: "success", subjects: data });
    } catch (err) {
      setState({
        status: "error",
        message: err instanceof Error ? err.message : "Error inesperado",
      });
    }
  }, []);

  useEffect(() => {
    loadSubjects();
  }, [loadSubjects]);

  return { state, reload: loadSubjects };
}