# Mapa de Rutas de la Aplicación (Frontend)

Este documento describe todas las rutas configuradas actualmente en `src/app/router.tsx`, sus niveles de acceso, layouts asociados y el flujo de redirección.

---

## 1. Tabla General de Rutas

| Ruta (URL) | Acceso | Layout | Página (`src/pages/`) | Descripción |
| :--- | :--- | :--- | :--- | :--- |
| `/login` | Público | `AuthLayout` | `LoginPage.tsx` | Formulario de inicio de sesión (`POST /api/v1/auth/login`). |
| `/` | Privado (`ProtectedRoute`) | `MainLayout` | `HomePage.tsx` | Pantalla principal de bienvenida tras autenticarse. |
| `/students` | Privado (`ProtectedRoute`) | `MainLayout` | `StudentsPage.tsx` | Vista de gestión y listado de estudiantes. |
| `/signatures` | Privado (`ProtectedRoute`) | `MainLayout` | `SignaturesPage.tsx` | Vista de gestión y listado de asignaturas. |
| `*` (Cualquier otra) | Público | Sin Layout | `NotFoundPage.tsx` | Pantalla de error **404 - Página no encontrada**. |

---

## 2. Lógica de Protección y Enrutamiento

1. **Carga Perezosa (*Lazy Loading*):**
   Todas las páginas se cargan mediante `lazy: () => import(...)`. El navegador solo descarga el código JavaScript de cada vista en el momento en que el usuario navega hacia ella.
2. **Guardia de Autenticación (`ProtectedRoute`):**
   - Consulta el estado `user` desde `useAuth()`.
   - Si existe sesión activa, renderiza `<Outlet />` dando paso al `MainLayout` (Navbar + Contenido + Footer).
   - Si `user` es `null`, redirige automáticamente a `/login` usando `<Navigate to="/login" replace />` para evitar regresar mediante el botón "Atrás" del navegador.
3. **Manejo de Error 404 (`path: "*"`):**
   - Ubicado al final del árbol de rutas como ruta comodín.
   - Si el usuario ingresa una URL inexistente, muestra `NotFoundPage` con un enlace hacia `/`. Si el usuario no tiene sesión al pulsar "Volver al inicio", `ProtectedRoute` lo redirigirá automáticamente a `/login`.

---

## 3. Rutas Planificadas (Próximas iteraciones)

- `/students/new` y `/students/:id/edit` — Creación y edición de estudiantes.
- `/signatures/new` y `/signatures/:id/edit` — Creación y edición de asignaturas.