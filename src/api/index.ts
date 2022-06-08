import axios from 'axios'
import login from './login'

// 全局 axios 配置
axios.defaults.baseURL = 'http://45.32.250.233:8888/api/private/v1/'
export { login }
