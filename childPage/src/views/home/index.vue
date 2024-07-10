<!--
 * @Author: yangmiaomiao
 * @Date: 2024-01-15 09:38:07
 * @LastEditors: yangmiaomiao
 * @LastEditTime: 2024-07-08 10:20:41
 * @Description: 
-->

<template>
    <div class="welPage main-padding">
        <div class="card">
            <ul class="title">
                <li class="flx-align-center">
                    <SvgIcon name="#smile" size="40px" color="#e6a23c" :iconStyle="{ marginLeft: '-2px' }" />
                    <!-- <span class="welWord">hi {{ userStore.userInfo?.userName }}，欢迎使用“源启”——热点资源平台！</span> -->
                    <span class="welWord">hi ，欢迎使用“源启”——热点资源平台！</span>
                </li>
                <!-- <li class="mt-10">{{ helloWords }}</li> -->
            </ul>
            <!-- <ul>
                <li>
                    项目概要
                    热点资源场景的特点是高并发下对同一个资源数据修改产生竞争的状态，为了保证热点资源数据高并发计算的正确性，每次更新表需要通过加锁来控制，
                    每个加锁的事务执行时间过长，就会导致热点资源排队等待，故而形成热点资源问题，形成应用系统交易的瓶颈。
                    热点资源总体解决思路是以同步止付代替更新、异步汇总更新热点资源的主余额的方式。
                    采用的方案是采用延时记录热点数据的策略，将热点资源竞态条件的判断和热点资源数据的更新两个步骤进行分离，
                    这样做可以使单个事务的执行时间减少，等待锁的时间减少，从而提高单位时间可执行的并发数，从而提高并发能力。
                </li>
                <li>
                    项目目标 实现热点资源功能点的技术组件需具有广泛的适用性，满足交易流程中各类热点资源的并发要求，
                    同时应避免与业务流程耦合，保证热点账号和普通账号的业务流程的一致性，热点账号和普通账号能做通的业务场景要保持一致。
                    涉及资金的处理不能发生资损涉及额度的处理不能发生超额。
                    热点处理性能方面，单个热点资源支持不低于1000TPS，热点场景和非热点场景单笔平均耗时持平。
                </li>
                <li>高并发\同步止付</li>
            </ul> -->
            <div class="block">
                <ul class="item">
                    <li class="symbol flx-center">
                        <SvgIcon name="#anquan" size="40px" color="#1d70f5" />
                    </li>
                    <li class="text">助力打造企业级技术平台</li>
                </ul>
                <ul class="item">
                    <li class="symbol flx-center">
                        <SvgIcon name="#zhineng" size="40px" color="#1d70f5" />
                    </li>
                    <li class="text">助力实现应用技术架构迁移</li>
                </ul>
                <ul class="item">
                    <li class="symbol flx-center">
                        <SvgIcon name="#xiaolv" size="40px" color="#1d70f5" />
                    </li>
                    <li class="text">支撑建设新一代核心系统</li>
                </ul>
                <ul class="item">
                    <li class="symbol flx-center">
                        <SvgIcon name="#chuangxin" size="40px" color="#1d70f5" />
                    </li>
                    <li class="text">助力加速数字化转型</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import dayjs from 'dayjs'
import SvgIcon from '@/components/SvgIcon/index.vue'
// import { useUserStore } from '@/stores/modules/user'
// const userStore = useUserStore()
const helloWords = ref()

onMounted(() => {
    times()
})

const times = () => {
    let dayjs_ = dayjs().hour()
    let words = ''
    dayjs_ < 7
        ? (words = '现在是凌晨')
        : dayjs_ < 9
        ? (words = '早上好!')
        : dayjs_ < 12
        ? (words = '上午好！')
        : dayjs_ < 14
        ? (words = '中午好！')
        : dayjs_ < 17
        ? (words = '下午好！')
        : dayjs_ < 18
        ? (words = '下午好!')
        : dayjs_ < 23
        ? (words = '晚上好！')
        : dayjs_ == 24
        ? (words = '夜已深！')
        : ''

    helloWords.value = words
}
</script>

<style lang="scss">
.welPage {
    width: 100%;
    height: 100%;
    & > div {
        width: 100%;
        height: 100%;
    }

    .title {
        color: #666;
        padding-top: 32px;

        @media (max-width: 1367px) {
            padding-left: 30px;
            font-size: 20px;
        }
        @media (min-width: 1367px) and (max-width: 1921px) {
            padding-left: 40px;
            font-size: 25px;
        }
        @media (min-width: 1921px) {
            padding-left: 40px;
            font-size: 26px;
        }
    }
    .welWord {
        margin-left: 6px;
    }
    .block {
        width: 100%;
        display: flex;
        color: #1d70f5;
        margin: 60px 0;

        .item {
            width: calc(100% / 4);
            min-width: 150px;
            height: 380px;
            margin: 0 2%;
            border-radius: 8px;
            border: 1px solid #d1d3f0;
            background-color: #fff;
            box-shadow: 0 12px 10px -10px rgba(0, 0, 0, 0.1), 0 -12px 10px -10px rgba(0, 0, 0, 0.1),
                12px 0 10px -10px rgba(0, 0, 0, 0.1), -12px 0 10px -10px rgba(0, 0, 0, 0.1);

            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        .symbol {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            margin: 30px auto;
            background-color: #f2f2f2;
            box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
        }
        .text {
            font-size: 30px;
            margin: 30px 32px;
            text-align: center;
            @media (max-width: 1367px) {
                font-size: 20px;
            }
            @media (min-width: 1367px) and (max-width: 1921px) {
                font-size: 28px;
            }
            @media (min-width: 1921px) {
                font-size: 30px;
            }
        }
    }
}
</style>
