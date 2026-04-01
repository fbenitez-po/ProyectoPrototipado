# HU-004 — Consultar mis cartas guardadas

## Épica
E2 — Gestión de cartas guardadas / F2.1 — Persistencia de cartas

## Historia de usuario
**Como** usuario,  
**quiero** ver la lista de cartas astrales que guardé  
**para** acceder al detalle de cada una sin tener que recalcularlas.

## Criterios de aceptación

### Backend
- [ ] `GET /api/cartas` devuelve lista completa con el campo `resultado` en JSON
- [ ] `GET /api/cartas/:id` devuelve el detalle de una carta; si no existe, error 404

### Frontend
- [ ] Existe una pestaña "🗂 Mis consultas" accesible desde la interfaz
- [ ] Se listan todas las cartas guardadas ordenadas por fecha de guardado (más reciente primero)
- [ ] Cada carta muestra: alias, fecha de guardado, ciudad y hora usada
- [ ] Cada carta muestra Sol, Luna y Ascendente con nombre y emoji
- [ ] Cada carta muestra la descripción de personalidad completa
- [ ] Si no hay cartas guardadas, se muestra un estado vacío claro
- [ ] Cartas sin carta astral completa (solo fecha, sin hora/ciudad) se muestran sin errores

## Referencia técnica
- Endpoints: `GET /api/cartas`, `GET /api/cartas/:id`
- Backend: `routes/cartas.js`, `services/cartas.js`
- Frontend: pestaña "🗂 Mis consultas" en panel derecho, se carga al hacer clic en la pestaña

## Estado
✅ Implementada
