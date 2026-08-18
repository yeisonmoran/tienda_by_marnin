
import express from "express";
import cors from "cors";
import categoriaRoutes from "./routes/categoria.routes.js";
import productoRoutes from "./routes/producto.routes.js";
import usuarioRoutes from "./routes/usuario.routes.js";
import clienteRoutes from "./routes/cliente.routes.js";


const app = express();

app.use(cors()); 
app.use(express.json()); 

app.use("/api/categorias", categoriaRoutes);
app.use("/api/productos", productoRoutes);
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/clientes", clienteRoutes);


app.get("/", (req, res) => {
  res.json({ mensaje: "API funcionando correctamente" });
});

export default app;
