const express = require('express')
const pool = require('../config/db')
const { requireAuth } = require('../middleware/auth')
const router = express.Router()

router.get('/me', requireAuth, async (req, res) => {
  const [f] = await pool.query('SELECT id, nombre, email, tipo, activo, latitud, longitud FROM usuarios WHERE id = ?', [req.usuario.id])
  if (f.length === 0) return res.status(404).json({ error: 'Usuario no encontrado.' })
  res.json(f[0])
})

router.put('/me', requireAuth, async (req, res) => {
  try {
    const { nombre, latitud, longitud } = req.body
    await pool.query('UPDATE usuarios SET nombre=COALESCE(?,nombre), latitud=COALESCE(?,latitud), longitud=COALESCE(?,longitud) WHERE id=?', [nombre, latitud, longitud, req.usuario.id])
    res.json({ mensaje: 'Datos actualizados correctamente.' })
  } catch (error) {
    console.error('Error en PUT /usuarios/me:', error)
    res.status(500).json({ error: 'Error del servidor.' })
  }
})

module.exports = router
