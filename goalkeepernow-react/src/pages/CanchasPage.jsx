import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { getCanchas, reservarCancha } from '../services/apiService'
import { useToast } from '../context/ToastContext'

const TIPO_LABEL = { futbol5:'Fútbol 5', futbol7:'Fútbol 7', futbol11:'Fútbol 11', futsal:'Futsal' }

function CanchasPage({ onNavigate }) {
  const [canchas, setCanchas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filtroTipo, setFiltroTipo] = useState('')
  const [reservando, setReservando] = useState(null)
  const [formRes, setFormRes] = useState({ fecha:'', hora_inicio:'08:00', hora_fin:'09:00' })
  const toast = useToast()
  const usuario = JSON.parse(localStorage.getItem('usuario') || '{}')

  useEffect(() => {
    setLoading(true)
    getCanchas({ tipo: filtroTipo }).then(setCanchas).catch(() => setError('No pudimos cargar las canchas.')).finally(() => setLoading(false))
  }, [filtroTipo])

  async function handleReservar(e) {
    e.preventDefault()
    if (!usuario.id) { onNavigate('login'); return }
    try {
      await reservarCancha(reservando.id, formRes)
      toast.exito(`¡Cancha "${reservando.nombre}" reservada!`)
      setReservando(null)
    } catch (err) { toast.error(err.response?.data?.error || 'No se pudo reservar.') }
  }

  return (
    <div className="dashboard-container">
      <Navbar onNavigate={onNavigate} paginaActiva="canchas" />
      <div
  className="fields-hero"
  style={{
    backgroundImage:
      "linear-gradient(rgba(8,25,45,.72), rgba(8,25,45,.72)), url('https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=1600')",
  }}
>

  <div className="fields-hero-content">

    <span className="coach-badge">

      🏟️ RESERVA EN SEGUNDOS

    </span>

    <h1>

      Encuentra la cancha perfecta

    </h1>

    <p>

      Reserva canchas de fútbol cerca de ti con disponibilidad inmediata, iluminación, parqueadero y las mejores instalaciones.

    </p>

    <button
      className="btn-dorado"
      onClick={() =>
        window.scrollTo({
          top: 520,
          behavior: "smooth",
        })
      }
    >

      ⚽ Ver canchas

    </button>

  </div>

</div>
      <div className="page-shell">
        <div style={{ display:'flex', gap:10, marginBottom:22, flexWrap:'wrap', alignItems:'center' }}>
          <span style={{ fontWeight:600, color:'var(--azul-marino)' }}>Tipo:</span>
          {['','futbol5','futbol7','futbol11','futsal'].map(t => (
            <button key={t} onClick={() => setFiltroTipo(t)} style={{ padding:'8px 16px', border:'1px solid var(--linea)', borderRadius:4, cursor:'pointer', background:filtroTipo===t?'var(--azul-marino)':'#fff', color:filtroTipo===t?'#fff':'var(--texto)', fontWeight:600, fontSize:'0.85rem' }}>
              {t ? TIPO_LABEL[t] : 'Todas'}
            </button>
          ))}
        </div>
        {error && <p className="error-msg">{error}</p>}
        {loading && <p className="estado-vacio">Cargando canchas...</p>}
        <div className="porteros-grid">
          {canchas.map(c => (
            <div className="fields-grid">

  {canchas.map((c) => (

    <div className="field-card" key={c.id}>

      <div className="field-image">

        <img
          src={
            c.foto_url ||
            "https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=1200"
          }
          alt={c.nombre}
        />

        <span className="field-status">
          🟢 Disponible
        </span>

      </div>

      <div className="field-content">

        <div className="field-rating">

          ⭐⭐⭐⭐⭐

          <span>4.9</span>

        </div>

        <h2>

          {c.nombre}

        </h2>

        <p>

          📍 {c.ciudad}

        </p>

        <div className="field-features">

          <span>⚽ {TIPO_LABEL[c.tipo]}</span>

          <span>💡 Iluminación</span>

          <span>🚿 Vestidores</span>

          <span>🚗 Parqueadero</span>

        </div>

        <div className="field-price">

          ${Number(c.precio_hora).toLocaleString("es-CO")}

          <span> / hora</span>

        </div>

        <div className="field-buttons">

          <button
  className="coach-btn-secondary"
  onClick={() => {

    localStorage.setItem(
      "canchaSeleccionada",
      JSON.stringify(c)
    )

    onNavigate("cancha-perfil")

  }}
>
  👁 Ver detalles
</button>

          <button
            className="coach-btn-primary"
            onClick={() => setReservando(c)}
          >
            ⚽ Reservar
          </button>

        </div>

      </div>

    </div>

  ))}

</div>


          ))}
          {!loading && canchas.length === 0 && <p className="estado-vacio">No hay canchas disponibles.</p>}
        </div>
        <div className="fields-info">

  <div className="section-heading">

    <h2>¿Por qué reservar con GoalKeeperNow?</h2>

  </div>

  <div className="fields-info-grid">

    <div className="fields-info-card">

      <div className="fields-icon">
        🏟️
      </div>

      <h3>Canchas verificadas</h3>

      <p>
        Todas las canchas publicadas son revisadas para garantizar calidad y seguridad.
      </p>

    </div>

    <div className="fields-info-card">

      <div className="fields-icon">
        💡
      </div>

      <h3>Excelentes instalaciones</h3>

      <p>
        Iluminación profesional, camerinos, parqueaderos y zonas de descanso.
      </p>

    </div>

    <div className="fields-info-card">

      <div className="fields-icon">
        📅
      </div>

      <h3>Reserva inmediata</h3>

      <p>
        Consulta disponibilidad y asegura tu horario en pocos segundos.
      </p>

    </div>

    <div className="fields-info-card">

      <div className="fields-icon">
        ⭐
      </div>

      <h3>Calificaciones reales</h3>

      <p>
        Conoce la experiencia de otros jugadores antes de reservar.
      </p>

    </div>

  </div>

</div>

<div className="fields-stats">

  <div>

    <h2>+80</h2>

    <span>Canchas</span>

  </div>

  <div>

    <h2>+1.500</h2>

    <span>Reservas</span>

  </div>

  <div>

    <h2>4.9</h2>

    <span>Calificación promedio</span>

  </div>

  <div>

    <h2>24/7</h2>

    <span>Disponibilidad</span>

  </div>

</div>

      </div>

      <div className="fields-reviews">

  <div className="section-heading">

    <h2>Lo que dicen nuestros jugadores</h2>

  </div>

  <div className="fields-reviews-grid">

    <div className="review-card">

      <div className="review-top">

        <img
          src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300"
          alt="Jugador"
        />

        <div>

          <h3>Juan Pérez</h3>

          <span>⭐⭐⭐⭐⭐</span>

        </div>

      </div>

      <p>

        Reservé una cancha para un torneo con mis amigos y todo fue exactamente como aparecía en la aplicación. Muy recomendado.

      </p>

    </div>

    <div className="review-card">

      <div className="review-top">

        <img
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300"
          alt="Jugadora"
        />

        <div>

          <h3>Laura Gómez</h3>

          <span>⭐⭐⭐⭐⭐</span>

        </div>

      </div>

      <p>

        Excelente iluminación, muy buen césped y el proceso de reserva fue muy rápido. Volveré a usar GoalKeeperNow.

      </p>

    </div>

    <div className="review-card">

      <div className="review-top">

        <img
          src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300"
          alt="Jugador"
        />

        <div>

          <h3>Carlos Ramírez</h3>

          <span>⭐⭐⭐⭐⭐</span>

        </div>

      </div>

      <p>

        Me gustó poder comparar varias canchas antes de decidir. La experiencia fue muy buena y el precio justo.

      </p>

    </div>

  </div>

</div>
      {reservando && (
        <div style={{ position:'fixed', inset:0, background:'rgba(11,37,69,0.55)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:50 }}>
          <div className="card" style={{ width:380, boxShadow:'var(--sombra-fuerte)' }}>
            <h2>Reservar: {reservando.nombre}</h2>
            <p style={{ marginBottom:16 }}>{TIPO_LABEL[reservando.tipo]} · ${Number(reservando.precio_hora).toLocaleString('es-CO')} COP/hora</p>
            <form onSubmit={handleReservar} style={{ display:'flex', flexDirection:'column', gap:4 }}>
              <label className="campo-label">Fecha</label>
              <input type="date" value={formRes.fecha} onChange={e => setFormRes({...formRes,fecha:e.target.value})} required min={new Date().toISOString().split('T')[0]} style={{ padding:10, border:'1px solid var(--linea)', borderRadius:4, marginBottom:10 }} />
              <label className="campo-label">Hora inicio</label>
              <input type="time" value={formRes.hora_inicio} onChange={e => setFormRes({...formRes,hora_inicio:e.target.value})} required style={{ padding:10, border:'1px solid var(--linea)', borderRadius:4, marginBottom:10 }} />
              <label className="campo-label">Hora fin</label>
              <input type="time" value={formRes.hora_fin} onChange={e => setFormRes({...formRes,hora_fin:e.target.value})} required style={{ padding:10, border:'1px solid var(--linea)', borderRadius:4, marginBottom:16 }} />
              <div style={{ display:'flex', gap:10 }}>
                <button type="button" className="card-link" style={{ flex:1, background:'var(--linea)', color:'var(--texto)' }} onClick={() => setReservando(null)}>Cancelar</button>
                <button type="submit" className="card-link" style={{ flex:1 }}>Confirmar reserva</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
export default CanchasPage
