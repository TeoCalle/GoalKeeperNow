import Navbar from '../components/Navbar'


function PorteroPerfilPage({ onNavigate }) {
    const portero = JSON.parse(
  localStorage.getItem('porteroSeleccionado') || '{}'
)

    return (

        <div className="dashboard-container">

            <Navbar
                onNavigate={onNavigate}
                paginaActiva="porteros"
            />

            <div className="page-shell">

                <div className="goalkeeper-profile">

                    <div className="goalkeeper-header">

                        <img
                            className="goalkeeper-photo"
                            src="https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=600"
                            alt="Arquero"
                        />

                        <h1>{portero.nombre || 'Arquero Profesional'}</h1>

                        <p className="goalkeeper-city">
                        📍 Medellín, Antioquia
                        </p>

                        <span className="goalkeeper-status">
                        🟢 Disponible
                        </span>

                            <div className="goalkeeper-rating-big">
                            ⭐⭐⭐⭐⭐ <strong>4.9</strong>
                            </div>

    <div className="goalkeeper-price-big">

        {
            portero.precio
                ? `$${Number(portero.precio).toLocaleString('es-CO')}`
                : '$80.000'
        }

        <span> / Partido</span>

    </div>


                    </div>
                        <h2 style={{ marginTop: '40px', marginBottom: '20px' }}>
                        📊 Estadísticas del arquero
                        </h2>
                    <div className="goalkeeper-info-grid">

                        <div className="goalkeeper-info-card">

                            <h3>

                                🧤 Nivel

                            </h3>

                            {portero.nivel || 'Profesional'}

                        </div>

                        <div className="goalkeeper-info-card">

                            <h3>

                                🏆 Experiencia

                            </h3>

                            <p>

                                8 años

                            </p>

                        </div>

                        <div className="goalkeeper-info-card">

                            <h3>

                                ⚽ Partidos

                            </h3>

                            <p>

                                326

                            </p>

                        </div>

                        <div className="goalkeeper-info-card">

                            <h3>

                                💰 Precio

                            </h3>

                            {
                                portero.precio
                                ? `$${Number(portero.precio).toLocaleString('es-CO')}`
                                : '$80.000'
                            }

                        </div>

                    </div>

                    <div className="goalkeeper-about">

                        <h2>

                            Sobre el arquero

                        </h2>

                        {
                            portero.descripcion ||
                            'Arquero con amplia experiencia en partidos recreativos y competitivos.'
                        }

                    </div>

                    <div className="goalkeeper-skills">

    <h2>⚡ Habilidades</h2>

    <div className="skill">

        <span>Reflejos</span>

        <div className="skill-bar">

            <div
                className="skill-fill"
                style={{ width: '95%' }}
            ></div>

        </div>

        <strong>95%</strong>

    </div>

    <div className="skill">

        <span>Juego aéreo</span>

        <div className="skill-bar">

            <div
                className="skill-fill"
                style={{ width: '90%' }}
            ></div>

        </div>

        <strong>90%</strong>

    </div>

    <div className="skill">

        <span>Liderazgo</span>

        <div className="skill-bar">

            <div
                className="skill-fill"
                style={{ width: '85%' }}
            ></div>

        </div>

        <strong>85%</strong>

    </div>

    <div className="skill">

        <span>Saque</span>

        <div className="skill-bar">

            <div
                className="skill-fill"
                style={{ width: '92%' }}
            ></div>

        </div>

        <strong>92%</strong>

    </div>

</div>

                    <div className="goalkeeper-buttons">

                        <button
                            className="buy-btn"
                        >

                            Reservar ahora

                        </button>

                        <button
                            className="favorite-btn"
                            onClick={() => onNavigate('porteros')}
                        >

                            ←

                        </button>

                    </div>

                </div>

            </div>

        </div>

    )

}

export default PorteroPerfilPage