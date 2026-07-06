-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-06-2026 a las 01:38:12
-- Versión del servidor: 8.0.45-0ubuntu0.24.04.1
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `goalkeepernow`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `porteros`
--

CREATE TABLE `porteros` (
  `id` int NOT NULL,
  `usuario_id` int NOT NULL,
  `nivel` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `precio` decimal(10,2) DEFAULT NULL,
  `descripcion` text COLLATE utf8mb4_general_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `porteros`
--

INSERT INTO `porteros` (`id`, `usuario_id`, `nivel`, `precio`, `descripcion`) VALUES
(1, 4, 'amateur', 45000.00, 'Portero disponible en horario nocturno. Experiencia en fútbol 7.'),
(2, 5, 'principiante', 30000.00, 'Disponible en las tardes. Ideal para partidos amistosos.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solicitudes`
--

CREATE TABLE `solicitudes` (
  `id` int NOT NULL,
  `usuario_id` int NOT NULL,
  `portero_id` int NOT NULL,
  `fecha_partido` date NOT NULL,
  `estado` enum('pendiente','aceptada','rechazada') COLLATE utf8mb4_general_ci DEFAULT 'pendiente'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `solicitudes`
--

INSERT INTO `solicitudes` (`id`, `usuario_id`, `portero_id`, `fecha_partido`, `estado`) VALUES
(1, 1, 1, '2026-05-10', 'pendiente'),
(2, 1, 1, '2026-05-10', 'pendiente'),
(3, 1, 2, '2026-05-10', 'pendiente'),
(4, 1, 1, '2026-05-10', 'pendiente'),
(5, 8, 1, '2026-06-01', 'pendiente'),
(6, 8, 2, '2026-06-01', 'pendiente');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int NOT NULL,
  `nombre` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `tipo` enum('jugador','portero') COLLATE utf8mb4_general_ci NOT NULL,
  `latitud` decimal(10,7) DEFAULT NULL,
  `longitud` decimal(10,7) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `email`, `password`, `tipo`, `latitud`, `longitud`) VALUES
(1, 'Pepito', 'pepito@gmail.com', '$2b$10$7QzV1GpjQmL9kXwN3uYsOeKlM2nP4rT6vB8cD0fH1jA5iE3gW9yU2', 'jugador', 6.2442000, -75.5812000),
(2, 'Rodolfo', 'rofoldoinsano@gmail.com', '$2b$10$7QzV1GpjQmL9kXwN3uYsOeKlM2nP4rT6vB8cD0fH1jA5iE3gW9yU2', 'jugador', 6.2500000, -75.5700000),
(3, 'Federico', 'federicoinsano@gmail.com', '$2b$10$7QzV1GpjQmL9kXwN3uYsOeKlM2nP4rT6vB8cD0fH1jA5iE3gW9yU2', 'jugador', 6.2300000, -75.5900000),
(4, 'Arturito', 'arturito@gmail.com', '$2b$10$7QzV1GpjQmL9kXwN3uYsOeKlM2nP4rT6vB8cD0fH1jA5iE3gW9yU2', 'portero', 6.2442000, -75.5812000),
(5, 'Venequito', 'venequito@gmail.com', '$2b$10$7QzV1GpjQmL9kXwN3uYsOeKlM2nP4rT6vB8cD0fH1jA5iE3gW9yU2', 'portero', 6.2550000, -75.5650000),
(6, 'Pepito', 'pepito2@gmail.com', '$2b$10$zmHK8OIdK5rj16QCQfiTM.B2XotmrV3Cg76.S4d8El8sVDHgsKqX6', 'jugador', 0.0000000, 0.0000000),
(7, 'ramiro', 'hostiatio@gmail.com', '$2b$10$/LqBhf.Itslb3MW076OZpOJ2/RiMfPjve23YGyTzkadMETxQS6ehG', 'portero', 0.0000000, 0.0000000),
(8, 'Mateo calle', 'callebolivarmateo@gmail.com', '$2b$10$fMXiGMHQ0ueXG3RyyHwS2O1i29Aexg/oZ5rmboJ.BpK.icAEeKQKK', 'jugador', 0.0000000, 0.0000000),
(9, 'pepetio', 'hola@gmail.com', '$2b$10$VaZIp9p9tGLBBnvogIyjU.3wlPElskBVxbts9VCUrnpHqpPQIQmAi', 'portero', 0.0000000, 0.0000000),
(10, 'mateo', 'mateo@gmail.com', '$2b$10$2mTfghtfTsquH7NDzHmOkebCm9sjKG60x3c0KadMyWv/s.eAH0Ipi', 'portero', 0.0000000, 0.0000000);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `porteros`
--
ALTER TABLE `porteros`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Indices de la tabla `solicitudes`
--
ALTER TABLE `solicitudes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`),
  ADD KEY `portero_id` (`portero_id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `porteros`
--
ALTER TABLE `porteros`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `solicitudes`
--
ALTER TABLE `solicitudes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `porteros`
--
ALTER TABLE `porteros`
  ADD CONSTRAINT `porteros_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `solicitudes`
--
ALTER TABLE `solicitudes`
  ADD CONSTRAINT `solicitudes_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `solicitudes_ibfk_2` FOREIGN KEY (`portero_id`) REFERENCES `porteros` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
-- Migracion: sistema de calificaciones con estrellas
-- Ejecutar en phpMyAdmin sobre la base de datos goalkeepernow

CREATE TABLE `calificaciones` (
  `id` int NOT NULL AUTO_INCREMENT,
  `solicitud_id` int NOT NULL,
  `usuario_id` int NOT NULL,
  `portero_id` int NOT NULL,
  `estrellas` tinyint NOT NULL,
  `comentario` text COLLATE utf8mb4_general_ci,
  `creado_en` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `una_calificacion_por_solicitud` (`solicitud_id`),
  KEY `usuario_id` (`usuario_id`),
  KEY `portero_id` (`portero_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE `calificaciones`
  ADD CONSTRAINT `calificaciones_ibfk_1` FOREIGN KEY (`solicitud_id`) REFERENCES `solicitudes` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `calificaciones_ibfk_2` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `calificaciones_ibfk_3` FOREIGN KEY (`portero_id`) REFERENCES `porteros` (`id`) ON DELETE CASCADE;

-- Nota: el rango 1 a 5 de "estrellas" ya se valida en el backend (routes/calificaciones.js),
-- no depende de una restriccion CHECK en la base de datos.

-- Para calcular el promedio de un arquero cuando lo necesites:
-- SELECT portero_id, AVG(estrellas) AS promedio, COUNT(*) AS total
-- FROM calificaciones GROUP BY portero_id;
-- Migración 2: tienda y flujo de partido completado
-- Ejecutar en phpMyAdmin sobre la base de datos `goalkeepernow`,
-- DESPUÉS de migracion_calificaciones.sql

-- 1) Permitir marcar una solicitud como "completada" (requisito para poder calificar)
ALTER TABLE `solicitudes`
  MODIFY `estado` enum('pendiente','aceptada','rechazada','completada') COLLATE utf8mb4_general_ci DEFAULT 'pendiente';

-- 2) Tabla de productos para la tienda (precios en pesos colombianos, sin decimales)
CREATE TABLE `productos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) COLLATE utf8mb4_general_ci NOT NULL,
  `categoria` varchar(80) COLLATE utf8mb4_general_ci NOT NULL,
  `precio` int NOT NULL,
  `descripcion` text COLLATE utf8mb4_general_ci,
  `imagen_url` varchar(500) COLLATE utf8mb4_general_ci,
  `stock` int NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `productos` (`nombre`, `categoria`, `precio`, `descripcion`, `imagen_url`, `stock`) VALUES
('Guantes Pro Contact', 'Guantes', 189900, 'Guantes de látex contact para máxima adherencia en césped sintético.', 'https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?q=80&w=500', 25),
('Guantes Latex Negative', 'Guantes', 149900, 'Corte negativo, ajuste cerrado, ideal para arqueros con manos pequeñas.', 'https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?q=80&w=500', 30),
('Uniforme Arquero Manga Larga', 'Uniformes', 129900, 'Uniforme acolchado en codos, tela transpirable.', 'https://images.unsplash.com/photo-1593786481097-cee0ffe2b1d8?q=80&w=500', 18),
('Pantaloneta Acolchada', 'Indumentaria', 89900, 'Protección en caderas para atajadas en el suelo.', 'https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=500', 22),
('Gorra Arquero UV', 'Accesorios', 49900, 'Visera larga, protección solar para partidos al aire libre.', 'https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=500', 40),
('Tobilleras de Protección', 'Protección', 59900, 'Par de tobilleras con refuerzo lateral.', 'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?q=80&w=500', 35);
-- Migracion 3: disponibilidad semanal de los arqueros
-- Ejecutar en phpMyAdmin sobre la base de datos goalkeepernow,
-- DESPUES de migracion_calificaciones.sql y migracion_2_tienda_y_estados.sql

CREATE TABLE `disponibilidad` (
  `id` int NOT NULL AUTO_INCREMENT,
  `portero_id` int NOT NULL,
  `dia_semana` enum('lunes','martes','miercoles','jueves','viernes','sabado','domingo') COLLATE utf8mb4_general_ci NOT NULL,
  `hora_inicio` time NOT NULL,
  `hora_fin` time NOT NULL,
  `zona` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `portero_id` (`portero_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE `disponibilidad`
  ADD CONSTRAINT `disponibilidad_ibfk_1` FOREIGN KEY (`portero_id`) REFERENCES `porteros` (`id`) ON DELETE CASCADE;
-- Migracion 4: rol de administrador y estado activo/inactivo de usuarios
-- Ejecutar en phpMyAdmin sobre la base de datos goalkeepernow,
-- DESPUES de migracion_3_disponibilidad.sql

ALTER TABLE `usuarios`
  MODIFY `tipo` enum('jugador','portero','admin') COLLATE utf8mb4_general_ci NOT NULL;

ALTER TABLE `usuarios`
  ADD COLUMN `activo` tinyint(1) NOT NULL DEFAULT 1 AFTER `tipo`;

-- Crea tu primer administrador.
-- Contraseña: admin123  (cambiala apenas inicies sesion la primera vez)
-- El hash de abajo corresponde exactamente a "admin123" con bcrypt.
INSERT INTO `usuarios` (`nombre`, `email`, `password`, `tipo`, `activo`, `latitud`, `longitud`) VALUES
('Administrador', 'admin@arqueros.co', '$2a$10$iWV72FK0uLGUk9iYuaeZk.zyLRQUsJ.GCGbjSMHGTE1wDTUff.OCi', 'admin', 1, 0, 0);
-- Migracion 5: destacado y creado_en en productos
ALTER TABLE `productos`
  ADD COLUMN IF NOT EXISTS `destacado` tinyint(1) NOT NULL DEFAULT 0 AFTER `stock`,
  ADD COLUMN IF NOT EXISTS `creado_en` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP AFTER `destacado`;
UPDATE `productos` SET `destacado` = 1 WHERE `id` IN (1, 2, 3);
-- Migracion 6: entrenadores y canchas
CREATE TABLE IF NOT EXISTS `entrenadores` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `especialidad` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `experiencia` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `precio_hora` int NOT NULL DEFAULT 0,
  `descripcion` text COLLATE utf8mb4_general_ci,
  `foto_url` varchar(500) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT 1,
  `creado_en` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `horarios_entrenador` (
  `id` int NOT NULL AUTO_INCREMENT,
  `entrenador_id` int NOT NULL,
  `dia_semana` enum('lunes','martes','miercoles','jueves','viernes','sabado','domingo') COLLATE utf8mb4_general_ci NOT NULL,
  `hora_inicio` time NOT NULL,
  `hora_fin` time NOT NULL,
  PRIMARY KEY (`id`),
  KEY `entrenador_id` (`entrenador_id`),
  CONSTRAINT `horarios_entrenador_ibfk_1` FOREIGN KEY (`entrenador_id`) REFERENCES `entrenadores` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `canchas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `direccion` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `ciudad` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `tipo` enum('futbol5','futbol7','futbol11','futsal') COLLATE utf8mb4_general_ci DEFAULT 'futbol7',
  `precio_hora` int NOT NULL DEFAULT 0,
  `descripcion` text COLLATE utf8mb4_general_ci,
  `foto_url` varchar(500) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `activa` tinyint(1) NOT NULL DEFAULT 1,
  `creado_en` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `reservas_cancha` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cancha_id` int NOT NULL,
  `usuario_id` int NOT NULL,
  `fecha` date NOT NULL,
  `hora_inicio` time NOT NULL,
  `hora_fin` time NOT NULL,
  `estado` enum('pendiente','confirmada','cancelada') COLLATE utf8mb4_general_ci DEFAULT 'pendiente',
  `creado_en` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `cancha_id` (`cancha_id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `rcibfk1` FOREIGN KEY (`cancha_id`) REFERENCES `canchas` (`id`) ON DELETE CASCADE,
  CONSTRAINT `rcibfk2` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `entrenadores` (`nombre`, `especialidad`, `experiencia`, `precio_hora`, `descripcion`, `foto_url`) VALUES
('Juan Ospina', 'Portero profesional', '10 anos', 120000, 'Exarquero de la Liga colombiana. Especialista en posicionamiento y balones altos.', 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=500'),
('Carlos Bejarano', 'Portero universitario', '6 anos', 80000, 'Entrenador certificado FIFA. Trabaja con todas las edades, especialmente juveniles.', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=500'),
('Diego Ramirez', 'Reflejos y agilidad', '8 anos', 100000, 'Especialista en entrenamiento de reflejos, saltos y tecnica de caida.', 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?q=80&w=500');

INSERT INTO `canchas` (`nombre`, `direccion`, `ciudad`, `tipo`, `precio_hora`, `descripcion`, `foto_url`) VALUES
('Cancha El Tesoro', 'Calle 10 # 43-20, El Poblado', 'Medellin', 'futbol7', 80000, 'Cesped sintetico con iluminacion nocturna y parqueadero.', 'https://images.unsplash.com/photo-1551958219-acbc608c6377?q=80&w=500'),
('Estadio Atanasio Junior', 'Carrera 70 # 65-30, Laureles', 'Medellin', 'futbol11', 150000, 'Cancha reglamentaria con tribuna. Ideal para torneos.', 'https://images.unsplash.com/photo-1517747614396-d21a3151b8aa?q=80&w=500'),
('Futsal La 80', 'Calle 80 # 65-12, Robledo', 'Medellin', 'futsal', 60000, 'Cancha bajo techo para futsal. Superficie de madera tratada.', 'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?q=80&w=500');
