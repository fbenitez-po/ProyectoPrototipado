const express = require("express");
const router  = express.Router();
const { guardarCarta, listarCartas, obtenerCartaPorId, eliminarCarta } = require("../services/cartas");

// POST /api/cartas — Guarda una carta con alias
// Body: { alias, input, resultado }
router.post("/", (req, res) => {
  const { alias, input, resultado } = req.body;

  if (!alias || typeof alias !== "string" || alias.trim() === "") {
    return res.status(400).json({ error: "El campo 'alias' es obligatorio." });
  }
  if (!input || !resultado) {
    return res.status(400).json({ error: "Se requieren 'input' y 'resultado'." });
  }

  try {
    const carta = guardarCarta(alias.trim(), input, resultado);
    return res.status(201).json(carta);
  } catch (err) {
    console.error("Error guardando carta:", err);
    return res.status(500).json({ error: "Error al guardar la carta." });
  }
});

// GET /api/cartas — Lista todas las cartas (metadatos)
router.get("/", (req, res) => {
  try {
    return res.json(listarCartas());
  } catch (err) {
    console.error("Error listando cartas:", err);
    return res.status(500).json({ error: "Error al obtener las cartas." });
  }
});

// GET /api/cartas/:id — Recupera una carta completa
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ error: "El ID debe ser un número entero." });
  }

  const carta = obtenerCartaPorId(id);
  if (!carta) {
    return res.status(404).json({ error: `No existe una carta con ID ${id}.` });
  }
  return res.json(carta);
});

// DELETE /api/cartas/:id — Elimina una carta
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ error: "El ID debe ser un número entero." });
  }

  const eliminada = eliminarCarta(id);
  if (!eliminada) {
    return res.status(404).json({ error: `No existe una carta con ID ${id}.` });
  }
  return res.status(204).send();
});

module.exports = router;
