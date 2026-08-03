import ScrollReveal from '../components/ScrollReveal'
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
        

        {/* Info */}
        {/* HERO TIENDA */}

<div className="store-hero fade-down">

    <div className="store-hero-left">

        <span className="store-badge">

            🛒 TIENDA OFICIAL

        </span>

        <h1>

            Equípate como un profesional

        </h1>

        <p>

            Descubre guantes, balones, uniformes, accesorios y todo lo que necesitas para dominar el terreno de juego.

        </p>

        <button
            className="btn-dorado"
            onClick={() =>
                document.querySelector('.store-grid')
                    ?.scrollIntoView({ behavior: 'smooth' })
            }
        >

            🛍 Explorar productos

        </button>

    </div>

    <div className="store-hero-right">

        <img
            src="https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=1200"
            alt="Implementos deportivos"
        />

        <div className="store-counter">

            <h2>

                {total}

            </h2>

            <span>

                Productos disponibles

            </span>

        </div>

    </div>

</div>

<div className="store-promo-bar fade-up delay-1">

    <div className="store-promo-track">

        <span>🚚 Envío GRATIS desde $150.000</span>

        <span>⭐ 10% de descuento en guantes seleccionados</span>

        <span>🔒 Compra 100% segura</span>

        <span>💳 Paga con múltiples métodos de pago</span>

        <span>🧤 Productos para arqueros de todos los niveles</span>

        {/* Repetimos los mensajes para que la animación sea continua */}

        <span>🚚 Envío GRATIS desde $150.000</span>

        <span>⭐ 10% de descuento en guantes seleccionados</span>

        <span>🔒 Compra 100% segura</span>

        <span>💳 Paga con múltiples métodos de pago</span>

        <span>🧤 Productos para arqueros de todos los niveles</span>

    </div>

</div>

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

        {error && <p className="error-msg">{error}</p>}

        <div className="store-categories">

    <div
        className={`store-category-card ${filtros.categoria === '' ? 'active' : ''}`}
        onClick={() => cambiarFiltro('categoria', '')}
    >
        <div className="store-category-icon">🛍️</div>
        <span>Todos</span>
    </div>

    <div
        className={`store-category-card ${filtros.categoria === 'Guantes' ? 'active' : ''}`}
        onClick={() => cambiarFiltro('categoria', 'Guantes')}
    >
        <div className="store-category-icon">🧤</div>
        <span>Guantes</span>
    </div>

    <div
        className={`store-category-card ${filtros.categoria === 'Balones' ? 'active' : ''}`}
        onClick={() => cambiarFiltro('categoria', 'Balones')}
    >
        <div className="store-category-icon">⚽</div>
        <span>Balones</span>
    </div>

    <div
        className={`store-category-card ${filtros.categoria === 'Uniformes' ? 'active' : ''}`}
        onClick={() => cambiarFiltro('categoria', 'Uniformes')}
    >
        <div className="store-category-icon">👕</div>
        <span>Uniformes</span>
    </div>

    <div
        className={`store-category-card ${filtros.categoria === 'Accesorios' ? 'active' : ''}`}
        onClick={() => cambiarFiltro('categoria', 'Accesorios')}
    >
        <div className="store-category-icon">🥅</div>
        <span>Accesorios</span>
    </div>

</div>

<div className="store-featured">

    <div className="section-heading">

        <h2>🔥 Productos destacados</h2>

        <p>
            Descubre algunos de los artículos favoritos de nuestra comunidad.
        </p>

    </div>

    <div className="store-featured-grid">

        {productos.slice(0, 3).map((p) => (

            <div className="store-featured-card" key={`featured-${p.id}`}>

                <img
                    src={
                        p.imagen_url ||
                        "https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?w=900"
                    }
                    alt={p.nombre}
                />

                <div className="store-featured-content">

                    <span>

                        ⭐ Destacado

                    </span>

                    <h3>

                        {p.nombre}

                    </h3>

                    <p>

                        {p.descripcion}

                    </p>

                    <strong>

                        ${Number(p.precio).toLocaleString('es-CO')}

                    </strong>

                </div>

            </div>

        ))}

    </div>

