import { getPorteros, getProductos, getEntrenadores, getCanchas } from './apiService'

// Datos de respaldo estructurados para búsqueda global inmediata
const mockDatabase = {
  porteros: [
    { id: 1, tipoItem: 'portero', nombre: 'Carlos Gómez', especialidad: 'Arquero Profesional - Reflejos y Juego Aéreo', ciudad: 'Medellín', precio: 80000, calificacion: 5.0, imagen: '/images/gk_goalkeeper.png' },
    { id: 2, tipoItem: 'portero', nombre: 'Andrés Zapata', especialidad: 'Especialista en Atajar Penales', ciudad: 'Bogotá', precio: 90000, calificacion: 4.9, imagen: '/images/gk_goalkeeper.png' },
    { id: 3, tipoItem: 'portero', nombre: 'Mateo Calle', especialidad: 'Arquero Futsal y Cancha Sintética', ciudad: 'Envigado', precio: 75000, calificacion: 4.8, imagen: '/images/gk_goalkeeper.png' },
    { id: 4, tipoItem: 'portero', nombre: 'Juan Pablo Ríos', especialidad: 'Portero de Seguridad y Liderazgo', ciudad: 'Cali', precio: 85000, calificacion: 4.9, imagen: '/images/gk_goalkeeper.png' },
    { id: 5, tipoItem: 'portero', nombre: 'David Ospina Jr.', especialidad: 'Arquero Experimentado Torneos y Ligas', ciudad: 'Itagüí', precio: 100000, calificacion: 5.0, imagen: '/images/gk_goalkeeper.png' }
  ],
  productos: [
    { id: 1, tipoItem: 'producto', nombre: 'Guantes Pro Predator Gold', categoria: 'Guantes', precio: 180000, descripcion: 'Guantes de agarre extremo con palma de látex alemán de 4mm.', imagen: '/images/gk_gloves.png' },
    { id: 2, tipoItem: 'producto', nombre: 'Camiseta Oficial Arquero Neón', categoria: 'Uniformes', precio: 120000, descripcion: 'Camiseta acolchada en codos para máxima protección en caídas.', imagen: '/images/gk_gloves.png' },
    { id: 3, tipoItem: 'producto', nombre: 'Coderas y Rodilleras Pro-Shield', categoria: 'Protección', precio: 65000, descripcion: 'Protección anti-impactos de alto rendimiento para arqueros.', imagen: '/images/gk_gloves.png' },
    { id: 4, tipoItem: 'producto', nombre: 'Balón Profesional Golty FIFA', categoria: 'Accesorios', precio: 140000, descripcion: 'Balón oficial de alta precisión y máxima durabilidad.', imagen: '/images/gk_gloves.png' },
    { id: 5, tipoItem: 'producto', nombre: 'Maleta de Arquero Impermeable', categoria: 'Accesorios', precio: 95000, descripcion: 'Maleta espaciosa con compartimento ventilado para guantes y guayos.', imagen: '/images/gk_gloves.png' }
  ],
  entrenadores: [
    { id: 1, tipoItem: 'entrenador', nombre: 'Profe Alejandro Ramírez', especialidad: 'Entrenamiento Específico de Reflejos y Vuelo', ciudad: 'Medellín', precio: 60000, experiencia: '8 años de experiencia', imagen: '/images/gk_coach.png' },
    { id: 2, tipoItem: 'entrenador', nombre: 'Santiago Morales', especialidad: 'Técnica de Saque con la Mano y Colocación', ciudad: 'Bogotá', precio: 70000, experiencia: 'Ex-portero profesional', imagen: '/images/gk_coach.png' },
    { id: 3, tipoItem: 'entrenador', nombre: 'Daniel Rendón', especialidad: 'Preparación Física y Reducción de Lesiones', ciudad: 'Cali', precio: 55000, experiencia: 'Preparador físico certificado', imagen: '/images/gk_coach.png' }
  ],
  canchas: [
    { id: 1, tipoItem: 'cancha', nombre: 'Cancha Sintética El Maracaná', tipo: 'Sintética 7x7', ciudad: 'Medellín', precio: 110000, direccion: 'Calle 10 #43-22', imagen: '/images/gk_field.png' },
    { id: 2, tipoItem: 'cancha', nombre: 'Arena Gol Suba', tipo: 'Sintética 5x5 Techada', ciudad: 'Bogotá', precio: 90000, direccion: 'Av. Suba #115-40', imagen: '/images/gk_field.png' },
    { id: 3, tipoItem: 'cancha', nombre: 'Complejo Deportivo Camp Nou', tipo: 'Grama Natural 11x11', ciudad: 'Envigado', precio: 130000, direccion: 'Transversal 27 SUR #34-10', imagen: '/images/gk_field.png' },
    { id: 4, tipoItem: 'cancha', nombre: 'El Templo del Fútbol', tipo: 'Sintética 8x8 Iluminada', ciudad: 'Cali', precio: 120000, direccion: 'Carrera 66 #12-45', imagen: '/images/gk_field.png' }
  ]
}

