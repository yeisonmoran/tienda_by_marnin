-- ============================================================
-- BASE DE DATOS: bymarnin  (DROP + RECREATE completo)
-- Sistema de Tienda - By Marnin
-- ============================================================

SET FOREIGN_KEY_CHECKS = 0;

DROP DATABASE IF EXISTS `bymarnin`;
CREATE DATABASE `bymarnin`
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE `bymarnin`;

SET FOREIGN_KEY_CHECKS = 1;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;

-- ============================================================
-- TABLA: roles
-- ============================================================
CREATE TABLE `roles` (
  `id_rol`    INT         NOT NULL AUTO_INCREMENT,
  `nombre_rol` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id_rol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `roles` VALUES
(1, 'Administrador'),
(2, 'Vendedor'),
(3, 'Usuario');

-- ============================================================
-- TABLA: tipos_documento
-- ============================================================
CREATE TABLE `tipos_documento` (
  `id_tipo_documento` INT         NOT NULL AUTO_INCREMENT,
  `nombre`            VARCHAR(80) NOT NULL,
  `abreviatura`       VARCHAR(10) NOT NULL,
  PRIMARY KEY (`id_tipo_documento`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `tipos_documento` VALUES
(1, 'Cédula de Ciudadanía',  'CC'),
(2, 'Tarjeta de Identidad', 'TI'),
(3, 'Cédula de Extranjería','CE'),
(4, 'Pasaporte',            'PAS'),
(5, 'NIT',                  'NIT');

-- ============================================================
-- TABLA: usuarios
-- ============================================================
CREATE TABLE `usuarios` (
  `id_usuario`        INT          NOT NULL AUTO_INCREMENT,
  `nombre`            VARCHAR(100) NOT NULL,
  `correo`            VARCHAR(100) NOT NULL,
  `contrasena`        VARCHAR(255) NOT NULL,
  `id_rol`            INT          NOT NULL,
  `id_tipo_documento` INT          NOT NULL,
  `numero_documento`  VARCHAR(30)  NOT NULL,
  `created_at`        TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `uk_usuarios_correo` (`correo`),
  CONSTRAINT `fk_usuarios_rol`  FOREIGN KEY (`id_rol`)            REFERENCES `roles`(`id_rol`)                      ON UPDATE CASCADE,
  CONSTRAINT `fk_usuarios_tdoc` FOREIGN KEY (`id_tipo_documento`) REFERENCES `tipos_documento`(`id_tipo_documento`)  ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Contraseña: Admin123* (hash bcrypt)
INSERT INTO `usuarios` (`nombre`,`correo`,`contrasena`,`id_rol`,`id_tipo_documento`,`numero_documento`) VALUES
('Administrador','admin@bymarnin.com','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',1,1,'1000000001'),
('Vendedor Demo', 'vendedor@bymarnin.com','$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',2,1,'2000000002');

-- ============================================================
-- TABLA: clientes
-- ============================================================
CREATE TABLE `clientes` (
  `id_cliente`        INT          NOT NULL AUTO_INCREMENT,
  `nombre`            VARCHAR(100) NOT NULL,
  `correo`            VARCHAR(100) NOT NULL,
  `telefono`          VARCHAR(20),
  `numero_documento`  VARCHAR(30)  NOT NULL,
  `ciudad`            VARCHAR(80),
  `id_tipo_documento` INT          NOT NULL,
  `created_at`        TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_cliente`),
  CONSTRAINT `fk_clientes_tdoc` FOREIGN KEY (`id_tipo_documento`) REFERENCES `tipos_documento`(`id_tipo_documento`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `clientes` (`nombre`,`correo`,`telefono`,`numero_documento`,`ciudad`,`id_tipo_documento`) VALUES
('Carlos Gómez',   'carlos@mail.com',  '3001234567','10223344','Bogotá',  1),
('María López',    'maria@mail.com',   '3107654321','20334455','Medellín',1),
('Pedro Martínez', 'pedro@mail.com',   '3204567890','30445566','Cali',    1),
('Lucía Torres',   'lucia@mail.com',   '3005551234','40556677','Barranquilla',1);

-- ============================================================
-- TABLA: categorias
-- ============================================================
CREATE TABLE `categorias` (
  `id_categoria` INT          NOT NULL AUTO_INCREMENT,
  `nombre`       VARCHAR(80)  NOT NULL,
  `descripcion`  VARCHAR(255),
  PRIMARY KEY (`id_categoria`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `categorias` (`nombre`,`descripcion`) VALUES
('Electrónica',  'Dispositivos y equipos electrónicos'),
('Ropa',         'Prendas de vestir para todas las edades'),
('Alimentos',    'Productos alimenticios y bebidas'),
('Hogar',        'Artículos para el hogar y decoración'),
('Deportes',     'Equipos y ropa deportiva');

-- ============================================================
-- TABLA: productos
-- ============================================================
CREATE TABLE `productos` (
  `id_producto`   INT            NOT NULL AUTO_INCREMENT,
  `codigo`        VARCHAR(30)    NOT NULL,
  `nombre`        VARCHAR(150)   NOT NULL,
  `precio`        DECIMAL(12,2)  NOT NULL DEFAULT 0.00,
  `stock`         INT            NOT NULL DEFAULT 0,
  `stock_minimo`  INT            NOT NULL DEFAULT 5,
  `id_categoria`  INT            NOT NULL,
  `descripcion`   VARCHAR(255),
  `created_at`    TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_producto`),
  UNIQUE KEY `uk_productos_codigo` (`codigo`),
  CONSTRAINT `fk_productos_cat` FOREIGN KEY (`id_categoria`) REFERENCES `categorias`(`id_categoria`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `productos` (`codigo`,`nombre`,`precio`,`stock`,`stock_minimo`,`id_categoria`,`descripcion`) VALUES
('ELEC-001','Televisor 50" 4K Smart TV', 1500000.00,10,3,1,'Smart TV UHD con control remoto'),
('ELEC-002','Audífonos Bluetooth',          89000.00,25,5,1,'Inalámbricos con cancelación de ruido'),
('ELEC-003','Smartphone 128GB',            650000.00, 8,3,1,'Android 13, cámara 48MP'),
('ROPA-001','Camisa informal manga larga',  45000.00,40,8,2,'Algodón 100%, tallas S-XL'),
('ROPA-002','Pantalón jean slim',           95000.00,20,5,2,'Denim 100%, tallas 28-38'),
('ALIM-001','Café molido premium 500g',     18000.00, 3,5,3,'Café de origen colombiano'),
('ALIM-002','Aceite de oliva extra virgen', 35000.00,12,4,3,'500ml, importado'),
('HOG-001', 'Lámpara de escritorio LED',    35000.00,15,4,4,'Con ajuste de intensidad y color'),
('HOG-002', 'Juego de sábanas queen',       89000.00, 7,3,4,'100% algodón egipcio'),
('DEP-001', 'Balón de fútbol profesional',  65000.00, 8,3,5,'Cuero sintético oficial FIFA'),
('DEP-002', 'Tenis para correr',           180000.00, 4,5,5,'Suela amortiguadora air');

-- ============================================================
-- TABLA: ventas
-- ============================================================
CREATE TABLE `ventas` (
  `id_venta`    INT           NOT NULL AUTO_INCREMENT,
  `id_cliente`  INT           NOT NULL,
  `id_usuario`  INT           NOT NULL,
  `fecha`       DATE          NOT NULL,
  `total`       DECIMAL(14,2) NOT NULL DEFAULT 0.00,
  `estado`      VARCHAR(30)   NOT NULL DEFAULT 'Completada',
  `metodo_pago` VARCHAR(50)   NOT NULL DEFAULT 'Efectivo',
  `created_at`  TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_venta`),
  CONSTRAINT `fk_ventas_cliente` FOREIGN KEY (`id_cliente`) REFERENCES `clientes`(`id_cliente`) ON UPDATE CASCADE,
  CONSTRAINT `fk_ventas_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios`(`id_usuario`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- TABLA: detalle_ventas
-- ============================================================
CREATE TABLE `detalle_ventas` (
  `id_detalle`      INT           NOT NULL AUTO_INCREMENT,
  `id_venta`        INT           NOT NULL,
  `id_producto`     INT           NOT NULL,
  `cantidad`        INT           NOT NULL DEFAULT 1,
  `precio_unitario` DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  `subtotal`        DECIMAL(14,2) NOT NULL DEFAULT 0.00,
  PRIMARY KEY (`id_detalle`),
  CONSTRAINT `fk_detalle_venta`    FOREIGN KEY (`id_venta`)    REFERENCES `ventas`(`id_venta`)       ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_detalle_producto` FOREIGN KEY (`id_producto`) REFERENCES `productos`(`id_producto`)  ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Venta de ejemplo
INSERT INTO `ventas` (`id_cliente`,`id_usuario`,`fecha`,`total`,`estado`,`metodo_pago`) VALUES
(1, 1, CURDATE(), 178000.00, 'Completada', 'Efectivo');

INSERT INTO `detalle_ventas` (`id_venta`,`id_producto`,`cantidad`,`precio_unitario`,`subtotal`) VALUES
(1, 2, 1,  89000.00,  89000.00),
(1, 4, 2,  45000.00,  90000.00);  -

COMMIT;

SELECT * FROM usuarios;
SELECT * FROM clientes;
SELECT * FROM tipos_documento;



