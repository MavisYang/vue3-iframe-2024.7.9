/*
 * @Author: yangmiaomiao
 * @Date: 2024-07-02 16:52:53
 * @LastEditors: yangmiaomiao
 * @LastEditTime: 2024-07-08 17:52:57
 * @Description:
 */
import { createRouter, createWebHistory } from 'vue-router'

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL
export const routes = [
    {
        name: 'home',
        path: VITE_BASE_URL,
        icon: 'icon-shouye2',
        title: '首页',
        component: () => import('@/views/Home.vue'),
        meta: {
            title: '首页',
        },
    },

    {
        name: 'pcacheApp',
        path: VITE_BASE_URL + '/pcache-web/',
        icon: 'icon-JVMxinxifuwuqixinxi',
        title: '参数缓存',
        subTitle: '缓存查询支撑平台',
        component: () => import('@/views/pcacheApp/index.vue'),
        meta: {
            title: '参数缓存',
        },
    },
    {
        name: 'seqApp',
        path: VITE_BASE_URL + '/seq-web/',
        icon: 'icon-instrum',
        title: '分布式序列',
        subTitle: '基础运行支撑平台',
        component: () => import('@/views/seqApp/index.vue'),
        meta: {
            title: '分布式序列',
        },
    },
    {
        name: 'hotrecApp',
        path: VITE_BASE_URL + '/hotrec-web/',
        icon: 'icon-JVMxinxifuwuqixinxi',
        title: '热点资源',
        subTitle: '热点资源',
        component: () => import('@/views/hotrecApp/index.vue'),
        meta: {
            title: '热点资源',
        },
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    strict: false,
    scrollBehavior: () => ({ left: 0, top: 0 }),
})
router.beforeEach(async (to, from, next) => {
    next()
})

export default router
