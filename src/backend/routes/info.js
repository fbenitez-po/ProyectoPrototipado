const express = require("express");
const router  = express.Router();
const { calcularSignoZodiacal } = require("../services/zodiac");

// GET /api/info?fecha=YYYY-MM-DD
router.get("/", (req, res) => {
  const { fecha } = req.query;

  if (!fecha) {
    return res.status(400).json({ error: "El parámetro 'fecha' es requerido (YYYY-MM-DD)." });
  }

  const nacimiento = new Date(fecha);
  if (isNaN(nacimiento.getTime())) {
    return res.status(400).json({ error: "Formato de fecha inválido. Use YYYY-MM-DD." });
  }

  const hoy = new Date();
  if (nacimiento > hoy) {
    return res.status(400).json({ error: "La fecha de nacimiento no puede ser en el futuro." });
  }

  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const mesDiff = hoy.getMonth() - nacimiento.getMonth();
  if (mesDiff < 0 || (mesDiff === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }

  const dia   = nacimiento.getDate();
  const mes   = nacimiento.getMonth() + 1;
  const signo = calcularSignoZodiacal(dia, mes);

  return res.json({ edad, signo });
});

module.exports = router;
