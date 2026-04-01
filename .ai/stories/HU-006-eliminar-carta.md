# HU-005 — Eliminar carta guardada

## Épica
E2 — Gestión de cartas guardadas / F2.1 — Persistencia de cartas

## Historia de usuario
**Como** usuario,  
**quiero** poder eliminar una carta guardada desde la lista "Mis consultas"  
**para** mantener solo las que me interesan sin necesidad de recargar la página.

## Criterios de aceptación

### Backend
- [ ] El endpoint recibe el ID como parámetro de ruta
- [ ] Si el ID existe, la carta se elimina y se devuelve HTTP 204 (sin cuerpo)
- [ ] Si el ID no existe, se devuelve error 404 con mensaje descriptivo
- [ ] La eliminación es permanente (sin papelera ni recuperación)

### Frontend
- [ ] Cada carta en "Mis consultas" muestra un botón 🗑
- [ ] Al hacer clic, se llama a la API de eliminación por ID
- [ ] La carta desaparece de la lista en tiempo real (sin reload)
- [ ] Si la API devuelve error, se muestra un mensaje claro al usuario
- [ ] El botón queda deshabilitado mientras se espera la respuesta

## Referencia técnica
- Endpoint: `DELETE /api/cartas/:id`
- Backend: `routes/cartas.js`, `services/cartas.js`
- Frontend: botón 🗑 en la esquina superior derecha de cada tarjeta
- Diseño: `docs/product/design/TOKENS.md`, `docs/product/design/COMPONENTS.md`

## Estado
✅ Implementada
