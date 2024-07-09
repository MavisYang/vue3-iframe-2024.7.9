<!--
 * @Author: yangmiaomiao
 * @Date: 2024-02-27 09:29:55
 * @LastEditors: yangmiaomiao
 * @LastEditTime: 2024-05-24 14:41:14
 * @Description: 
-->
<template>
    <div class="motior-tps-chart card mb-10" :class="className">
        <div class="flx-justify-between">
            <Title title="热点TPS" />
            <div class="tps-motior-search flx-align-center">
                <el-date-picker
                    v-model="date"
                    type="date"
                    placeholder="请选择时间"
                    format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD"
                    :disabled-date="disabledDate"
                    :shortcuts="shortcuts"
                    :clearable="false"
                    style="width: 160px; margin-right: 8px"
                    @change="handleChange"
                />
                <el-select v-model="selectType" placeholder="请选择" @change="handleChange" style="width: 80px">
                    <el-option
                        v-for="item in DATE_TIME_TYPE"
                        :key="item.dictCode"
                        :label="item.dictName"
                        :value="item.dictCode"
                    />
                </el-select>
            </div>
        </div>
        <div class="tps-motior-chart" v-loading="loading">
            <HotTpsChart :echartData="echartData" color="#FFA600" gradientColors="rgba(254, 219, 101,0.1)" />
        </div>
    </div>
</template>

<script setup lang="ts" name="TPSEcharts">
import { ref, reactive, watch, onMounted, onUnmounted } from 'vue'
import Title from '@/views/dataMonitor/components/Title.vue'
import HotTpsChart from '@/views/dataMonitor/components/HotTpsChart.vue'
import { DATE_TIME_TYPE } from '@/views/dataMonitor/enums'
import moment from 'moment'

interface PropsType {
    initApi?: (params: any) => Promise<any>
    api?: (params: any) => Promise<any>
    className?: string
    params?: any
    type?: string
}
const props = withDefaults(defineProps<PropsType>(), {
    params: {},
    type: 'details',
})
const shortcuts = [
    {
        text: '今天',
        value: new Date(),
    },
    {
        text: '昨天',
        value: () => {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            return date
        },
    },
    {
        text: '一周前',
        value: () => {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            return date
        },
    },
]

const loading = ref(false)
const echartData = reactive({
    xData: [],
    yData: [],
})

const date = ref(moment().format('YYYY-MM-DD'))

const selectType = ref(2) //1表示时，2表示分，3表示秒
const setInterDelay = {
    3: {
        time: 1000,
        func: (val: string) => moment(val).format('HH:mm:ss'),
        name: '每秒',
        format: 'HH:mm:ss',
    },
    2: {
        time: 60 * 1000,
        func: (val: string) => moment(val).format('HH:mm'),
        name: '每分',
        format: 'HH:mm',
    },
    1: {
        time: 60 * 60 * 1000,
        func: (val: string) => moment(val).format('HH'),
        name: '每时',
        format: 'HH',
    },
}

// 定时器轮询
const timer = ref<any>(null)

watch(
    () => props.params,
    (newVal) => {
        console.log('watch', Object.keys(newVal).length)
        if (Object.keys(newVal).length > 0) setInterGetData()
    },
    { deep: true },
)
onMounted(() => {
    console.log('挂载了')
    if (props.type !== 'details') setInterGetData()
})
onUnmounted(() => {
    console.log('卸载了')
    window.clearInterval(timer.value)
})

const setInterGetData = () => {
    window.clearInterval(timer.value)
    loading.value = true
    generateData() //初始化数据
    if (moment().format('YYYY-MM-DD') === date.value) {
        getItervalData() //定时数据
    }
}

// 过去时间不轮询
const getItervalData = () => {
    timer.value = window.setInterval(() => {
        setTimeout(() => {
            getPollingData()
        }, 0)
    }, setInterDelay[selectType.value].time)
}

// 手动mock返回的数据
const generateData = async () => {
    const { format } = setInterDelay[selectType.value]
    const nowTime = moment().format(format)
    // const { resourceId, categoryType, isHot, resourceType } = props.params
    const paramsData = {
        date: nowTime,
        timeType: selectType.value,
        ...props.params,
    }

    console.log(paramsData, '2')
    // const { data } = await props.initApi && props.initApi(paramsData)

    // ========== 自定义
    const { time, func } = setInterDelay[selectType.value]
    let currentDay = date.value !== moment().format('YYYY-MM-DD'), //是否是当天时间
        startDate = date.value + ' 00:00:00', //开始时间
        endDate = currentDay ? date.value + ' 23:59:59' : new Date(), //结束时间
        countTimeCha = new Date(startDate).getTime() - new Date(endDate).getTime(), //开始时间和结束时间毫秒差
        countDelay = Math.abs(countTimeCha / time).toFixed(), //根据秒分时，确定x轴的时间长度
        count = currentDay ? Number(countDelay) : Number(countDelay) - 1 //当天时间取上一秒分时，过去的时间取全部
    // count = 86400 //当天时间取上一秒分时，过去的时间取全部
    console.log(count, 'count')

    let timeDelay = +new Date(startDate)
    let baseValue = Math.random() * 1000
    let smallBaseValue = 0
    function next(idx: number) {
        smallBaseValue = idx % 30 === 0 ? Math.random() * 700 : smallBaseValue + Math.random() * 500 - 250
        baseValue += Math.random() * 20 - 10
        return Math.max(0, Math.round(baseValue + smallBaseValue) + 3000)
    }

    const categoryData: any = []
    const valueData: any = []
    for (let i = 0; i < count; i++) {
        categoryData.push(func(timeDelay))
        valueData.push(next(i).toFixed(2))

        timeDelay += time
    }

    // ============
    echartData.xData = []
    echartData.xData = categoryData
    echartData.yData = []
    echartData.yData = valueData
    loading.value = false

    // console.log(echartData.xData, 'categoryData')
    // console.log(echartData.yData, 'valueData')
}
const getPollingData = async () => {
    const { format } = setInterDelay[selectType.value]
    const nowTime = moment().format(format)
    // const { resourceId='', categoryType, isHot, resourceType } = props.params
    const paramsData = {
        date: nowTime,
        timeType: selectType.value,
        ...props.params,
    }

    console.log(echartData.xData[echartData.xData.length - 1], 'last')

    console.log(paramsData, '1')

    // const { data } = await props.api && props.api(paramsData)
    const data: any = {
        xData: [nowTime],
        yData: [Math.random().toString().slice(2, 6)],
    }
    // console.log(data.xData[0], 'nowTime')

    echartData.xData = echartData.xData.concat(data.xData)
    echartData.yData = echartData.yData.concat(data.yData)
    loading.value = false
}

const disabledDate = (time: Date) => {
    return time.getTime() > Date.now()
}

const handleChange = () => {
    echartData.xData = []
    echartData.yData = []
    setInterGetData()
}
</script>

<style scoped lang="scss">
.motior-tps-chart {
    flex: 1 1 auto;
    // width: 100%;
    height: 100%;
}
.tps-motior-chart {
    width: 100%;
    height: calc(100% - 32px);
}
</style>
