const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const pool = require('../config/db')
const { requireAuth } = require('../middleware/auth')
const router = express.Router()

function firmarToken(u) {
  return jwt.sign({ id: u.id, nombre: u.nombre, email: u.email, tipo: u.tipo }, process.env.JWT_SECRET, { expiresIn: '7d' })
}

router.post('/register', async (req, res) => {
  try {
    const { nombre, email, password, tipo, latitud, longitud } = req.body
    if (!nombre || !email || !password || !tipo) return res.status(400).json({ error: 'Faltan campos obligatorios.' })
    if (!['jugador', 'portero'].includes(tipo)) return res.status(400).json({ error: 'Tipo inválido.' })
    const [ex] = await pool.query('SELECT id FROM usuarios WHERE email = ?', [email])
    if (ex.length > 0) return res.status(409).json({ error: 'Ya existe una cuenta con ese correo.' })
    const hash = await bcrypt.hash(password, 10)
    const [r] = await pool.query(
      'INSERT INTO usuarios (nombre, email, password, tipo, activo, latitud, longitud) VALUES (?, ?, ?, ?, 1, ?, ?)',
      [nombre, email, hash, tipo, latitud || 0, longitud || 0]
    )
    if (tipo === 'portero') {
      await pool.query("INSERT INTO porteros (usuario_id, nivel, precio, descripcion) VALUES (?, 'principiante', 0, '')", [r.insertId])
    }
    res.status(201).json({ mensaje: 'Cuenta creada correctamente.', usuarioId: r.insertId })
  } catch (error) {
    console.error('Error en /register:', error)
    res.status(500).json({ error: 'Error del servidor al registrar.' })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ error: 'Correo y contraseña son obligatorios.' })
    const [filas] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email])
    if (filas.length === 0) return res.status(401).json({ error: 'Correo o contraseña incorrectos.' })
    const usuario = filas[0]
    if (usuario.activo === 0) return res.status(403).json({ error: 'Tu cuenta está desactivada. Contacta al administrador.' })
    if (!await bcrypt.compare(password, usuario.password)) return res.status(401).json({ error: 'Correo o contraseña incorrectos.' })
    res.json({ token: firmarToken(usuario), user: { id: usuario.id, nombre: usuario.nombre, email: usuario.email, tipo: usuario.tipo, latitud: usuario.latitud, longitud: usuario.longitud } })
  } catch (error) {
    console.error('Error en /login:', error)
    res.status(500).json({ error: 'Error del servidor al iniciar sesión.' })
  }
})

router.get('/me', requireAuth, async (req, res) => {
  const [filas] = await pool.query('SELECT id, nombre, email, tipo, activo, latitud, longitud FROM usuarios WHERE id = ?', [req.usuario.id])
  if (filas.length === 0) return res.status(404).json({ error: 'Usuario no encontrado.' })
  res.json(filas[0])
})

module.exports = router
