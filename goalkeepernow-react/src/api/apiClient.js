import axios from 'axios'
const rawURL = import.meta.env.VITE_API_URL || 'https://goalkeepernow-production.up.railway.app/api'
const baseURL = rawURL.startsWith('http') ? rawURL : `https://${rawURL}`
const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})


// Adjunta el token JWT (si existe) a cada petición
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Si el token expiró o es inválido, manda al usuario de vuelta al login
apiClient.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('usuario')
    }
    return Promise.reject(err)
  }
)

export default apiClient
