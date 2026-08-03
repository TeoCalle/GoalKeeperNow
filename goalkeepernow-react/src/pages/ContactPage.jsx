import { useState } from 'react'

function ContactPage({ onNavigate }) {

  const [form, setForm] = useState({
    nombre: '',
    correo: '',
    asunto: '',
    mensaje: ''
  })

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  function handleSubmit(e) {
    e.preventDefault()

    alert("¡Gracias por contactarnos! Hemos recibido tu mensaje.")

    setForm({
      nombre: '',
      correo: '',
      asunto: '',
      mensaje: ''
    })
  }

  return (

    <div className="privacy-container">

      <div className="privacy-card">

        <h1>Contáctanos</h1>

        <p className="privacy-date">

          Estamos aquí para ayudarte.

        </p>

        <section>

          <h2>Información de contacto</h2>

          <p><strong>📍 Dirección:</strong> Medellín, Antioquia, Colombia</p>

          <p><strong>📧 Correo:</strong> soporte@goalkeepernow.com</p>

          <p><strong>📞 Teléfono:</strong> +57 300 123 4567</p>

          <p><strong>🕒 Horario:</strong> Lunes a Viernes - 8:00 AM a 6:00 PM</p>

        </section>

        <section>

          <h2>Envíanos un mensaje</h2>

          <form
            className="contact-form"
            onSubmit={handleSubmit}
          >

            <input
              type="text"
              name="nombre"
              placeholder="Nombre completo"
              value={form.nombre}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="correo"
              placeholder="Correo electrónico"
              value={form.correo}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="asunto"
              placeholder="Asunto"
              value={form.asunto}
              onChange={handleChange}
              required
            />

            <textarea
              name="mensaje"
              placeholder="Escribe tu mensaje..."
              rows="6"
              value={form.mensaje}
              onChange={handleChange}
              required
            />

            <button
              className="privacy-button"
              type="submit"
            >
              Enviar mensaje
            </button>

          </form>

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

export default ContactPage