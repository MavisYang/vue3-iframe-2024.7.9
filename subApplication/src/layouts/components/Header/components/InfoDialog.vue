<!--
 * @Author: yangmiaomiao
 * @Date: 2024-03-18 08:45:46
 * @LastEditors: yangmiaomiao
 * @LastEditTime: 2024-07-11 14:48:32
 * @Description: 
-->
<template>
    <el-dialog
        v-model="dialogVisible"
        title="个人信息"
        width="500px"
        draggable
        :modal-class="modalClass"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :destroy-on-close="true"
        append-to-body
        @close="closeDialog"
    >
        <span>This is userInfo</span>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="closeDialog">取消</el-button>
                <el-button type="primary" @click="closeDialog">确认</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { onUnmounted, onMounted, ref } from 'vue'
import { dialogPostMessage, changeDialogStyle } from '@/utils/postMessage'

const dialogVisible = ref(false)
const modalClass = ref('info-dialog-iframe')

const closeDialog = () => {
    dialogVisible.value = false
    dialogPostMessage(false, modalClass.value)
}
const openDialog = () => {
    dialogVisible.value = true
    dialogPostMessage(true, modalClass.value)
}

onMounted(() => {
    dialogPostMessage(dialogVisible.value, modalClass.value) //子页面传值给父页面，记录弹框的visible
    //监听父页面传递的值
    window.addEventListener('message', changeDialogStyle, false)
})

onUnmounted(() => {
    //销毁
    window.removeEventListener('message', changeDialogStyle, false)
})

defineExpose({ openDialog })
</script>
