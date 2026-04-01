import { useState, useEffect, useCallback } from "react";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 900);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 899px)");
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isMobile;
}

const CIUDADES = [
  { nombre: "Buenos Aires, Argentina",  lat: -34.6037, lon: -58.3816, tz: -3 },
  { nombre: "Cordoba, Argentina",       lat: -31.4201, lon: -64.1888, tz: -3 },
  { nombre: "Rosario, Argentina",       lat: -32.9442, lon: -60.6505, tz: -3 },
  { nombre: "Santiago, Chile",          lat: -33.4489, lon: -70.6693, tz: -3 },
  { nombre: "Lima, Peru",               lat: -12.0464, lon: -77.0428, tz: -5 },
  { nombre: "Bogota, Colombia",         lat:   4.7110, lon: -74.0721, tz: -5 },
  { nombre: "Ciudad de Mexico",         lat:  19.4326, lon: -99.1332, tz: -6 },
  { nombre: "Montevideo, Uruguay",      lat: -34.9011, lon: -56.1645, tz: -3 },
  { nombre: "Asuncion, Paraguay",       lat: -25.2867, lon: -57.6470, tz: -4 },
  { nombre: "La Paz, Bolivia",          lat: -16.5000, lon: -68.1500, tz: -4 },
  { nombre: "Quito, Ecuador",           lat:  -0.2295, lon: -78.5243, tz: -5 },
  { nombre: "Caracas, Venezuela",       lat:  10.4806, lon: -66.9036, tz: -4 },
  { nombre: "Madrid, Espana",           lat:  40.4168, lon:  -3.7038, tz:  1 },
  { nombre: "Barcelona, Espana",        lat:  41.3851, lon:   2.1734, tz:  1 },
];

const EMOJIS_PLANETAS = {
  Mercurio: "\u263F",
  Venus:    "\u2640",
  Marte:    "\u2642",
  Jupiter:  "\u2643",
  Saturno:  "\u2644",
};

