const express = require('express')
const pool = require('../config/db')
const { requireAuth } = require('../middleware/auth')
const router = express.Router()

router.get('/mis-reservas/lista', requireAuth, async (req, res) => {
  try {
    const [filas] = await pool.query('SELECT rc.*, c.nombre AS cancha_nombre, c.ciudad, c.tipo FROM reservas_cancha rc JOIN canchas c ON c.id=rc.cancha_id WHERE rc.usuario_id=? ORDER BY rc.fecha DESC', [req.usuario.id])
    res.json(filas)
  } catch (error) { console.error('Error GET mis reservas:', error); res.status(500).json({ error: 'Error del servidor.' }) }
})

router.put('/reservas/:reservaId/cancelar', requireAuth, async (req, res) => {
  try {
    const [filas] = await pool.query('SELECT id FROM reservas_cancha WHERE id=? AND usuario_id=?', [req.params.reservaId, req.usuario.id])
    if (filas.length === 0) return res.status(404).json({ error: 'Reserva no encontrada.' })
    await pool.query("UPDATE reservas_cancha SET estado='cancelada' WHERE id=?", [req.params.reservaId])
    res.json({ mensaje: 'Reserva cancelada.' })
  } catch (error) { console.error('Error cancelar reserva:', error); res.status(500).json({ error: 'Error del servidor.' }) }
})

router.get('/', async (req, res) => {
  try {
    const { ciudad, tipo } = req.query
    const conds = ['activa=1']; const vals = []
    if (ciudad) { conds.push('ciudad LIKE ?'); vals.push('%' + ciudad + '%') }
    if (tipo) { conds.push('tipo=?'); vals.push(tipo) }
    const [filas] = await pool.query('SELECT * FROM canchas WHERE ' + conds.join(' AND ') + ' ORDER BY id DESC', vals)
    res.json(filas)
  } catch (error) { console.error('Error GET canchas:', error); res.status(500).json({ error: 'Error del servidor.' }) }
})

router.get('/:id', async (req, res) => {
  try {
    const [filas] = await pool.query('SELECT * FROM canchas WHERE id=?', [req.params.id])
    if (filas.length === 0) return res.status(404).json({ error: 'Cancha no encontrada.' })
    const [reservas] = await pool.query("SELECT rc.id, rc.fecha, rc.hora_inicio, rc.hora_fin, rc.estado, u.nombre AS usuario_nombre FROM reservas_cancha rc JOIN usuarios u ON u.id=rc.usuario_id WHERE rc.cancha_id=? AND rc.fecha>=CURDATE() AND rc.estado!='cancelada' ORDER BY rc.fecha, rc.hora_inicio", [req.params.id])
    res.json({ ...filas[0], reservas })
  } catch (error) { console.error('Error GET cancha:', error); res.status(500).json({ error: 'Error del servidor.' }) }
})

router.post('/:id/reservar', requireAuth, async (req, res) => {
  try {
    const { fecha, hora_inicio, hora_fin } = req.body
    if (!fecha || !hora_inicio || !hora_fin) return res.status(400).json({ error: 'Fecha, hora_inicio y hora_fin son obligatorios.' })
    const [conflictos] = await pool.query("SELECT id FROM reservas_cancha WHERE cancha_id=? AND fecha=? AND estado!='cancelada' AND NOT (hora_fin<=? OR hora_inicio>=?)", [req.params.id, fecha, hora_inicio, hora_fin])
    if (conflictos.length > 0) return res.status(409).json({ error: 'Ese horario ya esta reservado. Elige otro.' })
    const [r] = await pool.query('INSERT INTO reservas_cancha (cancha_id, usuario_id, fecha, hora_inicio, hora_fin) VALUES (?, ?, ?, ?, ?)', [req.params.id, req.usuario.id, fecha, hora_inicio, hora_fin])
    res.status(201).json({ mensaje: 'Cancha reservada correctamente.', id: r.insertId })
  } catch (error) { console.error('Error reservar cancha:', error); res.status(500).json({ error: 'Error del servidor.' }) }
})

module.exports = router
