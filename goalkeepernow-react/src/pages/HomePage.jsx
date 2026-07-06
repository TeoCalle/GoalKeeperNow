import Navbar from '../components/Navbar'

function HomePage({ onNavigate }) {
  return (
    <div>
      <Navbar onNavigate={onNavigate} paginaActiva="home" />

      <div className="page-shell">
        <div className="hero-grid">
          <div
            className="hero-tile principal"
            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1551958219-acbc608c6377?q=80&w=900)' }}
          >
            <div className="hero-tile-overlay" />
            <div className="hero-tile-content">
              <div className="eyebrow">LO QUE TODO ARQUERO NECESITA</div>
              <h1>Dale nivel a tus atajadas</h1>
              <p>Guantes, uniformes e indumentaria para arqueros, y un servicio para reservar tu arquero ideal en minutos.</p>
              <button className="btn-dorado" onClick={() => onNavigate('tienda')}>Compra ahora →</button>
            </div>
          </div>

          <div className="hero-grid-right">
            <div
              className="hero-tile"
              style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1577223625816-7546f13df25d?q=80&w=700)' }}
            >
              <div className="hero-tile-overlay" />
              <div className="hero-tile-content">
                <h2>Reserva tu arquero para el partido</h2>
                <p>Cobertura en Medellín y Bogotá. Pide tu arquero como pides un domicilio.</p>
                <button className="btn-outline-light" onClick={() => onNavigate('porteros')}>Buscar arquero</button>
              </div>
            </div>
            <div
              className="hero-tile"
              style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1517747614396-d21a3151b8aa?q=80&w=700)' }}
            >
              <div className="hero-tile-overlay" />
              <div className="hero-tile-content">
                <h2>Entrena con nosotros</h2>
                <p>Eleva tu técnica y tu desempeño bajo el arco.</p>
                <button className="btn-outline-light" onClick={() => onNavigate('dashboard')}>Próximamente</button>
              </div>
            </div>
          </div>
        </div>

        <div className="feature-row">
          <div className="feature-box">
            <div className="feature-icon">🚚</div>
            <div>
              <h3>Envíos a todo el país</h3>
              <p>Compra segura o paga contra entrega en tu ciudad.</p>
            </div>
          </div>
          <div className="feature-box">
            <div className="feature-icon">⭐</div>
            <div>
              <h3>Calidad 5 estrellas</h3>
              <p>Arqueros calificados por la comunidad de jugadores.</p>
            </div>
          </div>
          <div className="feature-box">
            <div className="feature-icon">💬</div>
            <div>
              <h3>Atención personalizada</h3>
              <p>Contáctanos cuando lo necesites, te asesoramos al instante.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