</div>

<div className="store-benefits fade-up delay-2">

    <div className="section-heading">

        <h2>¿Por qué comprar con GoalKeeperNow?</h2>

        <p>

            Queremos que tu experiencia sea rápida, segura y confiable.

        </p>

    </div>

    <div className="store-benefits-grid">

        <div className="store-benefit">

            <div className="store-benefit-icon">

                🚚

            </div>

            <h3>

                Envíos rápidos

            </h3>

            <p>

                Recibe tus implementos deportivos en el menor tiempo posible.

            </p>

        </div>

        <div className="store-benefit">

            <div className="store-benefit-icon">

                🔒

            </div>

            <h3>

                Compra segura

            </h3>

            <p>

                Todos los pagos se realizan de manera segura y protegida.

            </p>

        </div>

        <div className="store-benefit">

            <div className="store-benefit-icon">

                🛡️

            </div>

            <h3>

                Garantía de calidad

            </h3>

            <p>

                Solo trabajamos con productos seleccionados para arqueros.

            </p>

        </div>

    </div>

</div>

<div className="store-brands fade-up delay-3">

    <div className="section-heading">

        <h2>🏆 Marcas destacadas</h2>

        <p>

            Trabajamos con las mejores marcas para ofrecer calidad y rendimiento.

        </p>

    </div>

    <div className="store-brands-grid">

        <div className="brand-card">

            <img
                src="https://cdn.simpleicons.org/nike/111111"
                alt="Nike"
            />

            <span>Nike</span>

        </div>

        <div className="brand-card">

            <img
                src="https://cdn.simpleicons.org/adidas/111111"
                alt="Adidas"
            />

            <span>Adidas</span>

        </div>

        <div className="brand-card">

            <img
                src="https://cdn.simpleicons.org/puma/111111"
                alt="Puma"
            />

            <span>Puma</span>

        </div>

        <div className="brand-card">

            <h2>REUSCH</h2>

            <span>Guantes</span>

        </div>

        <div className="brand-card">

            <h2>RINAT</h2>

            <span>Porteros</span>

        </div>

        <div className="brand-card">

            <h2>UHHLSPORT</h2>

            <span>Profesional</span>

        </div>

    </div>

</div>

        {/* Grid */}
        <div className="store-grid fade-up delay-4">
          {loading
            ? Array.from({ length: 9 }).map((_, i) => <SkeletonCard key={i} />)
            : productos.length === 0
              ? <p className="estado-vacio">No hay productos con esos filtros.</p>
              : productos.map(p => (
                <div className="store-card" key={p.id}>
                  <div className="store-image">

<img
src={p.imagen_url || 'https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?q=80&w=700'}
alt={p.nombre}
/>

<div className="discount-tag">

🔥 Oferta

</div>

</div>
                  <span className="store-category">

    {p.categoria}

</span>

<h2 className="store-title">

    {p.nombre}

</h2>

<div className="store-stars">

★★★★★

<span>

4.9

</span>

</div>

<p className="store-description">

    {p.descripcion}

</p>

<div className="store-price-row">

    <div className="store-price">

        ${Number(p.precio).toLocaleString('es-CO')}

    </div>

    <div
        className="store-stock"
        style={{
            color: p.stock > 0 ? 'green' : 'red'
        }}
    >

        {
            p.stock > 0
            ? `${p.stock} disponibles`
            : 'Agotado'
        }

    </div>

</div>

<div className="store-buttons">

    <button
        className="favorite-btn"
    >

        ❤

    </button>

    <button
        className="buy-btn"
        onClick={() => agregar(p)}
        disabled={p.stock <= 0}
    >

        {
            p.stock > 0
            ? 'Agregar al carrito'
            : 'Sin stock'
        }

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
