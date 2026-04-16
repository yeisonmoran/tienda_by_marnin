CREATE DATABASE IF NOT EXISTS bymarnin;
USE bymarnin;


CREATE TABLE IF NOT EXISTS usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL UNIQUE,
    contrasena VARCHAR(255) NOT NULL,
    id_rol INT NOT NULL 
);

ALTER TABLE usuarios DROP COLUMN id_rol;

SELECT * FROM usuarios;
SELECT * FROM roles;
SELECT * FROM clientes;
SELECT * FROM ventas;

#inicializa desde 0 el id
TRUNCATE TABLE usuarios;
DELETE FROM clientes
WHERE id_cliente=1;

ALTER TABLE clientes
ADD COLUMN id_tipo_documento INT NOT NULL;

ALTER TABLE clientes
ADD CONSTRAINT fk_clientes_tipo_documentos
FOREIGN KEY (id_tipo_documento)
REFERENCES tipo_documentos(id_tipo_documento);
ALTER TABLE ventas
ADD CONSTRAINT fk_ventas_clientes
FOREIGN KEY (id_cliente)
REFERENCES clientes(id_cliente);

CREATE TABLE IF NOT EXISTS clientes (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    numero_documento VARCHAR(50) NOT NULL,
    ciudad VARCHAR(100) NOT NULL,
    id_tipo_documento INT NOT NULL 
);

SELECT * FROM tipo_documentos;

CREATE TABLE IF NOT EXISTS tipo_documentos(
    id_tipo_documento INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    abreviatura VARCHAR(40) NOT NULL
);

CREATE TABLE IF NOT EXISTS productos (
    id_producto INT AUTO_INCREMENT PRIMARY KEY,
    codigo VARCHAR(50) NOT NULL,
    nombre VARCHAR(150) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL,
    categoria VARCHAR(100),
    descripcion TEXT
);

CREATE TABLE IF NOT EXISTS ventas (
    id_venta INT AUTO_INCREMENT PRIMARY KEY,
    id_producto INT NOT NULL,
    cantidad INT NOT NULL,
    fecha DATE NOT NULL,
    estado VARCHAR(50) NOT NULL,
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
);
CREATE TABLE IF NOT EXISTS detalle_ventas (
    id_detalle_venta INT AUTO_INCREMENT PRIMARY KEY,
    id_producto INT NOT NULL,
    cantidad INT NOT NULL,
    fecha DATE NOT NULL,
    estado VARCHAR(50) NOT NULL,
    FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
);


CREATE TABLE IF NOT EXISTS roles (
    id_rol INT AUTO_INCREMENT PRIMARY KEY,
    nombre_rol VARCHAR(50) NOT NULL
);

INSERT INTO roles (id_rol, nombre_rol) 
VALUES (1, 'Administrador'),
(2, 'Vendedor');
INSERT INTO tipo_documentos(id_tipo_documento, nombre, abreviatura) 
VALUES (1, 'Cedula ciudadania', 'CC'),
(2, 'Targeta identidad', 'TI'),
(3, 'Cedula extrangera', 'CE'),
(4, 'Pasaporte', 'PAS');

