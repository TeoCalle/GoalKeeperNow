import apiClient from '../api/apiClient'

// --- Autenticación ---
export async function login(data) {
  const res = await apiClient.post('/auth/login', data)
  return res.data
}

export async function register(data) {
  const res = await apiClient.post('/auth/register', data)
  return res.data
}

// --- Porteros ---
export async function getPorteros() {
  const res = await apiClient.get('/porteros')
  return res.data
}

export async function getPerfilPortero(usuarioId) {
  const res = await apiClient.get(`/porteros/usuario/${usuarioId}`)
  return res.data
}

export async function actualizarPortero(porteroId, data) {
  const res = await apiClient.put(`/porteros/${porteroId}`, data)
  return res.data
}

// --- Solicitudes (contratación de arqueros) ---
export async function crearSolicitud(data) {
  const res = await apiClient.post('/solicitudes', data)
  return res.data
}

export async function getMisSolicitudes() {
  const res = await apiClient.get('/solicitudes/mias')
  return res.data
}

export async function getSolicitudesRecibidas() {
  const res = await apiClient.get('/solicitudes/recibidas')
  return res.data
}

export async function actualizarEstadoSolicitud(id, estado) {
  const res = await apiClient.put(`/solicitudes/${id}/estado`, { estado })
  return res.data
}

export async function completarSolicitud(id) {
  const res = await apiClient.put(`/solicitudes/${id}/completar`)
  return res.data
}

// --- Calificaciones ---
export async function crearCalificacion(data) {
  const res = await apiClient.post('/calificaciones', data)
  return res.data
}

export async function getCalificacionesPortero(porteroId) {
  const res = await apiClient.get(`/calificaciones/portero/${porteroId}`)
  return res.data
}

export async function getMisCalificaciones() {
  const res = await apiClient.get('/calificaciones/me')
  return res.data
}

// --- Disponibilidad ---
export async function getMiDisponibilidad() {
  const res = await apiClient.get('/disponibilidad/me')
  return res.data
}

export async function getDisponibilidadPortero(porteroId) {
  const res = await apiClient.get(`/disponibilidad/portero/${porteroId}`)
  return res.data
}

export async function crearDisponibilidad(data) {
  const res = await apiClient.post('/disponibilidad', data)
  return res.data
}

export async function eliminarDisponibilidad(id) {
  const res = await apiClient.delete(`/disponibilidad/${id}`)
  return res.data
}

// --- Admin ---
export async function getAdminStats() {
  const res = await apiClient.get('/admin/stats')
  return res.data
}

export async function getAdminUsuarios(busqueda = '') {
  const res = await apiClient.get('/admin/usuarios', { params: { busqueda } })
  return res.data
}

export async function crearUsuarioAdmin(data) {
  const res = await apiClient.post('/admin/usuarios', data)
  return res.data
}

export async function actualizarUsuarioAdmin(id, data) {
  const res = await apiClient.put(`/admin/usuarios/${id}`, data)
  return res.data
}

export async function cambiarEstadoUsuarioAdmin(id, activo) {
  const res = await apiClient.put(`/admin/usuarios/${id}/estado`, { activo })
  return res.data
}

export async function eliminarUsuarioAdmin(id) {
  const res = await apiClient.delete(`/admin/usuarios/${id}`)
  return res.data
}

// --- Tienda ---
export async function getProductos(params = {}) {
  const res = await apiClient.get('/productos', { params })
  return res.data
}

export async function getCategoriasProductos() {
  const res = await apiClient.get('/productos/categorias')
  return res.data
}

export async function getProducto(id) {
  const res = await apiClient.get(`/productos/${id}`)
  return res.data
}

// --- Usuario ---
export async function getUsuarioActual() {
  const res = await apiClient.get('/usuarios/me')
  return res.data
}

// --- Entrenadores ---
export async function getEntrenadores() {
  const res = await apiClient.get('/entrenadores')
  return res.data
}
export async function getEntrenador(id) {
  const res = await apiClient.get(`/entrenadores/${id}`)
  return res.data
}
export async function crearEntrenadorAdmin(data) {
  const res = await apiClient.post('/admin/entrenadores', data)
  return res.data
}
export async function actualizarEntrenadorAdmin(id, data) {
  const res = await apiClient.put(`/admin/entrenadores/${id}`, data)
  return res.data
}
export async function eliminarEntrenadorAdmin(id) {
  const res = await apiClient.delete(`/admin/entrenadores/${id}`)
  return res.data
}

// --- Canchas ---
export async function getCanchas(params = {}) {
  const res = await apiClient.get('/canchas', { params })
  return res.data
}
export async function getCancha(id) {
  const res = await apiClient.get(`/canchas/${id}`)
  return res.data
}
export async function reservarCancha(id, data) {
  const res = await apiClient.post(`/canchas/${id}/reservar`, data)
  return res.data
}
export async function getMisReservasCancha() {
  const res = await apiClient.get('/canchas/mis-reservas/lista')
  return res.data
}
export async function cancelarReservaCancha(reservaId) {
  const res = await apiClient.put(`/canchas/reservas/${reservaId}/cancelar`)
  return res.data
}
export async function crearCanchaAdmin(data) {
  const res = await apiClient.post('/admin/canchas', data)
  return res.data
}
export async function actualizarCanchaAdmin(id, data) {
  const res = await apiClient.put(`/admin/canchas/${id}`, data)
  return res.data
}
export async function eliminarCanchaAdmin(id) {
  const res = await apiClient.delete(`/admin/canchas/${id}`)
  return res.data
}

// --- Admin productos ---
export async function crearProductoAdmin(data) {
  const res = await apiClient.post('/admin/productos', data)
  return res.data
}
export async function actualizarProductoAdmin(id, data) {
  const res = await apiClient.put(`/admin/productos/${id}`, data)
  return res.data
}
export async function eliminarProductoAdmin(id) {
  const res = await apiClient.delete(`/admin/productos/${id}`)
  return res.data
}
