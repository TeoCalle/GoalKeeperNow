import { useState } from 'react'
import { login, register } from '../services/apiService'
import { FaEye, FaEyeSlash, FaArrowLeft } from 'react-icons/fa'
import OfficialLogo from '../components/OfficialLogo'

function AuthPage({ onNavigate, initialFocus = 'login' }) {
  // Estado para Iniciar Sesión
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    rememberMe: false
  })
  const [showLoginPassword, setShowLoginPassword] = useState(false)
  const [loginError, setLoginError] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)

  // Estado para Registrarse
  const [registerData, setRegisterData] = useState({
    nombre: '',
    email: '',
    password: '',
    tipo: 'jugador'
  })
  const [showRegisterPassword, setShowRegisterPassword] = useState(false)
  const [registerError, setRegisterError] = useState('')
  const [registerSuccess, setRegisterSuccess] = useState('')
  const [registerLoading, setRegisterLoading] = useState(false)

  // Tarjeta enfocada actualmente
  const [activeCard, setActiveCard] = useState(initialFocus)

  // Handlers para Iniciar Sesión
  function handleLoginChange(e) {
    const { name, value, type, checked } = e.target
    setLoginData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  async function handleLoginSubmit(e) {
    e.preventDefault()
    setLoginLoading(true)
    setLoginError('')

    try {
      const result = await login({
        email: loginData.email,
        password: loginData.password
      })

      localStorage.setItem('token', result.token)
      localStorage.setItem('usuario', JSON.stringify(result.user))

      onNavigate(result.user.tipo === 'admin' ? 'admin' : 'dashboard')
    } catch (err) {
      setLoginError(err.response?.data?.error || 'Error al iniciar sesión. Revisa tus datos e intenta de nuevo.')
    } finally {
      setLoginLoading(false)
    }
  }

  // Handlers para Registro
  function handleRegisterChange(e) {
    const { name, value } = e.target
    setRegisterData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  async function handleRegisterSubmit(e) {
    e.preventDefault()
    if (!registerData.tipo) {
      setRegisterError('Selecciona si vas a contratar arquero o a ofrecer tus servicios.')
      return
    }
    setRegisterLoading(true)
    setRegisterError('')
    setRegisterSuccess('')

    try {
      await register({ ...registerData, latitud: 0, longitud: 0 })
      setRegisterSuccess('¡Registro exitoso! Ya puedes iniciar sesión con tu cuenta.')
      setRegisterData({ nombre: '', email: '', password: '', tipo: 'jugador' })
      setActiveCard('login')
    } catch (err) {
      setRegisterError(err.response?.data?.error || 'Error al completar el registro. Verifica los datos ingresados.')
    } finally {
      setRegisterLoading(false)
    }
  }

  return (
    <div className="auth-page-wrapper">
      {/* Barra superior con navegación y marca oficial */}
      <div className="auth-header-bar">
        <button className="auth-back-btn" onClick={() => onNavigate('home')}>
          <FaArrowLeft /> Volver al inicio
        </button>

        <div style={{ cursor: 'pointer' }} onClick={() => onNavigate('home')}>
          <OfficialLogo height={52} showText={true} />
        </div>

        <div style={{ width: '130px' }}></div>
      </div>

      {/* Grid principal con las dos tarjetas paralelas */}
      <div className="auth-main-container">
        <div className="auth-grid">

          {/* TARJETA 1: INICIAR SESIÓN */}
          <div 
            className={`auth-card ${activeCard === 'login' ? 'focused' : ''}`}
            onClick={() => setActiveCard('login')}
          >
            <h2 className="auth-card-title">Iniciar Sesión</h2>

            {loginError && <div className="auth-error-banner">{loginError}</div>}
            {registerSuccess && activeCard === 'login' && (
              <div className="auth-success-banner">{registerSuccess}</div>
            )}

            <form onSubmit={handleLoginSubmit}>
              <div className="auth-form-group">
                <label className="auth-label">
                  Correo electrónico o usuario <span className="required">*</span>
                </label>
                <div className="auth-input-wrapper">
                  <input
                    type="email"
                    name="email"
                    className="auth-input"
                    placeholder="correo@ejemplo.com"
                    value={loginData.email}
                    onChange={handleLoginChange}
                    required
                  />
                </div>
              </div>

              <div className="auth-form-group">
                <label className="auth-label">
                  Contraseña <span className="required">*</span>
                </label>
                <div className="auth-input-wrapper">
                  <input
                    type={showLoginPassword ? 'text' : 'password'}
                    name="password"
                    className="auth-input"
                    placeholder="••••••••"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    required
                  />
                  <button
                    type="button"
                    className="auth-toggle-pwd"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    tabIndex="-1"
                  >
                    {showLoginPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div className="auth-action-row">
                <button type="submit" className="auth-btn-primary" disabled={loginLoading}>
                  {loginLoading ? 'Ingresando...' : 'Iniciar Sesión'}
                </button>
                <label className="auth-checkbox-label">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={loginData.rememberMe}
                    onChange={handleLoginChange}
                  />
                  Recuérdame
                </label>
              </div>

              <div>
                <a 
                  className="auth-link" 
                  onClick={() => alert('Para restablecer tu contraseña, contáctanos a soporte@goalkeepernow.com')}
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            </form>
          </div>

          {/* TARJETA 2: REGISTRARSE */}
          <div 
            className={`auth-card ${activeCard === 'registro' ? 'focused' : ''}`}
            onClick={() => setActiveCard('registro')}
          >
            <h2 className="auth-card-title">Registrarse</h2>

            {registerError && <div className="auth-error-banner">{registerError}</div>}

            <form onSubmit={handleRegisterSubmit}>
              <div className="auth-form-group">
                <label className="auth-label">
                  Nombre completo <span className="required">*</span>
                </label>
                <div className="auth-input-wrapper">
                  <input
                    type="text"
                    name="nombre"
                    className="auth-input"
                    placeholder="Tu nombre completo"
                    value={registerData.nombre}
                    onChange={handleRegisterChange}
                    required
                  />
                </div>
              </div>

              <div className="auth-form-group">
                <label className="auth-label">
                  Correo electrónico <span className="required">*</span>
                </label>
                <div className="auth-input-wrapper">
                  <input
                    type="email"
                    name="email"
                    className="auth-input"
                    placeholder="tucorreo@ejemplo.com"
                    value={registerData.email}
                    onChange={handleRegisterChange}
                    required
                  />
                </div>
              </div>

              <div className="auth-form-group">
                <label className="auth-label">
                  Contraseña <span className="required">*</span>
                </label>
                <div className="auth-input-wrapper">
                  <input
                    type={showRegisterPassword ? 'text' : 'password'}
                    name="password"
                    className="auth-input"
                    placeholder="••••••••"
                    value={registerData.password}
                    onChange={handleRegisterChange}
                    required
                  />
                  <button
                    type="button"
                    className="auth-toggle-pwd"
                    onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                    tabIndex="-1"
                  >
                    {showRegisterPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div className="auth-form-group">
                <label className="auth-label">¿Qué deseas hacer?</label>
                <div className="auth-role-selector">
                  <div
                    className={`auth-role-card ${registerData.tipo === 'jugador' ? 'active' : ''}`}
                    onClick={() => setRegisterData(prev => ({ ...prev, tipo: 'jugador' }))}
                  >
                    <span className="auth-role-icon">⚽</span>
                    <span>Quiero contratar arquero</span>
                  </div>
                  <div
                    className={`auth-role-card ${registerData.tipo === 'portero' ? 'active' : ''}`}
                    onClick={() => setRegisterData(prev => ({ ...prev, tipo: 'portero' }))}
                  >
                    <span className="auth-role-icon">🧤</span>
                    <span>Soy arquero, ofrezco servicio</span>
                  </div>
                </div>
              </div>

              <p className="auth-info-text">
                Tus datos personales se utilizarán para procesar tu registro, mejorar tu experiencia en esta web, 
                gestionar el acceso a tu cuenta y otros propósitos descritos en nuestra {' '}
                <a onClick={(e) => { e.preventDefault(); onNavigate('privacy'); }} href="#privacy">
                  política de privacidad
                </a>.
              </p>

              <div className="auth-action-row" style={{ marginTop: '20px' }}>
                <button type="submit" className="auth-btn-primary" disabled={registerLoading}>
                  {registerLoading ? 'Registrando...' : 'Registrarse'}
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  )
}

export default AuthPage
