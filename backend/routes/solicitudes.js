const express = require('express')
const pool = require('../config/db')
const { requireAuth, requireTipo } = require('../middleware/auth')
const router = express.Router()

router.post('/', requireAuth, requireTipo('jugador'), async (req, res) => {
  try {
    const { portero_id, fecha_partido } = req.body
    if (!portero_id || !fecha_partido) return res.status(400).json({ error: 'Debes indicar el arquero y la fecha.' })
    const [r] = await pool.query("INSERT INTO solicitudes (usuario_id, portero_id, fecha_partido, estado) VALUES (?,?,'pendiente',?)", [req.usuario.id, portero_id, fecha_partido])
    res.status(201).json({ mensaje: 'Solicitud enviada al arquero.', id: r.insertId })
  } catch (err) { console.error(err); res.status(500).json({ error: 'Error del servidor.' }) }
})

router.get('/mias', requireAuth, requireTipo('jugador'), async (req, res) => {
  const [f] = await pool.query(`SELECT s.id, s.fecha_partido, s.estado, p.id AS portero_id, u.nombre AS portero_nombre, p.precio FROM solicitudes s JOIN porteros p ON p.id=s.portero_id JOIN usuarios u ON u.id=p.usuario_id WHERE s.usuario_id=? ORDER BY s.id DESC`, [req.usuario.id])
  res.json(f)
})

router.get('/recibidas', requireAuth, requireTipo('portero'), async (req, res) => {
  const [f] = await pool.query(`SELECT s.id, s.fecha_partido, s.estado, u.id AS jugador_id, u.nombre AS jugador_nombre, u.latitud, u.longitud FROM solicitudes s JOIN porteros p ON p.id=s.portero_id JOIN usuarios u ON u.id=s.usuario_id WHERE p.usuario_id=? ORDER BY s.estado='pendiente' DESC, s.id DESC`, [req.usuario.id])
  res.json(f)
})

router.put('/:id/estado', requireAuth, requireTipo('portero'), async (req, res) => {
  try {
    const { estado } = req.body
    if (!['aceptada','rechazada'].includes(estado)) return res.status(400).json({ error: 'Estado inválido.' })
    const [f] = await pool.query('SELECT s.id FROM solicitudes s JOIN porteros p ON p.id=s.portero_id WHERE s.id=? AND p.usuario_id=?', [req.params.id, req.usuario.id])
    if (f.length === 0) return res.status(404).json({ error: 'Solicitud no encontrada.' })
    await pool.query('UPDATE solicitudes SET estado=? WHERE id=?', [estado, req.params.id])
    res.json({ mensaje: `Solicitud ${estado}.` })
  } catch (err) { console.error(err); res.status(500).json({ error: 'Error del servidor.' }) }
})

router.put('/:id/completar', requireAuth, async (req, res) => {
  try {
    const [f] = await pool.query("SELECT s.id, s.usuario_id, p.usuario_id AS portero_uid FROM solicitudes s JOIN porteros p ON p.id=s.portero_id WHERE s.id=? AND s.estado='aceptada'", [req.params.id])
    if (f.length === 0) return res.status(404).json({ error: 'Solicitud no encontrada o no está aceptada.' })
    if (f[0].usuario_id !== req.usuario.id && f[0].portero_uid !== req.usuario.id) return res.status(403).json({ error: 'No tienes permiso.' })
    await pool.query("UPDATE solicitudes SET estado='completada' WHERE id=?", [req.params.id])
    res.json({ mensaje: 'Partido marcado como completado.' })
  } catch (err) { console.error(err); res.status(500).json({ error: 'Error del servidor.' }) }
})

module.exports = router
