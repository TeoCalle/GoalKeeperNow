const express = require('express')
const pool = require('../config/db')
const { requireAuth, requireTipo } = require('../middleware/auth')
const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const [f] = await pool.query(`
      SELECT p.id, p.nivel, p.precio, p.descripcion, u.id AS usuario_id, u.nombre, u.latitud, u.longitud,
        ROUND(AVG(c.estrellas),1) AS calificacion_promedio, COUNT(c.id) AS total_calificaciones
      FROM porteros p JOIN usuarios u ON u.id=p.usuario_id
      LEFT JOIN calificaciones c ON c.portero_id=p.id
      GROUP BY p.id, p.nivel, p.precio, p.descripcion, u.id, u.nombre, u.latitud, u.longitud
      ORDER BY p.id DESC`)
    res.json(f)
  } catch (err) { console.error(err); res.status(500).json({ error: 'Error del servidor.' }) }
})

router.get('/usuario/:usuarioId', requireAuth, async (req, res) => {
  try {
    const uid = Number(req.params.usuarioId)
    const [f] = await pool.query('SELECT * FROM porteros WHERE usuario_id=?', [uid])
    if (f.length > 0) return res.json(f[0])
    if (req.usuario.id === uid && req.usuario.tipo === 'portero') {
      const [r] = await pool.query("INSERT INTO porteros (usuario_id, nivel, precio, descripcion) VALUES (?,'principiante',0,'')", [uid])
      const [c] = await pool.query('SELECT * FROM porteros WHERE id=?', [r.insertId])
      return res.status(201).json(c[0])
    }
    res.status(404).json({ error: 'Perfil de arquero no encontrado.' })
  } catch (err) { console.error(err); res.status(500).json({ error: 'Error del servidor.' }) }
})

router.get('/:id', async (req, res) => {
  try {
    const [f] = await pool.query(`
      SELECT p.id, p.nivel, p.precio, p.descripcion, u.id AS usuario_id, u.nombre, u.latitud, u.longitud,
        ROUND(AVG(c.estrellas),1) AS calificacion_promedio, COUNT(c.id) AS total_calificaciones
      FROM porteros p JOIN usuarios u ON u.id=p.usuario_id
      LEFT JOIN calificaciones c ON c.portero_id=p.id
      WHERE p.id=?
      GROUP BY p.id, p.nivel, p.precio, p.descripcion, u.id, u.nombre, u.latitud, u.longitud`, [req.params.id])
    if (f.length === 0) return res.status(404).json({ error: 'Arquero no encontrado.' })
    res.json(f[0])
  } catch (err) { console.error(err); res.status(500).json({ error: 'Error del servidor.' }) }
})

router.put('/:porteroId', requireAuth, requireTipo('portero'), async (req, res) => {
  try {
    const { nivel, precio, descripcion } = req.body
    const [f] = await pool.query('SELECT usuario_id FROM porteros WHERE id=?', [req.params.porteroId])
    if (f.length === 0) return res.status(404).json({ error: 'Perfil no encontrado.' })
    if (f[0].usuario_id !== req.usuario.id) return res.status(403).json({ error: 'No puedes editar el perfil de otro.' })
    await pool.query('UPDATE porteros SET nivel=?, precio=?, descripcion=? WHERE id=?', [nivel, precio, descripcion, req.params.porteroId])
    res.json({ mensaje: 'Perfil actualizado.' })
  } catch (err) { console.error(err); res.status(500).json({ error: 'Error del servidor.' }) }
})

module.exports = router
