import { useState } from 'react'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import PorterosPage from './pages/PorterosPage'
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
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import TermsPage from './pages/TermsPage'
import ContactPage from './pages/ContactPage'
import FaqPage from './pages/FaqPage'
import PorteroPerfilPage from './pages/PorteroPerfilPage'
import EntrenadorPerfilPage from './pages/EntrenadorPerfilPage'
import CanchaPerfilPage from './pages/CanchaPerfilPage'


function paginaInicial() {
  const token = localStorage.getItem('token')
  if (!token) return 'home'
  const usuario = JSON.parse(localStorage.getItem('usuario') || '{}')
  return usuario.tipo === 'admin' ? 'admin' : 'dashboard'
}

function App() {
  const [pagina, setPagina] = useState(paginaInicial())

  function navigate(destino) {
    setPagina(destino)
    window.scrollTo(0, 0)
  }

  return (
    <>
      {pagina === 'home' && <HomePage onNavigate={navigate} />}
      {pagina === 'login' && <LoginPage onNavigate={navigate} />}
      {pagina === 'registro' && <RegisterPage onNavigate={navigate} />}
      {pagina === 'dashboard' && <DashboardPage onNavigate={navigate} />}
      {pagina === 'porteros' && <PorterosPage onNavigate={navigate} />}
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
      {pagina === 'privacy' && <PrivacyPolicyPage onNavigate={navigate} />}
      {pagina === 'terms' && <TermsPage onNavigate={navigate} />}
      {pagina === 'contact' && <ContactPage onNavigate={navigate} />}
      {pagina === 'faq' && <FaqPage onNavigate={navigate} />}
      {pagina === 'portero-perfil' && <PorteroPerfilPage onNavigate={navigate} />}
      {pagina === 'entrenador-perfil' && <EntrenadorPerfilPage onNavigate={navigate} />}
      {pagina === 'cancha-perfil' && <CanchaPerfilPage onNavigate={navigate} />}
    </>
  )
}

export default App
