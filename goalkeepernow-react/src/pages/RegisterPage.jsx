import { useState } from 'react'
import { register } from '../services/apiService'

function RegisterPage({ onNavigate }) {
  const [form, setForm] = useState({ nombre: '', email: '', password: '', tipo: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function elegirTipo(tipo) {
    setForm({ ...form, tipo })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.tipo) {
      setError('Selecciona si vas a jugar o a atajar')
      return
    }
    setLoading(true)
    setError('')
    try {
      await register({ ...form, latitud: 0, longitud: 0 })
      alert('Registro exitoso. Ahora inicia sesión.')
      onNavigate('login')
    } catch (err) {
      setError(err.response?.data?.error || 'Error al registrar')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-aside">
        <div className="logo-mark" style={{ width: 56, height: 56, fontSize: '1.5rem' }}>A.</div>
        <h1>Únete a Arqueros.co</h1>
        <p>Como jugador, reserva tu arquero en minutos. Como arquero, recibe solicitudes y haz crecer tu reputación con calificaciones.</p>
      </div>
      <div className="login-form-side">
        <div className="login-box">
          <h1>Crear cuenta</h1>
          <p>Empieza en menos de un minuto</p>
          {error && <p className="error-msg">{error}</p>}
          <form onSubmit={handleSubmit}>
            <label className="campo-label">Nombre completo</label>
            <input type="text" name="nombre" placeholder="Tu nombre" value={form.nombre} onChange={handleChange} required />
            <label className="campo-label">Correo electrónico</label>
            <input type="email" name="email" placeholder="tucorreo@gmail.com" value={form.email} onChange={handleChange} required />
            <label className="campo-label">Contraseña</label>
            <input type="password" name="password" placeholder="••••••••" value={form.password} onChange={handleChange} required />

            <label className="campo-label">¿Qué quieres hacer?</label>
            <div className="tipo-selector">
              <div className={`tipo-card ${form.tipo === 'jugador' ? 'activo' : ''}`} onClick={() => elegirTipo('jugador')}>
                <span className="tipo-icon">⚽</span>
                Quiero contratar arquero
              </div>
              <div className={`tipo-card ${form.tipo === 'portero' ? 'activo' : ''}`} onClick={() => elegirTipo('portero')}>
                <span className="tipo-icon">🧤</span>
                Soy arquero, ofrezco mi servicio
              </div>
            </div>

            <button type="submit" disabled={loading}>{loading ? 'Registrando...' : 'Registrarme'}</button>
          </form>
          <a className="link-secundario" onClick={() => onNavigate('login')}>Ya tengo cuenta</a>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
