const express = require('express')
const pool = require('../config/db')
const { requireAuth, requireTipo } = require('../middleware/auth')
const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const [filas] = await pool.query('SELECT * FROM entrenadores WHERE activo=1 ORDER BY id DESC')
    res.json(filas)
  } catch (error) { console.error('Error GET entrenadores:', error); res.status(500).json({ error: 'Error del servidor.' }) }
})

router.get('/:id', async (req, res) => {
  try {
    const [filas] = await pool.query('SELECT * FROM entrenadores WHERE id=?', [req.params.id])
    if (filas.length === 0) return res.status(404).json({ error: 'Entrenador no encontrado.' })
    const [horarios] = await pool.query('SELECT * FROM horarios_entrenador WHERE entrenador_id=? ORDER BY id', [req.params.id])
    res.json({ ...filas[0], horarios })
  } catch (error) { console.error('Error GET entrenador:', error); res.status(500).json({ error: 'Error del servidor.' }) }
})

module.exports = router
