import { useCarrito } from '../context/CarritoContext'

function Navbar({ onNavigate, paginaActiva }) {
  const usuario = JSON.parse(localStorage.getItem('usuario') || '{}')
  const { totalItems } = useCarrito()

  return (
    <div className="navbar">
      <div className="navbar-top">
        <button className="navbar-logo" onClick={() => onNavigate('home')}>
          <span className="logo-mark">A<span className="dot">.</span></span>
          ARQUEROS<span style={{ color: 'var(--dorado)' }}>.CO</span>
        </button>

        <div className="navbar-search">
          <input type="text" placeholder="Buscar guantes, uniformes, arqueros..." />
          <button aria-label="Buscar">🔍</button>
        </div>

        <div className="navbar-icons">
          {usuario?.id ? (
            <>
              <button className="icon-btn" title="Mi perfil" onClick={() => onNavigate('perfil')}>👤</button>
              <button className="icon-btn" title="Carrito" onClick={() => onNavigate('carrito')} style={{ position:'relative' }}>
                🛒
                {totalItems > 0 && <span className="navbar-pill">{totalItems}</span>}
              </button>
            </>
          ) : (
            <button className="btn-dorado" onClick={() => onNavigate('login')} style={{ padding:'9px 18px' }}>
              Iniciar sesión
            </button>
          )}
        </div>
      </div>

      <div className="navbar-bottom">
        <div className="navbar-bottom-inner">
          <button className="nav-categorias" onClick={() => onNavigate('tienda')}>☰ Categorías</button>
          <button className={`nav-link ${paginaActiva === 'home' ? 'activo' : ''}`} onClick={() => onNavigate('home')}>Inicio</button>
          <button className={`nav-link ${paginaActiva === 'tienda' ? 'activo' : ''}`} onClick={() => onNavigate('tienda')}>Tienda</button>
          <button className={`nav-link ${paginaActiva === 'porteros' ? 'activo' : ''}`} onClick={() => onNavigate('porteros')} style={{ position:'relative' }}>
            Contratar Arquero
            <span className="nav-badge-new">NEW</span>
          </button>
          <button className={`nav-link ${paginaActiva === 'entrenadores' ? 'activo' : ''}`} onClick={() => onNavigate('entrenadores')}>Entrena</button>
          <button className={`nav-link ${paginaActiva === 'canchas' ? 'activo' : ''}`} onClick={() => onNavigate('canchas')}>Canchas</button>
          {usuario?.id && (
            <button className={`nav-link ${['dashboard','admin'].includes(paginaActiva) ? 'activo' : ''}`}
              onClick={() => onNavigate(usuario.tipo === 'admin' ? 'admin' : 'dashboard')}>
              Mi Panel
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
