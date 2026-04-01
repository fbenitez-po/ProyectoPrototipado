# HU-003 — Guardar carta astral

## Épica
E2 — Gestión de cartas guardadas / F2.1 — Persistencia de cartas

## Historia de usuario
**Como** usuario,  
**quiero** guardar una carta astral calculada con un nombre que yo elija  
**para** poder identificarla y consultarla más tarde sin volver a ingresar mis datos.

## Criterios de aceptación

### Backend
- [ ] El body debe incluir `alias`, `input` y `resultado`; si falta `alias`, error 400
- [ ] Al guardar exitosamente, se devuelve HTTP 201 con el ID asignado y los datos guardados
- [ ] La carta se almacena en SQLite con campos: `id`, `alias`, `input` (JSON), `resultado` (JSON), `created_at`
- [ ] El ID es autoincremental y único

### Frontend
- [ ] El botón 💾 Guardar aparece solo cuando hay una carta calculada
- [ ] El alias (nombre) es obligatorio; si está vacío, no se envía el formulario
- [ ] Al guardar, el sistema asigna y devuelve un ID único
- [ ] Se muestra confirmación visual "✓ Guardada" al guardar exitosamente

## Referencia técnica
- Endpoint: `POST /api/cartas` — body: `{ alias, input, resultado }`
- Backend: `routes/cartas.js`, `services/cartas.js`, `data/cartas.db`
- Frontend: barra de guardado con campo de texto + botón 💾 debajo de la carta calculada

## Estado
✅ Implementada
