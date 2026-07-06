import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import {
  getMisSolicitudes,
  getSolicitudesRecibidas,
  actualizarEstadoSolicitud,
  completarSolicitud,
  crearCalificacion,
} from '../services/apiService'

const ESTADO_COLOR = {
  pendiente: '#C9952C',
  aceptada: '#1F8A53',
  rechazada: '#C0392B',
  completada: '#1768AC',
}

function EstadoBadge({ estado }) {
  return (
    <span style={{
      fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase',
      color: '#fff', background: ESTADO_COLOR[estado] || '#999',
      padding: '3px 10px', borderRadius: 3, letterSpacing: '0.03em',
    }}>
      {estado}
    </span>
  )
}

function ModalCalificar({ solicitud, onClose, onEnviada }) {
  const [estrellas, setEstrellas] = useState(5)
  const [comentario, setComentario] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState('')

  async function enviar() {
    setEnviando(true)
    setError('')
    try {
      await crearCalificacion({ solicitud_id: solicitud.id, estrellas, comentario })
      onEnviada()
    } catch (err) {
      setError(err.response?.data?.error || 'No se pudo enviar la calificación.')
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(11,37,69,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
      <div className="card" style={{ width: 380, boxShadow: 'var(--sombra-fuerte)' }}>
        <h2>Califica a {solicitud.portero_nombre}</h2>
        {error && <p className="error-msg">{error}</p>}
        <div style={{ display: 'flex', gap: 6, fontSize: '1.8rem', color: 'var(--dorado)', margin: '10px 0 16px', cursor: 'pointer' }}>
          {[1, 2, 3, 4, 5].map(n => (
            <span key={n} onClick={() => setEstrellas(n)}>{n <= estrellas ? '★' : '☆'}</span>
          ))}
        </div>
        <textarea
          placeholder="¿Cómo estuvo el partido con este arquero?"
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          rows={3}
          style={{ width: '100%', padding: 10, borderRadius: 4, border: '1px solid var(--linea)', marginBottom: 14, fontFamily: 'inherit', resize: 'none' }}
        />
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="card-link" style={{ flex: 1, background: 'var(--linea)', color: 'var(--texto)' }} onClick={onClose}>Cancelar</button>
          <button className="card-link" style={{ flex: 1 }} onClick={enviar} disabled={enviando}>{enviando ? 'Enviando...' : 'Enviar'}</button>
        </div>
      </div>
    </div>
  )
}

function SolicitudesPage({ onNavigate }) {
  const usuario = JSON.parse(localStorage.getItem('usuario') || '{}')
  const [solicitudes, setSolicitudes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [calificando, setCalificando] = useState(null)
  const esPortero = usuario.tipo === 'portero'

  async function cargar() {
    setLoading(true)
    try {
      const data = esPortero ? await getSolicitudesRecibidas() : await getMisSolicitudes()
      setSolicitudes(data)
    } catch {
      setError('No pudimos cargar tus solicitudes. Verifica que el backend esté corriendo.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { cargar() }, [])

  async function responder(id, estado) {
    try {
      await actualizarEstadoSolicitud(id, estado)
      cargar()
    } catch {
      alert('No se pudo actualizar la solicitud.')
    }
  }

  async function marcarCompletada(id) {
    try {
      await completarSolicitud(id)
      cargar()
    } catch {
      alert('No se pudo marcar como completado.')
    }
  }

  return (
    <div className="dashboard-container">
      <Navbar onNavigate={onNavigate} paginaActiva="solicitudes" />
      <div className="page-shell">
        <div className="porteros-toolbar">
          <h1 style={{ color: 'var(--azul-marino)', fontSize: '1.6rem' }}>
            {esPortero ? 'Solicitudes recibidas' : 'Mis solicitudes'}
          </h1>
          <button className="back-btn" style={{ background: 'var(--azul-cancha)', borderColor: 'var(--azul-cancha)' }} onClick={() => onNavigate('dashboard')}>Volver al panel</button>
        </div>

        {loading && <p className="estado-vacio">Cargando...</p>}
        {error && <p className="error-msg">{error}</p>}
        {!loading && !error && solicitudes.length === 0 && (
          <p className="estado-vacio">{esPortero ? 'Aún no tienes solicitudes de jugadores.' : 'Aún no has pedido ningún arquero.'}</p>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {solicitudes.map(s => (
            <div className="card" key={s.id} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <EstadoBadge estado={s.estado} />
                <h2 style={{ marginTop: 8 }}>{esPortero ? s.jugador_nombre : s.portero_nombre}</h2>
                <p style={{ marginBottom: 0 }}>Partido: {new Date(s.fecha_partido).toLocaleDateString('es-CO')}{s.precio != null && ` · $${Number(s.precio).toLocaleString('es-CO')} COP`}</p>
              </div>

              <div style={{ display: 'flex', gap: 8 }}>
                {esPortero && s.estado === 'pendiente' && (
                  <>
                    <button className="card-link" onClick={() => responder(s.id, 'aceptada')}>Aceptar</button>
                    <button className="card-link" style={{ background: 'var(--peligro)' }} onClick={() => responder(s.id, 'rechazada')}>Rechazar</button>
                  </>
                )}
                {s.estado === 'aceptada' && (
                  <button className="card-link" onClick={() => marcarCompletada(s.id)}>Marcar jugado</button>
                )}
                {!esPortero && s.estado === 'completada' && (
                  <button className="card-link" onClick={() => setCalificando(s)}>Calificar arquero</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {calificando && (
        <ModalCalificar
          solicitud={calificando}
          onClose={() => setCalificando(null)}
          onEnviada={() => { setCalificando(null); cargar() }}
        />
      )}
    </div>
  )
}

export default SolicitudesPage
