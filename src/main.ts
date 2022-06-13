import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { createApp } from 'vue'
import App from './App.vue'
import './assets/css/global.css'
import router from './router'

createApp(App)
  .use(ElementPlus, { locale: zhCn })
  .use(router)
  .mount('#app')
