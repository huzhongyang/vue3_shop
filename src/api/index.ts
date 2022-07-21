import axios from 'axios'
import { getAsideMenus } from "./getAsideMenus"
import { getUserList } from './getUserList'
import login from './login'

// 全局 axios 配置
axios.defaults.baseURL = 'http://45.32.250.233:8888/api/private/v1/'
// axios.defaults.headers.common['Authorization'] = window.sessionStorage.getItem('loginToken')!
axios.interceptors.request.use((config) => {
  config.headers!['Authorization'] = window.sessionStorage.getItem('loginToken')!
  return config
})

export { login, getAsideMenus, getUserList }
