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
        <div className="section-heading">
          <h2>Mi perfil</h2>
          <span className="ver-todo" onClick={() => onNavigate('dashboard')}>Volver al panel</span>
        </div>

        {error && <p className="error-msg">{error}</p>}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 22 }}>
          <div className="card">
            <div className="card-icon">👤</div>
            <h2>{usuario.nombre || 'Usuario'}</h2>
            <p>
              {usuario.tipo === 'portero' ? 'Arquero' : 'Jugador'} · {usuario.email}<br />
              {usuario.tipo === 'portero' && calificaciones.promedio && (
                <>Calificación promedio: <Estrellas valor={calificaciones.promedio} /> ({calificaciones.promedio}/5, {calificaciones.total} opiniones)</>
              )}
              {usuario.tipo === 'portero' && !calificaciones.promedio && 'Aún no tienes calificaciones.'}
            </p>

            {usuario.tipo === 'portero' && perfilPortero && (
              <form onSubmit={guardarPerfil} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
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
                <button type="submit" disabled={guardando}>{guardando ? 'Guardando...' : 'Guardar cambios'}</button>
              </form>
            )}
          </div>

          <div className="card">
            <div className="card-icon">⭐</div>
            <h2>{usuario.tipo === 'portero' ? 'Opiniones recibidas' : 'Calificaciones'}</h2>
            {usuario.tipo === 'portero' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {calificaciones.opiniones.length === 0 && <p>Aún no tienes opiniones de jugadores.</p>}
                {calificaciones.opiniones.map((op, i) => (
                  <div key={i} style={{ borderBottom: '1px solid var(--linea)', paddingBottom: 10 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <strong style={{ fontSize: '0.88rem', color: 'var(--azul-marino)' }}>{op.jugador_nombre}</strong>
                      <Estrellas valor={op.estrellas} />
                    </div>
                    {op.comentario && <p style={{ fontSize: '0.85rem', color: 'var(--texto-suave)', marginTop: 4 }}>{op.comentario}</p>}
                  </div>
                ))}
              </div>
            ) : (
              <>
                <p>Después de cada partido completado podrás calificar al arquero desde "Mis Solicitudes".</p>
                <button className="card-link" onClick={() => onNavigate('solicitudes')}>Ir a mis solicitudes</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PerfilPage
