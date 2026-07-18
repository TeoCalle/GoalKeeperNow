import { useState } from 'react'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import PorterosPage from './pages/PorterosPage'
import PerfilPorteroPage from './pages/PerfilPorteroPage'
import HomePage from './pages/HomePage'
import TiendaPage from './pages/TiendaPage'
import PerfilPage from './pages/PerfilPage'
import SolicitudesPage from './pages/SolicitudesPage'
import DisponibilidadPage from './pages/DisponibilidadPage'
import CarritoPage from './pages/CarritoPage'
import EntrenadoresPage from './pages/EntrenadoresPage'
import CanchasPage from './pages/CanchasPage'
import AdminDashboardPage from './pages/AdminDashboardPage'
import AdminUsuariosPage from './pages/AdminUsuariosPage'
import AdminProductosPage from './pages/AdminProductosPage'
import AdminEntrenadoresPage from './pages/AdminEntrenadoresPage'
import AdminCanchasPage from './pages/AdminCanchasPage'

function paginaInicial() {
  const token = localStorage.getItem('token')
  if (!token) return 'home'
  const usuario = JSON.parse(localStorage.getItem('usuario') || '{}')
  return usuario.tipo === 'admin' ? 'admin' : 'dashboard'
}

function App() {
  const [pagina, setPagina] = useState(paginaInicial())
  const [porteroSeleccionado, setPorteroSeleccionado] = useState(null)

  function navigate(destino) {
    setPagina(destino)
    window.scrollTo(0, 0)
  }
  function verPerfilPortero(id) {
  setPorteroSeleccionado(id)
  navigate('perfil-portero')
  }

  return (
    <>
      {pagina === 'home' && <HomePage onNavigate={navigate} />}
      {pagina === 'login' && <LoginPage onNavigate={navigate} />}
      {pagina === 'registro' && <RegisterPage onNavigate={navigate} />}
      {pagina === 'dashboard' && <DashboardPage onNavigate={navigate} />}
      {pagina === 'porteros' && <PorterosPage onNavigate={navigate} onVerPerfil={verPerfilPortero} />}
      {pagina === 'perfil-portero' && <PerfilPorteroPage porteroId={porteroSeleccionado} onNavigate={navigate} />}
      {pagina === 'tienda' && <TiendaPage onNavigate={navigate} />}
      {pagina === 'perfil' && <PerfilPage onNavigate={navigate} />}
      {pagina === 'solicitudes' && <SolicitudesPage onNavigate={navigate} />}
      {pagina === 'disponibilidad' && <DisponibilidadPage onNavigate={navigate} />}
      {pagina === 'carrito' && <CarritoPage onNavigate={navigate} />}
      {pagina === 'entrenadores' && <EntrenadoresPage onNavigate={navigate} />}
      {pagina === 'canchas' && <CanchasPage onNavigate={navigate} />}
      {pagina === 'admin' && <AdminDashboardPage onNavigate={navigate} />}
      {pagina === 'admin-usuarios' && <AdminUsuariosPage onNavigate={navigate} />}
      {pagina === 'admin-productos' && <AdminProductosPage onNavigate={navigate} />}
      {pagina === 'admin-entrenadores' && <AdminEntrenadoresPage onNavigate={navigate} />}
      {pagina === 'admin-canchas' && <AdminCanchasPage onNavigate={navigate} />}
    </>
  )
}

export default App
