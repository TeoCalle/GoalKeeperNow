import Navbar from '../components/Navbar'

function EntrenadorPerfilPage({ onNavigate }) {

    const entrenador = JSON.parse(
        localStorage.getItem('entrenadorSeleccionado') || '{}'
    )

    return (

        <div className="dashboard-container">

            <Navbar
                onNavigate={onNavigate}
                paginaActiva="entrenadores"
            />

            <div className="page-shell">

                <div className="goalkeeper-profile">

                    <div className="goalkeeper-header">

                        <img
                            className="goalkeeper-photo"
                            src={
                                entrenador.foto_url ||
                                "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=900"
                            }
                            alt={entrenador.nombre}
                        />

                        <h1>

                            {entrenador.nombre}

                        </h1>

                        <p className="goalkeeper-city">

                            📍 Medellín

                        </p>

                        <span className="goalkeeper-status">

                            🟢 Disponible

                        </span>

                        <div className="goalkeeper-rating-big">

                            ⭐⭐⭐⭐⭐ <strong>4.9</strong>

                        </div>

                        <div className="goalkeeper-price-big">

                            ${Number(entrenador.precio_hora || 0).toLocaleString('es-CO')}

                            <span> / Hora</span>

                        </div>

                    </div>

                    <h2
                        style={{
                            marginTop:40,
                            marginBottom:20
                        }}
                    >
                        🏆 Información del entrenador
                    </h2>

                    <div className="goalkeeper-info-grid">

                        <div className="goalkeeper-info-card">

                            <h3>

                                🎓 Especialidad

                            </h3>

                            {entrenador.especialidad}

                        </div>

                        <div className="goalkeeper-info-card">

                            <h3>

                                📅 Experiencia

                            </h3>

                            {entrenador.experiencia || '5 años'}

                        </div>

                        <div className="goalkeeper-info-card">

                            <h3>

                                👥 Alumnos

                            </h3>

                            +250

                        </div>

                        <div className="goalkeeper-info-card">

                            <h3>

                                ⭐ Calificación

                            </h3>

                            4.9

                        </div>

                    </div>

                    <div className="goalkeeper-about">

                        <h2>

                            Sobre el entrenador

                        </h2>

                        {entrenador.descripcion}

                    </div>

                    <div className="coach-specialties">

    <h2>

        🏆 Especialidades

    </h2>

    <div className="coach-specialties-grid">

        <div className="coach-specialty">
            ⚽ Técnica de atajadas
        </div>

        <div className="coach-specialty">
            🧤 Posicionamiento
        </div>

        <div className="coach-specialty">
            ⚡ Reflejos
        </div>

        <div className="coach-specialty">
            🥅 Juego aéreo
        </div>

    </div>

</div>

<div className="coach-reviews">

    <h2>

        💬 Opiniones de alumnos

    </h2>

    <div className="coach-review-grid">

        <div className="coach-review-card">

            <h3>⭐⭐⭐⭐⭐</h3>

            <p>
                Excelente entrenador. Mejoré muchísimo mis reflejos y mi seguridad bajo el arco.
            </p>

            <strong>- Juan Pérez</strong>

        </div>

        <div className="coach-review-card">

            <h3>⭐⭐⭐⭐⭐</h3>

            <p>
                Muy paciente y profesional. Explica muy bien cada ejercicio.
            </p>

            <strong>- Andrés Gómez</strong>

        </div>

        <div className="coach-review-card">

            <h3>⭐⭐⭐⭐⭐</h3>

            <p>
                Totalmente recomendado. En pocas semanas noté una gran mejoría.
            </p>

            <strong>- Mateo Rodríguez</strong>

        </div>

    </div>

</div>

<div className="coach-schedule">

    <h2>

        📅 Horarios disponibles

    </h2>

    <div className="coach-schedule-grid">

        <div className="coach-day">
            <strong>Lunes</strong>
            <span>8:00 AM - 5:00 PM</span>
        </div>

        <div className="coach-day">
            <strong>Martes</strong>
            <span>9:00 AM - 6:00 PM</span>
        </div>

        <div className="coach-day unavailable">
            <strong>Miércoles</strong>
            <span>No disponible</span>
        </div>

        <div className="coach-day">
            <strong>Jueves</strong>
            <span>8:00 AM - 4:00 PM</span>
        </div>

        <div className="coach-day">
            <strong>Viernes</strong>
            <span>10:00 AM - 6:00 PM</span>
        </div>

        <div className="coach-day">
            <strong>Sábado</strong>
            <span>8:00 AM - 1:00 PM</span>
        </div>

    </div>

</div>

                    <div className="goalkeeper-buttons">

                        <button className="buy-btn">

                            Reservar entrenamiento

                        </button>

                        <button
                            className="favorite-btn"
                            onClick={() => onNavigate('entrenadores')}
                        >

                            ←

                        </button>

                    </div>

                </div>

            </div>

        </div>

    )

}

export default EntrenadorPerfilPage