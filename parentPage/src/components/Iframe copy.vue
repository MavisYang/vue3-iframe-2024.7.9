<!--
 * @Author: yangmiaomiao
 * @Date: 2024-07-05 14:37:53
 * @LastEditors: yangmiaomiao
 * @LastEditTime: 2024-07-09 11:09:25
 * @Description: 
-->
<template>
    <iframe :src="iframeSrc" :ref="iframeRef" width="100%" height="100%" frameborder="0" />
</template>
<script setup>
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
const props = defineProps(['appUrl', 'iframeRef'])

const route = useRoute()
const APP_URL = props.appUrl
const iframeSrc = ref(APP_URL + '')

watchEffect(() => {
    console.log('页面刷新')
    iframeSrc.value = APP_URL + route.hash
})
</script>
