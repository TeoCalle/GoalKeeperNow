import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { getPorteros, crearSolicitud } from '../services/apiService'

function PorterosPage({ onNavigate, onVerPerfil }) {
  const [porteros, setPorteros] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const usuario = JSON.parse(localStorage.getItem('usuario') || '{}')

  useEffect(() => {
    async function cargar() {
      try {
        const data = await getPorteros()
        setPorteros(data)
      } catch {
        setError('No pudimos conectar con el servidor. Verifica que el backend esté corriendo.')
      } finally {
        setLoading(false)
      }
    }
    cargar()
  }, [])

  async function solicitar(porteroId) {
    try {
      await crearSolicitud({
        usuario_id: usuario.id,
        portero_id: porteroId,
        fecha_partido: new Date().toISOString().split('T')[0],
      })
      alert('Solicitud enviada correctamente')
    } catch {
      alert('Error al enviar la solicitud')
    }
  }

  return (
    <div className="dashboard-container">
      <Navbar onNavigate={onNavigate} paginaActiva="porteros" />
      <div className="page-shell">
        <div className="porteros-toolbar">
          <h1 style={{ color: 'var(--azul-marino)', fontSize: '1.6rem' }}>Arqueros disponibles</h1>
          <button className="back-btn" style={{ background: 'var(--azul-cancha)', borderColor: 'var(--azul-cancha)' }} onClick={() => onNavigate('dashboard')}>Volver al panel</button>
        </div>

        {loading && <p className="estado-vacio">Buscando arqueros cerca de ti...</p>}
        {error && <p className="error-msg">{error}</p>}
        {!loading && !error && porteros.length === 0 && <p className="estado-vacio">No hay arqueros disponibles por ahora.</p>}

        <div className="porteros-grid">
          {porteros.map(portero => (
            <div className="portero-card" key={portero.id}>
              <div className="portero-card-top">
                <div className="portero-avatar">{(portero.nombre || '?').charAt(0).toUpperCase()}</div>
                <div>
                  <h2>{portero.nombre}</h2>
                  <span className="nivel-badge">{portero.nivel}</span>
                </div>
              </div>
              <div className="portero-card-body">
                <div className="precio-tag">${Number(portero.precio).toLocaleString('es-CO')} <span>COP / partido</span></div>
                <p className="desc">{portero.descripcion}</p>
                <button className="ver-perfil-btn" onClick={() => onVerPerfil(portero.id)}>Ver perfil</button>
                <button className="solicitar-btn" onClick={() => solicitar(portero.id)}>Solicitar arquero</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PorterosPage
