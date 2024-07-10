<!--
 * @Author: yangmiaomiao
 * @Date: 2024-01-15 09:47:17
 * @LastEditors: yangmiaomiao
 * @LastEditTime: 2024-05-21 17:06:11
 * @Description: 
-->
<template>
    <div class="data-montior main-padding">
        <TPSEcharts :api="getTpsData" :initApi="getInitTpsData" type="list" />
        <TopList />
    </div>
</template>

<script setup lang="ts">
import { ref, provide } from 'vue'
import TPSEcharts from '@/views/dataMonitor/components/TPSEcharts.vue'
import TopList from './modules/TopList.vue'
import { getTpsData, getInitTpsData } from '@/api/modules/hotspot'
const title = ref('title1')
// 向后代组件提供数据, 只要是后代都能接收
provide('name', title.value)
</script>

<style lang="scss" scoped>
$chartH: 320px;
.motior-tps-chart {
    width: 100%;
    height: $chartH;
}
.monitor-top-list {
    width: 100%;
    height: calc(100% - $chartH);
}

/*slide-fade-transform*/
.slide-fade-enter-active {
    transition: all 0.3s ease-out;
}
.slide-fade-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateX(100%);
    opacity: 0;
}
</style>
