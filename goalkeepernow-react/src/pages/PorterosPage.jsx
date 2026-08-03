
import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { getPorteros, crearSolicitud } from '../services/apiService'


function PorterosPage({ onNavigate }) {

  const [porteros, setPorteros] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const usuario = JSON.parse(localStorage.getItem('usuario') || '{}')

  useEffect(() => {

    async function cargar() {

      try {

        const data = await getPorteros()

        setPorteros(data)

      } catch {

        setError('No pudimos conectar con el servidor.')

      } finally {

        setLoading(false)

      }

    }

    cargar()

  }, [])

  async function solicitar(id) {

    try {

      await crearSolicitud({

        usuario_id: usuario.id,

        portero_id: id,

        fecha_partido: new Date().toISOString().split('T')[0]

      })

      alert("Solicitud enviada correctamente.")

    } catch {

      alert("Error al enviar la solicitud.")

    }

  }

  return (

    <div className="dashboard-container">

      <Navbar
        onNavigate={onNavigate}
        paginaActiva="porteros"
      />

      <div className="page-shell">

        <div className="porteros-header">

          <h1>🧤 Arqueros Disponibles</h1>

          <p>

            Encuentra el arquero ideal para tu próximo partido.

          </p>

        </div>

        {loading &&

          <p className="estado-vacio">

            Buscando arqueros...

          </p>

        }

        {error &&

          <p className="error-msg">

            {error}

          </p>

        }

<div className="porteros-grid">

  {porteros.map((portero) => (

    <div
      key={portero.id}
      className="goalkeeper-card"
    >

      <div className="goalkeeper-status">
        🟢 Disponible
      </div>

      <div className="goalkeeper-avatar">
        <img
          src="https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=600"
          alt="Arquero"
        />
      </div>

      <h2>
        {portero.nombre}
      </h2>

      <div className="goalkeeper-rating">
        ⭐⭐⭐⭐⭐
        <span>5.0</span>
      </div>

      <div className="goalkeeper-level">
        {portero.nivel}
      </div>

      <p className="goalkeeper-description">
        {portero.descripcion}
      </p>

      <div className="goalkeeper-price">
        ${Number(portero.precio).toLocaleString('es-CO')}
        <span> / Partido</span>
      </div>

      <div className="goalkeeper-buttons">

        <button
          className="goalkeeper-profile-button"
          onClick={() => {

          localStorage.setItem(
          'porteroSeleccionado',
          JSON.stringify(portero)
          )

          onNavigate('portero-perfil')

          }}
          >
          👁 Ver perfil completo
        </button>

        <button
          className="goalkeeper-button"
          onClick={() => solicitar(portero.id)}
        >
          🧤 Reservar
        </button>

      </div>

    </div>

  ))}

</div>

        </div>

      </div>


  )

}

export default PorterosPage