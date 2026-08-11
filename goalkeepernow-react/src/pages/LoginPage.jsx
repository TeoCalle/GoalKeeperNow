import { useState } from 'react'
import { login } from '../services/apiService'

function LoginPage({ onNavigate }) {
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()

    setLoading(true)
    setError('')

    try {
      const result = await login(form)

      localStorage.setItem('token', result.token)
      localStorage.setItem('usuario', JSON.stringify(result.user))

      onNavigate(
        result.user.tipo === 'admin'
          ? 'admin'
          : 'dashboard'
      )

    } catch (err) {
      setError(
        err.response?.data?.error ||
        'Error al iniciar sesión'
      )
    } finally {
      setLoading(false)
    }
  }

  return (

<div className="login-container">

<div className="login-aside">

<div className="fondo-luz"></div>

<div className="logo-mark">

🥅

</div>

<h1>GoalKeeperNow</h1>

<h2>Tu arquero siempre disponible.</h2>

<p>

Encuentra arqueros confiables para cualquier partido,
o conviértete en uno de ellos y comienza a recibir
solicitudes cerca de ti.

</p>

<div className="estadisticas">

<div>

<h3>+500</h3>

<span>Arqueros</span>

</div>

<div>

<h3>+1200</h3>

<span>Partidos</span>

</div>

<div>

<h3>⭐4.9</h3>

<span>Calificación</span>

</div>

</div>

</div>

<div className="login-form-side">

<div className="login-box">

<h1>Iniciar sesión</h1>

<p>

Bienvenido nuevamente 👋

</p>

{error && (

<div className="error-msg">

{error}

</div>

)}

<form onSubmit={handleSubmit}>

<label className="campo-label">

Correo electrónico

</label>

<input

type="email"

name="email"

placeholder="correo@ejemplo.com"

value={form.email}

onChange={handleChange}

required

/>

<label className="campo-label">

Contraseña

</label>

<input

type="password"

name="password"

placeholder="********"

value={form.password}

onChange={handleChange}

required

/>

<button

type="submit"

disabled={loading}

>

{loading

? "Ingresando..."

: "Entrar"}

</button>

</form>

<div className="login-links">

<a

className="link-secundario"

onClick={() => onNavigate("registro")}

>

Crear una cuenta

</a>

<a

className="link-secundario volver"

onClick={() => onNavigate("home")}

>

← Volver al inicio

</a>

</div>

</div>

</div>

</div>

  )
}

export default LoginPage