const S = {
  page: {
    minHeight: "100vh",
    background: "#0b0f1a",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
    color: "#e8e8f0",
    display: "flex",
    flexDirection: "column",
    overflowX: "hidden",
  },
  header: {
    borderBottom: "1px solid rgba(255,255,255,0.07)",
    padding: "18px 40px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background: "rgba(255,255,255,0.02)",
  },
  headerLogo: {
    fontSize: "1.3rem",
    fontWeight: "800",
    letterSpacing: "-0.5px",
    background: "linear-gradient(90deg, #818cf8, #c084fc)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  headerSub: {
    fontSize: "0.78rem",
    color: "rgba(255,255,255,0.25)",
    marginLeft: "auto",
    letterSpacing: "2px",
    textTransform: "uppercase",
  },
  layout: {
    flex: 1,
    display: "grid",
    gridTemplateColumns: "380px 1fr",
    gap: "0",
    maxWidth: "1100px",
    margin: "0 auto",
    width: "100%",
    padding: "40px 24px",
    boxSizing: "border-box",
    alignItems: "start",
  },
  leftPanel: {
    padding: "0 32px 0 0",
    borderRight: "1px solid rgba(255,255,255,0.06)",
  },
  sectionTitle: {
    fontSize: "0.65rem",
    fontWeight: "700",
    color: "rgba(255,255,255,0.3)",
    textTransform: "uppercase",
    letterSpacing: "2.5px",
    marginBottom: "20px",
  },
  label: {
    display: "block",
    fontSize: "0.72rem",
    color: "rgba(255,255,255,0.5)",
    marginBottom: "6px",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "0.8px",
  },
  optTag: {
    color: "rgba(255,255,255,0.2)",
    fontWeight: "400",
    textTransform: "none",
    letterSpacing: "0",
    marginLeft: "4px",
    fontSize: "0.68rem",
  },
  input: {
    width: "100%",
    padding: "10px 13px",
    borderRadius: "8px",
    border: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(255,255,255,0.05)",
    color: "#e8e8f0",
    fontSize: "0.9rem",
    outline: "none",
    boxSizing: "border-box",
    marginBottom: "14px",
  },
  select: {
    width: "100%",
    padding: "10px 13px",
    borderRadius: "8px",
    border: "1px solid rgba(255,255,255,0.1)",
    background: "#0f1524",
    color: "#e8e8f0",
    fontSize: "0.9rem",
    outline: "none",
    boxSizing: "border-box",
    marginBottom: "14px",
    cursor: "pointer",
  },
  fieldRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px",
  },
  divider: {
    border: "none",
    borderTop: "1px solid rgba(255,255,255,0.06)",
    margin: "20px 0",
  },
  btn: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    color: "#fff",
    fontSize: "0.9rem",
    fontWeight: "700",
    cursor: "pointer",
    letterSpacing: "0.3px",
    boxShadow: "0 4px 20px rgba(99,102,241,0.3)",
  },
  error: {
    marginTop: "12px",
    padding: "10px 14px",
    borderRadius: "8px",
    background: "rgba(239,68,68,0.1)",
    border: "1px solid rgba(239,68,68,0.25)",
    color: "#fca5a5",
    fontSize: "0.82rem",
  },
  basicGrid: {
    marginTop: "20px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px",
  },
  basicCard: {
    background: "rgba(255,255,255,0.04)",
    borderRadius: "10px",
    padding: "16px",
    textAlign: "center",
    border: "1px solid rgba(255,255,255,0.08)",
  },
  basicLabel: {
    fontSize: "0.62rem",
    color: "rgba(255,255,255,0.35)",
    textTransform: "uppercase",
    letterSpacing: "1.2px",
    marginBottom: "6px",
  },
  basicValue: {
    fontSize: "1.4rem",
    fontWeight: "700",
    color: "#a5b4fc",
  },
  rightPanel: {
    padding: "0 0 0 32px",
  },
  emptyState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "300px",
    color: "rgba(255,255,255,0.1)",
    textAlign: "center",
    gap: "12px",
  },
  emptyIcon: {
    fontSize: "3rem",
    opacity: 0.3,
  },
  emptyText: {
    fontSize: "0.8rem",
    letterSpacing: "1px",
    textTransform: "uppercase",
  },
  chartLabel: {
    fontSize: "0.65rem",
    fontWeight: "700",
    color: "rgba(255,255,255,0.3)",
    textTransform: "uppercase",
    letterSpacing: "2.5px",
    marginBottom: "16px",
  },
  bigThree: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "10px",
    marginBottom: "10px",
  },
  bigCard: {
    background: "linear-gradient(135deg, rgba(99,102,241,0.12), rgba(139,92,246,0.08))",
    border: "1px solid rgba(99,102,241,0.2)",
    borderRadius: "12px",
    padding: "16px 10px",
    textAlign: "center",
  },
  pEmoji: {
    fontSize: "1.3rem",
    display: "block",
    marginBottom: "6px",
  },
  pName: {
    fontSize: "0.6rem",
    color: "rgba(255,255,255,0.35)",
    textTransform: "uppercase",
    letterSpacing: "0.8px",
    marginBottom: "5px",
  },
  pSign: {
    fontSize: "0.9rem",
    fontWeight: "700",
    color: "#c4b5fd",
  },
  pDeg: {
    fontSize: "0.62rem",
    color: "rgba(255,255,255,0.25)",
    marginTop: "3px",
  },
  smallGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: "8px",
    marginBottom: "20px",
  },
  smallCard: {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "10px",
    padding: "12px 6px",
    textAlign: "center",
  },
  descBox: {
    background: "linear-gradient(135deg, rgba(99,102,241,0.07), rgba(139,92,246,0.04))",
    border: "1px solid rgba(99,102,241,0.18)",
    borderRadius: "12px",
    padding: "20px 22px",
  },
  descLabel: {
    fontSize: "0.62rem",
    fontWeight: "700",
    color: "rgba(165,180,252,0.7)",
    textTransform: "uppercase",
    letterSpacing: "2px",
    marginBottom: "10px",
  },
  descText: {
    fontSize: "0.9rem",
    lineHeight: "1.75",
    color: "rgba(232,232,240,0.75)",
    fontStyle: "italic",
    margin: "0",
  },
  noteText: {
    fontSize: "0.6rem",
    color: "rgba(255,255,255,0.12)",
    marginTop: "14px",
    marginBottom: "0",
    letterSpacing: "0.3px",
  },

  // ── Tabs ──────────────────────────────────────────────────────────────────
  tabRow: {
    display: "flex",
    gap: "4px",
    marginBottom: "24px",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    paddingBottom: "0",
  },
  tab: (active) => ({
    padding: "8px 16px",
    fontSize: "0.72rem",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: "1.5px",
    border: "none",
    background: "none",
    cursor: "pointer",
    color: active ? "#a5b4fc" : "rgba(255,255,255,0.25)",
    borderBottom: active ? "2px solid #818cf8" : "2px solid transparent",
    marginBottom: "-1px",
    transition: "color 0.15s",
  }),

  // ── Barra guardar ─────────────────────────────────────────────────────────
  saveBar: {
    display: "flex",
    gap: "8px",
    alignItems: "center",
    marginBottom: "20px",
    background: "rgba(99,102,241,0.08)",
    border: "1px solid rgba(99,102,241,0.2)",
    borderRadius: "10px",
    padding: "10px 14px",
  },
  saveInput: {
    flex: 1,
    padding: "7px 11px",
    borderRadius: "7px",
    border: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(255,255,255,0.05)",
    color: "#e8e8f0",
    fontSize: "0.85rem",
    outline: "none",
  },
  saveBtn: {
    padding: "7px 14px",
    borderRadius: "7px",
    border: "none",
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    color: "#fff",
    fontSize: "0.82rem",
    fontWeight: "700",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
  saveOk: {
    fontSize: "0.78rem",
    color: "#86efac",
  },

  // ── Mis Consultas ─────────────────────────────────────────────────────────
  consultaList: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  consultaCard: {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "12px",
    padding: "18px 20px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  consultaCardTop: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
  },
  consultaInfo: {
    flex: 1,
  },
  consultaAlias: {
    fontWeight: "700",
    fontSize: "0.95rem",
    color: "#c4b5fd",
    marginBottom: "4px",
  },
  consultaMeta: {
    fontSize: "0.7rem",
    color: "rgba(255,255,255,0.3)",
    letterSpacing: "0.3px",
  },
  consultaTrio: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "8px",
  },
  consultaTrioCard: {
    background: "rgba(99,102,241,0.08)",
    border: "1px solid rgba(99,102,241,0.15)",
    borderRadius: "8px",
    padding: "10px 8px",
    textAlign: "center",
  },
  consultaTrioLabel: {
    fontSize: "0.58rem",
    color: "rgba(255,255,255,0.3)",
    textTransform: "uppercase",
    letterSpacing: "1px",
    marginBottom: "4px",
  },
  consultaTrioValue: {
    fontSize: "0.82rem",
    fontWeight: "700",
    color: "#a5b4fc",
  },
  consultaDesc: {
    fontSize: "0.78rem",
    color: "rgba(232,232,240,0.5)",
    fontStyle: "italic",
    lineHeight: "1.6",
    borderTop: "1px solid rgba(255,255,255,0.05)",
    paddingTop: "10px",
    margin: "0",
  },
  consultaInputMeta: {
    fontSize: "0.68rem",
    color: "rgba(255,255,255,0.2)",
    letterSpacing: "0.3px",
  },
  deleteBtn: {
    background: "none",
    border: "1px solid rgba(239,68,68,0.2)",
    borderRadius: "7px",
    color: "rgba(239,68,68,0.5)",
    cursor: "pointer",
    padding: "6px 9px",
    fontSize: "0.85rem",
    transition: "all 0.15s",
  },
};

