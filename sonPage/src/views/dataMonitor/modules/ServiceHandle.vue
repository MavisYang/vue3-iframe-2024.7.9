<!--
 * @Author: yangmiaomiao
 * @Date: 2024-03-07 15:06:21
 * @LastEditors: yangmiaomiao
 * @LastEditTime: 2024-05-13 11:03:33
 * @Description: 
-->
<template>
    <div class="service-handle-view card mb-10">
        {{ name }}
        <Title title="热点处理引擎1" />
        <div class="sh-box" v-loading="loading">
            <template v-for="item in serviceList.list" :key="item.ip">
                <div class="sh-item" :class="['sh-item-status-' + item.status]">
                    <p class="flx-justify-between">
                        <span class="name">{{ item.name }}</span>
                        <span class="proport">
                            {{ filterProportion(item.proportion) }}
                            <el-icon>
                                <CaretTop v-if="item.proportion > 0" color="#67C23A" />
                                <CaretBottom v-else color="#F56C6C" />
                            </el-icon>
                        </span>
                    </p>
                    <p class="num">{{ item.num }}</p>
                    <p class="sh-item-mack">IP： {{ item.ip }}</p>
                </div>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts" name="ServiceHandle">
import { ref, onMounted, reactive, onUnmounted, inject } from 'vue'
// import { getHandleEngine } from '@/api/modules/hotspot'
import Title from '../components/Title.vue'

// 接收顶层组件的通信
const name = inject('name')

interface LIST {
    name: string
    status: string | number
    num: number //频繁程度
    proportion: 0.3 //相比前一天增加减少的比例
    [key: string]: any
}
interface ServiceProps {
    [key: string]: any
    list: LIST[]
}
// const props = withDefaults(defineProps<{}>(), {})
const serviceList = reactive<ServiceProps>({
    list: [],
})
const timer = ref()
const loading = ref(false)

onMounted(() => {
    getData()

    timer.value = window.setInterval(() => {
        setTimeout(() => {
            getData()
        }, 0)
    }, 1000)
})
onUnmounted(() => {
    window.clearInterval(timer.value)
})
const getData = async () => {
    loading.value = true
    // const res: any = await getHandleEngine({});
    // if (res.code === 200) {
    //     serviceList.list = res.data;
    // }
    serviceList.list = []
    loading.value = false
}

const filterProportion = (proportion: number) => {
    // let str = Number(proportion * 100).toFixed(1);
    // let num = Number(str);
    let num = Number(proportion)
    if (num > 0) {
        return num.toString() + '%'
    } else {
        return num.toString().slice(1) + '%'
    }
}
</script>

<style lang="scss" scoped>
$itemMargin: 16px;
.service-handle-view {
    flex: none;
    width: 40%;
    height: 260px;
    margin-right: 10px;
    .sh-box {
        display: flex;
        flex-wrap: wrap;
    }
    .sh-item {
        position: relative;
        width: calc((100% / 2) - ($itemMargin / 2));
        // flex: auto;
        padding: 12px;
        margin-right: $itemMargin;
        margin-top: $itemMargin;
        box-shadow: 0 0 12px rgb(0 0 0 / 5%);
        font-size: 12px;
        border-radius: 6px;
        background-color: var(--el-color-success-light-9);

        &:hover {
            cursor: pointer;
            background-color: var(--el-color-success-light-8);

            .sh-item-mack {
                opacity: 1;
            }
        }

        &:nth-child(2n) {
            margin-right: 0;
        }
        .name {
            font-size: 14px;
            color: var(--el-color-info);
        }
        .proport {
            font-size: 12px;
            color: var(--el-color-info-dark-2);
            display: inline-flex;
            align-items: center;
        }
        .num {
            font-size: 20px;
            font-weight: bold;
            font-family: KaiTi;
            margin-top: 12px;
        }
    }

    // 关闭
    .sh-item-status-0 {
        background-color: var(--el-color-info-light-9);
        &:hover {
            background-color: var(--el-color-info-light-8);
        }
    }

    .sh-item-mack {
        opacity: 0;
        position: absolute;
        width: 100%;
        left: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.3);
        color: #fff;
        padding: 6px 10px;
        transition: all 0.3s ease-in-out;
    }
}
</style>
