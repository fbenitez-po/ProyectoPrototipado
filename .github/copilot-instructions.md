# Proyecto: Carta Astral — Contexto de Producto

## ¿Qué es este proyecto?
Aplicación web que permite a una persona ingresar su fecha, hora y lugar de nacimiento para obtener:
- Su **edad** y **signo zodiacal solar**
- Su **carta astral completa** (Sol, Luna, Ascendente, planetas)
- Una **descripción de personalidad** generada a partir de los tres pilares (Sol, Luna, Ascendente)

## Stack técnico
- **Backend**: Node.js + Express (puerto 3001)
- **Frontend**: React + Vite (puerto 5173)
- Cálculos astronómicos reales con `astronomy-engine`

## Convenciones del proyecto
- Arquitectura en capas: `data/` → `services/` → `routes/` → `app.js`
- Cada capa tiene una sola responsabilidad
- Las descripciones de personalidad usan género femenino neutro por defecto

## Contexto del proyecto
- Stack, arquitectura y endpoints: `.ai/context.md`
- Convenciones de código: `.ai/conventions.md`
- Historias de usuario (HUs): `.ai/stories/HU-NNN-nombre.md`
- **Memoria del agente**: `.ai/memory.md`

Antes de implementar cualquier feature, leer la HU correspondiente en `.ai/stories/`.

## Flujo de trabajo por defecto para nuevas features
1. **Siempre empezar por `@analista`** — levanta el requerimiento y genera la HU
2. El usuario revisa y aprueba la HU
3. Solo después de la aprobación se invoca `@backend`, `@web-builder` o `@Prototipado Funcional`

**No se escribe código sin HU aprobada.**

## Memoria del agente
**Leer `.ai/memory.md` SIEMPRE antes de actuar**, especialmente cuando:
- El usuario pide implementar, modificar o crear algo
- Hay dudas sobre preferencias o restricciones del usuario
- El usuario dice "recordá que...", "siempre...", "nunca..." → guardar en `.ai/memory.md`



## Criterios generales de calidad
- Las respuestas de la API siempre son JSON
- Los errores devuelven `{ error: "mensaje descriptivo" }` con el código HTTP apropiado
- La persistencia de cartas usa SQLite en `src/backend/data/cartas.db`
