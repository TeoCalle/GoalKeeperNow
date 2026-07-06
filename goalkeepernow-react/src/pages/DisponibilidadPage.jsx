import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { getMiDisponibilidad, crearDisponibilidad, eliminarDisponibilidad } from '../services/apiService'

const DIAS = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo']

function DisponibilidadPage({ onNavigate }) {
  const [horarios, setHorarios] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ dia_semana: 'lunes', hora_inicio: '18:00', hora_fin: '20:00', zona: '' })
  const [guardando, setGuardando] = useState(false)

  async function cargar() {
    setLoading(true)
    try {
      const data = await getMiDisponibilidad()
      setHorarios(data)
    } catch {
      setError('No pudimos cargar tu disponibilidad. Verifica que el backend esté corriendo y que importaste migracion_3_disponibilidad.sql.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { cargar() }, [])

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function agregarHorario(e) {
    e.preventDefault()
    setGuardando(true)
    setError('')
    try {
      await crearDisponibilidad(form)
      setForm({ ...form, zona: '' })
      cargar()
    } catch (err) {
      setError(err.response?.data?.error || 'No se pudo guardar el horario.')
    } finally {
      setGuardando(false)
    }
  }

  async function borrar(id) {
    try {
      await eliminarDisponibilidad(id)
      cargar()
    } catch {
      alert('No se pudo eliminar el horario.')
    }
  }

  return (
    <div className="dashboard-container">
      <Navbar onNavigate={onNavigate} paginaActiva="disponibilidad" />
      <div className="page-shell">
        <div className="porteros-toolbar">
          <h1 style={{ color: 'var(--azul-marino)', fontSize: '1.6rem' }}>Mi disponibilidad</h1>
          <button className="back-btn" style={{ background: 'var(--azul-cancha)', borderColor: 'var(--azul-cancha)' }} onClick={() => onNavigate('dashboard')}>Volver al panel</button>
        </div>

        {error && <p className="error-msg">{error}</p>}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 22 }}>
          <div className="card">
            <div className="card-icon">🗓️</div>
            <h2>Agregar horario</h2>
            <p>Indica los días y horas en que puedes atajar. Los jugadores verán esto antes de pedirte un partido.</p>
            <form onSubmit={agregarHorario} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <label className="campo-label">Día</label>
              <select name="dia_semana" value={form.dia_semana} onChange={handleChange}>
                {DIAS.map(d => <option key={d} value={d}>{d.charAt(0).toUpperCase() + d.slice(1)}</option>)}
              </select>
              <label className="campo-label">Desde</label>
              <input type="time" name="hora_inicio" value={form.hora_inicio} onChange={handleChange} required />
              <label className="campo-label">Hasta</label>
              <input type="time" name="hora_fin" value={form.hora_fin} onChange={handleChange} required />
              <label className="campo-label">Zona (opcional)</label>
              <input type="text" name="zona" placeholder="Ej: El Poblado, Medellín" value={form.zona} onChange={handleChange} />
              <button type="submit" disabled={guardando}>{guardando ? 'Guardando...' : 'Agregar horario'}</button>
            </form>
          </div>

          <div className="card">
            <div className="card-icon">📋</div>
            <h2>Mis horarios disponibles</h2>
            {loading && <p>Cargando...</p>}
            {!loading && horarios.length === 0 && <p>Aún no has agregado ningún horario.</p>}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {horarios.map(h => (
                <div key={h.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--linea)', paddingBottom: 8 }}>
                  <div>
                    <strong style={{ color: 'var(--azul-marino)', textTransform: 'capitalize' }}>{h.dia_semana}</strong>
                    <span style={{ color: 'var(--texto-suave)', fontSize: '0.85rem' }}> · {h.hora_inicio.slice(0,5)} a {h.hora_fin.slice(0,5)}{h.zona && ` · ${h.zona}`}</span>
                  </div>
                  <button className="card-link" style={{ background: 'var(--peligro)', padding: '6px 12px' }} onClick={() => borrar(h.id)}>Eliminar</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DisponibilidadPage
