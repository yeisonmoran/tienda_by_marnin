
import express from "express";
import cors from "cors";
import categoriaRoutes from "./routes/categoria.routes.js";
import productoRoutes from "./routes/producto.routes.js";
import usuarioRoutes from "./routes/usuario.routes.js";
import clienteRoutes from "./routes/cliente.routes.js";
import ventaRoutes from "./routes/venta.routes.js";
import tiposDocumentoRoutes  from "./routes/tiposDocumento.routes.js";
import rolesRoutes from "./routes/rolesUsers.routes.js";


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/categorias", categoriaRoutes);
app.use("/api/productos", productoRoutes);
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/clientes", clienteRoutes);
app.use("/api/ventas", ventaRoutes);
app.use("/api/tipos-documento", tiposDocumentoRoutes);
app.use("/api/roles-users", rolesRoutes);


app.get("/", (req, res) => {
  res.json({ mensaje: "API funcionando correctamente" });
});

export default app;
