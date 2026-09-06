

# Diseño e implementación de una aplicación web para la gestión de ventas de la tienda de cosméticos By Marnin


<h2 align="center">Yeison Stiven Lara Moran</h2>

 <p align="center">Estudiante de Tecnología en Sistemas de Información</p>
 <p align="center">Universidad Antonio José Camacho</p>

<p align="center">
  <img src="./frontend/public/img/Logo.png" alt="Banner de Yeison Moran">
</p>

## Backend

API en Node.js + Express + Prisma + MySQL y tecnologia de pruebas Postma.

## Requisitos previos

- Instalar **Node.js** y verificar que tengas la verción mas reciente con el siguiente comando:
  ```
  node -v
  ```
- Tener **MySQL** instalado y corriendo localmente o en un servicio de MySQL Workbench.
- Crear una base de datos con sus respectivas tablas o si ya la tienes creada mucho mejor.
- Instalar **Postman** para hacer las pruebas de tus rutas HTTP. 

## Levantamiento del proyecto

### 1. Instalar dependencias
```
npm install
```
Esto lee (package.json) y descarga Express, Prisma, etc. dentro de una carpeta node_modules, algunas de sus archivos no se muestran por que estan protegidos en el archivo (.gitignore).

### 2. Configurar la conexión a la base de datos
Copia el archivo .env.example y renómbralo a (.env). Edita la línea (DATABASE_URL) con tus datos reales de MySQL:
```
DATABASE_URL="mysql://usuario:contrasena@localhost:3306/bymarnin"
```

### 3. Crear las tablas en MySQL a partir del schema de Prisma
```
npx prisma migrate dev --name init
```
Este comando lee (prisma/schema.prisma) y crea las 8 tablas automáticamente en tu base de datos MySQL. La primera vez que lo corras vas a ver las tablas aparecer solas — no necesitas escribir SQL.

### 4. Levantar el servidor
```
npm run dev
```
Deberías ver en la consola:
```
Servidor corriendo en http://localhost:3000
```

### 5. Probar que funciona
Hacer prueba de API en (Postman):

```
app.use("/api/categorias", categoriaRoutes);
app.use("/api/productos", productoRoutes);
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/clientes", clienteRoutes);
app.use("/api/ventas", ventaRoutes);
app.use("/api/tipos-documento", tiposDocumentoRoutes);
app.use("/api/roles-users", rolesRoutes);
```

## Frontend

Tecnologias: 
- React
- Vite 
- Bootstrap 5
- SB Admin 2 
- React Router Dom 
- localStorage
- react-bootstrap
- axios
