const jwt = require('jsonwebtoken')

function requireAuth(req, res, next) {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null
  if (!token) return res.status(401).json({ error: 'No autenticado. Inicia sesión de nuevo.' })
  try {
    req.usuario = jwt.verify(token, process.env.JWT_SECRET)
    next()
  } catch {
    return res.status(401).json({ error: 'Sesión inválida o expirada.' })
  }
}

function requireTipo(...tipos) {
  return (req, res, next) => {
    if (!req.usuario || !tipos.includes(req.usuario.tipo))
      return res.status(403).json({ error: 'No tienes permiso para esta acción.' })
    next()
  }
}

module.exports = { requireAuth, requireTipo }
