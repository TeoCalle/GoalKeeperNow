const express = require('express')
const pool = require('../config/db')
const { requireAuth, requireTipo } = require('../middleware/auth')
const router = express.Router()
const DIAS = ['lunes','martes','miercoles','jueves','viernes','sabado','domingo']

router.get('/portero/:porteroId', async (req, res) => {
  const [f] = await pool.query('SELECT id, dia_semana, hora_inicio, hora_fin, zona FROM disponibilidad WHERE portero_id=? ORDER BY id', [req.params.porteroId])
  res.json(f)
})

router.get('/me', requireAuth, requireTipo('portero'), async (req, res) => {
  try {
    const [pf] = await pool.query('SELECT id FROM porteros WHERE usuario_id=?', [req.usuario.id])
    if (pf.length === 0) return res.json([])
    const [f] = await pool.query('SELECT id, dia_semana, hora_inicio, hora_fin, zona FROM disponibilidad WHERE portero_id=? ORDER BY id', [pf[0].id])
    res.json(f)
  } catch (err) { console.error(err); res.status(500).json({ error: 'Error del servidor.' }) }
})

router.post('/', requireAuth, requireTipo('portero'), async (req, res) => {
  try {
    const { dia_semana, hora_inicio, hora_fin, zona } = req.body
    if (!dia_semana || !hora_inicio || !hora_fin) return res.status(400).json({ error: 'Faltan campos obligatorios.' })
    if (!DIAS.includes(dia_semana)) return res.status(400).json({ error: 'Día inválido.' })
    if (hora_fin <= hora_inicio) return res.status(400).json({ error: 'La hora de fin debe ser posterior.' })
    const [pf] = await pool.query('SELECT id FROM porteros WHERE usuario_id=?', [req.usuario.id])
    if (pf.length === 0) return res.status(404).json({ error: 'No tienes perfil de arquero.' })
    const [r] = await pool.query('INSERT INTO disponibilidad (portero_id, dia_semana, hora_inicio, hora_fin, zona) VALUES (?,?,?,?,?)', [pf[0].id, dia_semana, hora_inicio, hora_fin, zona || null])
    res.status(201).json({ mensaje: 'Horario agregado.', id: r.insertId })
  } catch (err) { console.error(err); res.status(500).json({ error: 'Error del servidor.' }) }
})

router.delete('/:id', requireAuth, requireTipo('portero'), async (req, res) => {
  try {
    const [f] = await pool.query('SELECT d.id FROM disponibilidad d JOIN porteros p ON p.id=d.portero_id WHERE d.id=? AND p.usuario_id=?', [req.params.id, req.usuario.id])
    if (f.length === 0) return res.status(404).json({ error: 'Horario no encontrado.' })
    await pool.query('DELETE FROM disponibilidad WHERE id=?', [req.params.id])
    res.json({ mensaje: 'Horario eliminado.' })
  } catch (err) { console.error(err); res.status(500).json({ error: 'Error del servidor.' }) }
})

module.exports = router