function PlanetCard({ emoji, nombre, signo, big }) {
  return (
    <div style={big ? S.bigCard : S.smallCard}>
      <span style={S.pEmoji}>{emoji}</span>
      <div style={S.pName}>{nombre}</div>
      <div style={S.pSign}>{signo.nombre} {signo.emoji}</div>
      <div style={S.pDeg}>{signo.grados}&deg;</div>
    </div>
  );
}

export default function App() {
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [ciudadIdx, setCiudadIdx] = useState("");
  const [resultadoBasico, setResultadoBasico] = useState(null);
  const [cartaAstral, setCartaAstral] = useState(null);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(false);

  // Tabs
  const [tab, setTab] = useState("carta"); // "carta" | "consultas"

  // Guardar carta
  const [alias, setAlias] = useState("");
  const [guardando, setGuardando] = useState(false);
  const [guardadoOk, setGuardadoOk] = useState(false);

  // Mis consultas
  const [consultas, setConsultas] = useState([]);
  const [cargandoConsultas, setCargandoConsultas] = useState(false);

  const isMobile = useIsMobile();

  const cargarConsultas = useCallback(async () => {
    setCargandoConsultas(true);
    try {
      const res = await fetch("/api/cartas");
      const data = await res.json();
      if (res.ok) setConsultas(data);
    } catch {
      // silencioso
    } finally {
      setCargandoConsultas(false);
    }
  }, []);

  useEffect(() => {
    if (tab === "consultas") cargarConsultas();
  }, [tab, cargarConsultas]);

  const handleCalcular = async () => {
    if (!fecha) { setError("Selecciona una fecha de nacimiento."); return; }

    setError(null);
    setResultadoBasico(null);
    setCartaAstral(null);
    setGuardadoOk(false);
    setAlias("");
    setCargando(true);

    try {
      const resInfo = await fetch(`/api/info?fecha=${fecha}`);
      const dataInfo = await resInfo.json();
      if (!resInfo.ok) { setError(dataInfo.error || "Error en el servidor."); return; }
      setResultadoBasico(dataInfo);

      if (hora && ciudadIdx !== "") {
        const ciudad = CIUDADES[parseInt(ciudadIdx)];
        const url = `/api/cartaastral?fecha=${fecha}&hora=${encodeURIComponent(hora)}&lat=${ciudad.lat}&lon=${ciudad.lon}&tz=${ciudad.tz}`;
        const resCarta = await fetch(url);
        const dataCarta = await resCarta.json();
        if (!resCarta.ok) setError(dataCarta.error || "Error calculando la carta astral.");
        else { setCartaAstral(dataCarta); setTab("carta"); }
      }
    } catch {
      setError("No se pudo conectar con el servidor.");
    } finally {
      setCargando(false);
    }
  };

  const handleGuardar = async () => {
    if (!alias.trim()) return;
    setGuardando(true);
    try {
      const ciudad = ciudadIdx !== "" ? CIUDADES[parseInt(ciudadIdx)] : null;
      const input = { fecha, hora, ...(ciudad ? { lat: ciudad.lat, lon: ciudad.lon, tz: ciudad.tz, ciudad: ciudad.nombre } : {}) };
      const res = await fetch("/api/cartas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ alias: alias.trim(), input, resultado: cartaAstral }),
      });
      if (res.ok) {
        setGuardadoOk(true);
        setAlias("");
      }
    } catch {
      // silencioso
    } finally {
      setGuardando(false);
    }
  };

  const handleEliminar = async (id) => {
    await fetch(`/api/cartas/${id}`, { method: "DELETE" });
    setConsultas((prev) => prev.filter((c) => c.id !== id));
  };

  const hoy = new Date().toISOString().split("T")[0];
  const tieneCarta = !!cartaAstral;

  return (
    <div style={S.page}>
      <header style={{ ...S.header, ...(isMobile ? { padding: "14px 16px" } : {}) }}>
        <span style={S.headerLogo}>&#10022; AstroChart</span>
        <span style={S.headerSub}>Carta Astral &amp; Zodiaco</span>
      </header>

      <main style={{ ...S.layout, ...(isMobile ? { gridTemplateColumns: "1fr", padding: "20px 16px" } : {}) }}>
        {/* Columna izquierda */}
        <div style={{ ...S.leftPanel, ...(isMobile ? { padding: "0 0 24px 0", borderRight: "none", borderBottom: "1px solid rgba(255,255,255,0.06)" } : {}) }}>
          <div style={S.sectionTitle}>Datos de nacimiento</div>

          <label style={S.label}>Fecha</label>
          <input
            type="date"
            style={S.input}
            value={fecha}
            max={hoy}
            onChange={(e) => setFecha(e.target.value)}
          />

          <div style={S.fieldRow}>
            <div>
              <label style={S.label}>Hora <span style={S.optTag}>opcional</span></label>
              <input
                type="time"
                style={S.input}
                value={hora}
                onChange={(e) => setHora(e.target.value)}
              />
            </div>
            <div>
              <label style={S.label}>Ciudad <span style={S.optTag}>opcional</span></label>
              <select
                style={S.select}
                value={ciudadIdx}
                onChange={(e) => setCiudadIdx(e.target.value)}
              >
                <option value="">Seleccionar...</option>
                {CIUDADES.map((c, i) => (
                  <option key={i} value={i}>{c.nombre}</option>
                ))}
              </select>
            </div>
          </div>

          <hr style={S.divider} />

          <button
            style={{ ...S.btn, opacity: cargando ? 0.6 : 1 }}
            onClick={handleCalcular}
            disabled={cargando}
          >
            {cargando ? "Calculando..." : "Generar carta astral"}
          </button>

          {error && <div style={S.error}>{error}</div>}

          {resultadoBasico && (
            <div style={S.basicGrid}>
              <div style={S.basicCard}>
                <div style={S.basicLabel}>Edad</div>
                <div style={S.basicValue}>{resultadoBasico.edad} años</div>
              </div>
              <div style={S.basicCard}>
                <div style={S.basicLabel}>Signo Solar</div>
                <div style={S.basicValue}>{resultadoBasico.signo}</div>
              </div>
            </div>
          )}
        </div>

        {/* Columna derecha */}
        <div style={{ ...S.rightPanel, ...(isMobile ? { padding: "0" } : {}) }}>
          {/* Tabs */}
          <div style={S.tabRow}>
            <button style={S.tab(tab === "carta")} onClick={() => setTab("carta")}>
              ✦ Carta
            </button>
            <button style={S.tab(tab === "consultas")} onClick={() => setTab("consultas")}>
              🗂 Mis consultas
            </button>
          </div>

          {/* Vista: Carta */}
          {tab === "carta" && (
            <>
              {!tieneCarta ? (
                <div style={S.emptyState}>
                  <span style={S.emptyIcon}>&#10022;</span>
                  <span style={S.emptyText}>Ingresa tus datos para ver tu carta astral</span>
                </div>
              ) : (
                <>
                  {/* Barra guardar */}
                  <div style={S.saveBar}>
                    <input
                      style={S.saveInput}
                      type="text"
                      placeholder='Nombre para guardar, ej: "Mi carta natal"'
                      value={alias}
                      onChange={(e) => { setAlias(e.target.value); setGuardadoOk(false); }}
                      onKeyDown={(e) => e.key === "Enter" && handleGuardar()}
                    />
                    <button
                      style={{ ...S.saveBtn, opacity: guardando || !alias.trim() ? 0.5 : 1 }}
                      onClick={handleGuardar}
                      disabled={guardando || !alias.trim()}
                      title="Guardar carta"
                    >
                      💾 Guardar
                    </button>
                    {guardadoOk && <span style={S.saveOk}>✓ Guardada</span>}
                  </div>

                  <div style={S.chartLabel}>&#10022; Los tres grandes</div>
                  <div style={S.bigThree}>
                    <PlanetCard emoji={"\u2600\uFE0F"} nombre="Sol"        signo={cartaAstral.sol}        big />
                    <PlanetCard emoji={"\uD83C\uDF19"} nombre="Luna"       signo={cartaAstral.luna}       big />
                    <PlanetCard emoji={"\u2B06\uFE0F"} nombre="Ascendente" signo={cartaAstral.ascendente} big />
                  </div>

                  <div style={{ ...S.chartLabel, marginTop: "20px" }}>Planetas personales</div>
                  <div style={{ ...S.smallGrid, ...(isMobile ? { gridTemplateColumns: "repeat(3, 1fr)" } : {}) }}>
                    {Object.entries(cartaAstral.planetas).map(([nombre, signo]) => (
                      <PlanetCard
                        key={nombre}
                        emoji={EMOJIS_PLANETAS[nombre] || "\u2605"}
                        nombre={nombre}
                        signo={signo}
                        big={false}
                      />
                    ))}
                  </div>

                  {cartaAstral.descripcion && (
                    <div style={S.descBox}>
                      <div style={S.descLabel}>Perfil de personalidad</div>
                      <p style={S.descText}>{cartaAstral.descripcion}</p>
                      <p style={S.noteText}>* Posiciones calculadas con precision astronomica</p>
                    </div>
                  )}
                </>
              )}
            </>
          )}

          {/* Vista: Mis Consultas */}
          {tab === "consultas" && (
            <>
              {cargandoConsultas ? (
                <div style={S.emptyState}>
                  <span style={S.emptyText}>Cargando...</span>
                </div>
              ) : consultas.length === 0 ? (
                <div style={S.emptyState}>
                  <span style={S.emptyIcon}>🗂</span>
                  <span style={S.emptyText}>Todavía no guardaste ninguna carta</span>
                </div>
              ) : (
                <div style={S.consultaList}>
                  {consultas.map((c) => (
                    <div key={c.id} style={S.consultaCard}>
                      {/* Encabezado */}
                      <div style={S.consultaCardTop}>
                        <div style={S.consultaInfo}>
                          <div style={S.consultaAlias}>{c.alias}</div>
                          <div style={S.consultaMeta}>
                            Guardada el {new Date(c.created_at).toLocaleDateString("es-AR", { day: "2-digit", month: "short", year: "numeric" })}
                            {c.input?.ciudad ? ` · ${c.input.ciudad}` : ""}
                            {c.input?.fecha ? ` · ${c.input.fecha}` : ""}
                            {c.input?.hora ? ` ${c.input.hora}hs` : ""}
                          </div>
                        </div>
                        <button style={S.deleteBtn} title="Eliminar" onClick={() => handleEliminar(c.id)}>🗑</button>
                      </div>

                      {/* Sol / Luna / Ascendente */}
                      {c.resultado?.sol && c.resultado?.luna && c.resultado?.ascendente && (
                        <div style={S.consultaTrio}>
                          <div style={S.consultaTrioCard}>
                            <div style={S.consultaTrioLabel}>☀️ Sol</div>
                            <div style={S.consultaTrioValue}>{c.resultado.sol.nombre} {c.resultado.sol.emoji}</div>
                          </div>
                          <div style={S.consultaTrioCard}>
                            <div style={S.consultaTrioLabel}>🌙 Luna</div>
                            <div style={S.consultaTrioValue}>{c.resultado.luna.nombre} {c.resultado.luna.emoji}</div>
                          </div>
                          <div style={S.consultaTrioCard}>
                            <div style={S.consultaTrioLabel}>⬆️ Asc</div>
                            <div style={S.consultaTrioValue}>{c.resultado.ascendente.nombre} {c.resultado.ascendente.emoji}</div>
                          </div>
                        </div>
                      )}

                      {/* Descripción */}
                      {c.resultado?.descripcion && (
                        <p style={S.consultaDesc}>{c.resultado.descripcion}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
