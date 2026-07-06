// calificaciones.js
const express = require('express')
const pool = require('../config/db')
const { requireAuth, requireTipo } = require('../middleware/auth')
const router = express.Router()

router.post('/', requireAuth, requireTipo('jugador'), async (req, res) => {
  try {
    const { solicitud_id, estrellas, comentario } = req.body
    if (!solicitud_id || !estrellas) return res.status(400).json({ error: 'Faltan datos.' })
    if (estrellas < 1 || estrellas > 5) return res.status(400).json({ error: 'Estrellas entre 1 y 5.' })
    const [f] = await pool.query("SELECT id, portero_id FROM solicitudes WHERE id=? AND usuario_id=? AND estado='completada'", [solicitud_id, req.usuario.id])
    if (f.length === 0) return res.status(404).json({ error: 'Solicitud no encontrada, no es tuya, o no está completada.' })
    const [ya] = await pool.query('SELECT id FROM calificaciones WHERE solicitud_id=?', [solicitud_id])
    if (ya.length > 0) return res.status(409).json({ error: 'Ya calificaste este partido.' })
    await pool.query('INSERT INTO calificaciones (solicitud_id, usuario_id, portero_id, estrellas, comentario) VALUES (?,?,?,?,?)', [solicitud_id, req.usuario.id, f[0].portero_id, estrellas, comentario || null])
    res.status(201).json({ mensaje: 'Gracias por tu calificación.' })
  } catch (err) { console.error(err); res.status(500).json({ error: 'Error del servidor.' }) }
})

router.get('/portero/:porteroId', async (req, res) => {
  const [f] = await pool.query('SELECT c.estrellas, c.comentario, c.creado_en, u.nombre AS jugador_nombre FROM calificaciones c JOIN usuarios u ON u.id=c.usuario_id WHERE c.portero_id=? ORDER BY c.creado_en DESC', [req.params.porteroId])
  res.json(f)
})

router.get('/me', requireAuth, requireTipo('portero'), async (req, res) => {
  const [pf] = await pool.query('SELECT id FROM porteros WHERE usuario_id=?', [req.usuario.id])
  if (pf.length === 0) return res.json({ promedio: null, total: 0, opiniones: [] })
  const [ops] = await pool.query('SELECT c.estrellas, c.comentario, c.creado_en, u.nombre AS jugador_nombre FROM calificaciones c JOIN usuarios u ON u.id=c.usuario_id WHERE c.portero_id=? ORDER BY c.creado_en DESC', [pf[0].id])
  const promedio = ops.length ? Math.round((ops.reduce((s, o) => s + o.estrellas, 0) / ops.length) * 10) / 10 : null
  res.json({ promedio, total: ops.length, opiniones: ops })
})

module.exports = router
