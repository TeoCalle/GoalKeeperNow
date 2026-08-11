function PrivacyPolicyPage({ onNavigate }) {
  return (
    <div className="privacy-container">

      <div className="privacy-card">

        <h1>Política de Privacidad</h1>

        <p className="privacy-date">
          Última actualización: 28 de julio de 2026
        </p>

        <section>

          <h2>1. Introducción</h2>

          <p>
            En <strong>GoalKeeperNow</strong> respetamos la privacidad de nuestros
            usuarios. Esta política explica cómo recopilamos, utilizamos y protegemos
            la información personal de quienes utilizan nuestra plataforma para
            contratar o prestar servicios como arquero.
          </p>

        </section>

        <section>

          <h2>2. Información que recopilamos</h2>

          <ul>
            <li>Nombre completo.</li>
            <li>Correo electrónico.</li>
            <li>Número de teléfono.</li>
            <li>Ubicación (si el usuario la autoriza).</li>
            <li>Información del perfil.</li>
            <li>Historial de reservas.</li>
            <li>Calificaciones y comentarios.</li>
          </ul>

        </section>

        <section>

          <h2>3. Uso de la información</h2>

          <p>La información recopilada se utiliza para:</p>

          <ul>
            <li>Gestionar reservas.</li>
            <li>Facilitar la comunicación entre usuarios.</li>
            <li>Mejorar la experiencia dentro de la plataforma.</li>
            <li>Brindar soporte cuando sea necesario.</li>
            <li>Garantizar la seguridad de las cuentas.</li>
          </ul>

        </section>

        <section>

          <h2>4. Seguridad</h2>

          <p>
            GoalKeeperNow implementa medidas de seguridad para proteger los datos
            personales contra accesos no autorizados, pérdidas o modificaciones.
          </p>

        </section>

        <section>

          <h2>5. Derechos del usuario</h2>

          <ul>
            <li>Consultar su información.</li>
            <li>Actualizar sus datos.</li>
            <li>Solicitar la eliminación de su cuenta.</li>
            <li>Solicitar correcciones.</li>
          </ul>

        </section>

        <section>

          <h2>6. Contacto</h2>

          <p>

            Si tienes dudas sobre esta política puedes comunicarte con nosotros mediante el correo:

          </p>

          <p>

            <strong>soporte@goalkeepernow.com</strong>

          </p>

        </section>

        <button
          className="privacy-button"
          onClick={() => onNavigate("home")}
        >
          Volver al inicio
        </button>

      </div>

    </div>
  )
}

export default PrivacyPolicyPage