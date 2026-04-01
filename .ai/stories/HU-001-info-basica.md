# HU-001 — Calcular edad y signo solar

## Épica
E1 — Consulta astral básica / F1.1 — Información básica

## Historia de usuario
**Como** usuario,  
**quiero** ingresar mi fecha de nacimiento en un formulario  
**para** ver mi edad exacta y mi signo zodiacal solar en pantalla.

## Criterios de aceptación

### Backend
- [ ] El parámetro `fecha` es obligatorio; si falta, se devuelve error 400
- [ ] Solo se acepta formato YYYY-MM-DD; cualquier otro formato devuelve error 400
- [ ] No se aceptan fechas futuras; devuelve error 400
- [ ] La edad se calcula en años, meses y días considerando si el cumpleaños ya pasó en el año actual
- [ ] El signo devuelto incluye nombre y emoji (ej: `"Tauro ♉"`)
- [ ] La respuesta es JSON: `{ edad: { años, meses, días }, signo: { nombre, emoji } }`

### Frontend
- [ ] El campo de fecha es obligatorio y solo acepta fechas pasadas (no futuras)
- [ ] Al enviar el formulario, se llama a la API y se muestra el resultado sin recargar la página
- [ ] Se muestra la edad en años, meses y días
- [ ] Se muestra el nombre del signo solar con su emoji
- [ ] Si la API devuelve error, se muestra un mensaje claro al usuario
- [ ] El botón queda deshabilitado mientras se espera la respuesta

## Referencia técnica
- Endpoint: `GET /api/info?fecha=YYYY-MM-DD`
- Backend: `routes/info.js`, `services/zodiac.js`
- Frontend: campo `type="date"` con `max` = fecha de hoy; resultados en tarjetas "Edad" y "Signo Solar"
- Diseño: `docs/product/design/TOKENS.md`, `docs/product/design/COMPONENTS.md`

## Estado
✅ Implementada
