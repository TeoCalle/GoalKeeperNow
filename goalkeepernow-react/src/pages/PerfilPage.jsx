import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { getPerfilPortero, actualizarPortero, getMisCalificaciones, getUsuarioActual } from '../services/apiService'

function Estrellas({ valor }) {
  return (
    <span className="estrellas">
      {[1, 2, 3, 4, 5].map(n => <span key={n}>{n <= Math.round(valor) ? '★' : '☆'}</span>)}
    </span>
  )
}

function PerfilPage({ onNavigate }) {
  const usuarioLocal = JSON.parse(localStorage.getItem('usuario') || '{}')
  const [usuario, setUsuario] = useState(usuarioLocal)
  const [perfilPortero, setPerfilPortero] = useState(null)
  const [calificaciones, setCalificaciones] = useState({ promedio: null, total: 0, opiniones: [] })
  const [form, setForm] = useState({ nivel: '', precio: '', descripcion: '' })
  const [guardando, setGuardando] = useState(false)
  const [mensaje, setMensaje] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    async function cargar() {
      try {
        const datosUsuario = await getUsuarioActual()
        setUsuario(datosUsuario)

        if (datosUsuario.tipo === 'portero') {
          const [perfil, califs] = await Promise.all([
            getPerfilPortero(datosUsuario.id),
            getMisCalificaciones(),
          ])
          setPerfilPortero(perfil)
          setForm({ nivel: perfil.nivel || '', precio: perfil.precio || '', descripcion: perfil.descripcion || '' })
          setCalificaciones(califs)
        }
      } catch {
        setError('No pudimos cargar tu perfil. Verifica que el backend esté corriendo.')
      }
    }
    cargar()
  }, [])

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function guardarPerfil(e) {
    e.preventDefault()
    setGuardando(true)
    setMensaje('')
    setError('')
    try {
      await actualizarPortero(perfilPortero.id, {
        nivel: form.nivel,
        precio: Number(form.precio),
        descripcion: form.descripcion,
      })
      setMensaje('Perfil actualizado correctamente.')
    } catch {
      setError('No se pudo actualizar el perfil.')
    } finally {
      setGuardando(false)
    }
  }

  return (
    <div className="dashboard-container">
      <Navbar onNavigate={onNavigate} paginaActiva="perfil" />
      <div className="page-shell">
        <div className="profile-hero">

    <div>

        <span className="profile-badge">

            👤 MI PERFIL

        </span>

        <h1>

            Bienvenido, {usuario.nombre || 'Usuario'}

        </h1>

        <p>

            Administra tu información personal, revisa tus opiniones y mantén actualizado tu perfil dentro de GoalKeeperNow.

        </p>

    </div>

    <div className="profile-avatar-big">

        👤

    </div>

</div>

        {error && <p className="error-msg">{error}</p>}

        <div className="profile-grid">
          <div className="card profile-card">

    <div className="profile-header-card">

        <div className="profile-avatar">

            {(usuario.nombre || 'U')
                .split(' ')
                .map(n => n[0])
                .slice(0,2)
                .join('')}

        </div>

        <h2>

            {usuario.nombre || 'Usuario'}

        </h2>

        <span className="profile-role">

            {usuario.tipo === 'portero'
                ? '🥅 Arquero'
                : '⚽ Jugador'}

        </span>

    </div>

    <div className="profile-info">

        <div>

            <strong>Correo</strong>

            <span>{usuario.email}</span>

        </div>

        <div>

            <strong>Estado</strong>

            <span style={{color:"#16A34A"}}>

                ● Activo

            </span>

        </div>

        {usuario.tipo === 'portero' && (

            <div>

                <strong>Calificación</strong>

                <span>

                    {calificaciones.promedio
                        ? `${calificaciones.promedio} ⭐`
                        : 'Sin calificaciones'}

                </span>

            </div>

        )}

    </div>
            {usuario.tipo === 'portero' && perfilPortero && (
              <form
                onSubmit={guardarPerfil}
                className="profile-form"
              >
                <h3 className="profile-form-title">

                  ⚙ Configuración del perfil

                </h3>
                <label className="campo-label">Nivel</label>
                <select name="nivel" value={form.nivel} onChange={handleChange}>
                  <option value="principiante">Principiante</option>
                  <option value="amateur">Amateur</option>
                  <option value="semi-profesional">Semi-profesional</option>
                  <option value="profesional">Profesional</option>
                </select>
                <label className="campo-label">Precio por partido (COP)</label>
                <input type="number" name="precio" value={form.precio} onChange={handleChange} min="0" step="1000" />
                <label className="campo-label">Descripción</label>
                <input type="text" name="descripcion" value={form.descripcion} onChange={handleChange} placeholder="Disponibilidad, experiencia, zona..." />
                {mensaje && <p style={{ color: 'var(--exito)', fontSize: '0.85rem', marginBottom: 10 }}>{mensaje}</p>}
                <button
                  type="submit"
                  disabled={guardando}
                  className="profile-save-btn"
                >{guardando ? 'Guardando...' : 'Guardar cambios'}</button>
              </form>
            )}
          </div>

          <div className="card profile-review-card">

    <div className="profile-review-header">

        <h2>

            ⭐ Opiniones recibidas

        </h2>

        {usuario.tipo === 'portero' && (

            <div className="profile-review-score">

                <strong>

                    {calificaciones.promedio || 0}

                </strong>

                <span>

                    ★★★★★

                </span>

                <small>

                    {calificaciones.total} opiniones

                </small>

            </div>

        )}

    </div>

    {usuario.tipo === 'portero' ? (

        <div className="profile-review-list">

            {calificaciones.opiniones.length === 0 && (

                <p>Aún no tienes opiniones.</p>

            )}

            {calificaciones.opiniones.map((op, i) => (

                <div
                    key={i}
                    className="profile-review-item"
                >

                    <div className="profile-review-top">

                        <strong>

                            👤 {op.jugador_nombre}

                        </strong>

                        <Estrellas valor={op.estrellas} />

                    </div>

                    {op.comentario && (

                        <p>

                            {op.comentario}

                        </p>

                    )}

                </div>

            ))}

        </div>

    ) : (

        <>

            <p>

                Después de cada partido podrás calificar al arquero.

            </p>

            <button
                className="card-link"
                onClick={() => onNavigate('solicitudes')}
            >

                Ir a mis solicitudes

            </button>

        </>

    )}

</div>
        </div>
      </div>
    </div>
  )
}

export default PerfilPage
