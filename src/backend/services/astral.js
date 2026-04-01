const Astronomy = require("astronomy-engine");
const { longitudToSign, generarDescripcion } = require("./zodiac");

const CUERPOS = [
  { id: "Mercury", nombre: "Mercurio" },
  { id: "Venus",   nombre: "Venus"    },
  { id: "Mars",    nombre: "Marte"    },
  { id: "Jupiter", nombre: "Júpiter"  },
  { id: "Saturn",  nombre: "Saturno"  },
];

/**
 * Calcula la carta astral completa dado un momento UTC y coordenadas geográficas.
 * @param {Date} utcDate  - Fecha/hora en UTC
 * @param {number} latitude  - Latitud geográfica
 * @param {number} longitude - Longitud geográfica
 * @returns {{ sol, luna, ascendente, planetas, descripcion }}
 */
function calcularCartaAstral(utcDate, latitude, longitude) {
  // Sol — longitud eclíptica geocéntrica
  const solarPos = Astronomy.SunPosition(utcDate);
  const sol = longitudToSign(solarPos.elon);

  // Luna — longitud eclíptica geocéntrica
  const lunarPos = Astronomy.EclipticGeoMoon(utcDate);
  const luna = longitudToSign(lunarPos.lon);

  // Planetas — vector geocéntrico ecuatorial → coordenadas eclípticas
  const planetas = {};
  for (const cuerpo of CUERPOS) {
    const vec = Astronomy.GeoVector(cuerpo.id, utcDate, false);
    const ecl = Astronomy.Ecliptic(vec);
    planetas[cuerpo.nombre] = longitudToSign(ecl.elon);
  }

  // Ascendente — Tiempo Sidéreo Local + fórmula de Jean Meeus (cap. 14)
  const gmst   = Astronomy.SiderealTime(utcDate);        // GMST en horas
  const lstDeg = ((gmst * 15 + longitude) % 360 + 360) % 360;
  const lstRad = lstDeg * Math.PI / 180;
  const epsRad = 23.4397 * Math.PI / 180;                // oblicuidad de la eclíptica
  const latRad = latitude * Math.PI / 180;

  const ascRad = Math.atan2(
    -Math.cos(lstRad),
    Math.sin(lstRad) * Math.cos(epsRad) + Math.tan(latRad) * Math.sin(epsRad)
  );
  const ascLon     = ((ascRad * 180 / Math.PI) + 360) % 360;
  const ascendente = longitudToSign(ascLon);

  const descripcion = generarDescripcion(sol, luna, ascendente);

  return { sol, luna, ascendente, planetas, descripcion };
}

module.exports = { calcularCartaAstral };
