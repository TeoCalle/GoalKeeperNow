import { useEffect, useState } from 'react'
import { getEntrenadores, crearEntrenadorAdmin, actualizarEntrenadorAdmin, eliminarEntrenadorAdmin } from '../services/apiService'
import { useToast } from '../context/ToastContext'

const FORM_VACIO = { nombre: '', especialidad: '', experiencia: '', precio_hora: '', descripcion: '', foto_url: '', activo: true }

function AdminEntrenadoresPage({ onNavigate }) {
  const [entrenadores, setEntrenadores] = useState([])
  const [loading, setLoading] = useState(true)
  const [editando, setEditando] = useState(null)
  const [mostrarForm, setMostrarForm] = useState(false)
  const [form, setForm] = useState(FORM_VACIO)
  const toast = useToast()

  async function cargar() {
    setLoading(true)
    try { setEntrenadores(await getEntrenadores()) }
    catch { toast.error('No pudimos cargar los entrenadores.') }
    finally { setLoading(false) }
  }

  useEffect(() => { cargar() }, [])

  function abrirEditar(e) {
    setEditando(e)
    setForm({ nombre: e.nombre, especialidad: e.especialidad || '', experiencia: e.experiencia || '',
      precio_hora: e.precio_hora, descripcion: e.descripcion || '', foto_url: e.foto_url || '', activo: !!e.activo })
    setMostrarForm(false)
  }

  function abrirNuevo() { setEditando(null); setForm(FORM_VACIO); setMostrarForm(true) }

  async function handleGuardar(ev) {
    ev.preventDefault()
    const datos = { ...form, precio_hora: Number(form.precio_hora) }
    try {
      if (editando) {
        await actualizarEntrenadorAdmin(editando.id, datos)
        toast.exito('Entrenador actualizado.'); setEditando(null)
      } else {
        await crearEntrenadorAdmin(datos)
        toast.exito('Entrenador creado.'); setMostrarForm(false)
      }
      cargar()
    } catch (err) { toast.error(err.response?.data?.error || 'No se pudo guardar.') }
  }

  async function handleEliminar(e) {
    if (!confirm(`¿Eliminar a "${e.nombre}"?`)) return
    try { await eliminarEntrenadorAdmin(e.id); toast.exito('Entrenador eliminado.'); cargar() }
    catch { toast.error('No se pudo eliminar.') }
  }

  const camposForm = [
    ['nombre','Nombre completo','text',true],
    ['especialidad','Especialidad','text',false],
    ['experiencia','Experiencia (ej: 8 años)','text',false],
    ['precio_hora','Precio por hora (COP)','number',false],
  ]

  return (
    <div className="dashboard-container">
      <div className="navbar" style={{ background:'var(--azul-marino)' }}>
        <div className="navbar-top" style={{ padding:'14px 32px' }}>
          <div className="navbar-logo" style={{ color:'#fff' }}>Gestión de entrenadores</div>
          <div style={{ display:'flex', gap:10 }}>
            <button className="card-link" onClick={abrirNuevo}>+ Nuevo entrenador</button>
            <button className="back-btn" onClick={() => onNavigate('admin')}>Volver al panel</button>
          </div>
        </div>
      </div>
      <div className="page-shell">
        {(mostrarForm || editando) && (
          <form onSubmit={handleGuardar} className="card" style={{ marginBottom:22, display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
            <div style={{ gridColumn:'span 2' }}><h2>{editando ? 'Editar entrenador' : 'Nuevo entrenador'}</h2></div>
            {camposForm.map(([campo, label, tipo, req]) => (
              <div key={campo}>
                <label className="campo-label">{label}</label>
                <input type={tipo} required={req} value={form[campo]} onChange={e => setForm({ ...form, [campo]: e.target.value })}
                  style={{ width:'100%', padding:10, border:'1px solid var(--linea)', borderRadius:4 }} />
              </div>
            ))}
            <div style={{ gridColumn:'span 2' }}>
              <label className="campo-label">URL de foto</label>
              <input type="url" value={form.foto_url} onChange={e => setForm({ ...form, foto_url: e.target.value })}
                placeholder="https://..." style={{ width:'100%', padding:10, border:'1px solid var(--linea)', borderRadius:4 }} />
            </div>
            <div style={{ gridColumn:'span 2' }}>
              <label className="campo-label">Descripción</label>
              <textarea value={form.descripcion} onChange={e => setForm({ ...form, descripcion: e.target.value })} rows={2}
                style={{ width:'100%', padding:10, border:'1px solid var(--linea)', borderRadius:4, fontFamily:'inherit', resize:'vertical' }} />
            </div>
            {editando && (
              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                <input type="checkbox" id="activo_e" checked={form.activo} onChange={e => setForm({ ...form, activo: e.target.checked })} />
                <label htmlFor="activo_e" className="campo-label" style={{ marginBottom:0 }}>Activo</label>
              </div>
            )}
            <div style={{ display:'flex', gap:10, gridColumn:'span 2', justifyContent:'flex-end' }}>
              <button type="button" className="card-link" style={{ background:'var(--linea)', color:'var(--texto)' }}
                onClick={() => { setEditando(null); setMostrarForm(false) }}>Cancelar</button>
              <button type="submit" className="card-link">{editando ? 'Guardar cambios' : 'Crear entrenador'}</button>
            </div>
          </form>
        )}

        {loading && <p className="estado-vacio">Cargando...</p>}
        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          {entrenadores.map(e => (
            <div className="card" key={e.id} style={{ flexDirection:'row', alignItems:'center', gap:16 }}>
              <img src={e.foto_url || 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=200'}
                alt={e.nombre} style={{ width:70, height:70, objectFit:'cover', borderRadius:'50%', flexShrink:0 }} />
              <div style={{ flex:1 }}>
                <strong style={{ color:'var(--azul-marino)' }}>{e.nombre}</strong>
                {!e.activo && <span style={{ fontSize:'0.65rem', background:'var(--peligro)', color:'#fff', padding:'2px 8px', borderRadius:3, fontWeight:700, marginLeft:8 }}>INACTIVO</span>}
                <br />
                <span style={{ fontSize:'0.82rem', color:'var(--texto-suave)' }}>
                  {e.especialidad} · ${Number(e.precio_hora).toLocaleString('es-CO')} COP/h · {e.experiencia}
                </span>
              </div>
              <div style={{ display:'flex', gap:8 }}>
                <button className="card-link" onClick={() => abrirEditar(e)}>Editar</button>
                <button className="card-link" style={{ background:'var(--peligro)' }} onClick={() => handleEliminar(e)}>Eliminar</button>
              </div>
            </div>
          ))}
          {!loading && entrenadores.length === 0 && <p className="estado-vacio">No hay entrenadores.</p>}
        </div>
      </div>
    </div>
  )
}

export default AdminEntrenadoresPage
