import { useEffect, useState } from 'react'
import { getAdminStats } from '../services/apiService'

function AdminDashboardPage({ onNavigate }) {
  const [stats, setStats] = useState(null)
  const [error, setError] = useState('')
  const usuario = JSON.parse(localStorage.getItem('usuario') || '{}')

  useEffect(() => {
    async function cargar() {
      try {
        setStats(await getAdminStats())
      } catch {
        setError('No pudimos cargar las estadísticas.')
      }
    }
    cargar()
  }, [])

  function handleLogout() {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
    onNavigate('home')
  }

  return (
    <div className="dashboard-container">
      <div className="navbar" style={{ background: 'var(--azul-marino)' }}>
        <div className="navbar-top" style={{ padding: '14px 32px' }}>
          <div className="navbar-logo" style={{ color: '#fff' }}>
            <span className="logo-mark">A.</span>
            ARQUEROS<span style={{ color: 'var(--dorado)' }}>.CO</span> — ADMIN
          </div>
          <div className="navbar-icons">
            <span style={{ color: '#DCE6F5', fontSize: '0.85rem' }}>{usuario.nombre}</span>
            <button className="back-btn" onClick={handleLogout}>Cerrar sesión</button>
          </div>
        </div>
      </div>

      <div className="page-shell">
        <div className="section-heading">
          <h2>Panel de administrador</h2>
        </div>

        {error && <p className="error-msg">{error}</p>}

        <div className="dashboard-main" style={{ padding: 0, marginBottom: 32 }}>
          <div className="card"><div className="card-icon">👥</div><h2>{stats?.usuarios ?? '...'}</h2><p>Usuarios totales</p></div>
          <div className="card"><div className="card-icon">⚽</div><h2>{stats?.jugadores ?? '...'}</h2><p>Jugadores</p></div>
          <div className="card"><div className="card-icon">🧤</div><h2>{stats?.porteros ?? '...'}</h2><p>Arqueros</p></div>
          <div className="card"><div className="card-icon">🛒</div><h2>{stats?.productos ?? '...'}</h2><p>Productos en tienda</p></div>
          <div className="card"><div className="card-icon">📋</div><h2>{stats?.solicitudes ?? '...'}</h2><p>Solicitudes totales</p></div>
          <div className="card"><div className="card-icon">✅</div><h2>{stats?.partidosCompletados ?? '...'}</h2><p>Partidos completados</p></div>
          <div className="card"><div className="card-icon">⭐</div><h2>{stats?.calificacionPromedio ?? '—'}</h2><p>Calificación promedio ({stats?.calificaciones ?? 0} opiniones)</p></div>
        </div>

        <div className="section-heading">
          <h2>Gestión</h2>
        </div>
        <div className="dashboard-main" style={{ padding: 0 }}>
          <div className="card">
            <div className="card-icon">👤</div>
            <h2>Usuarios</h2>
            <p>Crear, editar, activar/desactivar y eliminar jugadores, arqueros y administradores.</p>
            <button className="card-link" onClick={() => onNavigate('admin-usuarios')}>Gestionar usuarios</button>
          </div>
          <div className="card">
            <div className="card-icon">🛒</div>
            <h2>Productos</h2>
            <p>Gestión completa de la tienda: crear, editar, stock, precios, categorías.</p>
            <span className="tag-proximamente">Próximamente</span>
            <button className="card-link disabled">En construcción</button>
          </div>
          <div className="card">
            <div className="card-icon">📋</div>
            <h2>Reservas / Solicitudes</h2>
            <p>Ver, aceptar, cancelar y cambiar fecha de las solicitudes de arqueros.</p>
            <span className="tag-proximamente">Próximamente</span>
            <button className="card-link disabled">En construcción</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboardPage
