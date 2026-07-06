import { useEffect, useState } from 'react'
import { getCanchas, crearCanchaAdmin, actualizarCanchaAdmin, eliminarCanchaAdmin } from '../services/apiService'
import { useToast } from '../context/ToastContext'

const FORM_VACIO = { nombre:'', direccion:'', ciudad:'', tipo:'futbol7', precio_hora:'', descripcion:'', foto_url:'', activa:true }
const TIPOS = ['futbol5','futbol7','futbol11','futsal']
const TIPO_LABEL = { futbol5:'Fútbol 5', futbol7:'Fútbol 7', futbol11:'Fútbol 11', futsal:'Futsal' }

function AdminCanchasPage({ onNavigate }) {
  const [canchas, setCanchas] = useState([])
  const [loading, setLoading] = useState(true)
  const [editando, setEditando] = useState(null)
  const [mostrarForm, setMostrarForm] = useState(false)
  const [form, setForm] = useState(FORM_VACIO)
  const toast = useToast()

  async function cargar() {
    setLoading(true)
    try { setCanchas(await getCanchas()) }
    catch { toast.error('No pudimos cargar las canchas.') }
    finally { setLoading(false) }
  }

  useEffect(() => { cargar() }, [])

  function abrirEditar(c) {
    setEditando(c)
    setForm({ nombre:c.nombre, direccion:c.direccion||'', ciudad:c.ciudad||'', tipo:c.tipo,
      precio_hora:c.precio_hora, descripcion:c.descripcion||'', foto_url:c.foto_url||'', activa:!!c.activa })
    setMostrarForm(false)
  }

  function abrirNuevo() { setEditando(null); setForm(FORM_VACIO); setMostrarForm(true) }

  async function handleGuardar(ev) {
    ev.preventDefault()
    const datos = { ...form, precio_hora: Number(form.precio_hora) }
    try {
      if (editando) {
        await actualizarCanchaAdmin(editando.id, datos)
        toast.exito('Cancha actualizada.'); setEditando(null)
      } else {
        await crearCanchaAdmin(datos)
        toast.exito('Cancha creada.'); setMostrarForm(false)
      }
      cargar()
    } catch (err) { toast.error(err.response?.data?.error || 'No se pudo guardar.') }
  }

  async function handleEliminar(c) {
    if (!confirm(`¿Eliminar "${c.nombre}"?`)) return
    try { await eliminarCanchaAdmin(c.id); toast.exito('Cancha eliminada.'); cargar() }
    catch { toast.error('No se pudo eliminar.') }
  }

  return (
    <div className="dashboard-container">
      <div className="navbar" style={{ background:'var(--azul-marino)' }}>
        <div className="navbar-top" style={{ padding:'14px 32px' }}>
          <div className="navbar-logo" style={{ color:'#fff' }}>Gestión de canchas</div>
          <div style={{ display:'flex', gap:10 }}>
            <button className="card-link" onClick={abrirNuevo}>+ Nueva cancha</button>
            <button className="back-btn" onClick={() => onNavigate('admin')}>Volver al panel</button>
          </div>
        </div>
      </div>
      <div className="page-shell">
        {(mostrarForm || editando) && (
          <form onSubmit={handleGuardar} className="card" style={{ marginBottom:22, display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
            <div style={{ gridColumn:'span 2' }}><h2>{editando ? 'Editar cancha' : 'Nueva cancha'}</h2></div>
            {[['nombre','Nombre','text',true],['direccion','Dirección','text',false],['ciudad','Ciudad','text',false],['precio_hora','Precio por hora (COP)','number',false]].map(([campo,label,tipo,req]) => (
              <div key={campo}>
                <label className="campo-label">{label}</label>
                <input type={tipo} required={req} value={form[campo]} onChange={e => setForm({...form,[campo]:e.target.value})}
                  style={{ width:'100%', padding:10, border:'1px solid var(--linea)', borderRadius:4 }} />
              </div>
            ))}
            <div>
              <label className="campo-label">Tipo de cancha</label>
              <select value={form.tipo} onChange={e => setForm({...form,tipo:e.target.value})}
                style={{ width:'100%', padding:10, border:'1px solid var(--linea)', borderRadius:4 }}>
                {TIPOS.map(t => <option key={t} value={t}>{TIPO_LABEL[t]}</option>)}
              </select>
            </div>
            <div style={{ gridColumn:'span 2' }}>
              <label className="campo-label">URL de foto</label>
              <input type="url" value={form.foto_url} onChange={e => setForm({...form,foto_url:e.target.value})}
                placeholder="https://..." style={{ width:'100%', padding:10, border:'1px solid var(--linea)', borderRadius:4 }} />
            </div>
            <div style={{ gridColumn:'span 2' }}>
              <label className="campo-label">Descripción</label>
              <textarea value={form.descripcion} onChange={e => setForm({...form,descripcion:e.target.value})} rows={2}
                style={{ width:'100%', padding:10, border:'1px solid var(--linea)', borderRadius:4, fontFamily:'inherit', resize:'vertical' }} />
            </div>
            {editando && (
              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                <input type="checkbox" id="activa_c" checked={form.activa} onChange={e => setForm({...form,activa:e.target.checked})} />
                <label htmlFor="activa_c" className="campo-label" style={{ marginBottom:0 }}>Activa</label>
              </div>
            )}
            <div style={{ display:'flex', gap:10, gridColumn:'span 2', justifyContent:'flex-end' }}>
              <button type="button" className="card-link" style={{ background:'var(--linea)', color:'var(--texto)' }}
                onClick={() => { setEditando(null); setMostrarForm(false) }}>Cancelar</button>
              <button type="submit" className="card-link">{editando ? 'Guardar cambios' : 'Crear cancha'}</button>
            </div>
          </form>
        )}

        {loading && <p className="estado-vacio">Cargando...</p>}
        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          {canchas.map(c => (
            <div className="card" key={c.id} style={{ flexDirection:'row', alignItems:'center', gap:16 }}>
              <img src={c.foto_url || 'https://images.unsplash.com/photo-1551958219-acbc608c6377?q=80&w=200'}
                alt={c.nombre} style={{ width:70, height:70, objectFit:'cover', borderRadius:4, flexShrink:0 }} />
              <div style={{ flex:1 }}>
                <strong style={{ color:'var(--azul-marino)' }}>{c.nombre}</strong>
                {!c.activa && <span style={{ fontSize:'0.65rem', background:'var(--peligro)', color:'#fff', padding:'2px 8px', borderRadius:3, fontWeight:700, marginLeft:8 }}>INACTIVA</span>}
                <br />
                <span style={{ fontSize:'0.82rem', color:'var(--texto-suave)' }}>
                  {TIPO_LABEL[c.tipo]} · {c.ciudad} · ${Number(c.precio_hora).toLocaleString('es-CO')} COP/h
                </span>
              </div>
              <div style={{ display:'flex', gap:8 }}>
                <button className="card-link" onClick={() => abrirEditar(c)}>Editar</button>
                <button className="card-link" style={{ background:'var(--peligro)' }} onClick={() => handleEliminar(c)}>Eliminar</button>
              </div>
            </div>
          ))}
          {!loading && canchas.length === 0 && <p className="estado-vacio">No hay canchas.</p>}
        </div>
      </div>
    </div>
  )
}

export default AdminCanchasPage
