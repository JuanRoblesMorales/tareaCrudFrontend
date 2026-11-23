import { isAxiosError } from "axios";

/** Detalle por campo que devuelve el backend en errores de validación. */
export interface FieldError {
  field: string;
  message: string;
}

/**
 * Mensajes de la UI por código de error (ver docs/ERRORS.md).
 * Viven AQUÍ, en el frontend: la pantalla no depende del texto que mande el servidor,
 * y funciona igual si el backend está caído o responde algo inesperado.
 */
const MESSAGES: Record<string, string> = {
  NETWORK_ERROR: "No se pudo conectar con el servidor. Verifique su conexión e intente de nuevo.",
  AUTH_TOKEN_MISSING: "Debe iniciar sesión para continuar.",
  AUTH_TOKEN_EXPIRED: "Su sesión expiró.",
  AUTH_TOKEN_INVALID: "Su sesión no es válida. Inicie sesión nuevamente.",
  AUTH_INVALID_CREDENTIALS: "Usuario o contraseña incorrectos.",
  AUTH_REFRESH_INVALID: "Su sesión terminó. Inicie sesión nuevamente.",
  AUTH_FORBIDDEN: "No tiene permisos para realizar esta acción.",
  VALIDATION_ERROR: "Revise los campos marcados.",
  MALFORMED_REQUEST: "La solicitud no es válida.",
  INVALID_PARAMETER: "La solicitud no es válida.",
  BAD_REQUEST: "La solicitud no es válida.",
  RESOURCE_NOT_FOUND: "El registro solicitado no existe.",
  ENDPOINT_NOT_FOUND: "No se encontró el servicio solicitado.",
  DUPLICATE_RESOURCE: "Ya existe un registro con esos datos.",
  ALREADY_ENROLLED: "El estudiante ya está inscrito en esa materia.",
  NOT_ENROLLED: "El estudiante no está inscrito en esa materia.",
  SUBJECT_HAS_STUDENTS: "No se puede eliminar una materia con estudiantes inscritos.",
  SUBJECT_LIMIT_REACHED: "El estudiante alcanzó el máximo de materias permitido.",
  DATABASE_ERROR: "Error en el servidor. Intente más tarde.",
  INTERNAL_ERROR: "Error en el servidor. Intente más tarde.",
};

function messageFor(code: string, status: number | null): string {
  const known = MESSAGES[code];
  if (known) return known;
  // Código desconocido: mensaje genérico según el estado HTTP.
  if (status !== null && status >= 500) return "Error en el servidor. Intente más tarde.";
  return "No se pudo completar la operación.";
}

/**
 * Único tipo de error que sale de la capa de API. Siempre trae un `code`:
 * los del backend, más NETWORK_ERROR (sin respuesta) y UNKNOWN_ERROR (respuesta sin formato esperado).
 */
export class ApiError extends Error {
  readonly code: string;
  readonly status: number | null;
  readonly fieldErrors: FieldError[];

  constructor(code: string, status: number | null, fieldErrors: FieldError[] = []) {
    super(messageFor(code, status));
    this.name = "ApiError";
    this.code = code;
    this.status = status;
    this.fieldErrors = fieldErrors;
  }
}

/** Convierte cualquier cosa lanzada por axios en un ApiError. */
export function toApiError(error: unknown): ApiError {
  if (error instanceof ApiError) return error;

  if (isAxiosError(error)) {
    if (!error.response) return new ApiError("NETWORK_ERROR", null);

    const body: unknown = error.response.data;
    const data = (typeof body === "object" && body !== null ? body : {}) as {
      code?: unknown;
      errors?: unknown;
    };
    const code = typeof data.code === "string" ? data.code : "UNKNOWN_ERROR";
    const fieldErrors = Array.isArray(data.errors) ? (data.errors as FieldError[]) : [];
    return new ApiError(code, error.response.status, fieldErrors);
  }

  return new ApiError("UNKNOWN_ERROR", null);
}
