---
description: "Prompt para arrancar un prototipo funcional fullstack desde cero con el stack y estructura completa del proyecto. Incluye backend, frontend, agentes de IA, archivos de contexto y convenciones. Trigger: nuevo proyecto, nuevo prototipo, arrancar desde cero, scaffold."
---

# Prototipo Fullstack — Template Completo

Quiero crear un prototipo funcional con backend y frontend dentro de un mismo repositorio.

## Stack

- **Backend**: Node.js + Express — puerto 3001
- **Frontend**: React + Vite — puerto 5173
- **Persistencia**: SQLite via `better-sqlite3` (opcional según el caso de uso)
- **Código**: en español (variables, comentarios, mensajes de error)

## Caso de uso

[DESCRIBIR AQUÍ qué hace la aplicación y cuál es el recurso principal]

---

## Estructura de carpetas requerida

```
src/
  backend/
    app.js          ← monta rutas y middlewares
    index.js        ← arranca el servidor
    package.json
    data/           ← acceso a datos (SQLite o datos en memoria)
    services/       ← lógica de negocio
    routes/         ← controladores HTTP (Express Router)
  frontend/
    index.html
    package.json
    vite.config.js  ← proxy apuntando a http://localhost:3001
    src/
      App.jsx       ← componente raíz con estado principal
      main.jsx      ← punto de entrada
      components/   ← componentes reutilizables

.github/
  copilot-instructions.md   ← instrucciones globales del agente
  agents/
    analista.agent.md       ← genera HUs desde requisitos en lenguaje natural
    backend.agent.md        ← implementa API (data → service → route)
    web-builder.agent.md    ← implementa UI React
    qa.agent.md             ← valida criterios de aceptación
  prompts/
    nuevo-prototipo.prompt.md  ← este archivo

.ai/
  memory.md        ← reglas críticas que el agente SIEMPRE lee antes de actuar
  context.md       ← estado del proyecto (stack, endpoints, historial, arquitectura)
  conventions.md   ← convenciones de código backend y frontend
  stories/         ← historias de usuario HU-NNN-nombre.md
```

---

## Archivos de contexto de IA — generar al crear el proyecto

### `.ai/memory.md`
```markdown
# Memoria del agente — [Nombre del proyecto]

> Leélo SIEMPRE antes de actuar. Actualizarlo cuando el usuario diga "recordá que...", "siempre...", "nunca...".

## Preferencias generales
## Restricciones de implementación
## Decisiones tomadas
```

### `.ai/context.md`
```markdown
# Memoria del proyecto — [Nombre del proyecto]

> Leélo al inicio de cada tarea. Actualizarlo ante cualquier cambio relevante.

## ¿Qué es este proyecto?
## Stack técnico
## Arquitectura
## Endpoints existentes
## Decisiones de diseño
## Historial de trabajo
```

### `.ai/conventions.md`
Convenciones de código (backend + frontend) según las descritas arriba.

### `.github/copilot-instructions.md`
```markdown
## Contexto del proyecto
- Stack y arquitectura: `.ai/context.md`
- Convenciones de código: `.ai/conventions.md`
- Historias de usuario: `.ai/stories/HU-NNN-nombre.md`
- Memoria del agente: `.ai/memory.md`

## Memoria del agente
Leer `.ai/memory.md` SIEMPRE antes de actuar.
Cuando el usuario diga "recordá que...", guardarlo en `.ai/memory.md`.
```

---

## Agentes de IA requeridos en `.github/agents/`

| Agente | Trigger | Función |
|--------|---------|---------|
| `analista.agent.md` | nueva feature, quiero agregar | Entrevista → genera HU → coordina implementación |
| `backend.agent.md` | API, endpoint, ruta, servicio | Implementa API siguiendo capas |
| `web-builder.agent.md` | componente, pantalla, UI | Implementa interfaz React |
| `qa.agent.md` | verificar, validar, criterios | Valida implementación contra HU |

---

## Formato de historias de usuario (`.ai/stories/HU-NNN-nombre.md`)

```markdown
# HU-NNN — [Título]

## Épica
[Área funcional]

## Historia de usuario
**Como** [usuario],
**quiero** [acción],
**para** [beneficio].

## Criterios de aceptación

### Backend
- [ ] [criterio concreto y verificable]

### Frontend
- [ ] [criterio de UI concreto y verificable]

## Referencia técnica
- Endpoint: `MÉTODO /api/ruta`
- Backend: archivos relevantes
- Frontend: componentes relevantes

## Estado
🔲 Pendiente
```

---

## Qué necesito que generes

1. **Todos los archivos del backend** con la estructura de capas completa
2. **Todos los archivos del frontend** con proxy configurado y los tres estados de API
3. **Los archivos de contexto de IA** (`.ai/memory.md`, `.ai/context.md`, `.ai/conventions.md`)
4. **Las instrucciones del agente** (`.github/copilot-instructions.md`)
5. **Los 4 agentes** en `.github/agents/`
6. **La primera HU** correspondiente al caso de uso descrito
7. **Pasos para ejecutar** el proyecto (instalar dependencias, arrancar backend y frontend)

No sobreingenierar: implementar solo lo que el caso de uso pide.
