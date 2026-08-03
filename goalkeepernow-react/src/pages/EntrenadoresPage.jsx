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
      <div
  

  className="coach-hero"
  style={{
    backgroundImage:
      "linear-gradient(rgba(8,25,45,.75), rgba(8,25,45,.75)), url('https://images.unsplash.com/photo-1511886929837-354d827aae26?w=1600')",
  }}
>

  <div className="coach-hero-content">

    <span className="coach-badge">
      🏆 ENTRENADORES CERTIFICADOS
    </span>

    <h1>
      Lleva tu nivel al siguiente escalón
    </h1>

    <p>
      Aprende con entrenadores especializados en porteros y mejora tus reflejos, técnica y posicionamiento con sesiones personalizadas.
    </p>

    <button
      className="btn-dorado"
      onClick={() => window.scrollTo({ top: 500, behavior: 'smooth' })}
    >
      🏋️ Ver entrenadores
    </button>

  </div>

</div>
      <div className="page-shell">
        <div className="section-heading" style={{ marginTop:32 }}><h2>Nuestros entrenadores</h2></div>
        {error && <p className="error-msg">{error}</p>}
        {loading && <p className="estado-vacio">Cargando entrenadores...</p>}
        <div className="coach-grid">

  {entrenadores.map((e) => (

    <div
      className="coach-card"
      key={e.id}
    >

      <div className="coach-image">

        <img
          src={
            e.foto_url ||
            "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800"
          }
          alt={e.nombre}
        />

        <span className="coach-status">
          🟢 Disponible
        </span>

      </div>

      <div className="coach-content">

        <h2>
          {e.nombre}
        </h2>

        <div className="coach-stars">

          ⭐⭐⭐⭐⭐

          <span>4.9</span>

        </div>

        <div className="coach-info">

          <span>👥 +250 alumnos</span>

          <span>⚡ Responde en menos de 1 hora</span>

          <span>📍 Medellín</span>

        </div>

        <p className="coach-speciality">

          🏆 {e.especialidad}

        </p>

        <p>

          📍 Medellín

        </p>

        {e.experiencia && (

          <p>

            📅 {e.experiencia}

          </p>

        )}

        <div className="coach-top-badge">

          ⭐ Top Coach

        </div>

        <div className="coach-price">

          ${Number(e.precio_hora).toLocaleString('es-CO')}

          <span> / hora</span>

        </div>

        <div className="coach-buttons">

          <button
            className="coach-btn-secondary"
            onClick={() => {

            localStorage.setItem(
              'entrenadorSeleccionado',
                JSON.stringify(e)
            )

            onNavigate('entrenador-perfil')

          }}
          >
            👁 Ver perfil
          </button>

          <button
            className="coach-btn-primary"
            onClick={() =>
              alert('¡Próximamente podrás reservar sesiones aquí!')
            }
          >
            🏋️ Reservar
          </button>

        </div>

      </div>

    </div>

  ))}

</div>
        <div className="coach-extra">

  <div className="section-heading">

    <h2>¿Por qué entrenar con GoalKeeperNow?</h2>

  </div>

  <div className="coach-benefits">

    <div className="coach-benefit-card">

      <div className="coach-benefit-icon">🏆</div>

      <h3>Entrenadores certificados</h3>

      <p>
        Todos nuestros entrenadores cuentan con experiencia y preparación para mejorar tu rendimiento.
      </p>

    </div>

    <div className="coach-benefit-card">

      <div className="coach-benefit-icon">📅</div>

      <h3>Horarios flexibles</h3>

      <p>
        Agenda entrenamientos entre semana o fines de semana según tu disponibilidad.
      </p>

    </div>

    <div className="coach-benefit-card">

      <div className="coach-benefit-icon">🎯</div>

      <h3>Entrenamiento personalizado</h3>

      <p>
        Cada sesión se adapta a tu edad, nivel y objetivos deportivos.
      </p>

    </div>

    <div className="coach-benefit-card">

      <div className="coach-benefit-icon">⭐</div>

      <h3>Calidad garantizada</h3>

      <p>
        Aprende con profesionales recomendados por cientos de jugadores.
      </p>

    </div>

  </div>

  <div className="coach-stats">

    <div>

      <h2>+500</h2>

      <span>Entrenamientos</span>

    </div>

    <div>

      <h2>98%</h2>

      <span>Satisfacción</span>

    </div>

    <div>

      <h2>120+</h2>

      <span>Porteros formados</span>

    </div>

    <div>

      <h2>15+</h2>

      <span>Entrenadores</span>

    </div>

  </div>

</div>
      </div>
    </div>
  )
}
export default EntrenadoresPage
