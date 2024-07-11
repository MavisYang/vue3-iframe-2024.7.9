<!--
 * @Author: yangmiaomiao
 * @Date: 2024-03-18 08:45:46
 * @LastEditors: yangmiaomiao
 * @LastEditTime: 2024-07-11 14:49:01
 * @Description: 
-->
<template>
    <el-dialog
        v-model="dialogVisible"
        title="修改密码"
        width="500px"
        draggable
        :modal-class="modalClass"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :destroy-on-close="true"
        append-to-body
    >
        <span>This is Password</span>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="closeDialog">取消</el-button>
                <el-button type="primary" @click="closeDialog">确认</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { dialogPostMessage } from '@/utils/postMessage'

const modalClass = ref('password-dialog-iframe')
const dialogVisible = ref(false)
const openDialog = () => {
    dialogVisible.value = true
    dialogPostMessage(true, modalClass.value)
}

const closeDialog = () => {
    dialogVisible.value = false
    dialogPostMessage(false, modalClass.value)
}
defineExpose({ openDialog })
</script>
