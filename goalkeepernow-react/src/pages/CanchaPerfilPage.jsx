import Navbar from "../components/Navbar";

function CanchaPerfilPage({ onNavigate }) {

    const cancha = JSON.parse(
        localStorage.getItem("canchaSeleccionada") || "{}"
    );

    return (

        <div className="dashboard-container">

            <Navbar
                onNavigate={onNavigate}
                paginaActiva="canchas"
            />

            <div
                className="field-profile-hero"
                style={{
                    backgroundImage: `linear-gradient(rgba(8,25,45,.70),rgba(8,25,45,.70)), url(${cancha.foto_url || "https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=1600"})`
                }}
            >

                <div className="field-profile-overlay">

                    <span className="coach-badge">

                        🏟️ CANCHA VERIFICADA

                    </span>

                    <h1>

                        {cancha.nombre}

                    </h1>

                    <p>

                        {cancha.descripcion}

                    </p>

                </div>

            </div>

            <div className="page-shell">

                <div className="field-profile-grid">

                    <div className="field-profile-info">

                        <h2>Información</h2>

                        <p>📍 {cancha.direccion}</p>

                        <p>🏙️ {cancha.ciudad}</p>

                        <p>⚽ {cancha.tipo}</p>

                        <p>

                            💰

                            {Number(cancha.precio_hora).toLocaleString("es-CO")}

                            / hora

                        </p>

                    </div>

                    <div className="field-profile-services">

                        <h2>Servicios incluidos</h2>

                        <ul>

                            <li>💡 Iluminación LED</li>

                            <li>🚗 Parqueadero</li>

                            <li>🚿 Vestidores</li>

                            <li>🚻 Baños</li>

                            <li>🥤 Cafetería</li>

                            <li>📹 Seguridad</li>

                        </ul>

                    </div>

                </div>

                <div
                    style={{
                        marginTop:40,
                        textAlign:'center'
                    }}
                >
                    <div className="field-gallery">

    <h2>Galería de la cancha</h2>

    <div className="field-gallery-grid">

        <img
            src="https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=1200"
            alt="Cancha 1"
        />

        <img
            src="https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=1200"
            alt="Cancha 2"
        />

        <img
            src="https://images.unsplash.com/photo-1486286701208-1d58e9338013?w=1200"
            alt="Cancha 3"
        />

    </div>

</div>

<div className="field-reviews">

    <h2>

        ⭐ Opiniones de jugadores

    </h2>

    <div className="field-reviews-grid">

        <div className="field-review-card">

            <h3>⭐⭐⭐⭐⭐</h3>

            <p>

                Excelente cancha. El césped está en muy buen estado y la iluminación es perfecta para jugar de noche.

            </p>

            <strong>

                — Juan Pérez

            </strong>

        </div>

        <div className="field-review-card">

            <h3>⭐⭐⭐⭐⭐</h3>

            <p>

                Muy organizada, fácil de reservar y con parqueadero. Sin duda volveré.

            </p>

            <strong>

                — Andrés Gómez

            </strong>

        </div>

        <div className="field-review-card">

            <h3>⭐⭐⭐⭐⭐</h3>

            <p>

                Excelente ambiente y muy buenas instalaciones. Totalmente recomendada.

            </p>

            <strong>

                — Laura Ramírez

            </strong>

        </div>

    </div>

</div>

<div className="field-location">

    <h2>

        📍 Ubicación

    </h2>

    <div className="field-location-card">

        <img
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200"
            alt="Ubicación de la cancha"
        />

        <div className="field-location-info">

            <h3>

                {cancha.nombre}

            </h3>

            <p>

                📍 {cancha.direccion}

            </p>

            <p>

                🏙️ {cancha.ciudad}

            </p>

            <button className="btn-dorado">

                📍 Cómo llegar

            </button>

        </div>

    </div>

</div>

<div className="field-cta">

    <span className="field-cta-badge">

        ⚽ EXPERIENCIA GOALKEEPERNOW

    </span>

    <h2>

        Vive el fútbol sin complicaciones

    </h2>

    <p>

        En GoalKeeperNow podrás encontrar canchas de calidad, reservar en pocos minutos y disfrutar de instalaciones preparadas para que solo te preocupes por jugar. Seguimos trabajando para ofrecer más escenarios, mejores servicios y una experiencia cada vez más completa para todos los futbolistas.

    </p>

</div>
                    <div className="field-reserve">

                        <button className="coach-btn-primary">

                        ⚽ Reservar esta cancha

                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default CanchaPerfilPage;