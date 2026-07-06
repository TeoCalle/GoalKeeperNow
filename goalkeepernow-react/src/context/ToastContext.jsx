import { createContext, useCallback, useContext, useState } from 'react'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const agregar = useCallback((mensaje, tipo = 'exito') => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, mensaje, tipo }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500)
  }, [])
  const exito = useCallback((msg) => agregar(msg, 'exito'), [agregar])
  const error = useCallback((msg) => agregar(msg, 'error'), [agregar])
  const info = useCallback((msg) => agregar(msg, 'info'), [agregar])
  return (
    <ToastContext.Provider value={{ exito, error, info }}>
      {children}
      <div style={{ position:'fixed', bottom:24, right:24, display:'flex', flexDirection:'column', gap:10, zIndex:9999 }}>
        {toasts.map(t => (
          <div key={t.id} style={{ padding:'14px 20px', borderRadius:6, fontWeight:600, fontSize:'0.88rem', boxShadow:'0 4px 20px rgba(11,37,69,0.22)', animation:'slideIn 0.25s ease', maxWidth:320, background: t.tipo==='exito'?'#1F8A53':t.tipo==='error'?'#C0392B':'#1768AC', color:'#fff' }}>
            {t.tipo==='exito'?'✓ ':t.tipo==='error'?'✕ ':'ℹ '}{t.mensaje}
          </div>
        ))}
      </div>
      <style>{`@keyframes slideIn { from { opacity:0; transform:translateY(12px) } to { opacity:1; transform:translateY(0) } }`}</style>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast debe usarse dentro de ToastProvider')
  return ctx
}
