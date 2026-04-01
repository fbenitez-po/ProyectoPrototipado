const db = require("../data/db");

/**
 * Guarda una carta astral con un alias.
 * @param {string} alias    - Nombre elegido por el usuario
 * @param {object} input    - Parámetros originales de entrada
 * @param {object} resultado - Resultado calculado (sol, luna, ascendente, planetas, descripcion)
 * @returns {object} carta insertada con su id
 */
function guardarCarta(alias, input, resultado) {
  const stmt = db.prepare(
    "INSERT INTO cartas (alias, input, resultado) VALUES (?, ?, ?)"
  );
  const info = stmt.run(alias, JSON.stringify(input), JSON.stringify(resultado));
  return obtenerCartaPorId(info.lastInsertRowid);
}

/**
 * Devuelve todas las cartas guardadas (solo metadatos, sin el resultado completo).
 * @returns {Array}
 */
function listarCartas() {
  return db
    .prepare("SELECT id, alias, input, resultado, created_at FROM cartas ORDER BY created_at DESC")
    .all()
    .map((row) => ({
      id:         row.id,
      alias:      row.alias,
      created_at: row.created_at,
      input:      JSON.parse(row.input),
      resultado:  JSON.parse(row.resultado),
    }));
}

/**
 * Devuelve una carta completa por ID.
 * @param {number} id
 * @returns {object|null}
 */
function obtenerCartaPorId(id) {
  const row = db.prepare("SELECT * FROM cartas WHERE id = ?").get(id);
  if (!row) return null;
  return {
    id:         row.id,
    alias:      row.alias,
    created_at: row.created_at,
    input:      JSON.parse(row.input),
    resultado:  JSON.parse(row.resultado),
  };
}

/**
 * Elimina una carta por ID.
 * @param {number} id
 * @returns {boolean} true si se eliminó, false si no existía
 */
function eliminarCarta(id) {
  const info = db.prepare("DELETE FROM cartas WHERE id = ?").run(id);
  return info.changes > 0;
}

module.exports = { guardarCarta, listarCartas, obtenerCartaPorId, eliminarCarta };
