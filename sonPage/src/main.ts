/*
 * @Author: yangmiaomiao
 * @Date: 2024-01-25 17:07:26
 * @LastEditors: yangmiaomiao
 * @LastEditTime: 2024-05-10 17:15:25
 * @Description:
 */
import { createApp } from 'vue'
import App from './App.vue'
// reset style sheet
import '@/styles/reset.scss'
// CSS common style sheet
import '@/styles/common.scss'
// iconfont css
import '@/assets/iconfont/iconfont.scss'
// font css
import '@/assets/fonts/font.scss'
// element css
import 'element-plus/dist/index.css'
// custom element css
import '@/styles/element.scss'
// svg icons
import 'virtual:svg-icons-register'
import '@/assets/icons/iconfont'
// element plus
import ElementPlus from 'element-plus'
// element icons
import * as Icons from '@element-plus/icons-vue'
// custom directives
import directives from '@/directives/index'
// vue Router
import router from '@/routers'
// vue i18n
import I18n from '@/languages/index'
// pinia store
import pinia from '@/stores'
// errorHandler
import errorHandler from '@/utils/errorHandler'
// mitt
import Mit from '@/utils/eventBus'

const app = createApp(App)

//vue3 挂载全局 API
app.config.globalProperties.$Bus = Mit
// app.config.errorHandler = errorHandler;

// register the element Icons component
Object.keys(Icons).forEach((key) => {
    app.component(key, Icons[key as keyof typeof Icons])
})

app.use(ElementPlus).use(directives).use(router).use(I18n).use(pinia).mount('#app')
