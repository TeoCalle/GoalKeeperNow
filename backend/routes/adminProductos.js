const express = require('express')
const pool = require('../config/db')
const { requireAuth, requireTipo } = require('../middleware/auth')
const router = express.Router()
router.use(requireAuth, requireTipo('admin'))

router.post('/productos', async (req, res) => {
  try {
    const { nombre, categoria, precio, descripcion, imagen_url, stock, destacado } = req.body
    if (!nombre || !categoria || precio === undefined) return res.status(400).json({ error: 'Nombre, categoria y precio son obligatorios.' })
    const [r] = await pool.query('INSERT INTO productos (nombre, categoria, precio, descripcion, imagen_url, stock, destacado) VALUES (?, ?, ?, ?, ?, ?, ?)', [nombre, categoria, precio, descripcion, imagen_url, stock || 0, destacado ? 1 : 0])
    res.status(201).json({ mensaje: 'Producto creado.', id: r.insertId })
  } catch (error) { console.error('Error POST producto:', error); res.status(500).json({ error: 'Error del servidor.' }) }
})

router.put('/productos/:id', async (req, res) => {
  try {
    const { nombre, categoria, precio, descripcion, imagen_url, stock, destacado } = req.body
    await pool.query('UPDATE productos SET nombre=COALESCE(?,nombre), categoria=COALESCE(?,categoria), precio=COALESCE(?,precio), descripcion=COALESCE(?,descripcion), imagen_url=COALESCE(?,imagen_url), stock=COALESCE(?,stock), destacado=COALESCE(?,destacado) WHERE id=?', [nombre, categoria, precio, descripcion, imagen_url, stock, destacado !== undefined ? (destacado ? 1 : 0) : null, req.params.id])
    res.json({ mensaje: 'Producto actualizado.' })
  } catch (error) { console.error('Error PUT producto:', error); res.status(500).json({ error: 'Error del servidor.' }) }
})

router.delete('/productos/:id', async (req, res) => {
  try { await pool.query('DELETE FROM productos WHERE id=?', [req.params.id]); res.json({ mensaje: 'Producto eliminado.' }) }
  catch (error) { console.error('Error DELETE producto:', error); res.status(500).json({ error: 'Error del servidor.' }) }
})

router.post('/entrenadores', async (req, res) => {
  try {
    const { nombre, especialidad, experiencia, precio_hora, descripcion, foto_url } = req.body
    if (!nombre) return res.status(400).json({ error: 'El nombre es obligatorio.' })
    const [r] = await pool.query('INSERT INTO entrenadores (nombre, especialidad, experiencia, precio_hora, descripcion, foto_url) VALUES (?, ?, ?, ?, ?, ?)', [nombre, especialidad, experiencia, precio_hora || 0, descripcion, foto_url])
    res.status(201).json({ mensaje: 'Entrenador creado.', id: r.insertId })
  } catch (error) { console.error('Error POST entrenador:', error); res.status(500).json({ error: 'Error del servidor.' }) }
})

router.put('/entrenadores/:id', async (req, res) => {
  try {
    const { nombre, especialidad, experiencia, precio_hora, descripcion, foto_url, activo } = req.body
    await pool.query('UPDATE entrenadores SET nombre=COALESCE(?,nombre), especialidad=COALESCE(?,especialidad), experiencia=COALESCE(?,experiencia), precio_hora=COALESCE(?,precio_hora), descripcion=COALESCE(?,descripcion), foto_url=COALESCE(?,foto_url), activo=COALESCE(?,activo) WHERE id=?', [nombre, especialidad, experiencia, precio_hora, descripcion, foto_url, activo !== undefined ? (activo ? 1 : 0) : null, req.params.id])
    res.json({ mensaje: 'Entrenador actualizado.' })
  } catch (error) { console.error('Error PUT entrenador:', error); res.status(500).json({ error: 'Error del servidor.' }) }
})

router.delete('/entrenadores/:id', async (req, res) => {
  try { await pool.query('DELETE FROM entrenadores WHERE id=?', [req.params.id]); res.json({ mensaje: 'Entrenador eliminado.' }) }
  catch (error) { console.error('Error DELETE entrenador:', error); res.status(500).json({ error: 'Error del servidor.' }) }
})

router.post('/canchas', async (req, res) => {
  try {
    const { nombre, direccion, ciudad, tipo, precio_hora, descripcion, foto_url } = req.body
    if (!nombre) return res.status(400).json({ error: 'El nombre es obligatorio.' })
    const [r] = await pool.query('INSERT INTO canchas (nombre, direccion, ciudad, tipo, precio_hora, descripcion, foto_url) VALUES (?, ?, ?, ?, ?, ?, ?)', [nombre, direccion, ciudad, tipo || 'futbol7', precio_hora || 0, descripcion, foto_url])
    res.status(201).json({ mensaje: 'Cancha creada.', id: r.insertId })
  } catch (error) { console.error('Error POST cancha:', error); res.status(500).json({ error: 'Error del servidor.' }) }
})

router.put('/canchas/:id', async (req, res) => {
  try {
    const { nombre, direccion, ciudad, tipo, precio_hora, descripcion, foto_url, activa } = req.body
    await pool.query('UPDATE canchas SET nombre=COALESCE(?,nombre), direccion=COALESCE(?,direccion), ciudad=COALESCE(?,ciudad), tipo=COALESCE(?,tipo), precio_hora=COALESCE(?,precio_hora), descripcion=COALESCE(?,descripcion), foto_url=COALESCE(?,foto_url), activa=COALESCE(?,activa) WHERE id=?', [nombre, direccion, ciudad, tipo, precio_hora, descripcion, foto_url, activa !== undefined ? (activa ? 1 : 0) : null, req.params.id])
    res.json({ mensaje: 'Cancha actualizada.' })
  } catch (error) { console.error('Error PUT cancha:', error); res.status(500).json({ error: 'Error del servidor.' }) }
})

router.delete('/canchas/:id', async (req, res) => {
  try { await pool.query('DELETE FROM canchas WHERE id=?', [req.params.id]); res.json({ mensaje: 'Cancha eliminada.' }) }
  catch (error) { console.error('Error DELETE cancha:', error); res.status(500).json({ error: 'Error del servidor.' }) }
})

module.exports = router
