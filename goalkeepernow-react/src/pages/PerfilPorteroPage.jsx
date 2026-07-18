import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { getPortero, getCalificacionesPortero } from '../services/apiService'

function PerfilPorteroPage({ porteroId, onNavigate }) {
    const [portero, setPortero] = useState(null)
    const [opiniones, setOpiniones] = useState([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
    async function cargar() {
        try {
        const [datosPortero, datosOpiniones] = await Promise.all([
            getPortero(porteroId),
            getCalificacionesPortero(porteroId),
        ])
        setPortero(datosPortero)
        setOpiniones(datosOpiniones)
        } catch (err) {
        console.error(err)
        setError('No pudimos cargar el perfil del arquero.')
        } finally {
        setCargando(false)
        }
    }
    cargar()
    }, [porteroId])

    return (
    <div className="dashboard-container">
        <Navbar onNavigate={onNavigate} paginaActiva="porteros" />
        <div className="page-shell">
            <button className="back-btn" style={{ background: 'var(--azul-cancha)', borderColor: 'var(--azul-cancha)', marginBottom: 22 }} onClick={() => onNavigate('porteros')}>
            ← Volver a arqueros
            </button>

            {cargando && <p className="estado-vacio">Cargando perfil...</p>}
            {error && <p className="error-msg">{error}</p>}

            {!cargando && !error && portero && (
            <>
            <div className="perfil-portero-hero">
                <div className="perfil-portero-avatar">{(portero.nombre || '?').charAt(0).toUpperCase()}</div>
                <div>
                <h1>{portero.nombre}</h1>
                <span className="nivel-badge">{portero.nivel}</span>
                </div>
            </div>

            <div className="perfil-portero-info">
                <div className="card">
                    <h2>Precio</h2>
                    <p>${Number(portero.precio).toLocaleString('es-CO')} COP / partido</p>
                </div>
                <div className="card">
                    <h2>Calificación</h2>
                    <p className="estrellas">
                        {portero.calificacion_promedio
                        ? `⭐ ${portero.calificacion_promedio} (${portero.total_calificaciones} opiniones)`
                        : 'Sin calificaciones aún'}
                    </p>
                </div>
                <div className="card">
                    <h2>Descripción</h2>
                    <p className="perfil-portero-descripcion">{portero.descripcion || 'Sin descripción.'}</p>
                </div>
            </div>

            <div className="section-heading">
                <h2>Opiniones de jugadores</h2>
            </div>
            {opiniones.length === 0 && <p className="estado-vacio">Aún no tiene opiniones.</p>}
            <div className="opiniones-lista">
                {opiniones.map((op, i) => (
                <div className="opinion-card" key={i}>
                    <strong>{op.jugador_nombre}</strong> — ⭐ {op.estrellas}
                    <p>{op.comentario}</p>
                </div>
                ))}
            </div>
            </>
            )}
        </div>
    </div>
    )
}

export default PerfilPorteroPage