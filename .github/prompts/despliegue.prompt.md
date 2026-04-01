---
description: "Prompt para preparar y desplegar el proyecto en Railway o Render. Incluye todos los cambios de código necesarios y los pasos para publicar una URL pública. Trigger: desplegar, publicar, subir a producción, compartir URL, hosting."
---

# Despliegue del proyecto

Quiero desplegar este proyecto fullstack (Node.js + Express + React/Vite) para compartir una URL pública.

## Qué necesito que hagas

### 1. Preparar el código para producción

Verificar y aplicar los siguientes cambios si no están hechos:

- **`src/backend/index.js`**: usar `process.env.PORT || 3001` en lugar de puerto fijo
- **`src/backend/app.js`**: agregar bloque para servir el frontend compilado (`src/frontend/dist/`) cuando `NODE_ENV === "production"`
- **`package.json` raíz**: crear con scripts `build` (instala deps + compila frontend) y `start` (arranca Express)

### 2. Subir a GitHub

- Inicializar repositorio git si no existe
- Hacer commit de todos los archivos
- Pushear a un repositorio GitHub existente (pedirme la URL si no la tenés)

### 3. Desplegar en Railway

Una vez pusheado, los pasos en browser son:
1. [railway.app](https://railway.app) → Login with GitHub
2. New Project → Deploy from GitHub repo → seleccionar el repo
3. Settings → Networking → Generate Domain → copiar URL pública

---

## Plataforma alternativa: Render

Si Railway no funciona o se prefiere Render:
1. [render.com](https://render.com) → New → Web Service
2. Conectar GitHub → seleccionar repo
3. Build Command: `npm run build` / Start Command: `npm start`
4. Create Web Service → esperar deploy → copiar URL

**Diferencia clave**: Render gratuito duerme el servidor tras 15 min de inactividad (primera request tarda ~30s). Railway no duerme pero tiene límite de $5/mes.

---

## Comportamiento esperado en producción

- La misma URL sirve tanto la API (`/api/*`) como el frontend (ruta raíz `/`)
- No hay CORS ni problemas de dominio cruzado
- Los datos de SQLite se resetean con cada nuevo deploy (filesystem efímero)

---

## Flujo para futuros cambios

Cada vez que se modifique código y se quiera actualizar la URL pública:

```powershell
cd "ruta/al/proyecto"
git add .
git commit -m "descripción del cambio"
git push
```

Railway/Render detecta el push y redeploya automáticamente.
