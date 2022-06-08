// routes.ts 主要用于集中管理路由
import { RouteRecordRaw } from 'vue-router'
import LogIn from '../components/LogIn.vue'

// 路由数组
const routes: Array<RouteRecordRaw> = [
    { path: '/', redirect: 'login' },
    { path: '/login', name: 'login', component: LogIn },
]

export default routes
