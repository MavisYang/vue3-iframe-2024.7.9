<template>
    <div class="echarts">
        <ECharts :option="option" :dataZoom="true" />
    </div>
</template>

<script setup lang="ts">
import { reactive, watch, onMounted } from 'vue'
import ECharts from '@/components/ECharts/index.vue'
import { ECOption } from '@/components/ECharts/config'

interface Props {
    echartData: any
    color?: string
    gradientColors?: string
    date?: string
}

const props = withDefaults(defineProps<Props>(), {
    color: '#FFA600',
    gradientColors: 'rgba(254, 219, 101,0.1)',
})
const data = reactive({
    xAxisData: [],
    yAxisData: [],
    colors: ['#FFA600', '#007AFE', '#FF4B7A'],
    gradientColors: ['rgba(254, 219, 101,0.1)', 'rgba(0, 122, 254,0.1)', 'rgba(255, 75, 122, 0.1)'],
})
const option = reactive<ECOption>({
    xAxis: {
        type: 'category',
        name: '时间',
        boundaryGap: false,
        axisLabel: {
            padding: 0,
            fontSize: 12,
            formatter: function (value) {
                //刻度标签的内容格式器，支持字符串模板和回调函数两种形式
                // return value + "kg";
                return value
            },
        },
        axisTick: {
            show: false,
        },
        data: [],
    },
    yAxis: {
        name: '值',
        nameTextStyle: {
            fontSize: 12,
            padding: [0, 30, 0, 0],
        },
        splitLine: {
            show: true,
        },
    },

    grid: {
        top: '20%',
        left: '10%',
        right: '10%',
        bottom: '40%',
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'none', //cross
        },
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        formatter: (params: any) => {
            let str = ''
            params.forEach((val: { color: string; name: string; axisValue: string; data: number }) => {
                str += `
						<div class="tooltip-item">
							<div class="tooltip-name">${val.name}</div>
							<div class="tooltip-value">
								<span class="tooltip-dot" style="background-color: ${val.color};"></span>
								<span class="tooltip-num">${val.data}</span>
							</div>
						</div>`
            })
            const dom = `
		            <div class="annual-tooltip">
		               ${str}
		            </div>
		          `
            return dom
        },
    },
    dataZoom: [
        {
            type: 'inside', //内置型数据区域缩放组件
            show: true, //是否显示
            realtime: true, //拖动时，是否实时更新系列的视图
            // start: this.start, //伸缩条开始位置（1-100），可以随时更改
            // end: this.end, //伸缩条结束位置（1-100），可以随时更改
            start: 90,
            end: 100,
        },
        {
            type: 'slider', //滑动条型数据区域缩放组件
            show: true, //是否显示
            realtime: true, //拖动时，是否实时更新系列的视图
            // start: this.start, //伸缩条开始位置（1-100），可以随时更改
            // end: this.end, //伸缩条结束位置（1-100），可以随时更改
            start: 90,
            end: 100,
        },
    ],

    series: {
        data: [],
        type: 'line',
        sampling: 'average', //降采样渲染
        smooth: true,
        showSymbol: false,
        lineStyle: {
            width: 1,
            color: props.color,
        },
        itemStyle: {
            color: props.color,
            borderColor: '#646ace',
            borderWidth: 2,
        },
        areaStyle: {
            color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                    {
                        offset: 0,
                        color: props.color,
                    },
                    {
                        offset: 1,
                        color: props.gradientColors,
                    },
                ],
                global: false,
            },
            shadowColor: 'rgba(25,163,223, 0.3)',
            shadowBlur: 20,
        },
    },
})
onMounted(() => {
    setOptionSeries()
})

watch(
    () => props.echartData,
    () => {
        setOptionSeries()
    },
    { deep: true },
)

const setOptionSeries = () => {
    const annualData = JSON.parse(JSON.stringify(props.echartData))
    const { xData, yData } = annualData
    data.xAxisData = xData
    data.yAxisData = yData

    option.xAxis.data = xData
    option.series.data = yData
}
</script>
<style lang="scss" scoped>
.echarts {
    width: 100%;
    height: 100%;
}
:deep(.annual-tooltip) {
    .tooltip-item {
        .tooltip-value {
            display: flex;
            align-items: center;
        }

        .tooltip-dot {
            display: block;
            width: 8px;
            height: 8px;
            margin-right: 4px;
            border-radius: 50%;
        }
        .tooltip-name {
            font-size: 12px;
        }
        .tooltip-num {
            font-size: 12px;
            // transform: scale(0.8);
        }
    }
}
</style>
