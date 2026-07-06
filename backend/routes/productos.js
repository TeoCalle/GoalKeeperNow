const express = require('express')
const pool = require('../config/db')
const router = express.Router()

router.get('/categorias', async (req, res) => {
  try {
    const [f] = await pool.query('SELECT categoria, COUNT(*) AS cantidad FROM productos GROUP BY categoria ORDER BY categoria')
    res.json(f)
  } catch (err) { console.error(err); res.status(500).json({ error: 'Error del servidor.' }) }
})

router.get('/', async (req, res) => {
  try {
    const { buscar, categoria, orden, page = 1, limit = 9, destacado } = req.query
    const cond = []; const vals = []
    if (buscar) { cond.push('(nombre LIKE ? OR descripcion LIKE ?)'); vals.push(`%${buscar}%`, `%${buscar}%`) }
    if (categoria) { cond.push('categoria = ?'); vals.push(categoria) }
    if (destacado) { cond.push('destacado = 1') }
    const where = cond.length ? `WHERE ${cond.join(' AND ')}` : ''
    const ORDENES = { 'precio_asc':'precio ASC', 'precio_desc':'precio DESC', 'nombre_asc':'nombre ASC', 'id DESC':'id DESC' }
    const orderBy = `ORDER BY ${ORDENES[orden] || 'id DESC'}`
    const offset = (Number(page) - 1) * Number(limit)
    const [[{ total }]] = await pool.query(`SELECT COUNT(*) AS total FROM productos ${where}`, vals)
    const [productos] = await pool.query(`SELECT * FROM productos ${where} ${orderBy} LIMIT ? OFFSET ?`, [...vals, Number(limit), offset])
    res.json({ productos, total, pagina: Number(page), totalPaginas: Math.ceil(total / Number(limit)) })
  } catch (err) { console.error(err); res.status(500).json({ error: 'Error del servidor.' }) }
})

router.get('/:id', async (req, res) => {
  try {
    const [f] = await pool.query('SELECT * FROM productos WHERE id=?', [req.params.id])
    if (f.length === 0) return res.status(404).json({ error: 'Producto no encontrado.' })
    res.json(f[0])
  } catch (err) { console.error(err); res.status(500).json({ error: 'Error del servidor.' }) }
})

module.exports = router
