const db = require("../data/db");

async function guardarCarta(alias, input, resultado) {
  const result = await db.execute({
    sql:  "INSERT INTO cartas (alias, input, resultado) VALUES (?, ?, ?)",
    args: [alias, JSON.stringify(input), JSON.stringify(resultado)],
  });
  return obtenerCartaPorId(Number(result.lastInsertRowid));
}

async function listarCartas() {
  const result = await db.execute(
    "SELECT id, alias, input, resultado, created_at FROM cartas ORDER BY created_at DESC"
  );
  return result.rows.map((row) => ({
    id:         row.id,
    alias:      row.alias,
    created_at: row.created_at,
    input:      JSON.parse(row.input),
    resultado:  JSON.parse(row.resultado),
  }));
}

async function obtenerCartaPorId(id) {
  const result = await db.execute({
    sql:  "SELECT * FROM cartas WHERE id = ?",
    args: [id],
  });
  const row = result.rows[0];
  if (!row) return null;
  return {
    id:         row.id,
    alias:      row.alias,
    created_at: row.created_at,
    input:      JSON.parse(row.input),
    resultado:  JSON.parse(row.resultado),
  };
}

async function eliminarCarta(id) {
  const result = await db.execute({
    sql:  "DELETE FROM cartas WHERE id = ?",
    args: [id],
  });
  return result.rowsAffected > 0;
}

module.exports = { guardarCarta, listarCartas, obtenerCartaPorId, eliminarCarta };
