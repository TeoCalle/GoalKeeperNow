require('dotenv').config()
console.log(`[Database] Host: ${process.env.DB_HOST || process.env.MYSQLHOST || '127.0.0.1'}, Port: ${process.env.DB_PORT || process.env.MYSQLPORT || 3306}, Database: ${process.env.DB_NAME || process.env.MYSQLDATABASE || 'goalkeepernow'}`)
const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())

app.get('/api/health', (req, res) => res.json({ ok: true, servicio: 'GoalKeeperNow API' }))
app.get('/api/db-test', async (req, res) => {
  try {
    const pool = require('./config/db')
    const [tablas] = await pool.query('SHOW TABLES')
    res.json({
      ok: true,
      mensaje: 'Conexión a MySQL exitosa',
      total_tablas: tablas.length,
      tablas: tablas.map(t => Object.values(t)[0]),
      host_conectado: process.env.DB_HOST || process.env.MYSQLHOST || '127.0.0.1'
    })
  } catch (err) {
    res.status(500).json({
      ok: false,
      mensaje: 'Error conectando a MySQL',
      error: err.message,
      code: err.code,
      errno: err.errno,
      host_usado: process.env.DB_HOST || process.env.MYSQLHOST || '127.0.0.1',
      db_usada: process.env.DB_NAME || process.env.MYSQLDATABASE || 'goalkeepernow'
    })
  }
})
app.use('/api/auth',           require('./routes/auth'))
app.use('/api/usuarios',       require('./routes/usuarios'))
app.use('/api/porteros',       require('./routes/porteros'))
app.use('/api/solicitudes',    require('./routes/solicitudes'))
app.use('/api/calificaciones', require('./routes/calificaciones'))
app.use('/api/disponibilidad', require('./routes/disponibilidad'))
app.use('/api/productos',      require('./routes/productos'))
app.use('/api/entrenadores',   require('./routes/entrenadores'))
app.use('/api/canchas',        require('./routes/canchas'))
app.use('/api/admin',          require('./routes/admin'))
app.use((req, res) => res.status(404).json({ error: 'Ruta no encontrada.' }))
app.use((err, req, res, next) => { console.error(err); res.status(500).json({ error: 'Error interno del servidor.' }) })

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`✅ GoalKeeperNow API corriendo en http://localhost:${PORT}`))
