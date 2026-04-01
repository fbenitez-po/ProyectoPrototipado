# Memoria del proyecto — Carta Astral

> **Este archivo es la memoria persistente del proyecto.**
> - Leélo al inicio de cada tarea para tener contexto completo.
> - Actualizalo cada vez que haya un cambio relevante: nueva feature, decisión de diseño, endpoint nuevo, convención adoptada, historial de trabajo.

---

## ¿Qué es este proyecto?
Aplicación web que permite ingresar fecha, hora y lugar de nacimiento para obtener:
- Edad exacta y signo zodiacal solar
- Carta astral completa (Sol, Luna, Ascendente, planetas)
- Descripción de personalidad generada a partir de Sol + Luna + Ascendente

## Stack técnico
- **Backend**: Node.js + Express — puerto 3001
- **Frontend**: React + Vite — puerto 5173
- **Cálculos**: `astronomy-engine` (posiciones astronómicas reales)
- **Persistencia**: SQLite via `better-sqlite3` en `src/backend/data/cartas.db`

## Arquitectura

```
src/
  backend/
    data/        ← acceso a datos (SQLite, datos en memoria)
    services/    ← lógica de negocio
    routes/      ← controladores HTTP (Express Router)
    app.js       ← monta rutas, middlewares

  frontend/
    src/
      components/  ← componentes reutilizables
      App.jsx      ← componente raíz con estado principal
      main.jsx     ← punto de entrada
```

## Endpoints existentes
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/info?fecha=YYYY-MM-DD` | Edad y signo solar |
| GET | `/api/cartaastral?fecha=&hora=&lat=&lon=&tz=` | Carta astral completa |
| GET | `/api/cartas` | Listar cartas guardadas |
| GET | `/api/cartas/:id` | Detalle de carta por ID |
| POST | `/api/cartas` | Guardar carta |
| DELETE | `/api/cartas/:id` | Eliminar carta |

## Decisiones de diseño
- Las respuestas de la API siempre son JSON
- Los errores devuelven `{ error: "mensaje descriptivo" }` con el código HTTP apropiado
- Las descripciones de personalidad usan género femenino neutro por defecto
- No se exponen coordenadas ni zona horaria al usuario final

---

## Historial de trabajo

| Fecha | Tarea | Estado |
|-------|-------|--------|
| 2026-03-31 | Estructura inicial del proyecto (backend + frontend) | ✅ |

---

## Notas activas

<!-- Agregá acá cualquier decisión pendiente, duda abierta o contexto temporal -->

