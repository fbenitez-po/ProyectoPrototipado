const Database = require("better-sqlite3");
const path     = require("path");

const db = new Database(path.join(__dirname, "cartas.db"));

// Crear tabla si no existe
db.exec(`
  CREATE TABLE IF NOT EXISTS cartas (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    alias      TEXT    NOT NULL,
    input      TEXT    NOT NULL,
    resultado  TEXT    NOT NULL,
    created_at TEXT    NOT NULL DEFAULT (datetime('now'))
  )
`);

module.exports = db;
