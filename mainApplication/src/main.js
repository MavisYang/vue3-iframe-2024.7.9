/*
 * @Author: yangmiaomiao
 * @Date: 2024-06-15 14:23:52
 * @LastEditors: yangmiaomiao
 * @LastEditTime: 2024-07-04 10:09:27
 * @Description:
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import stores from '@/stores'
import ElementPlus from 'element-plus'
import * as ElementPlusIcons from '@element-plus/icons-vue'
// import 'element-plus/dist/index.css'
import '@/assets/iconfont/iconfont.css' //引入阿里巴巴矢量图iconfont
import 'element-plus/theme-chalk/src/index.scss' //element-plus自定义命名
import '@/styles/index.scss'

const app = createApp(App)

Object.keys(ElementPlusIcons).forEach((key) => {
    app.component(key, ElementPlusIcons[key])
})
app.use(router).use(ElementPlus).use(stores).mount('#unified-app')
