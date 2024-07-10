<!--
 * @Author: yangmiaomiao
 * @Date: 2024-03-18 08:45:46
 * @LastEditors: yangmiaomiao
 * @LastEditTime: 2024-05-20 15:24:09
 * @Description: 
-->
<template>
    <div id="echarts" ref="chartRef" :style="echartsStyle" />
</template>

<script setup lang="ts" name="ECharts">
import { ref, onMounted, onBeforeUnmount, watch, computed, markRaw, nextTick } from 'vue'
import { EChartsType, ECElementEvent } from 'echarts/core'
import echarts, { ECOption } from './config'
import { useDebounceFn } from '@vueuse/core'
import { useGlobalStore } from '@/stores/modules/global'
import { storeToRefs } from 'pinia'

interface Props {
    option: ECOption
    renderer?: 'canvas' | 'svg'
    resize?: boolean
    theme?: Object | string
    width?: number | string
    height?: number | string
    onClick?: (event: ECElementEvent) => any
    dataZoom?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    renderer: 'canvas',
    resize: true,
    dataZoom: false,
})

const echartsStyle = computed(() => {
    return props.width || props.height
        ? { height: props.height + 'px', width: props.width + 'px' }
        : { height: '100%', width: '100%' }
})

const chartRef = ref<HTMLDivElement | HTMLCanvasElement>()
const chartInstance = ref<EChartsType>()
const options = ref(props.option)

const draw = () => {
    if (chartInstance.value) {
        chartInstance.value.setOption(props.option, { notMerge: true })

        if (props.dataZoom)
            chartInstance.value.on('datazoom', (params: any) => {
                let start = 0,
                    end = 0
                start = params.batch ? params.batch[0].start : params.start
                end = params.batch ? params.batch[0].end : params.end
                options.value.dataZoom[0].start = start
                options.value.dataZoom[0].end = end
                options.value.dataZoom[1].start = start
                options.value.dataZoom[1].end = end
            })
    }
}

watch(props, () => {
    options.value = props.option
    draw()
})

onMounted(() => {
    draw()
})

const handleClick = (event: ECElementEvent) => props.onClick && props.onClick(event)

const init = () => {
    if (!chartRef.value) return
    chartInstance.value = echarts.getInstanceByDom(chartRef.value)
    if (!chartInstance.value) {
        chartInstance.value = markRaw(
            echarts.init(chartRef.value, props.theme, {
                renderer: props.renderer,
            }),
        )
        chartInstance.value.on('click', handleClick)
        draw()
    }
}

const resize = () => {
    if (chartInstance.value && props.resize) {
        chartInstance.value.resize({ animation: { duration: 300 } })
    }
}

const debouncedResize = useDebounceFn(resize, 300, { maxWait: 800 })

const globalStore = useGlobalStore()
const { maximize, isCollapse, tabs, footer } = storeToRefs(globalStore)

watch(
    () => [maximize, isCollapse, tabs, footer],
    () => {
        debouncedResize()
    },
    { deep: true },
)

onMounted(() => {
    nextTick(() => init())
    window.addEventListener('resize', debouncedResize)
})

onBeforeUnmount(() => {
    chartInstance.value?.dispose()
    window.removeEventListener('resize', debouncedResize)
})

defineExpose({
    getInstance: () => chartInstance.value,
    resize,
    draw,
})
</script>
