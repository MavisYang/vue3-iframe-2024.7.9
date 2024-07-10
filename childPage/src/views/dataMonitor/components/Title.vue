<!--
 * @Author: yangmiaomiao
 * @Date: 2024-02-19 09:27:21
 * @LastEditors: yangmiaomiao
 * @LastEditTime: 2024-05-13 11:06:44
 * @Description: 
-->
<template>
    <div class="monitor-title" :class="className" :style="style">
        {{ title }}
    </div>
</template>

<script setup lang="ts">
import { CSSProperties } from 'vue'

interface Props {
    title: string
    style?: CSSProperties
    className?: string
}
withDefaults(defineProps<Props>(), {
    title: '默认标题',
    style: () => ({}),
    className: '',
})
</script>

<style scoped lang="scss">
.monitor-title {
    font-size: 15px;
    font-weight: bold;
}
</style>
