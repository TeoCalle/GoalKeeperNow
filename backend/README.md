# GoalKeeperNow / Arqueros.co — Backend

API en Node.js + Express + MySQL que conecta el frontend React con tu base de datos `goalkeepernow` (la que administras en phpMyAdmin).

## 1. Requisitos

- Node.js 18+
- MySQL / MariaDB corriendo (XAMPP, WAMP, Laragon, o tu propio servidor) con phpMyAdmin
- La base de datos `goalkeepernow` ya importada (tu archivo `goalkeepernow(1).sql`)

## 2. Instalar dependencias

```bash
cd backend
npm install
```

## 3. Importar las migraciones nuevas en phpMyAdmin

Ve a phpMyAdmin → selecciona la base `goalkeepernow` → pestaña **SQL** → pega y ejecuta, EN ESTE ORDEN:

1. `migracion_calificaciones.sql` — crea la tabla `calificaciones`
2. `migracion_2_tienda_y_estados.sql` — crea la tabla `productos` y agrega el estado `completada` a `solicitudes`

## 4. Configurar variables de entorno

```bash
cp .env.example .env
```

Edita `.env` con tus datos reales (usuario/contraseña de MySQL que usa tu phpMyAdmin — en XAMPP normalmente es usuario `root` y contraseña vacía):

```
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=goalkeepernow
JWT_SECRET=pon_aqui_algo_largo_y_aleatorio
PORT=3000
```

## 5. Levantar el servidor

```bash
npm start
```

Deberías ver:
```
✅ GoalKeeperNow API corriendo en http://localhost:3000
```

Prueba que responde: abre `http://localhost:3000/api/health` en el navegador, debe mostrar `{"ok":true,...}`.

## 6. Conectar el frontend

El frontend (carpeta `goalkeepernow-react`) ya está configurado para apuntar a `http://localhost:3000/api` por defecto (ver `src/api/apiClient.js`). Solo asegúrate de correr backend y frontend al mismo tiempo, cada uno en su terminal:

```bash
# Terminal 1
cd backend && npm start

# Terminal 2
cd goalkeepernow-react && npm install && npm run dev
```

## 7. Endpoints disponibles

**Auth** (`/api/auth`)
- `POST /register` — crear cuenta (jugador o portero). Si es portero, crea automáticamente su fila en `porteros`.
- `POST /login` — devuelve `{ token, user }`
- `GET /me` — usuario autenticado (requiere token)

**Usuarios** (`/api/usuarios`)
- `GET /me`, `PUT /me`

**Porteros** (`/api/porteros`)
- `GET /` — lista pública con calificación promedio
- `GET /:id` — detalle
- `GET /usuario/:usuarioId` — perfil de portero a partir del id de usuario (requiere token)
- `PUT /:porteroId` — el dueño actualiza nivel/precio/descripción (requiere token, tipo portero)

**Solicitudes** (`/api/solicitudes`) — el flujo tipo InDriver
- `POST /` — jugador pide un arquero
- `GET /mias` — jugador ve sus solicitudes
- `GET /recibidas` — arquero ve solicitudes pendientes/históricas
- `PUT /:id/estado` — arquero acepta o rechaza (`{ estado: 'aceptada' | 'rechazada' }`)
- `PUT /:id/completar` — jugador o arquero marca el partido como jugado (habilita calificar)

**Calificaciones** (`/api/calificaciones`)
- `POST /` — jugador califica (`{ solicitud_id, estrellas, comentario }`), solo si la solicitud está `completada` y es suya
- `GET /portero/:porteroId` — opiniones públicas
- `GET /me` — el arquero ve sus propias opiniones y promedio

**Productos** (`/api/productos`)
- `GET /` — catálogo de la tienda

## 8. Notas de seguridad

- Las contraseñas se guardan con `bcryptjs` (compatible con los hashes `$2b$10$...` que ya tienes en tu dump).
- Todas las rutas que modifican datos están protegidas con JWT (`Authorization: Bearer <token>`) y verifican que el usuario tenga el rol correcto y sea dueño del recurso.
- Cambia `JWT_SECRET` antes de usar esto en producción.
