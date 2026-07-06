import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { getEntrenadores } from '../services/apiService'

function EntrenadoresPage({ onNavigate }) {
  const [entrenadores, setEntrenadores] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getEntrenadores().then(setEntrenadores).catch(() => setError('No pudimos cargar los entrenadores.')).finally(() => setLoading(false))
  }, [])

  return (
    <div className="dashboard-container">
      <Navbar onNavigate={onNavigate} paginaActiva="entrenadores" />
      <div style={{ background:'linear-gradient(120deg, var(--azul-marino), var(--azul-cancha-dark))', padding:'60px 32px', color:'#fff', textAlign:'center' }}>
        <div style={{ fontSize:'2.8rem', marginBottom:12 }}>🏋️</div>
        <h1 style={{ fontFamily:'Oswald', fontSize:'2.2rem', marginBottom:12, textTransform:'uppercase' }}>Entrena con nosotros</h1>
        <p style={{ color:'#BFD0E8', maxWidth:520, margin:'0 auto 24px', lineHeight:1.6 }}>Mejora tu técnica, tus reflejos y tu posicionamiento bajo el arco con nuestros entrenadores certificados.</p>
        <div style={{ display:'flex', justifyContent:'center', gap:32, flexWrap:'wrap' }}>
          {[['🧤','Técnica especializada'],['📅','Horarios flexibles'],['⭐','Entrenadores certificados']].map(([i,t]) => (
            <div key={t}><div style={{ fontSize:'1.6rem' }}>{i}</div><div style={{ fontSize:'0.85rem', color:'#BFD0E8', marginTop:4 }}>{t}</div></div>
          ))}
        </div>
      </div>
      <div className="page-shell">
        <div className="section-heading" style={{ marginTop:32 }}><h2>Nuestros entrenadores</h2></div>
        {error && <p className="error-msg">{error}</p>}
        {loading && <p className="estado-vacio">Cargando entrenadores...</p>}
        <div className="porteros-grid">
          {entrenadores.map(e => (
            <div className="portero-card" key={e.id}>
              <img src={e.foto_url || 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=500'} alt={e.nombre} style={{ width:'100%', height:200, objectFit:'cover' }} />
              <div className="portero-card-top"><div><h2 style={{ color:'#fff', margin:0 }}>{e.nombre}</h2><span className="nivel-badge">{e.especialidad}</span></div></div>
              <div className="portero-card-body">
                <div className="precio-tag">${Number(e.precio_hora).toLocaleString('es-CO')} <span>COP / hora</span></div>
                <p className="desc">{e.descripcion}</p>
                {e.experiencia && <p style={{ fontSize:'0.8rem', color:'var(--texto-suave)', marginBottom:12 }}>🏆 {e.experiencia} de experiencia</p>}
                <button className="solicitar-btn" onClick={() => alert('¡Próximamente podrás reservar sesiones aquí!')}>Reservar sesión</button>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop:48 }}>
          <div className="section-heading"><h2>Preguntas frecuentes</h2></div>
          {[['¿Cuánto dura una sesión?','Las sesiones duran entre 60 y 90 minutos.'],['¿Necesito experiencia previa?','No. Trabajamos con todos los niveles.'],['¿Dónde se realizan?','En nuestras canchas asociadas o donde el entrenador indique.'],['¿Cómo pago?','Directamente con el entrenador, en efectivo o transferencia.']].map(([p,r]) => (
            <div key={p} className="card" style={{ marginBottom:10 }}><h2 style={{ fontSize:'0.95rem', marginBottom:6 }}>{p}</h2><p style={{ margin:0, fontSize:'0.88rem' }}>{r}</p></div>
          ))}
        </div>
      </div>
    </div>
  )
}
export default EntrenadoresPage
