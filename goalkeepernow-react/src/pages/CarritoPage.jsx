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

<div className="cart-hero">

    <div className="cart-hero-left">

        <span className="cart-badge">

            🛒 CARRITO DE COMPRAS

        </span>

        <h1>

            Revisa tu pedido

        </h1>

        <p>

            Aquí puedes revisar todos los productos que agregaste antes de finalizar tu compra.

        </p>

    </div>

    <div className="cart-counter">

        <h2>

            {totalItems}

        </h2>

        <span>

            Producto{totalItems !== 1 ? 's' : ''}

        </span>

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
            <div className="cart-summary">

    <div className="cart-summary-header">

        <span>

            🧾

        </span>

        <h2>

            Resumen de compra

        </h2>

    </div>

    <div className="cart-summary-items">

        {items.map(item => (

            <div
                key={item.id}
                className="cart-summary-item"
            >

                <span>

                    {item.nombre} x{item.cantidad}

                </span>

                <strong>

                    ${(item.precio * item.cantidad).toLocaleString('es-CO')}

                </strong>

            </div>

        ))}

    </div>

    <div className="cart-summary-extra">

        <div>

            <span>Subtotal</span>

            <strong>

                ${totalPrecio.toLocaleString('es-CO')}

            </strong>

        </div>

        <div>

            <span>Envío</span>

            <strong style={{ color: "#16A34A" }}>

                Gratis

            </strong>

        </div>

        <div>

            <span>Descuento</span>

            <strong>

                $0

            </strong>

        </div>

    </div>

    <div className="cart-total">

        <span>

            Total

        </span>

        <strong>

            ${totalPrecio.toLocaleString('es-CO')}

        </strong>

    </div>

    <div className="cart-benefits">

        <div>🔒 Pago seguro</div>

        <div>🚚 Envío nacional</div>

        <div>🛡️ Garantía de calidad</div>

    </div>

    <button
    className="cart-payment-btn"
    onClick={() => onNavigate('pagos')}
>
    Continuar al pago
</button>

    <p className="cart-note">

        Al confirmar la compra nos pondremos en contacto contigo para coordinar el pago y el envío.

    </p>

</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CarritoPage
