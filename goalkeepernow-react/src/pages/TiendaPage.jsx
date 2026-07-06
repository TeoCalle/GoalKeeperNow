import { useEffect, useState, useCallback } from 'react'
import Navbar from '../components/Navbar'
import { getProductos, getCategoriasProductos } from '../services/apiService'
import { useCarrito } from '../context/CarritoContext'
import { useToast } from '../context/ToastContext'

function SkeletonCard() {
  return (
    <div className="portero-card" style={{ animation: 'pulse 1.5s infinite' }}>
      <div style={{ width: '100%', height: 160, background: '#E4E0D6' }} />
      <div className="portero-card-body">
        <div style={{ height: 12, background: '#E4E0D6', borderRadius: 4, marginBottom: 8 }} />
        <div style={{ height: 18, background: '#E4E0D6', borderRadius: 4, marginBottom: 10, width: '70%' }} />
        <div style={{ height: 12, background: '#E4E0D6', borderRadius: 4, marginBottom: 16, width: '90%' }} />
        <div style={{ height: 40, background: '#E4E0D6', borderRadius: 4 }} />
      </div>
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.5} }`}</style>
    </div>
  )
}

function TiendaPage({ onNavigate }) {
  const [productos, setProductos] = useState([])
  const [categorias, setCategorias] = useState([])
  const [total, setTotal] = useState(0)
  const [totalPaginas, setTotalPaginas] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [filtros, setFiltros] = useState({
    buscar: '', categoria: '', orden: 'id DESC', pagina: 1,
  })
  const [buscarInput, setBuscarInput] = useState('')

  const { dispatch, totalItems } = useCarrito()
  const toast = useToast()

  const cargar = useCallback(async (f) => {
    setLoading(true)
    try {
      const data = await getProductos({
        buscar: f.buscar,
        categoria: f.categoria,
        orden: f.orden,
        page: f.pagina,
        limit: 9,
      })
      setProductos(data.productos)
      setTotal(data.total)
      setTotalPaginas(data.totalPaginas)
    } catch {
      setError('No pudimos cargar la tienda. Verifica que el backend esté corriendo.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    async function cargarCats() {
      try { setCategorias(await getCategoriasProductos()) } catch {}
    }
    cargarCats()
  }, [])

  useEffect(() => { cargar(filtros) }, [filtros, cargar])

  function cambiarFiltro(campo, valor) {
    setFiltros(f => ({ ...f, [campo]: valor, pagina: campo !== 'pagina' ? 1 : f.pagina }))
  }

  function buscar(e) {
    e.preventDefault()
    cambiarFiltro('buscar', buscarInput)
  }

  function agregar(producto) {
    if (producto.stock <= 0) return
    dispatch({ type: 'AGREGAR', producto })
    toast.exito(`"${producto.nombre}" agregado al carrito`)
  }

  return (
    <div className="dashboard-container">
      <Navbar onNavigate={onNavigate} paginaActiva="tienda" />

      <div className="page-shell">
        {/* Toolbar */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 22, flexWrap: 'wrap', alignItems: 'center' }}>
          <form onSubmit={buscar} style={{ display: 'flex', flex: 1, minWidth: 200 }}>
            <input
              placeholder="Buscar productos..."
              value={buscarInput}
              onChange={e => setBuscarInput(e.target.value)}
              style={{ flex: 1, padding: '10px 14px', border: '1px solid var(--linea)', borderRight: 'none', borderRadius: '4px 0 0 4px', outline: 'none', fontSize: '0.9rem' }}
            />
            <button type="submit" style={{ padding: '0 16px', background: 'var(--dorado)', border: 'none', borderRadius: '0 4px 4px 0', fontWeight: 700, cursor: 'pointer', color: 'var(--azul-marino)' }}>
              Buscar
            </button>
          </form>

          <select value={filtros.categoria} onChange={e => cambiarFiltro('categoria', e.target.value)}
            style={{ padding: '10px 14px', border: '1px solid var(--linea)', borderRadius: 4, background: '#fff', fontSize: '0.9rem' }}>
            <option value="">Todas las categorías</option>
            {categorias.map(c => (
              <option key={c.categoria} value={c.categoria}>{c.categoria} ({c.cantidad})</option>
            ))}
          </select>

          <select value={filtros.orden} onChange={e => cambiarFiltro('orden', e.target.value)}
            style={{ padding: '10px 14px', border: '1px solid var(--linea)', borderRadius: 4, background: '#fff', fontSize: '0.9rem' }}>
            <option value="id DESC">Más recientes</option>
            <option value="precio_asc">Precio: menor a mayor</option>
            <option value="precio_desc">Precio: mayor a menor</option>
            <option value="nombre_asc">Nombre A-Z</option>
          </select>

          <button
            onClick={() => onNavigate('carrito')}
            style={{ position: 'relative', background: 'var(--azul-marino)', color: '#fff', border: 'none', borderRadius: 4, padding: '10px 18px', fontWeight: 700, cursor: 'pointer' }}
          >
            🛒 Carrito
            {totalItems > 0 && (
              <span className="navbar-pill" style={{ top: -8, right: -8 }}>{totalItems}</span>
            )}
          </button>
        </div>

        {/* Info */}
        <div className="section-heading">
          <h2>Tienda Arqueros.co</h2>
          <span className="ver-todo">{total} producto{total !== 1 ? 's' : ''} encontrado{total !== 1 ? 's' : ''}</span>
        </div>

        {error && <p className="error-msg">{error}</p>}

        {/* Grid */}
        <div className="porteros-grid" style={{ marginBottom: 28 }}>
          {loading
            ? Array.from({ length: 9 }).map((_, i) => <SkeletonCard key={i} />)
            : productos.length === 0
              ? <p className="estado-vacio">No hay productos con esos filtros.</p>
              : productos.map(p => (
                <div className="portero-card" key={p.id}>
                  <img
                    src={p.imagen_url || 'https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?q=80&w=500'}
                    alt={p.nombre}
                    style={{ width: '100%', height: 160, objectFit: 'cover' }}
                  />
                  <div className="portero-card-body">
                    <span className="nivel-badge" style={{ color: 'var(--azul-cancha)' }}>{p.categoria}</span>
                    <h2 style={{ color: 'var(--azul-marino)', fontSize: '0.95rem', margin: '6px 0 8px' }}>{p.nombre}</h2>
                    <p className="desc">{p.descripcion}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                      <div className="precio-tag">${Number(p.precio).toLocaleString('es-CO')} <span>COP</span></div>
                      <span style={{ fontSize: '0.75rem', color: p.stock > 0 ? 'var(--exito)' : 'var(--peligro)', fontWeight: 600 }}>
                        {p.stock > 0 ? `${p.stock} disponibles` : 'Sin stock'}
                      </span>
                    </div>
                    <button
                      className="solicitar-btn"
                      onClick={() => agregar(p)}
                      disabled={p.stock <= 0}
                      style={{ opacity: p.stock <= 0 ? 0.5 : 1, cursor: p.stock <= 0 ? 'not-allowed' : 'pointer' }}
                    >
                      {p.stock > 0 ? '+ Agregar al carrito' : 'Sin stock'}
                    </button>
                  </div>
                </div>
              ))
          }
        </div>

        {/* Paginación */}
        {totalPaginas > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
            <button
              onClick={() => cambiarFiltro('pagina', filtros.pagina - 1)}
              disabled={filtros.pagina <= 1}
              style={{ padding: '8px 16px', border: '1px solid var(--linea)', borderRadius: 4, background: '#fff', cursor: 'pointer', fontWeight: 600 }}
            >← Anterior</button>
            {Array.from({ length: totalPaginas }, (_, i) => i + 1).map(n => (
              <button
                key={n}
                onClick={() => cambiarFiltro('pagina', n)}
                style={{
                  padding: '8px 14px', border: '1px solid var(--linea)', borderRadius: 4, fontWeight: 700,
                  background: n === filtros.pagina ? 'var(--azul-marino)' : '#fff',
                  color: n === filtros.pagina ? '#fff' : 'var(--texto)',
                  cursor: 'pointer',
                }}
              >{n}</button>
            ))}
            <button
              onClick={() => cambiarFiltro('pagina', filtros.pagina + 1)}
              disabled={filtros.pagina >= totalPaginas}
              style={{ padding: '8px 16px', border: '1px solid var(--linea)', borderRadius: 4, background: '#fff', cursor: 'pointer', fontWeight: 600 }}
            >Siguiente →</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default TiendaPage
