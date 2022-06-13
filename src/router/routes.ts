// routes.ts 主要用于集中管理路由
import { RouteRecordRaw } from 'vue-router'
import LogIn from '../components/LogIn.vue'
import ShopHome from '../components/ShopHome.vue'
import ShopHomeMain from '../components/ShopHomeMain.vue'
import ShopUsers from '../components/ShopUsers.vue'

// 路由数组
const routes: Array<RouteRecordRaw> = [{
  path: '/',
  redirect: '/home'
}, {
  path: '/login',
  name: 'login',
  component: LogIn
}, {
  path: '/home',
  name: 'home',
  component: ShopHome,
  redirect: '/home/welcome',
  children: [{
    // 以 / 开头的路径为根路径
    path: 'users',
    name: 'users',
    component: ShopUsers
  }, {
    path: 'welcome',
    name: 'welcome',
    component: ShopHomeMain
  }]
}]

export default routes
