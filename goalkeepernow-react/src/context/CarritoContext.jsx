import { createContext, useContext, useEffect, useReducer } from 'react'

const CarritoContext = createContext(null)

function carritoReducer(state, action) {
  switch (action.type) {
    case 'AGREGAR': {
      const existe = state.find(i => i.id === action.producto.id)
      if (existe) return state.map(i => i.id === action.producto.id ? { ...i, cantidad: Math.min(i.cantidad + 1, i.stock) } : i)
      return [...state, { ...action.producto, cantidad: 1 }]
    }
    case 'QUITAR': return state.filter(i => i.id !== action.id)
    case 'CAMBIAR_CANTIDAD': return state.map(i => i.id === action.id ? { ...i, cantidad: Math.max(1, Math.min(action.cantidad, i.stock)) } : i)
    case 'VACIAR': return []
    default: return state
  }
}

export function CarritoProvider({ children }) {
  const [items, dispatch] = useReducer(carritoReducer, [], () => {
    try { const g = localStorage.getItem('carrito'); return g ? JSON.parse(g) : [] } catch { return [] }
  })
  useEffect(() => { localStorage.setItem('carrito', JSON.stringify(items)) }, [items])
  const totalItems = items.reduce((s, i) => s + i.cantidad, 0)
  const totalPrecio = items.reduce((s, i) => s + i.precio * i.cantidad, 0)
  return <CarritoContext.Provider value={{ items, totalItems, totalPrecio, dispatch }}>{children}</CarritoContext.Provider>
}

export function useCarrito() {
  const ctx = useContext(CarritoContext)
  if (!ctx) throw new Error('useCarrito debe usarse dentro de CarritoProvider')
  return ctx
}
