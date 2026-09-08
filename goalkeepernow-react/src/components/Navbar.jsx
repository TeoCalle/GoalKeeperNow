import { useState, useEffect, useRef } from 'react'
import { useCarrito } from '../context/CarritoContext'
import { useTheme } from '../context/ThemeContext'
import { FaWhatsapp, FaInstagram, FaBars, FaTimes, FaSun, FaMoon } from 'react-icons/fa'
import { OfficialLogo } from './OfficialLogo'
import { buscarEnTodo } from '../services/searchService'

function Navbar({ onNavigate, paginaActiva }) {
  const usuario = JSON.parse(localStorage.getItem('usuario') || '{}')
  const { totalItems } = useCarrito()
  const { darkMode, toggleTheme } = useTheme()

  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [totalResults, setTotalResults] = useState(0)
  const [showPopover, setShowPopover] = useState(false)
  const [menuAbierto, setMenuAbierto] = useState(false)
  const searchContainerRef = useRef(null)

  // Búsqueda en tiempo real
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([])
      setTotalResults(0)
      setShowPopover(false)
      return
    }
    const timer = setTimeout(async () => {
      const data = await buscarEnTodo(searchQuery)
      setSearchResults(data.resultados.slice(0, 6))
      setTotalResults(data.total)
      setShowPopover(true)
    }, 150)
    return () => clearTimeout(timer)
  }, [searchQuery])

  // Cerrar desplegable al hacer clic fuera del buscador
  useEffect(() => {
    function handleClickOutside(e) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setShowPopover(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Cerrar menú hamburguesa al cambiar de página
  function navigate(destino, params) {
    setMenuAbierto(false)
    onNavigate(destino, params)
  }

  function handleSearchSubmit(e) {
    e.preventDefault()
    if (searchQuery.trim()) {
      setShowPopover(false)
      setMenuAbierto(false)
      onNavigate('busqueda', { query: searchQuery.trim() })
    }
  }

  function handleSelectResult(item) {
    setShowPopover(false)
    setMenuAbierto(false)
    if (item.tipoItem === 'portero') onNavigate('porteros')
    else if (item.tipoItem === 'producto') onNavigate('tienda')
    else if (item.tipoItem === 'entrenador') onNavigate('entrenadores')
    else if (item.tipoItem === 'cancha') onNavigate('canchas')
    else onNavigate('busqueda', { query: searchQuery })
  }

  const navLinks = [
    { key: 'home', label: 'Inicio' },
    { key: 'tienda', label: 'Tienda' },
    { key: 'porteros', label: 'Contratar Arquero', badge: 'NEW' },
    { key: 'entrenadores', label: 'Entrena' },
    { key: 'canchas', label: 'Canchas' },
    ...(usuario?.id ? [{ key: usuario.tipo === 'admin' ? 'admin' : 'dashboard', label: 'Mi Panel' }] : []),
  ]

  return (
    <div className="navbar">
      {/* BARRA SUPERIOR */}
      <div className="navbar-top">
        {/* Logo */}
        <button
          className="navbar-logo"
          onClick={() => navigate('home')}
          style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0 }}
        >
          <OfficialLogo height={48} showText={true} />
        </button>

        {/* Buscador - oculto en móvil, visible en desktop */}
        <div className="navbar-search navbar-search--desktop" ref={searchContainerRef}>
          <form onSubmit={handleSearchSubmit} style={{ display: 'flex', width: '100%' }}>
            <input
              type="text"
              placeholder="Buscar arqueros, productos, entrenadores o canchas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => { if (searchQuery.trim()) setShowPopover(true) }}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => { setSearchQuery(''); setShowPopover(false) }}
                style={{ position: 'absolute', right: '45px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', fontSize: '1rem' }}
                title="Limpiar búsqueda"
              >✕</button>
            )}
            <button type="submit" aria-label="Buscar">🔍</button>
          </form>

          {showPopover && (
            <div className="search-popover">
              {searchResults.length > 0 ? (
                <>
                  {searchResults.map((item, idx) => (
                    <div key={idx} className="search-popover-item" onClick={() => handleSelectResult(item)}>
                      <img
                        src={item.imagen || '/images/gk_goalkeeper.png'}
                        alt={item.nombre}
                        className="search-popover-thumb"
                      />
                      <div className="search-popover-info">
                        <div className="search-popover-title">{item.nombre}</div>
                        <div className="search-popover-sub">
                          {item.ciudad ? `📍 ${item.ciudad} • ` : ''}
                          {item.especialidad || item.categoria || item.tipo || item.descripcion}
                        </div>
                      </div>
                      <span className="search-popover-badge">
                        {item.tipoItem === 'portero' && 'Arquero'}
                        {item.tipoItem === 'producto' && 'Producto'}
                        {item.tipoItem === 'entrenador' && 'Entrenador'}
                        {item.tipoItem === 'cancha' && 'Cancha'}
                      </span>
                    </div>
                  ))}
                  <div
                    className="search-popover-footer"
                    onClick={() => { setShowPopover(false); onNavigate('busqueda', { query: searchQuery }) }}
                  >
                    Ver todos los {totalResults} resultados para "{searchQuery}" ➔
                  </div>
                </>
              ) : (
                <div style={{ padding: '16px', textAlign: 'center', color: '#64748B', fontSize: '0.9rem' }}>
                  No se encontraron resultados para "{searchQuery}"
                </div>
              )}
            </div>
          )}
        </div>

        {/* Íconos de usuario + hamburguesa */}
        <div className="navbar-icons">
          {usuario?.id ? (
            <>
              <button className="icon-btn" title="Mi perfil" onClick={() => navigate('perfil')}>👤</button>
              <button className="icon-btn" title="Carrito" onClick={() => navigate('carrito')} style={{ position: 'relative' }}>
                🛒
                {totalItems > 0 && <span className="navbar-pill">{totalItems}</span>}
              </button>
            </>
          ) : (
            <button className="btn-dorado navbar-login-btn" onClick={() => navigate('login')} style={{ padding: '9px 18px' }}>
              Iniciar sesión
            </button>
          )}

          {/* HAMBURGUESA — solo visible en móvil */}
          <button
            className="navbar-hamburger"
            onClick={() => setMenuAbierto(!menuAbierto)}
            aria-label={menuAbierto ? 'Cerrar menú' : 'Abrir menú'}
          >
            {menuAbierto ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* BUSCADOR MÓVIL — debajo del top bar en pantallas pequeñas */}
      <div className="navbar-search-mobile">
        <form onSubmit={handleSearchSubmit} style={{ display: 'flex', width: '100%' }}>
          <input
            type="text"
            placeholder="Buscar en GoalKeeperNow..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" aria-label="Buscar">🔍</button>
        </form>
      </div>

      {/* NAVBAR BOTTOM — desktop */}
      <div className="navbar-bottom navbar-bottom--desktop">
        <div className="navbar-bottom-inner">
          {navLinks.map(link => (
            <button
              key={link.key}
              className={`nav-link ${paginaActiva === link.key || (link.key === 'dashboard' && paginaActiva === 'dashboard') || (link.key === 'admin' && paginaActiva === 'admin') ? 'activo' : ''}`}
              onClick={() => navigate(link.key)}
              style={{ position: 'relative' }}
            >
              {link.label}
              {link.badge && <span className="nav-badge-new">{link.badge}</span>}
            </button>
          ))}
          <div className="navbar-social">
            <button
              className="social-icon theme-toggle"
              title={darkMode ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
              aria-label={darkMode ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
              onClick={toggleTheme}
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>
            <button className="social-icon whatsapp" title="WhatsApp" onClick={() => window.open('https://web.whatsapp.com/', '_blank')}>
              <FaWhatsapp />
            </button>
            <button className="social-icon instagram" title="Instagram" onClick={() => window.open('https://www.instagram.com/teocalle_/', '_blank')}>
              <FaInstagram />
            </button>
          </div>
        </div>
      </div>

      {/* MENÚ MÓVIL DESPLEGABLE */}
      {menuAbierto && (
        <div className="navbar-mobile-menu">
          <div className="navbar-mobile-links">
            {navLinks.map(link => (
              <button
                key={link.key}
                className={`navbar-mobile-link ${paginaActiva === link.key ? 'activo' : ''}`}
                onClick={() => navigate(link.key)}
              >
                {link.label}
                {link.badge && <span className="nav-badge-new" style={{ marginLeft: '6px' }}>{link.badge}</span>}
              </button>
            ))}

            {!usuario?.id && (
              <button className="btn-dorado" onClick={() => navigate('registro')} style={{ marginTop: '8px', width: '100%', justifyContent: 'center' }}>
                Crear cuenta
              </button>
            )}

            <div style={{ display: 'flex', gap: '12px', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.12)' }}>
              <button
                className="social-icon theme-toggle"
                title={darkMode ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
                aria-label={darkMode ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
                onClick={toggleTheme}
              >
                {darkMode ? <FaSun /> : <FaMoon />}
              </button>
              <button className="social-icon whatsapp" title="WhatsApp" onClick={() => window.open('https://web.whatsapp.com/', '_blank')}>
                <FaWhatsapp />
              </button>
              <button className="social-icon instagram" title="Instagram" onClick={() => window.open('https://www.instagram.com/teocalle_/', '_blank')}>
                <FaInstagram />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar
