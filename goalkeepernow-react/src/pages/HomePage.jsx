import Navbar from '../components/Navbar'

function HomePage({ onNavigate }) {
  return (
    <div>
      <Navbar onNavigate={onNavigate} paginaActiva="home" />

      <div className="page-shell">

        <div className="hero-grid">

          <div
            className="hero-tile principal"
            style={{
              backgroundImage:
                'url(https://images.unsplash.com/photo-1551958219-acbc608c6377?q=80&w=900)',
            }}
          >
            <div className="hero-tile-overlay" />

            <div className="hero-tile-content">

              <div className="eyebrow">
                GOALKEEPERNOW
              </div>

              <h1>Dale nivel a tus atajadas</h1>

              <p>
                Encuentra arqueros disponibles o compra el mejor equipamiento
                para defender el arco como un profesional.
              </p>

              <button
                className="btn-dorado"
                onClick={() => onNavigate('tienda')}
              >
                Comprar ahora →
              </button>

            </div>

          </div>

          <div className="hero-grid-right">

            <div
              className="hero-tile"
              style={{
                backgroundImage:
                  'url(https://images.unsplash.com/photo-1577223625816-7546f13df25d?q=80&w=700)',
              }}
            >
              <div className="hero-tile-overlay" />

              <div className="hero-tile-content">

                <h2>Reserva tu arquero</h2>

                <p>
                  Encuentra un arquero cerca de ti en pocos minutos.
                </p>

                <button
                  className="btn-outline-light"
                  onClick={() => onNavigate('porteros')}
                >
                  Buscar arquero
                </button>

              </div>

            </div>

            <div
  className="hero-tile"
  style={{
    backgroundImage:
      'url(https://images.unsplash.com/photo-1518604666860-9ed391f76460?w=1200)',
  }}
>
              <div className="hero-tile-overlay" />

              <div className="hero-tile-content">

                <h2>Entrena con profesionales</h2>

                <p>
                  Muy pronto podrás reservar entrenamientos personalizados.
                </p>

                <button
                className="btn-outline-light"
                onClick={() => onNavigate('entrenadores')}
                >
                Ver entrenadores
              </button>

              </div>

            </div>

          </div>

        </div>

        <div className="feature-row">

          <div className="feature-box">

            <div className="feature-icon">🚚</div>

            <div>

              <h3>Envíos a todo el país</h3>

              <p>
                Compra de forma segura y recibe tus productos donde estés.
              </p>

            </div>

          </div>

          <div className="feature-box">

            <div className="feature-icon">⭐</div>

            <div>

              <h3>Calidad garantizada</h3>

              <p>
                Arqueros calificados y recomendados por otros usuarios.
              </p>

            </div>

          </div>

          <div className="feature-box">

            <div className="feature-icon">💬</div>

            <div>

              <h3>Atención personalizada</h3>

              <p>
                Estamos disponibles para ayudarte cuando lo necesites.
              </p>

            </div>

          </div>

        </div>

        <div className="how-section">

  <h2>¿Cómo funciona GoalKeeperNow?</h2>

  <p>
    Contratar un arquero nunca fue tan fácil.
  </p>

  <div className="how-grid">

    <div className="how-card">

      <div className="how-number">
        1
      </div>

      <div className="how-icon">
        🔎
      </div>

      <h3>Busca</h3>

      <p>
        Encuentra arqueros disponibles cerca de tu ubicación.
      </p>

    </div>

    <div className="how-card">

      <div className="how-number">
        2
      </div>

      <div className="how-icon">
        👤
      </div>

      <h3>Revisa</h3>

      <p>
        Mira el perfil, experiencia y calificaciones del arquero.
      </p>

    </div>

    <div className="how-card">

      <div className="how-number">
        3
      </div>

      <div className="how-icon">
        🧤
      </div>

      <h3>Reserva</h3>

      <p>
        Solicita el arquero para tu partido en segundos.
      </p>

    </div>

    <div className="how-card">

      <div className="how-number">
        4
      </div>

      <div className="how-icon">
        ⚽
      </div>

      <h3>Disfruta</h3>

      <p>
        Juega con tranquilidad mientras un arquero profesional defiende tu arco.
      </p>

    </div>

  </div>

</div>
<div className="stats-section">

  <h2>¿Por qué elegir GoalKeeperNow?</h2>

  <p>
    Cada día más jugadores y arqueros confían en nuestra plataforma.
  </p>

  <div className="stats-grid">

    <div className="stat-card">

      <h3>250+</h3>

      <span>Arqueros registrados</span>

    </div>

    <div className="stat-card">

      <h3>1500+</h3>

      <span>Partidos completados</span>

    </div>

    <div className="stat-card">

      <h3>4.9 ★</h3>

      <span>Calificación promedio</span>

    </div>

    <div className="stat-card">

      <h3>24/7</h3>

      <span>Soporte al usuario</span>

    </div>

  </div>

</div>
      </div>
<div className="categories-section">

  <h2>Explora nuestra tienda</h2>

  <p>
    Encuentra todo lo que necesitas para defender el arco.
  </p>

  <div className="categories-grid">

    <div className="category-card">

      <div className="category-icon">🧤</div>

      <h3>Guantes</h3>

      <p>Profesionales y amateurs.</p>

    </div>

    <div className="category-card">

      <div className="category-icon">👕</div>

      <h3>Uniformes</h3>

      <p>Camisetas, pantalonetas y medias.</p>

    </div>

    <div className="category-card">

      <div className="category-icon">🥅</div>

      <h3>Protección</h3>

      <p>Rodilleras, coderas y más.</p>

    </div>

    <div className="category-card">

      <div className="category-icon">🎒</div>

      <h3>Accesorios</h3>

      <p>Maletas, infladores y entrenamiento.</p>

    </div>

  </div>

</div>

<div className="featured-section">

  <h2>⭐ Arqueros Destacados</h2>

  <p>
    Conoce algunos de los arqueros mejor calificados de GoalKeeperNow.
  </p>

  <div className="featured-grid">

    <div className="featured-card">

      <img
        src="https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=700"
        alt="Arquero"
      />

      <div className="featured-body">

        <span className="featured-status">
          🟢 Disponible
        </span>

        <h3>Carlos Gómez</h3>

        <p>⭐⭐⭐⭐⭐ 5.0</p>

        <p>📍 Medellín</p>

        <div className="featured-price">
          $80.000 <span>/ Partido</span>
        </div>

        <div className="featured-buttons">

          <button
            className="btn-outline-dark"
            onClick={() => onNavigate('porteros')}
          >
            👁 Ver perfil
          </button>

          <button
            className="btn-dorado"
            onClick={() => onNavigate('porteros')}
          >
            🧤 Reservar
          </button>

        </div>

      </div>

    </div>

    <div className="featured-card">

      <img
        src="https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=700"
        alt="Arquero"
      />

      <div className="featured-body">

        <span className="featured-status">
          🟢 Disponible
        </span>

        <h3>Juan Herrera</h3>

        <p>⭐⭐⭐⭐⭐ 4.9</p>

        <p>📍 Envigado</p>

        <div className="featured-price">
          $65.000 <span>/ Partido</span>
        </div>

        <div className="featured-buttons">

          <button
            className="btn-outline-dark"
            onClick={() => onNavigate('porteros')}
          >
            👁 Ver perfil
          </button>

          <button
            className="btn-dorado"
            onClick={() => onNavigate('porteros')}
          >
            🧤 Reservar
          </button>

        </div>

      </div>

    </div>

    <div className="featured-card">

      <img
        src="https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=700"
        alt="Arquero"
      />

      <div className="featured-body">

        <span className="featured-status">
          🟢 Disponible
        </span>

        <h3>Sebastián Ruiz</h3>

        <p>⭐⭐⭐⭐⭐ 5.0</p>

        <p>📍 Itagüí</p>

        <div className="featured-price">
          $75.000 <span>/ Partido</span>
        </div>

        <div className="featured-buttons">

          <button
            className="btn-outline-dark"
            onClick={() => onNavigate('porteros')}
          >
            👁 Ver perfil
          </button>

          <button
            className="btn-dorado"
            onClick={() => onNavigate('porteros')}
          >
            🧤 Reservar
          </button>

        </div>

      </div>

    </div>

  </div>

</div>

<section className="promo-banner">

  <div className="promo-content">

    <span className="promo-badge">
      🔥 PROMOCIÓN ESPECIAL
    </span>

    <h2>
      ¿Necesitas un arquero para hoy?
    </h2>

    <p>
      Encuentra arqueros disponibles cerca de ti en cuestión de minutos y reserva de forma rápida, segura y sin complicaciones.
    </p>

    <button
      className="promo-button"
      onClick={() => onNavigate('porteros')}
    >
      🧤 Buscar un arquero
    </button>

  </div>

  <img
    src="https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=900"
    alt="Arquero"
  />

</section>

<section className="stats-section">

  <div className="stat-box">

    <h2>250+</h2>

    <p>Arqueros registrados</p>

  </div>

  <div className="stat-box">

    <h2>1.500+</h2>

    <p>Partidos disputados</p>

  </div>

  <div className="stat-box">

    <h2>4.9★</h2>

    <p>Calificación promedio</p>

  </div>

  <div className="stat-box">

    <h2>98%</h2>

    <p>Clientes satisfechos</p>

  </div>

</section>

<section className="testimonials-section">

  <h2>Lo que dicen nuestros jugadores</h2>

  <p>
    Cada partido cuenta. Estas son algunas opiniones de quienes ya utilizaron GoalKeeperNow.
  </p>

  <div className="testimonials-grid">

    <div className="testimonial-card">

      <img
        src="https://randomuser.me/api/portraits/men/32.jpg"
        alt="Usuario"
      />

      <h3>Carlos Gómez</h3>

      <span>⭐⭐⭐⭐⭐</span>

      <p>
        "Encontré un arquero en menos de diez minutos. Muy fácil de usar y excelente atención."
      </p>

    </div>

    <div className="testimonial-card">

      <img
        src="https://randomuser.me/api/portraits/women/44.jpg"
        alt="Usuario"
      />

      <h3>Laura Ramírez</h3>

      <span>⭐⭐⭐⭐⭐</span>

      <p>
        "Los arqueros son muy responsables y el proceso de reserva fue muy rápido."
      </p>

    </div>

    <div className="testimonial-card">

      <img
        src="https://randomuser.me/api/portraits/men/67.jpg"
        alt="Usuario"
      />

      <h3>Mateo Herrera</h3>

      <span>⭐⭐⭐⭐⭐</span>

      <p>
        "Sin duda volvería a usar la plataforma. Muy recomendada para partidos improvisados."
      </p>

    </div>

  </div>

</section>
      {/* FOOTER */}

      <footer className="footer-home">

        <div className="footer-logo">

          <h2>GoalKeeperNow</h2>

          <p>
            La plataforma que conecta jugadores con arqueros de manera rápida,
            segura y confiable.
          </p>

        </div>

        <div className="footer-links">

          <button onClick={() => onNavigate('privacy')}>
            Política de Privacidad
          </button>

          <button onClick={() => onNavigate('terms')}>
            Términos y Condiciones
          </button>

          <button onClick={() => onNavigate('faq')}>
            Preguntas Frecuentes
          </button>

          <button
            onClick={() => onNavigate('contact')}>
            Contáctanos
          </button>

        </div>

        <div className="footer-copy">

          © 2026 GoalKeeperNow. Todos los derechos reservados.

        </div>

      </footer>

    </div>
  )
}

export default HomePage