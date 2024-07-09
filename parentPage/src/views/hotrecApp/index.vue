<!--
 * @Author: yangmiaomiao
 * @Date: 2024-06-15 15:00:39
 * @LastEditors: yangmiaomiao
 * @LastEditTime: 2024-07-09 13:27:04
 * @Description: 参数缓存 dpscn-apaas-pcache-web
 root/#4S@Qr*p4m
 
-->
<template>
    <!-- <iframe id="pcacheApp" :src="iframeSrc" /> -->
    <Iframe iframeRef="hotrecApp" :appUrl="APP_URL" />
</template>

<script setup name="hotrecApp">
import Iframe from '@/components/Iframe'

// import { ref, watchEffect } from 'vue'
// import { useRoute } from 'vue-router'
// const route = useRoute()
const APP_URL = import.meta.env.VITE_APP_HOT
// const iframeSrc = ref(APP_URL + '')
// watchEffect(() => {
//     console.log('页面刷新')
//     iframeSrc.value = APP_URL + route.hash
// })

// 第二种写法
// const url = ref(route.hash || '')
// const iframeSrc = ref(import.meta.env.VITE_APP_SEQ + url)
// // onMounted(() => {
// //     console.log('onMounted')
//     // nextTick(() => init())
// })
// watchEffect(() => {
//     console.log('页面刷新')
//     console.log(route.hash)
//     url.value = route.hash

// })
// function init() {
//     console.log('init', url.value)
//     const iframe = document.getElementById('pcacheApp')
//     if (!iframe) return false
//     iframe.onload = function () {
//         console.log('iframe加载完成----2222')
//         iframeSrc.value = import.meta.env.VITE_APP_PCACHE + url.value
//     }
// }
</script>
<style lang="scss" scoped></style>
