import { useState } from 'react'
import Navbar from '../components/Navbar'
import { useCarrito } from '../context/CarritoContext'

function PagosPage({ onNavigate }) {

    const { items, totalItems, totalPrecio } = useCarrito()

    const [metodoPago, setMetodoPago] = useState('')

    return (

        <div className="dashboard-container">

            <Navbar
                onNavigate={onNavigate}
                paginaActiva="pagos"
            />

            <div className="page-shell">

                {/* HERO */}

                <div className="payment-hero">

                    <div className="payment-hero-left">

                        <span className="payment-badge">

                            🔒 PAGO SEGURO

                        </span>

                        <h1>

                            Finalizar compra

                        </h1>

                        <p>

                            Completa tus datos y selecciona un método de pago
                            para confirmar tu pedido.

                        </p>

                    </div>

                    <div className="payment-hero-right">

                        <div className="payment-counter">

                            <h2>

                                {totalItems}

                            </h2>

                            <span>

                                Productos

                            </span>

                        </div>

                    </div>

                </div>

                {/* CONTENIDO */}

<div className="payment-grid">

    {/* FORMULARIO */}

    <div className="payment-card">

        <h2>

            👤 Información del comprador

        </h2>

<h2 className="payment-method-title">

    Selecciona tu método de pago

</h2>

        <div className="payment-form">

            <div className="payment-group">

                <label>

                    Nombre completo

                </label>

                <input
                    type="text"
                    placeholder="Ingresa tu nombre"
                />

            </div>

            <div className="payment-group">

                <label>

                    Correo electrónico

                </label>

                <input
                    type="email"
                    placeholder="correo@ejemplo.com"
                />

            </div>

            <div className="payment-group">

                <label>

                    Teléfono

                </label>

                <input
                    type="text"
                    placeholder="3001234567"
                />

            </div>

            <div className="payment-group">

                <label>

                    Documento

                </label>

                <input
                    type="text"
                    placeholder="Número de documento"
                />

            </div>
            
            

<div className="payment-methods">

    <div
        className={`payment-option ${metodoPago === 'tarjeta' ? 'active' : ''}`}
        onClick={() => setMetodoPago('tarjeta')}
    >

        <div className="payment-option-icon">💳</div>

        <div>

            <strong>Tarjeta</strong>

            <p>Visa • Mastercard</p>

        </div>

        

    </div>

    <div
        className={`payment-option ${metodoPago === 'pse' ? 'active' : ''}`}
        onClick={() => setMetodoPago('pse')}
    >

        <div className="payment-option-icon">🏦</div>

        <div>

            <strong>PSE</strong>

            <p>Pago desde tu banco</p>

        </div>

    </div>

    <div
        className={`payment-option ${metodoPago === 'nequi' ? 'active' : ''}`}
        onClick={() => setMetodoPago('nequi')}
    >

        <div className="payment-option-icon">📱</div>

        <div>

            <strong>Nequi</strong>

            <p>Pago inmediato</p>

        </div>

    </div>

    <div
        className={`payment-option ${metodoPago === 'daviplata' ? 'active' : ''}`}
        onClick={() => setMetodoPago('daviplata')}
    >

        <div className="payment-option-icon">💙</div>

        <div>

            <strong>Daviplata</strong>

            <p>Transferencia rápida</p>

        </div>

    </div>

</div>

{metodoPago === 'tarjeta' && (

<div className="payment-extra">

    <h3>💳 Datos de la tarjeta</h3>

    <div className="payment-group">

        <label>Número de tarjeta</label>

        <input
            type="text"
            placeholder="1234 5678 9012 3456"
        />

    </div>

    <div className="payment-row">

        <div className="payment-group">

            <label>Fecha</label>

            <input
                type="text"
                placeholder="MM/AA"
            />

        </div>

        <div className="payment-group">

            <label>CVV</label>

            <input
                type="password"
                placeholder="123"
            />

        </div>

    </div>

    <div className="payment-group">

        <label>Nombre del titular</label>

        <input
            type="text"
            placeholder="Como aparece en la tarjeta"
        />

    </div>

</div>

)}

{metodoPago === 'pse' && (

<div className="payment-extra">

    <h3>🏦 Pago por PSE</h3>

    <div className="payment-group">

        <label>Banco</label>

        <select>

            <option>Bancolombia</option>
            <option>Davivienda</option>
            <option>BBVA</option>
            <option>Banco de Bogotá</option>
            <option>Banco Caja Social</option>

        </select>

    </div>

</div>

)}

{metodoPago === 'nequi' && (

<div className="payment-extra">

    <h3>📱 Pago con Nequi</h3>

    <div className="payment-group">

        <label>Número asociado</label>

        <input
            type="text"
            placeholder="3001234567"
        />

    </div>

</div>

)}

{metodoPago === 'daviplata' && (

<div className="payment-extra">

    <h3>💙 Pago con Daviplata</h3>

    <div className="payment-group">

        <label>Número asociado</label>

        <input
            type="text"
            placeholder="3001234567"
        />

    </div>

</div>

)}

        </div>

    </div>

    {/* RESUMEN */}

   <div className="payment-card">

    <h2>

        📦 Resumen del pedido

    </h2>

    <div className="payment-summary">

        <h3>

            Productos ({totalItems})

        </h3>

        {
            items.length === 0

            ?

            <p>

                No hay productos en el carrito.

            </p>

            :

            items.map(item => (

                <div
                    key={item.id}
                    className="summary-product"
                >

                    <div>

                        <strong>

                            {item.nombre}

                        </strong>

                        <span>

                            x{item.cantidad}

                        </span>

                    </div>

                    <strong>

                        ${(item.precio * item.cantidad).toLocaleString('es-CO')}

                    </strong>

                </div>

            ))

        }

        <hr />

        <div className="summary-row">

            <span>

                Subtotal

            </span>

            <strong>

                ${totalPrecio.toLocaleString('es-CO')}

            </strong>

        </div>

        <div className="summary-row">

            <span>

                Envío

            </span>

            <strong>

                Gratis

            </strong>

        </div>

        <div className="summary-total">

            <span>

                Total

            </span>

            <strong>

                ${totalPrecio.toLocaleString('es-CO')} COP

            </strong>

        </div>

        <button
    className="payment-confirm-btn"
    disabled={!metodoPago}
>

    {
        metodoPago
            ? 'Confirmar pago'
            : 'Selecciona un método de pago'
    }

</button>

    </div>

</div>

</div>

            </div>

        </div>

    )

}

export default PagosPage