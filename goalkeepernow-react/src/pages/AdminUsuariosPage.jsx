import { useEffect, useState } from 'react'
import {
  getAdminUsuarios,
  crearUsuarioAdmin,
  actualizarUsuarioAdmin,
  cambiarEstadoUsuarioAdmin,
  eliminarUsuarioAdmin,
} from '../services/apiService'

function AdminUsuariosPage({ onNavigate }) {
  const [usuarios, setUsuarios] = useState([])
  const [busqueda, setBusqueda] = useState('')
  const [error, setError] = useState('')
  const [editando, setEditando] = useState(null) // usuario que se está editando, o null
  const [nuevo, setNuevo] = useState({ nombre: '', email: '', password: '', tipo: 'jugador' })
  const [mostrarNuevo, setMostrarNuevo] = useState(false)

  async function cargar(textoBusqueda = busqueda) {
    try {
      setUsuarios(await getAdminUsuarios(textoBusqueda))
    } catch {
      setError('No pudimos cargar los usuarios.')
    }
  }

  useEffect(() => { cargar() }, [])

  function handleBuscar(e) {
    e.preventDefault()
    cargar(busqueda)
  }

  async function toggleActivo(u) {
    try {
      await cambiarEstadoUsuarioAdmin(u.id, u.activo ? 0 : 1)
      cargar()
    } catch {
      alert('No se pudo cambiar el estado.')
    }
  }

  async function borrar(u) {
    if (!confirm(`¿Eliminar a ${u.nombre}? Esta acción no se puede deshacer.`)) return
    try {
      await eliminarUsuarioAdmin(u.id)
      cargar()
    } catch (err) {
      alert(err.response?.data?.error || 'No se pudo eliminar.')
    }
  }

  async function guardarEdicion(e) {
    e.preventDefault()
    try {
      await actualizarUsuarioAdmin(editando.id, { nombre: editando.nombre, email: editando.email, tipo: editando.tipo })
      setEditando(null)
      cargar()
    } catch {
      alert('No se pudo actualizar.')
    }
  }

  async function crearUsuario(e) {
    e.preventDefault()
    try {
      await crearUsuarioAdmin(nuevo)
      setNuevo({ nombre: '', email: '', password: '', tipo: 'jugador' })
      setMostrarNuevo(false)
      cargar()
    } catch (err) {
      alert(err.response?.data?.error || 'No se pudo crear el usuario.')
    }
  }

  return (
    <div className="dashboard-container">
      <div className="navbar" style={{ background: 'var(--azul-marino)' }}>
        <div className="navbar-top" style={{ padding: '14px 32px' }}>
          <div className="navbar-logo" style={{ color: '#fff' }}>Gestión de usuarios</div>
          <button className="back-btn" onClick={() => onNavigate('admin')}>Volver al panel</button>
        </div>
      </div>

      <div className="page-shell">
        <div className="porteros-toolbar">
          <form onSubmit={handleBuscar} style={{ display: 'flex', gap: 8 }}>
            <input type="text" placeholder="Buscar por nombre o correo..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)}
              style={{ padding: 10, border: '1px solid var(--linea)', borderRadius: 4, width: 280 }} />
            <button className="card-link" type="submit">Buscar</button>
          </form>
          <button className="card-link" onClick={() => setMostrarNuevo(!mostrarNuevo)}>{mostrarNuevo ? 'Cancelar' : '+ Nuevo usuario'}</button>
        </div>

        {error && <p className="error-msg">{error}</p>}

        {mostrarNuevo && (
          <form onSubmit={crearUsuario} className="card" style={{ marginBottom: 22, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, alignItems: 'end' }}>
            <input placeholder="Nombre" value={nuevo.nombre} onChange={(e) => setNuevo({ ...nuevo, nombre: e.target.value })} required style={{ padding: 10, border: '1px solid var(--linea)', borderRadius: 4 }} />
            <input placeholder="Correo" type="email" value={nuevo.email} onChange={(e) => setNuevo({ ...nuevo, email: e.target.value })} required style={{ padding: 10, border: '1px solid var(--linea)', borderRadius: 4 }} />
            <input placeholder="Contraseña" type="password" value={nuevo.password} onChange={(e) => setNuevo({ ...nuevo, password: e.target.value })} required style={{ padding: 10, border: '1px solid var(--linea)', borderRadius: 4 }} />
            <select value={nuevo.tipo} onChange={(e) => setNuevo({ ...nuevo, tipo: e.target.value })} style={{ padding: 10, border: '1px solid var(--linea)', borderRadius: 4 }}>
              <option value="jugador">Jugador</option>
              <option value="portero">Arquero</option>
              <option value="admin">Administrador</option>
            </select>
            <button className="card-link" type="submit" style={{ gridColumn: 'span 4' }}>Crear usuario</button>
          </form>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {usuarios.map(u => (
            <div className="card" key={u.id} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              {editando?.id === u.id ? (
                <form onSubmit={guardarEdicion} style={{ display: 'flex', gap: 8, flex: 1, alignItems: 'center' }}>
                  <input value={editando.nombre} onChange={(e) => setEditando({ ...editando, nombre: e.target.value })} style={{ padding: 8, border: '1px solid var(--linea)', borderRadius: 4 }} />
                  <input value={editando.email} onChange={(e) => setEditando({ ...editando, email: e.target.value })} style={{ padding: 8, border: '1px solid var(--linea)', borderRadius: 4, flex: 1 }} />
                  <select value={editando.tipo} onChange={(e) => setEditando({ ...editando, tipo: e.target.value })} style={{ padding: 8, border: '1px solid var(--linea)', borderRadius: 4 }}>
                    <option value="jugador">Jugador</option>
                    <option value="portero">Arquero</option>
                    <option value="admin">Administrador</option>
                  </select>
                  <button className="card-link" type="submit">Guardar</button>
                  <button type="button" className="card-link" style={{ background: 'var(--linea)', color: 'var(--texto)' }} onClick={() => setEditando(null)}>Cancelar</button>
                </form>
              ) : (
                <>
                  <div>
                    <strong style={{ color: 'var(--azul-marino)' }}>{u.nombre}</strong>
                    <span style={{ color: 'var(--texto-suave)', fontSize: '0.85rem' }}> · {u.email} · {u.tipo}</span>
                    {!u.activo && <span className="tag-proximamente" style={{ marginLeft: 8, color: 'var(--peligro)' }}>Desactivado</span>}
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button className="card-link" onClick={() => setEditando(u)}>Editar</button>
                    <button className="card-link" style={{ background: u.activo ? 'var(--peligro)' : 'var(--exito)' }} onClick={() => toggleActivo(u)}>
                      {u.activo ? 'Desactivar' : 'Activar'}
                    </button>
                    <button className="card-link" style={{ background: 'var(--peligro)' }} onClick={() => borrar(u)}>Eliminar</button>
                  </div>
                </>
              )}
            </div>
          ))}
          {usuarios.length === 0 && <p className="estado-vacio">No se encontraron usuarios.</p>}
        </div>
      </div>
    </div>
  )
}

export default AdminUsuariosPage
