const express = require("express");
const router  = express.Router();
const { calcularCartaAstral } = require("../services/astral");

// GET /api/cartaastral?fecha=YYYY-MM-DD&hora=HH:MM&lat=&lon=&tz=
router.get("/", (req, res) => {
  const { fecha, hora, lat, lon, tz } = req.query;

  if (!fecha || !hora || lat === undefined || lon === undefined || tz === undefined) {
    return res.status(400).json({
      error: "Se requieren: fecha (YYYY-MM-DD), hora (HH:MM), lat, lon y tz.",
    });
  }

  const [year, month, day]   = fecha.split("-").map(Number);
  const [hours, minutes]     = hora.split(":").map(Number);
  const latitude             = parseFloat(lat);
  const longitude            = parseFloat(lon);
  const tzOffset             = parseFloat(tz);

  if ([year, month, day, hours, minutes, latitude, longitude, tzOffset].some(isNaN)) {
    return res.status(400).json({ error: "Algún parámetro tiene formato inválido." });
  }

  // Hora local → UTC
  const utcDate = new Date(Date.UTC(year, month - 1, day, hours - tzOffset, minutes));
  if (isNaN(utcDate.getTime())) {
    return res.status(400).json({ error: "Fecha u hora inválida." });
  }

  try {
    const resultado = calcularCartaAstral(utcDate, latitude, longitude);
    return res.json(resultado);
  } catch (err) {
    console.error("Error en /api/cartaastral:", err);
    return res.status(500).json({ error: "Error calculando la carta astral." });
  }
});

module.exports = router;
