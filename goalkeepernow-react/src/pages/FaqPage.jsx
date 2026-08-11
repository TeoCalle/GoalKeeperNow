import { useState } from 'react'

function FaqPage({ onNavigate }) {

  const [abierta, setAbierta] = useState(null)

  const preguntas = [

    {
      pregunta: "¿Cómo puedo contratar un arquero?",
      respuesta:
        "Ingresa a la sección Porteros, selecciona el arquero que mejor se adapte a tus necesidades y realiza la reserva."
    },

    {
      pregunta: "¿Cómo me registro como arquero?",
      respuesta:
        "Crea una cuenta y durante el registro selecciona la opción 'Soy arquero'. Luego podrás completar tu perfil."
    },

    {
      pregunta: "¿Qué pasa si debo cancelar una reserva?",
      respuesta:
        "Puedes cancelar la reserva desde tu perfil. Se recomienda hacerlo con suficiente anticipación."
    },

    {
      pregunta: "¿Cómo califico un arquero?",
      respuesta:
        "Después de finalizar el servicio podrás dejar una calificación y un comentario sobre la experiencia."
    },

    {
      pregunta: "¿GoalKeeperNow cobra comisión?",
      respuesta:
        "Dependiendo del servicio contratado podrán aplicarse cargos administrativos previamente informados al usuario."
    },

    {
      pregunta: "¿Mis datos personales están protegidos?",
      respuesta:
        "Sí. GoalKeeperNow protege la información de sus usuarios siguiendo su Política de Privacidad."
    }

  ]

  function abrir(index) {

    if (abierta === index) {

      setAbierta(null)

    } else {

      setAbierta(index)

    }

  }

  return (

    <div className="privacy-container">

      <div className="privacy-card">

        <h1>Preguntas Frecuentes</h1>

        <p className="privacy-date">

          Resolvemos las dudas más comunes de nuestros usuarios.

        </p>

        {

          preguntas.map((item, index) => (

            <div
              className="faq-item"
              key={index}
            >

              <button
                className="faq-question"
                onClick={() => abrir(index)}
              >

                <span>{item.pregunta}</span>

                <span>

                  {abierta === index ? "−" : "+"}

                </span>

              </button>

              {

                abierta === index && (

                  <div className="faq-answer">

                    {item.respuesta}

                  </div>

                )

              }

            </div>

          ))

        }

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

export default FaqPage