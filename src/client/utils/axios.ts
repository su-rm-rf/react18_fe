import axios from 'axios'

const instance1 = axios.create({
  baseURL: 'http://192.168.1.4:7570/wap_pc',
  withCredentials: true,
})

const instance2 = axios.create({
  baseURL: 'http://192.168.1.4:7570/admin',
  withCredentials: true,
})

export { instance1, instance2 }