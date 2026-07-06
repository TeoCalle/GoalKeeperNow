import Navbar from '../components/Navbar'

function DashboardPage({ onNavigate }) {
  const usuario = JSON.parse(localStorage.getItem('usuario') || '{}')

  function handleLogout() {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
    onNavigate('home')
  }

  return (
    <div className="dashboard-container">
      <Navbar onNavigate={onNavigate} paginaActiva="dashboard" />

      <div className="dashboard-hero">
        <div className="dashboard-hero-inner">
          <div>
            <span className="saludo-rol">{usuario.tipo === 'portero' ? 'PANEL DE ARQUERO' : 'PANEL DE JUGADOR'}</span>
            <h1>Hola, {usuario.nombre}</h1>
          </div>
          <button className="logout-btn" onClick={handleLogout}>Cerrar sesión</button>
        </div>
      </div>

      <main className="dashboard-main">
        {usuario.tipo === 'jugador' && (
          <>
            <div className="card">
              <div className="card-icon">🧤</div>
              <h2>Contratar Arquero</h2>
              <p>Pide tu arquero como pides un domicilio: mira los disponibles cerca de ti y reserva al instante.</p>
              <button className="card-link" onClick={() => onNavigate('porteros')}>Buscar arquero</button>
            </div>
            <div className="card">
              <div className="card-icon">🛒</div>
              <h2>Tienda</h2>
              <p>Guantes, uniformes e indumentaria para arqueros con precios en pesos colombianos.</p>
              <button className="card-link" onClick={() => onNavigate('tienda')}>Ir a la tienda</button>
            </div>
            <div className="card">
              <div className="card-icon">📋</div>
              <h2>Mis Solicitudes</h2>
              <p>Consulta el estado de las solicitudes que has enviado a los arqueros y califica al terminar el partido.</p>
              <button className="card-link" onClick={() => onNavigate('solicitudes')}>Ver mis solicitudes</button>
            </div>
            <div className="card">
              <div className="card-icon">👤</div>
              <h2>Mi Perfil</h2>
              <p>Administra tu información personal, tu ubicación y tus calificaciones enviadas.</p>
              <button className="card-link" onClick={() => onNavigate('perfil')}>Ver perfil</button>
            </div>
          </>
        )}

        {usuario.tipo === 'portero' && (
          <>
            <div className="card">
              <div className="card-icon">📥</div>
              <h2>Solicitudes Recibidas</h2>
              <p>Revisa, acepta o rechaza los partidos que los jugadores te están pidiendo.</p>
              <button className="card-link" onClick={() => onNavigate('solicitudes')}>Ver solicitudes</button>
            </div>
            <div className="card">
              <div className="card-icon">🗓️</div>
              <h2>Mi Disponibilidad</h2>
              <p>Configura tus horarios y zonas donde puedes atajar.</p>
              <button className="card-link" onClick={() => onNavigate('disponibilidad')}>Configurar horarios</button>
            </div>
            <div className="card">
              <div className="card-icon">🛒</div>
              <h2>Tienda</h2>
              <p>Equípate con guantes y uniformes para tus partidos.</p>
              <button className="card-link" onClick={() => onNavigate('tienda')}>Ir a la tienda</button>
            </div>
            <div className="card">
              <div className="card-icon">⭐</div>
              <h2>Mi Perfil y Calificación</h2>
              <p>Administra tu información, tarifa y mira lo que opinan los jugadores de ti.</p>
              <button className="card-link" onClick={() => onNavigate('perfil')}>Ver perfil</button>
            </div>
          </>
        )}
      </main>
    </div>
  )
}

export default DashboardPage