/**
 * Función principal para buscar en toda la plataforma
 * @param {string} query - Término de búsqueda
 * @returns {Promise<{ resultados: Array, porCategoria: Object, total: number }>}
 */
export async function buscarEnTodo(query = '') {
  const q = query.trim().toLowerCase()
  if (!q) {
    return {
      resultados: [],
      porCategoria: { porteros: [], productos: [], entrenadores: [], canchas: [] },
      total: 0
    }
  }

  let porteros = []
  let productos = []
  let entrenadores = []
  let canchas = []

  // Intenta obtener datos de API en tiempo real
  try {
    const p = await getPorteros()
    if (Array.isArray(p) && p.length > 0) porteros = p.map(item => ({ ...item, tipoItem: 'portero' }))
  } catch (e) { console.log('Usando datos de búsqueda de porteros') }

  try {
    const prod = await getProductos()
    if (Array.isArray(prod) && prod.length > 0) productos = prod.map(item => ({ ...item, tipoItem: 'producto' }))
  } catch (e) { console.log('Usando datos de búsqueda de productos') }

  try {
    const ent = await getEntrenadores()
    if (Array.isArray(ent) && ent.length > 0) entrenadores = ent.map(item => ({ ...item, tipoItem: 'entrenador' }))
  } catch (e) { console.log('Usando datos de búsqueda de entrenadores') }

  try {
    const c = await getCanchas()
    if (Array.isArray(c) && c.length > 0) canchas = c.map(item => ({ ...item, tipoItem: 'cancha' }))
  } catch (e) { console.log('Usando datos de búsqueda de canchas') }

  // Fusionar con datos de respaldo si no hay resultados de la API
  if (porteros.length === 0) porteros = mockDatabase.porteros
  if (productos.length === 0) productos = mockDatabase.productos
  if (entrenadores.length === 0) entrenadores = mockDatabase.entrenadores
  if (canchas.length === 0) canchas = mockDatabase.canchas

  // Filtro inteligente
  const coincide = (item) => {
    const textoCompleto = [
      item.nombre,
      item.especialidad,
      item.categoria,
      item.ciudad,
      item.tipo,
      item.descripcion,
      item.direccion
    ].filter(Boolean).join(' ').toLowerCase()

    return textoCompleto.includes(q)
  }

  const resPorteros = porteros.filter(coincide)
  const resProductos = productos.filter(coincide)
  const resEntrenadores = entrenadores.filter(coincide)
  const resCanchas = canchas.filter(coincide)

  const todosResultados = [
    ...resPorteros,
    ...resProductos,
    ...resEntrenadores,
    ...resCanchas
  ]

  return {
    resultados: todosResultados,
    porCategoria: {
      porteros: resPorteros,
      productos: resProductos,
      entrenadores: resEntrenadores,
      canchas: resCanchas
    },
    total: todosResultados.length
  }
}
