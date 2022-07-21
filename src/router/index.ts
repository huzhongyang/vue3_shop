// index.ts 是路由的入口文件
// 主要用于路由的创建 拦截等逻辑功能

import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, _, next) => {
  if (to.name === 'login') return next()
  if (!window.sessionStorage.getItem('loginToken')) return next({ name: 'login' })
  console.log(to.path)
  next()
})

export default router
