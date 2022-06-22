// routes.ts 主要用于集中管理路由
import { RouteRecordRaw } from 'vue-router'
import LogIn from '../components/LogIn.vue'
import ShopGoodsCate from "../components/ShopGoodsCate.vue";
import ShopGoodsList from "../components/ShopGoodsList.vue";
import ShopGoodsParam from "../components/ShopGoodsParam.vue";
import ShopHome from '../components/ShopHome.vue'
import ShopHomeMain from '../components/ShopHomeMain.vue'
import ShopRightsList from '../components/ShopRightsList.vue'
import ShopRoleList from '../components/ShopRoleList.vue'
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
  }, {
    path: 'rights',
    name: 'rights',
    component: ShopRightsList
  }, {
    path: 'roles',
    name: 'roles',
    component: ShopRoleList
  }, {
    path: 'categories',
    name: 'categories',
    component: ShopGoodsCate
  }, {
    path: 'params',
    name: 'params',
    component: ShopGoodsParam
  }, {
    name: 'goods',
    path: 'goods',
    component: ShopGoodsList
  }]
}]

export default routes
