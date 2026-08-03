function TermsPage({ onNavigate }) {
  return (
    <div className="privacy-container">

      <div className="privacy-card">

        <h1>Términos y Condiciones</h1>

        <p className="privacy-date">
          Última actualización: 28 de julio de 2026
        </p>

        <section>
          <h2>1. Aceptación de los términos</h2>

          <p>
            Al registrarse y utilizar GoalKeeperNow, el usuario acepta cumplir
            estos Términos y Condiciones. Si no está de acuerdo con alguna de
            las disposiciones aquí establecidas, deberá abstenerse de utilizar
            la plataforma.
          </p>
        </section>

        <section>

          <h2>2. Objeto de la plataforma</h2>

          <p>
            GoalKeeperNow es una plataforma que conecta jugadores o equipos que
            necesitan contratar un arquero con porteros que ofrecen sus
            servicios deportivos.
          </p>

        </section>

        <section>

          <h2>3. Responsabilidades del cliente</h2>

          <ul>
            <li>Brindar información verídica al momento del registro.</li>
            <li>Indicar correctamente la ubicación del partido.</li>
            <li>Realizar las reservas con responsabilidad.</li>
            <li>Respetar al arquero contratado.</li>
            <li>Cancelar oportunamente cuando sea necesario.</li>
          </ul>

        </section>

        <section>

          <h2>4. Responsabilidades del portero</h2>

          <ul>
            <li>Presentarse puntualmente al partido.</li>
            <li>Mantener actualizada su disponibilidad.</li>
            <li>Prestar el servicio con respeto y profesionalismo.</li>
            <li>Informar cualquier inconveniente con anticipación.</li>
          </ul>

        </section>

        <section>

          <h2>5. Reservas y cancelaciones</h2>

          <p>
            Las reservas realizadas mediante GoalKeeperNow podrán ser
            canceladas por cualquiera de las partes. Se recomienda hacerlo con
            suficiente anticipación para evitar afectar la experiencia de los
            demás usuarios.
          </p>

        </section>

        <section>

          <h2>6. Calificaciones</h2>

          <p>
            Los usuarios podrán calificar el servicio recibido siempre con
            respeto y objetividad. GoalKeeperNow podrá eliminar comentarios que
            contengan lenguaje ofensivo o información falsa.
          </p>

        </section>

        <section>

          <h2>7. Suspensión de cuentas</h2>

          <p>
            GoalKeeperNow podrá suspender temporal o definitivamente las cuentas
            que incumplan estos términos, proporcionen información falsa o
            afecten la seguridad y el buen funcionamiento de la plataforma.
          </p>

        </section>

        <section>

          <h2>8. Modificaciones</h2>

          <p>
            GoalKeeperNow podrá actualizar estos Términos y Condiciones cuando
            sea necesario. Los cambios serán publicados dentro de la plataforma.
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

export default TermsPage