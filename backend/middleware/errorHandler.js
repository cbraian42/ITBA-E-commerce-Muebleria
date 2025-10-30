const notFoundRoute = (req, res, next) => {
  res.status(404).json({ error: "Ruta no encontrada" });
};

const errorHandler = (err, req, res, next) => {
  console.error("Error en el servidor:", err.message);
  res.status(500).json({ error: "Error interno del servidor" });
};

export { notFoundRoute, errorHandler };