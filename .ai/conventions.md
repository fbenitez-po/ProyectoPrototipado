# Convenciones del proyecto

## Backend (Node.js / Express)

### Estructura de capas
Siempre seguir el orden: `data/` → `services/` → `routes/` → registrar en `app.js`

```js
// data/items.js — acceso puro a datos
export const getAll = () => rows;
export const getById = (id) => rows.find(r => r.id === id);

// services/items.js — lógica de negocio, usa data/
import * as db from '../data/items.js';
export const listar = () => db.getAll();

// routes/items.js — controlador HTTP, usa services/
import { Router } from 'express';
import * as svc from '../services/items.js';
const router = Router();
router.get('/', (req, res) => res.json(svc.listar()));
export default router;
```

### Errores
- 400 — Parámetro faltante o inválido: `res.status(400).json({ error: "mensaje" })`
- 404 — Recurso no encontrado: `res.status(404).json({ error: "mensaje" })`
- 201 — Creación exitosa con body de respuesta

### Validación
- Validar en la capa de ruta antes de llamar al servicio
- Parámetros de query con `req.query`, de ruta con `req.params`, de body con `req.body`

## Frontend (React / Vite)

### Componentes
- Funcionales con hooks
- Props explícitas, sin desestructuración anidada excesiva
- Un archivo por componente en `src/components/`

### Comunicación con la API
- Usar `fetch` nativo
- Manejar siempre los estados: `loading`, `error`, `data`
- Mostrar error al usuario cuando la API devuelve error

### Estilos
- Tokens de color y componentes: definidos internamente en el proyecto

## General
- No sobreingenierar: implementar solo lo que la HU pide
- No agregar comentarios ni tipos a código no modificado
- Explorar el código existente antes de crear archivos nuevos
