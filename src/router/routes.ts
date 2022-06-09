// routes.ts 主要用于集中管理路由
import { RouteRecordRaw } from 'vue-router'
import LogIn from '../components/LogIn.vue'
import ShopHome from '../components/ShopHome.vue'

// 路由数组
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    name: 'login',
    component: LogIn
  },
  {
    path: '/home',
    name: 'home',
    component: ShopHome
  }
]

export default routes
