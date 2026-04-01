const SIGNOS = require("../data/signos");
const RASGOS = require("../data/rasgos");

/**
 * Convierte una longitud eclíptica (0–360°) al signo zodiacal correspondiente.
 */
function longitudToSign(lon) {
  const normalized = ((lon % 360) + 360) % 360;
  const index = Math.floor(normalized / 30);
  const grados = Math.floor(normalized % 30);
  return { nombre: SIGNOS[index].nombre, emoji: SIGNOS[index].emoji, grados };
}

/**
 * Calcula el signo zodiacal por fecha (tabla clásica, para /api/info).
 */
function calcularSignoZodiacal(dia, mes) {
  if ((mes === 3 && dia >= 21) || (mes === 4 && dia <= 19))   return "Aries ♈";
  if ((mes === 4 && dia >= 20) || (mes === 5 && dia <= 20))   return "Tauro ♉";
  if ((mes === 5 && dia >= 21) || (mes === 6 && dia <= 20))   return "Géminis ♊";
  if ((mes === 6 && dia >= 21) || (mes === 7 && dia <= 22))   return "Cáncer ♋";
  if ((mes === 7 && dia >= 23) || (mes === 8 && dia <= 22))   return "Leo ♌";
  if ((mes === 8 && dia >= 23) || (mes === 9 && dia <= 22))   return "Virgo ♍";
  if ((mes === 9 && dia >= 23) || (mes === 10 && dia <= 22))  return "Libra ♎";
  if ((mes === 10 && dia >= 23) || (mes === 11 && dia <= 21)) return "Escorpio ♏";
  if ((mes === 11 && dia >= 22) || (mes === 12 && dia <= 21)) return "Sagitario ♐";
  if ((mes === 12 && dia >= 22) || (mes === 1 && dia <= 19))  return "Capricornio ♑";
  if ((mes === 1 && dia >= 20) || (mes === 2 && dia <= 18))   return "Acuario ♒";
  if ((mes === 2 && dia >= 19) || (mes === 3 && dia <= 20))   return "Piscis ♓";
  return "Desconocido";
}

/**
 * Genera una descripción de personalidad basada en Sol, Luna y Ascendente.
 */
function generarDescripcion(sol, luna, ascendente) {
  const rSol  = RASGOS[sol.nombre];
  const rLuna = RASGOS[luna.nombre];
  const rAsc  = RASGOS[ascendente.nombre];

  if (!rSol || !rLuna || !rAsc) return null;

  return (
    `Con el Sol en ${sol.nombre}, es una persona ${rSol.sol}. ` +
    `Su Luna en ${luna.nombre} revela que ${rLuna.luna}. ` +
    `Con Ascendente en ${ascendente.nombre}, los demás la perciben como alguien ${rAsc.asc}.`
  );
}

module.exports = { longitudToSign, calcularSignoZodiacal, generarDescripcion };
