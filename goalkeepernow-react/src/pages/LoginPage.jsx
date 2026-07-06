import { useState } from 'react'
import { login } from '../services/apiService'

function LoginPage({ onNavigate }) {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const result = await login(form)
      localStorage.setItem('token', result.token)
      localStorage.setItem('usuario', JSON.stringify(result.user))
      onNavigate(result.user.tipo === 'admin' ? 'admin' : 'dashboard')
    } catch (err) {
      setError(err.response?.data?.error || 'Error al iniciar sesión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-aside">
        <div className="logo-mark" style={{ width: 56, height: 56, fontSize: '1.5rem' }}>A.</div>
        <h1>Arqueros.co</h1>
        <p>El servicio de reserva de arqueros para tus partidos, y la tienda con todo lo que un arquero necesita.</p>
      </div>
      <div className="login-form-side">
        <div className="login-box">
          <h1>Iniciar sesión</h1>
          <p>Entra a tu cuenta de Arqueros.co</p>
          {error && <p className="error-msg">{error}</p>}
          <form onSubmit={handleSubmit}>
            <label className="campo-label">Correo electrónico</label>
            <input type="email" name="email" placeholder="tucorreo@gmail.com" value={form.email} onChange={handleChange} required />
            <label className="campo-label">Contraseña</label>
            <input type="password" name="password" placeholder="••••••••" value={form.password} onChange={handleChange} required />
            <button type="submit" disabled={loading}>{loading ? 'Entrando...' : 'Iniciar sesión'}</button>
          </form>
          <a className="link-secundario" onClick={() => onNavigate('registro')}>Crear cuenta nueva</a>
          <a className="link-secundario" onClick={() => onNavigate('home')} style={{ color: 'var(--texto-suave)', fontWeight: 500, fontSize: '0.8rem' }}>← Volver al inicio</a>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
