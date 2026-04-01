# HU-002 — Calcular carta astral completa

## Épica
E1 — Consulta astral básica / F1.2 — Carta astral completa

## Historia de usuario
**Como** usuario,  
**quiero** ingresar mi fecha, hora y ciudad de nacimiento  
**para** ver mi carta astral completa con los tres pilares (Sol, Luna, Ascendente), los planetas y una descripción de mi personalidad.

## Criterios de aceptación

### Backend
- [ ] Los parámetros `fecha`, `hora`, `lat`, `lon` y `tz` son obligatorios; si falta alguno, error 400 con mensaje descriptivo
- [ ] El cálculo usa coordenadas astronómicas reales (`astronomy-engine`, fórmula de Meeus cap. 14 para el Ascendente)
- [ ] Se devuelven posiciones para: Sol, Luna, Ascendente, Mercurio, Venus, Marte, Júpiter, Saturno
- [ ] Cada posición incluye: nombre del signo, emoji y grados dentro del signo
- [ ] Se devuelve descripción de personalidad generada a partir de Sol + Luna + Ascendente
- [ ] La descripción usa género femenino neutro
- [ ] La respuesta es JSON con campos `sol`, `luna`, `ascendente`, `planetas` y `descripcion`

### Frontend
- [ ] El formulario incluye: fecha, hora y selector de ciudad (dropdown con búsqueda)
- [ ] Al seleccionar la ciudad, lat/lon/tz se resuelven automáticamente (no se muestran al usuario)
- [ ] Al calcular, se muestra la carta en la pestaña "✦ Carta"
- [ ] "Los tres grandes" (Sol, Luna, Ascendente) se muestran en tarjetas destacadas con nombre y emoji
- [ ] Los planetas secundarios se muestran en una grilla
- [ ] La descripción de personalidad se muestra en una caja inferior
- [ ] Si la API devuelve error, se muestra un mensaje claro al usuario
- [ ] Una vez calculada la carta, aparece la barra de guardado (campo alias + botón 💾)

## Referencia técnica
- Endpoint: `GET /api/cartaastral?fecha=&hora=&lat=&lon=&tz=`
- Backend: `routes/cartaastral.js`, `services/astral.js`
- Frontend: tarjetas Sol/Luna/Asc con fondo por elemento (fuego, tierra, aire, agua)
- Diseño: `docs/product/design/TOKENS.md`, `docs/product/design/COMPONENTS.md`

## Estado
✅ Implementada
