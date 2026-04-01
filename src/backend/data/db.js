const { createClient } = require("@libsql/client");

const db = createClient({
  url:       process.env.TURSO_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

// Crear tabla si no existe al arrancar
db.execute(`
  CREATE TABLE IF NOT EXISTS cartas (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    alias      TEXT    NOT NULL,
    input      TEXT    NOT NULL,
    resultado  TEXT    NOT NULL,
    created_at TEXT    NOT NULL DEFAULT (datetime('now'))
  )
`).catch((err) => {
  console.error("Error al inicializar la base de datos:", err);
  process.exit(1);
});

module.exports = db;
