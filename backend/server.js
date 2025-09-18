const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const { productosRouter } = require("./routers/productos");
app.use("/api/productos",productosRouter);

//logger

//manejo de errores

app.listen(PORT,()=>{
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})