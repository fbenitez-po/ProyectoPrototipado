const express = require("express");
const cors    = require("cors");
const path    = require("path");

const infoRouter        = require("./routes/info");
const cartaAstralRouter = require("./routes/cartaastral");
const cartasRouter      = require("./routes/cartas");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/info",        infoRouter);
app.use("/api/cartaastral", cartaAstralRouter);
app.use("/api/cartas",      cartasRouter);

// Servir frontend estático en producción
if (process.env.NODE_ENV === "production") {
  const frontendDist = path.join(__dirname, "../frontend/dist");
  app.use(express.static(frontendDist));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(frontendDist, "index.html"));
  });
}

module.exports = app;
