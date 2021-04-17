import axios from 'axios'

const newaxios = axios.create({
  baseURL: 'https://ranekapi.origamid.dev/json/api/'
})

newaxios.interceptors.request.use(
  function (config) {
    const token = window.localStorage.token
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

export const api = {
  get (url) {
    return newaxios.get(url)
  },
  post (url, body) {
    return newaxios.post(url, body)
  },
  put (url, body) {
    return newaxios.put(url, body)
  },
  delete (url) {
    return newaxios.delete(url)
  },
  login (body) {
    return axios.post(
      'http://ranekapilocal.local/wp-json/jwt-auth/v1/token',
      body
    )
  },
  valideteToken () {
    return newaxios.post(
      'http://ranekapilocal.local/wp-json/jwt-auth/v1/token/validate'
    )
  }
}

export function getCep (cep) {
  return axios.get(`https://viacep.com.br/ws/${cep}/json/`)
}
