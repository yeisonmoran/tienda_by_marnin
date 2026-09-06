

# Diseño e implementación de una aplicación web para la gestión de ventas de la tienda de cosméticos By Marnin

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
Este comando lee `prisma/schema.prisma` y crea las 8 tablas automáticamente en tu base de datos MySQL. La primera vez que lo corras vas a ver las tablas aparecer solas — no necesitas escribir SQL.

### 4. Levantar el servidor
```
npm run dev
```
Deberías ver en la consola:
```
Servidor corriendo en http://localhost:3000
```

### 5. Probar que funciona
Abre en el navegador (o con Postman/Insomnia):
```
GET http://localhost:3000/
GET http://localhost:3000/api/categorias
```
La segunda ruta debe devolver `[]` (una lista vacía, porque todavía no hay categorías creadas).

## Estructura del proyecto

```
proyecto/
├── prisma/
│   └── schema.prisma       ← define las 8 tablas (el "mapa" de la base de datos)
├── src/
│   ├── config/
│   │   └── db.js           ← conexión reutilizable a la base de datos
│   ├── controllers/
│   │   └── categoria.controller.js   ← lógica de cada endpoint de categorías
│   ├── routes/
│   │   └── categoria.routes.js       ← conecta URLs con el controller
│   ├── app.js               ← configuración general de Express
│   └── server.js            ← arranca el servidor
├── .env                      ← tus credenciales reales (NO se sube a git)
├── .env.example               ← plantilla de las variables necesarias
└── package.json
```

## Qué sigue

Este proyecto ya tiene el CRUD completo de **Categoría** como ejemplo funcionando de principio a fin
(rutas → controller → Prisma → MySQL). El siguiente paso es repetir el mismo patrón para las
demás entidades: Producto, Cliente, Usuario, y finalmente Venta (que es más compleja porque
maneja transacciones y descuenta stock).
