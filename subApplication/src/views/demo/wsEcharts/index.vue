<!--
 * @Author: yangmiaomiao
 * @Date: 2024-02-27 09:29:55
 * @LastEditors: yangmiaomiao
 * @LastEditTime: 2024-04-16 14:24:44
 * @Description: 
-->
<template>
    <div class="motior-tps-chart card mb-10">
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
            <!-- v-if="
					type === 1 ? config.echartData.length > 0 : echartData?.length > 0
				" -->
            <HotTpsChart
                :echartData="type === 1 ? config.echartData : echartData"
                :date="date"
                color="#FFA600"
                gradientColors="rgba(254, 219, 101,0.1)"
            />
        </div>

        <!-- {{ config.num }}
		{{ config.echartData }} -->
    </div>
</template>

<script setup lang="ts" name="TPSEcharts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import Title from '@/views/dataMonitor/components/Title.vue'
import HotTpsChart from '@/views/dataMonitor/components/HotTpsChart.vue'
import { parseTime } from '@/utils'
import { DATE_TIME_TYPE } from '@/views/dataMonitor/enums'
import WebSocketBean from '@/utils/websocket/WebSocketBean'
import { IWebSocketBeanParam } from '@/utils/websocket/websocket'

const props = withDefaults(defineProps<{ api?: (params: any) => Promise<any> }>(), {})

const type = ref(2)
const loading = ref(false)
const echartData = ref<any[]>([])
const date = ref(parseTime(new Date().getTime(), '{y}-{m}-{d}') ?? '')
const selectType = ref('ss')
const setInterDelay = {
    ss: {
        time: 1000,
        func: (val: string) => val.slice(-8),
        name: '每秒',
    },
    mm: {
        time: 60 * 1000,
        func: (val: string) => val.slice(0, -3),
        name: '每分',
    },
    hh: {
        time: 60 * 60 * 1000,
        func: (val: string) => val.slice(0, -6),
        name: '每时',
    },
}
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

interface EChartsData {
    label: string
    value: string[]
    [key: string]: any
}

const config = reactive<{
    url: string
    echartData: EChartsData[]
    num: number
}>({
    url: 'ws://localhost:8801/ws',
    echartData: [],
    num: 0,
})

// 获取连接参数，也可以直接写入，这里是因为对地址进行了配置，所以每次连接都更新一次地址
const sendSuffix = ''

const getParam = (gapTime?: number) => {
    //gapTime 切换时间间隔时，需要立即重新链接
    return {
        url: config.url, //连接地址
        needReconnect: true, //是否需要重连，默认为false
        reconnectGapTime: gapTime ? gapTime : setInterDelay[selectType.value].time, //重连间隔时间，默认为30000
        heartGapTime: gapTime ? gapTime : setInterDelay[selectType.value].time, //心跳发送间隔时间，默认为30000
        sendSuffix: sendSuffix, //发送消息后缀，默认为空
        messageSuffix: sendSuffix, //消息后缀，默认为空
        heartSend: '~', //心跳发送内容，默认为heartSend
        heartGet: '~', //心跳接收内容，默认为heartGet
        onopen: () => {
            //生命周期-在建立连接以后首先调用
            console.log('ononpen-连接成功')
        },
        onmessage: (data: any) => {
            //生命周期-在获取到数据以后首先调用
            //在这里写消息处理逻辑
            //这里sp的数据为['{\"code\":\"getData\",\"data\":\"test\"}']
            // console.log(data.data, "onmessage"); //[~1]
            //去掉~字样

            const sp = data.data.split(sendSuffix).filter((el: string) => el.length > 0)

            // console.log("onmessage-接收服务器给到的数据", data.data);
            //将数据
            sp.forEach((ctx: any) => {
                const val = JSON.parse(ctx)
                config.num = val.num
                dealDataFunc(val.list)
            })
        },
        onerror: () => {
            //生命周期-在关闭或者连接异常以后首先调用
            console.log('onerror-连接异常' + config.url)
        },
    } as IWebSocketBeanParam
}

/**
 * websocket示例，主要维护和使用对象
 */
const ws = new WebSocketBean(getParam())
const timer = ref<any>(null)
onMounted(() => {
    console.log('挂载了')
    if (type.value === 1) {
        loading.value = true
        const params = {
            date: date.value,
            type: selectType.value,
        }
        ws.send(JSON.stringify(params))
        start()
    } else {
        setInterGetData()
    }
})
onUnmounted(() => {
    console.log('卸载了')
    window.clearInterval(timer.value)
    close()
})
//开始连接
const start = () => {
    console.log('开始连接wx.start()')
    ws.start(getParam())
}
//断开连接
const close = () => {
    ws.dispose()
    console.log('关闭连接ws.dispose')
}

const dealDataFunc = (data: any) => {
    const newList = data.map((v: EChartsData) => {
        return {
            ...v,
            label: setInterDelay[selectType.value].func(parseTime(v.label)),
        }
    })
    config.echartData.push(...newList.reverse())
    loading.value = false
}
const setInterGetData = () => {
    window.clearInterval(timer.value)
    loading.value = true
    getData()
    timer.value = window.setInterval(() => {
        setTimeout(() => {
            getData()
        }, 0)
    }, setInterDelay[selectType.value].time)
}

const getData = async () => {
    if (props.api) {
        const { data } = await props.api({
            date: date.value,
            type: selectType.value,
        })
        const newList = data.map((v: EChartsData) => {
            return {
                ...v,
                label: setInterDelay[selectType.value].func(v.label),
            }
        })
        echartData.value.push(...newList.reverse())
        loading.value = false
    }
}

const disabledDate = (time: Date) => {
    return time.getTime() > Date.now()
}

const handleChange = () => {
    if (type.value === 1) {
        loading.value = true
        ws.start(getParam(1000))
        config.echartData = []
        setTimeout(() => {
            start()
        }, 2000)
    } else {
        echartData.value = []
        setInterGetData()
    }
}
</script>

<style scoped lang="scss">
.tps-motior-chart {
    width: 100%;
    height: calc(100% - 32px);
}
</style>
