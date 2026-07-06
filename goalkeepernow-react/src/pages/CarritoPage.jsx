import Navbar from '../components/Navbar'
import { useCarrito } from '../context/CarritoContext'
import { useToast } from '../context/ToastContext'

function CarritoPage({ onNavigate }) {
  const { items, totalItems, totalPrecio, dispatch } = useCarrito()
  const toast = useToast()

  function cambiarCantidad(id, cantidad) {
    dispatch({ type: 'CAMBIAR_CANTIDAD', id, cantidad })
  }

  function quitar(item) {
    dispatch({ type: 'QUITAR', id: item.id })
    toast.info(`"${item.nombre}" eliminado del carrito`)
  }

  function vaciar() {
    if (!confirm('¿Vaciar el carrito?')) return
    dispatch({ type: 'VACIAR' })
    toast.info('Carrito vaciado')
  }

  function confirmarCompra() {
    toast.exito('¡Compra confirmada! Te contactaremos pronto.')
    dispatch({ type: 'VACIAR' })
  }

  return (
    <div className="dashboard-container">
      <Navbar onNavigate={onNavigate} paginaActiva="carrito" />
      <div className="page-shell">
        <div className="porteros-toolbar">
          <h1 style={{ color: 'var(--azul-marino)', fontSize: '1.6rem' }}>
            🛒 Carrito de compras {totalItems > 0 && <span style={{ fontSize: '1rem', color: 'var(--texto-suave)', fontFamily: 'Inter' }}>({totalItems} producto{totalItems !== 1 ? 's' : ''})</span>}
          </h1>
          <div style={{ display: 'flex', gap: 10 }}>
            {items.length > 0 && (
              <button onClick={vaciar} className="back-btn" style={{ color: 'var(--peligro)', borderColor: 'var(--peligro)' }}>Vaciar carrito</button>
            )}
            <button className="back-btn" style={{ background: 'var(--azul-cancha)', borderColor: 'var(--azul-cancha)' }} onClick={() => onNavigate('tienda')}>Seguir comprando</button>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="card" style={{ alignItems: 'center', padding: 60 }}>
            <div style={{ fontSize: '3rem', marginBottom: 16 }}>🛒</div>
            <h2>Tu carrito está vacío</h2>
            <p>Agrega productos desde la tienda para verlos aquí.</p>
            <button className="card-link" onClick={() => onNavigate('tienda')}>Ir a la tienda</button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 22, alignItems: 'start' }}>
            {/* Lista de productos */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {items.map(item => (
                <div className="card" key={item.id} style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
                  <img
                    src={item.imagen_url || 'https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?q=80&w=200'}
                    alt={item.nombre}
                    style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 4, flexShrink: 0 }}
                  />
                  <div style={{ flex: 1 }}>
                    <span className="nivel-badge" style={{ color: 'var(--azul-cancha)' }}>{item.categoria}</span>
                    <h2 style={{ fontSize: '0.95rem', color: 'var(--azul-marino)', margin: '4px 0 6px' }}>{item.nombre}</h2>
                    <div className="precio-tag" style={{ fontSize: '1.1rem' }}>
                      ${Number(item.precio).toLocaleString('es-CO')} <span>COP</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, border: '1px solid var(--linea)', borderRadius: 4 }}>
                      <button
                        onClick={() => item.cantidad <= 1 ? quitar(item) : cambiarCantidad(item.id, item.cantidad - 1)}
                        style={{ width: 32, height: 32, border: 'none', background: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '1.1rem', color: 'var(--azul-marino)' }}
                      >−</button>
                      <span style={{ minWidth: 24, textAlign: 'center', fontWeight: 700 }}>{item.cantidad}</span>
                      <button
                        onClick={() => cambiarCantidad(item.id, item.cantidad + 1)}
                        disabled={item.cantidad >= item.stock}
                        style={{ width: 32, height: 32, border: 'none', background: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '1.1rem', color: 'var(--azul-marino)', opacity: item.cantidad >= item.stock ? 0.4 : 1 }}
                      >+</button>
                    </div>
                    <div style={{ fontWeight: 700, color: 'var(--azul-marino)', fontSize: '0.95rem' }}>
                      ${(item.precio * item.cantidad).toLocaleString('es-CO')}
                    </div>
                    <button onClick={() => quitar(item)} style={{ background: 'none', border: 'none', color: 'var(--peligro)', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}>
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Resumen */}
            <div className="card" style={{ position: 'sticky', top: 20 }}>
              <h2 style={{ marginBottom: 18 }}>Resumen del pedido</h2>
              {items.map(item => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--texto-suave)' }}>{item.nombre} x{item.cantidad}</span>
                  <span>${(item.precio * item.cantidad).toLocaleString('es-CO')}</span>
                </div>
              ))}
              <div style={{ borderTop: '2px solid var(--azul-marino)', marginTop: 14, paddingTop: 14, display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                <span style={{ fontFamily: 'Oswald', fontWeight: 700, textTransform: 'uppercase', fontSize: '1rem', color: 'var(--azul-marino)' }}>Total</span>
                <span style={{ fontFamily: 'Oswald', fontWeight: 700, fontSize: '1.2rem', color: 'var(--azul-marino)' }}>
                  ${totalPrecio.toLocaleString('es-CO')} COP
                </span>
              </div>
              <button className="solicitar-btn" onClick={confirmarCompra} style={{ marginBottom: 10 }}>
                Confirmar compra
              </button>
              <p style={{ fontSize: '0.75rem', color: 'var(--texto-suave)', textAlign: 'center', lineHeight: 1.4 }}>
                Al confirmar nos contactaremos contigo para coordinar el pago y envío.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CarritoPage
