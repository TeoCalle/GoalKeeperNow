import { useEffect, useState } from 'react'
import { getProductos, crearProductoAdmin, actualizarProductoAdmin, eliminarProductoAdmin } from '../services/apiService'
import { useToast } from '../context/ToastContext'

const FORM_VACIO = { nombre:'', categoria:'', precio:'', descripcion:'', imagen_url:'', stock:'', destacado:false }

function AdminProductosPage({ onNavigate }) {
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)
  const [editando, setEditando] = useState(null)
  const [mostrarForm, setMostrarForm] = useState(false)
  const [form, setForm] = useState(FORM_VACIO)
  const toast = useToast()

  async function cargar() {
    setLoading(true)
    try { const d = await getProductos({ limit:50 }); setProductos(d.productos) }
    catch { toast.error('No pudimos cargar los productos.') }
    finally { setLoading(false) }
  }

  useEffect(() => { cargar() }, [])

  function abrirEditar(p) { setEditando(p); setForm({ nombre:p.nombre, categoria:p.categoria, precio:p.precio, descripcion:p.descripcion||'', imagen_url:p.imagen_url||'', stock:p.stock, destacado:!!p.destacado }); setMostrarForm(false) }
  function abrirNuevo() { setEditando(null); setForm(FORM_VACIO); setMostrarForm(true) }

  async function handleGuardar(ev) {
    ev.preventDefault()
    const datos = { ...form, precio:Number(form.precio), stock:Number(form.stock) }
    try {
      if (editando) { await actualizarProductoAdmin(editando.id, datos); toast.exito('Producto actualizado.'); setEditando(null) }
      else { await crearProductoAdmin(datos); toast.exito('Producto creado.'); setMostrarForm(false) }
      cargar()
    } catch (err) { toast.error(err.response?.data?.error || 'No se pudo guardar.') }
  }

  async function handleEliminar(p) {
    if (!confirm(`¿Eliminar "${p.nombre}"?`)) return
    try { await eliminarProductoAdmin(p.id); toast.exito('Producto eliminado.'); cargar() }
    catch { toast.error('No se pudo eliminar.') }
  }

  return (
    <div className="dashboard-container">
      <div className="navbar" style={{ background:'var(--azul-marino)' }}>
        <div className="navbar-top" style={{ padding:'14px 32px' }}>
          <div className="navbar-logo" style={{ color:'#fff' }}>Gestión de productos</div>
          <div style={{ display:'flex', gap:10 }}>
            <button className="card-link" onClick={abrirNuevo}>+ Nuevo producto</button>
            <button className="back-btn" onClick={() => onNavigate('admin')}>Volver al panel</button>
          </div>
        </div>
      </div>
      <div className="page-shell">
        {(mostrarForm || editando) && (
          <form onSubmit={handleGuardar} className="card" style={{ marginBottom:22, display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
            <div style={{ gridColumn:'span 2' }}><h2>{editando ? 'Editar producto' : 'Nuevo producto'}</h2></div>
            {[['nombre','Nombre','text',true],['categoria','Categoría','text',true],['precio','Precio (COP)','number',true],['stock','Stock','number',false]].map(([c,l,t,r]) => (
              <div key={c}><label className="campo-label">{l}</label><input type={t} required={r} value={form[c]} onChange={e => setForm({...form,[c]:e.target.value})} style={{ width:'100%', padding:10, border:'1px solid var(--linea)', borderRadius:4 }} /></div>
            ))}
            <div style={{ gridColumn:'span 2' }}><label className="campo-label">URL de imagen</label><input type="url" value={form.imagen_url} onChange={e => setForm({...form,imagen_url:e.target.value})} placeholder="https://..." style={{ width:'100%', padding:10, border:'1px solid var(--linea)', borderRadius:4 }} /></div>
            <div style={{ gridColumn:'span 2' }}><label className="campo-label">Descripción</label><textarea value={form.descripcion} onChange={e => setForm({...form,descripcion:e.target.value})} rows={2} style={{ width:'100%', padding:10, border:'1px solid var(--linea)', borderRadius:4, fontFamily:'inherit', resize:'vertical' }} /></div>
            <div style={{ display:'flex', alignItems:'center', gap:8 }}><input type="checkbox" id="dest" checked={form.destacado} onChange={e => setForm({...form,destacado:e.target.checked})} /><label htmlFor="dest" className="campo-label" style={{ marginBottom:0 }}>Producto destacado</label></div>
            <div style={{ display:'flex', gap:10, gridColumn:'span 2', justifyContent:'flex-end' }}>
              <button type="button" className="card-link" style={{ background:'var(--linea)', color:'var(--texto)' }} onClick={() => { setEditando(null); setMostrarForm(false) }}>Cancelar</button>
              <button type="submit" className="card-link">{editando ? 'Guardar' : 'Crear'}</button>
            </div>
          </form>
        )}
        {loading && <p className="estado-vacio">Cargando...</p>}
        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          {productos.map(p => (
            <div className="card" key={p.id} style={{ flexDirection:'row', alignItems:'center', gap:16 }}>
              <img src={p.imagen_url || 'https://images.unsplash.com/photo-1606925797300-0b35e9d1794e?q=80&w=200'} alt={p.nombre} style={{ width:70, height:70, objectFit:'cover', borderRadius:4, flexShrink:0 }} />
              <div style={{ flex:1 }}>
                <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:2 }}>
                  <strong style={{ color:'var(--azul-marino)' }}>{p.nombre}</strong>
                  {p.destacado ? <span style={{ fontSize:'0.65rem', background:'var(--dorado)', color:'var(--azul-marino)', padding:'2px 8px', borderRadius:3, fontWeight:700 }}>DESTACADO</span> : null}
                </div>
                <span style={{ fontSize:'0.82rem', color:'var(--texto-suave)' }}>{p.categoria} · ${Number(p.precio).toLocaleString('es-CO')} COP · Stock: {p.stock}</span>
              </div>
              <div style={{ display:'flex', gap:8 }}>
                <button className="card-link" onClick={() => abrirEditar(p)}>Editar</button>
                <button className="card-link" style={{ background:'var(--peligro)' }} onClick={() => handleEliminar(p)}>Eliminar</button>
              </div>
            </div>
          ))}
          {!loading && productos.length === 0 && <p className="estado-vacio">No hay productos.</p>}
        </div>
      </div>
    </div>
  )
}
export default AdminProductosPage
