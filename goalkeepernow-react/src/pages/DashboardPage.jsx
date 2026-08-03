import Navbar from '../components/Navbar'

function DashboardPage({ onNavigate }) {

  const usuario = JSON.parse(localStorage.getItem('usuario') || '{}')

  function handleLogout() {

    localStorage.removeItem('token')
    localStorage.removeItem('usuario')

    onNavigate('home')

  }

  return (

    <div className="dashboard-container">

      <Navbar
        onNavigate={onNavigate}
        paginaActiva="dashboard"
      />

      <section className="dashboard-banner">

        <div className="dashboard-banner-content">

          <div>

            <span className="dashboard-role">

              {usuario.tipo === 'portero'
                ? '🧤 PANEL DEL ARQUERO'
                : '⚽ PANEL DEL JUGADOR'}

            </span>

            <h1>

              ¡Hola, {usuario.nombre}!

            </h1>

            <p>

              Bienvenido nuevamente a GoalKeeperNow.
              Desde aquí podrás administrar todas tus actividades dentro de la plataforma.

            </p>

          </div>

          <button
            className="logout-btn"
            onClick={handleLogout}
          >

            Cerrar sesión

          </button>

        </div>

      </section>

      <section className="dashboard-stats">

        <div className="stat-card">

          <div className="stat-icon">🧤</div>

          <h2>12</h2>

          <p>Arqueros disponibles</p>

        </div>

        <div className="stat-card">

          <div className="stat-icon">⭐</div>

          <h2>4.9</h2>

          <p>Calificación promedio</p>

        </div>

        <div className="stat-card">

          <div className="stat-icon">📅</div>

          <h2>8</h2>

          <p>Reservas realizadas</p>

        </div>

        <div className="stat-card">

          <div className="stat-icon">🏆</div>

          <h2>100%</h2>

          <p>Experiencia segura</p>

        </div>

      </section>
<section className="dashboard-section-title">

    <span>

        ⚡ ACCESOS RÁPIDOS

    </span>

    <h2>

        Todo lo que necesitas está aquí

    </h2>

    <p>

        Accede rápidamente a las funciones principales de GoalKeeperNow y administra tu actividad de forma sencilla.

    </p>

</section>
      <main className="dashboard-main">

        {

          usuario.tipo === 'jugador' &&

          <>

            <div className="card">

              <div className="card-icon">

                🧤

              </div>

              <h2>

                Buscar Arquero

              </h2>

              <p>

                Encuentra rápidamente un arquero disponible para tu próximo partido.

              </p>

              <button

                className="card-link"

                onClick={() => onNavigate('porteros')}

              >

                Buscar ahora

              </button>

            </div>

            <div className="card">

              <div className="card-icon">

                🛒

              </div>

              <h2>

                Tienda

              </h2>

              <p>

                Compra guantes, uniformes y accesorios para mejorar tu rendimiento.

              </p>

              <button

                className="card-link"

                onClick={() => onNavigate('tienda')}

              >

                Ir a la tienda

              </button>

            </div>

            <div className="card">

              <div className="card-icon">

                📋

              </div>

              <h2>

                Mis Solicitudes

              </h2>

              <p>

                Consulta el estado de todas las solicitudes realizadas.

              </p>

              <button

                className="card-link"

                onClick={() => onNavigate('solicitudes')}

              >

                Ver solicitudes

              </button>

            </div>

            <div className="card">

              <div className="card-icon">

                👤

              </div>

              <h2>

                Mi Perfil

              </h2>

              <p>

                Actualiza tus datos personales y consulta tu información.

              </p>

              <button

                className="card-link"

                onClick={() => onNavigate('perfil')}

              >

                Ver perfil

              </button>

            </div>

          </>

        }

        {

          usuario.tipo === 'portero' &&

          <>

            <div className="card">

              <div className="card-icon">

                📥

              </div>

              <h2>

                Solicitudes

              </h2>

              <p>

                Revisa las solicitudes enviadas por los jugadores.

              </p>

              <button

                className="card-link"

                onClick={() => onNavigate('solicitudes')}

              >

                Ver solicitudes

              </button>

            </div>

            <div className="card">

              <div className="card-icon">

                📅

              </div>

              <h2>

                Disponibilidad

              </h2>

              <p>

                Configura tus horarios disponibles para jugar.

              </p>

              <button

                className="card-link"

                onClick={() => onNavigate('disponibilidad')}

              >

                Configurar

              </button>

            </div>

            <div className="card">

              <div className="card-icon">

                🛒

              </div>

              <h2>

                Tienda

              </h2>

              <p>

                Equípate con productos de alto rendimiento para arqueros.

              </p>

              <button

                className="card-link"

                onClick={() => onNavigate('tienda')}

              >

                Comprar

              </button>

            </div>

            <div className="card">

              <div className="card-icon">

                ⭐

              </div>

              <h2>

                Mi Perfil

              </h2>

              <p>

                Consulta tus estadísticas y la calificación recibida.

              </p>

              <button

                className="card-link"

                onClick={() => onNavigate('perfil')}

              >

                Ver perfil

              </button>

            </div>

          </>

        }

      </main>

    </div>

  )

}

export default DashboardPage