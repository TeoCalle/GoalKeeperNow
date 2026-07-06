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
      <div style={{ background:'linear-gradient(120deg, var(--azul-marino), #1a4a7a)', padding:'48px 32px', color:'#fff', textAlign:'center' }}>
        <div style={{ fontSize:'2.5rem', marginBottom:10 }}>🏟️</div>
        <h1 style={{ fontFamily:'Oswald', fontSize:'2rem', textTransform:'uppercase', marginBottom:10 }}>Canchas disponibles</h1>
        <p style={{ color:'#BFD0E8', maxWidth:480, margin:'0 auto' }}>Reserva tu cancha favorita y juega cuando quieras, sin complicaciones.</p>
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
            <div className="portero-card" key={c.id}>
              <img src={c.foto_url || 'https://images.unsplash.com/photo-1551958219-acbc608c6377?q=80&w=500'} alt={c.nombre} style={{ width:'100%', height:180, objectFit:'cover' }} />
              <div className="portero-card-top"><div><h2 style={{ color:'#fff', margin:0 }}>{c.nombre}</h2><span className="nivel-badge">{TIPO_LABEL[c.tipo]} · {c.ciudad}</span></div></div>
              <div className="portero-card-body">
                <div className="precio-tag">${Number(c.precio_hora).toLocaleString('es-CO')} <span>COP / hora</span></div>
                {c.direccion && <p style={{ fontSize:'0.8rem', color:'var(--texto-suave)', marginBottom:8 }}>📍 {c.direccion}</p>}
                <p className="desc">{c.descripcion}</p>
                <button className="solicitar-btn" onClick={() => setReservando(c)}>Reservar cancha</button>
              </div>
            </div>
          ))}
          {!loading && canchas.length === 0 && <p className="estado-vacio">No hay canchas disponibles.</p>}
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
