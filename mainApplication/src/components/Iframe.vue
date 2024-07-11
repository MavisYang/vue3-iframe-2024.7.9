<!--
 * @Author: yangmiaomiao
 * @Date: 2024-07-05 14:37:53
 * @LastEditors: yangmiaomiao
 * @LastEditTime: 2024-07-11 15:35:47
 * @Description: 
-->
<template>
    <div class="parent" id="parentDiv" v-loading="loading">
        <iframe
            id="bdIframe"
            ref="iframeRef"
            :src="iframeSrc"
            :key="iframeRef"
            width="100%"
            height="100%"
            frameborder="0"
        />

        <!-- 解决Elementt弹窗蒙层只能遮罩子页面问题 ，父页面中添加个蒙层-->
        <el-dialog
            modal-class="dialog-parent-iframe"
            :model-value="dialogTableVisible"
            :close-on-press-escape="false"
            :close-on-click-modal="false"
            center
        />
    </div>
</template>
<script setup>
import { ref, watchEffect, onMounted, onUnmounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import useGlobalStore from '@/stores/modules/global'
const globalStore = useGlobalStore()
const route = useRoute()

const props = defineProps(['appUrl', 'iframeRef'])
const isCollapse = computed(() => globalStore.isCollapse)

const APP_URL = props.appUrl
const iframeSrc = ref(APP_URL + '')
const loading = ref(false)

watchEffect(() => {
    iframeSrc.value = APP_URL + route.hash
    console.log('页面刷新', iframeSrc.value)
})

onMounted(() => {
    loading.value = true
    const iframe = document.getElementById('bdIframe')
    iframe.onload = function () {
        loading.value = false
    }
    // 监听子页面传来的值
    window.addEventListener('message', changeDialog, false)
})

onUnmounted(() => {
    // 销毁
    window.removeEventListener('message', changeDialog, false)
})

//父页面监听子页面处理弹框消息
const dialogTableVisible = ref(false)
const changeDialog = (event) => {
    const { type, data } = event.data || {}
    if (type === 'changeDialog') {
        //isDialog为子页面弹框的开关，解决弹窗蒙层只能遮罩子页面问题
        dialogTableVisible.value = data.isDialog
        if (data.isDialog) {
            //当子页面弹框开时
            //手动隐藏主应用的弹框，解决隐藏弹框时，主页面中弹框dialog有内容闪现问题
            document.getElementsByClassName('dialog-parent-iframe')[0].style.display = 'block'
            //将子页面iframe页面层级提升
            document.getElementById('parentDiv').style.position = 'relative'
            document.getElementById('bdIframe').style.position = 'absolute'
            document.getElementById('bdIframe').style.zIndex = 10000
            // 父页面向子页面发送消息--解决弹框居中的问题
            let iframeWin = window.frames['bdIframe']
            iframeWin.contentWindow.postMessage(
                {
                    type: 'style-left',
                    data: {
                        left: isCollapse.value ? '-65px' : '-210px',
                        dialogModalClass: data.dialogModalClass,
                    },
                },
                '*', //解决iframe跨域问题
            )
        } else {
            //当子页面弹框关时
            document.getElementsByClassName('dialog-parent-iframe')[0].style.display = 'none '
            //恢复样式
            document.getElementById('parentDiv').style.position = 'unset'
            document.getElementById('bdIframe').style.position = 'unset'
            document.getElementById('bdIframe').style.zIndex = 'unset'
        }
    }
}
</script>

<style lang="scss" scoped>
.parent {
    width: 100%;
    height: 100%;
}
</style>
