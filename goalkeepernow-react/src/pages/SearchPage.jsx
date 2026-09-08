import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { buscarEnTodo } from '../services/searchService'

function SearchPage({ onNavigate, queryInicial = '' }) {
  const [query, setQuery] = useState(queryInicial)
  const [loading, setLoading] = useState(false)
  const [filtroCategoria, setFiltroCategoria] = useState('todos')
  const [data, setData] = useState({
    resultados: [],
    porCategoria: { porteros: [], productos: [], entrenadores: [], canchas: [] },
    total: 0
  })

  useEffect(() => {
    setQuery(queryInicial)
    ejecutarBusqueda(queryInicial)
  }, [queryInicial])

  async function ejecutarBusqueda(termino) {
    setLoading(true)
    try {
      const res = await buscarEnTodo(termino)
      setData(res)
    } catch (err) {
      console.error('Error al realizar búsqueda:', err)
    } finally {
      setLoading(false)
    }
  }

  function handleFormSubmit(e) {
    e.preventDefault()
    ejecutarBusqueda(query)
  }

  // Filtrar lista mostrada según pestaña seleccionada
  let itemsMostrados = data.resultados
  if (filtroCategoria === 'porteros') itemsMostrados = data.porCategoria.porteros
  if (filtroCategoria === 'productos') itemsMostrados = data.porCategoria.productos
  if (filtroCategoria === 'entrenadores') itemsMostrados = data.porCategoria.entrenadores
  if (filtroCategoria === 'canchas') itemsMostrados = data.porCategoria.canchas

  return (
    <div style={{ minHeight: '100vh', background: 'var(--fondo, #F4F6F2)' }}>
      <Navbar onNavigate={onNavigate} paginaActiva="" />

      <div className="page-shell" style={{ maxWidth: '1200px', margin: '0 auto', padding: '30px 20px 80px' }}>
        
        {/* Encabezado de Búsqueda */}
        <div style={{ background: '#FFFFFF', padding: '30px 32px', borderRadius: '14px', border: '1px solid #E1E4E0', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', marginBottom: '30px' }}>
          <h1 style={{ fontFamily: "'Oswald', sans-serif", fontSize: '2.2rem', color: 'var(--azul-marino, #1B2028)', marginBottom: '8px' }}>
            Resultados de Búsqueda
          </h1>
          <p style={{ color: 'var(--texto-suave, #5B6470)', fontSize: '0.95rem', marginBottom: '20px' }}>
            {query ? `Mostrando ${data.total} resultado(s) para "${query}"` : 'Escribe lo que buscas para encontrar arqueros, productos, entrenadores o canchas.'}
          </p>

          <form onSubmit={handleFormSubmit} style={{ display: 'flex', gap: '12px', maxWidth: '650px' }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <input
                type="text"
                placeholder="Buscar arqueros, productos, entrenadores, canchas..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '13px 18px',
                  borderRadius: '8px',
                  border: '2px solid #D1D5DB',
                  fontSize: '1rem',
                  color: '#1B2028',
                  outline: 'none'
                }}
              />
            </div>
            <button
              type="submit"
              className="btn-dorado"
              style={{
                padding: '13px 28px',
                borderRadius: '8px',
                fontWeight: 'bold',
                fontFamily: "'Oswald', sans-serif",
                fontSize: '1rem',
                cursor: 'pointer'
              }}
            >
              🔍 BUSCAR
            </button>
          </form>
        </div>

        {/* Pestañas de Filtro */}
        {data.total > 0 && (
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '24px' }}>
            <button
              className={`nav-link ${filtroCategoria === 'todos' ? 'activo' : ''}`}
              onClick={() => setFiltroCategoria('todos')}
              style={{ padding: '10px 20px', borderRadius: '30px', background: filtroCategoria === 'todos' ? 'var(--azul-marino)' : '#FFFFFF', color: filtroCategoria === 'todos' ? '#FFFFFF' : '#1B2028', border: '1px solid #E1E4E0', cursor: 'pointer', fontWeight: 600 }}
            >
              Todos ({data.total})
            </button>

            {data.porCategoria.porteros.length > 0 && (
              <button
                onClick={() => setFiltroCategoria('porteros')}
                style={{ padding: '10px 20px', borderRadius: '30px', background: filtroCategoria === 'porteros' ? 'var(--azul-marino)' : '#FFFFFF', color: filtroCategoria === 'porteros' ? '#FFFFFF' : '#1B2028', border: '1px solid #E1E4E0', cursor: 'pointer', fontWeight: 600 }}
              >
                🧤 Arqueros ({data.porCategoria.porteros.length})
              </button>
            )}

            {data.porCategoria.productos.length > 0 && (
              <button
                onClick={() => setFiltroCategoria('productos')}
                style={{ padding: '10px 20px', borderRadius: '30px', background: filtroCategoria === 'productos' ? 'var(--azul-marino)' : '#FFFFFF', color: filtroCategoria === 'productos' ? '#FFFFFF' : '#1B2028', border: '1px solid #E1E4E0', cursor: 'pointer', fontWeight: 600 }}
              >
                🛍️ Productos ({data.porCategoria.productos.length})
              </button>
            )}

            {data.porCategoria.entrenadores.length > 0 && (
              <button
                onClick={() => setFiltroCategoria('entrenadores')}
                style={{ padding: '10px 20px', borderRadius: '30px', background: filtroCategoria === 'entrenadores' ? 'var(--azul-marino)' : '#FFFFFF', color: filtroCategoria === 'entrenadores' ? '#FFFFFF' : '#1B2028', border: '1px solid #E1E4E0', cursor: 'pointer', fontWeight: 600 }}
              >
                ⚽ Entrenadores ({data.porCategoria.entrenadores.length})
              </button>
            )}

            {data.porCategoria.canchas.length > 0 && (
              <button
                onClick={() => setFiltroCategoria('canchas')}
                style={{ padding: '10px 20px', borderRadius: '30px', background: filtroCategoria === 'canchas' ? 'var(--azul-marino)' : '#FFFFFF', color: filtroCategoria === 'canchas' ? '#FFFFFF' : '#1B2028', border: '1px solid #E1E4E0', cursor: 'pointer', fontWeight: 600 }}
              >
                🏟️ Canchas ({data.porCategoria.canchas.length})
              </button>
            )}
          </div>
        )}

        {/* Estado de Carga */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '60px 0', fontSize: '1.2rem', color: '#5B6470' }}>
            Cargando resultados...
          </div>
        )}

        {/* Resultados */}
        {!loading && itemsMostrados.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
            {itemsMostrados.map((item, index) => (
              <div
                key={index}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: '1px solid #E1E4E0',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}
              >
                {/* Imagen del Item */}
                <div style={{ position: 'relative', height: '180px', background: '#F1F5F9' }}>
                  <img
                    src={item.imagen || '/images/gk_goalkeeper.png'}
                    alt={item.nombre}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <span
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      background: 'var(--azul-marino)',
                      color: 'var(--dorado)',
                      padding: '4px 10px',
                      borderRadius: '20px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}
                  >
                    {item.tipoItem === 'portero' && '🧤 Arquero'}
                    {item.tipoItem === 'producto' && '🛍️ Producto'}
                    {item.tipoItem === 'entrenador' && '⚽ Entrenador'}
                    {item.tipoItem === 'cancha' && '🏟️ Cancha'}
                  </span>
                </div>

                {/* Detalles */}
                <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontFamily: "'Oswald', sans-serif", fontSize: '1.25rem', color: '#1B2028', marginBottom: '6px' }}>
                    {item.nombre}
                  </h3>

                  <p style={{ color: '#5B6470', fontSize: '0.88rem', marginBottom: '12px', flex: 1, lineHeight: 1.5 }}>
                    {item.especialidad || item.categoria || item.tipo || item.descripcion}
                  </p>

                  {item.ciudad && (
                    <div style={{ fontSize: '0.84rem', color: '#64748B', marginBottom: '12px' }}>
                      📍 {item.ciudad} {item.direccion ? `• ${item.direccion}` : ''}
                    </div>
                  )}

                  {item.precio && (
                    <div style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--azul-marino)', marginBottom: '16px' }}>
                      ${Number(item.precio).toLocaleString('es-CO')}
                      <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 400 }}>
                        {item.tipoItem === 'portero' ? ' / Partido' : item.tipoItem === 'cancha' ? ' / Hora' : ''}
                      </span>
                    </div>
                  )}

                  {/* Acciones directas por categoría */}
                  {item.tipoItem === 'portero' && (
                    <button
                      className="btn-dorado"
                      onClick={() => onNavigate('porteros')}
                      style={{ width: '100%', padding: '10px', borderRadius: '6px', fontWeight: 'bold' }}
                    >
                      Contratar Arquero
                    </button>
                  )}
                  {item.tipoItem === 'producto' && (
                    <button
                      className="btn-dorado"
                      onClick={() => onNavigate('tienda')}
                      style={{ width: '100%', padding: '10px', borderRadius: '6px', fontWeight: 'bold' }}
                    >
                      Ver en Tienda
                    </button>
                  )}
                  {item.tipoItem === 'entrenador' && (
                    <button
                      className="btn-dorado"
                      onClick={() => onNavigate('entrenadores')}
                      style={{ width: '100%', padding: '10px', borderRadius: '6px', fontWeight: 'bold' }}
                    >
                      Ver Entrenador
                    </button>
                  )}
                  {item.tipoItem === 'cancha' && (
                    <button
                      className="btn-dorado"
                      onClick={() => onNavigate('canchas')}
                      style={{ width: '100%', padding: '10px', borderRadius: '6px', fontWeight: 'bold' }}
                    >
                      Reservar Cancha
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Sin resultados */}
        {!loading && itemsMostrados.length === 0 && (
          <div style={{ background: '#FFFFFF', padding: '50px 30px', borderRadius: '14px', textAlign: 'center', border: '1px solid #E1E4E0' }}>
            <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🔍</div>
            <h2 style={{ fontFamily: "'Oswald', sans-serif", fontSize: '1.6rem', color: '#1B2028', marginBottom: '8px' }}>
              No encontramos resultados para "{query}"
            </h2>
            <p style={{ color: '#5B6470', fontSize: '0.95rem', maxWidth: '500px', margin: '0 auto 24px' }}>
              Prueba buscando términos generales como "arquero", "guantes", "medellín", "entrenador" o "cancha".
            </p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={() => { setQuery('Arquero'); ejecutarBusqueda('Arquero'); }} style={{ padding: '8px 16px', borderRadius: '20px', background: '#F1F5F9', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
                🧤 Arqueros
              </button>
              <button onClick={() => { setQuery('Guantes'); ejecutarBusqueda('Guantes'); }} style={{ padding: '8px 16px', borderRadius: '20px', background: '#F1F5F9', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
                🛍️ Guantes
              </button>
              <button onClick={() => { setQuery('Medellín'); ejecutarBusqueda('Medellín'); }} style={{ padding: '8px 16px', borderRadius: '20px', background: '#F1F5F9', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
                📍 Medellín
              </button>
              <button onClick={() => { setQuery('Cancha'); ejecutarBusqueda('Cancha'); }} style={{ padding: '8px 16px', borderRadius: '20px', background: '#F1F5F9', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
                🏟️ Canchas
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default SearchPage
