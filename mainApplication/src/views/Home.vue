<!--
 * @Author: yangmiaomiao
 * @Date: 2024-06-15 14:51:12
 * @LastEditors: yangmiaomiao
 * @LastEditTime: 2024-07-08 16:27:37
-->
<template>
    <div class="home-view">
        <div class="home-container">
            <div class="home-box">
                <div class="home-desc">
                    <p class="title">{{ title }}</p>
                    <p class="subtitle">
                        <!-- 整合了开箱即用的技术组件，提高了独立的运行服务，提高了为迈向智能运维时代提供组件型能力和服务型能力。 -->
                        开箱即用的技术组件，大大提高了各个支撑平台的独立服务运行能力，
                        <br />
                        接轨智能运维时代。
                    </p>
                </div>
                <div class="home-nav">
                    <div class="home-nav-item" v-for="item in microApp" :key="item.path" @click="toPath(item.path)">
                        <p class="item-title">
                            <span :class="['iconfont', 'nav-icon', item.icon]"></span>
                            <span>{{ item.title }}</span>
                        </p>
                        <p class="item-subtitle">{{ item.subTitle }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const title = ref('新一代分布式核心系统')
const router = useRouter()
const microApp = computed(() => router.options.routes.filter((v) => v.name !== 'home' && v.path !== '/'))

const toPath = (path) => {
    router.push(path)
}
</script>

<style lang="scss" scoped>
.home-view {
    position: relative;
    width: 100vw;
    height: 100vh;
}
.home-container {
    width: 100%;
    height: 100%;
    background: url('@/assets/images/home-bg.png') no-repeat;
    background-size: cover;
}
.home-box {
    position: absolute;
    left: 20%;
    top: 20%;
}
.home-desc {
    padding-bottom: 200px;

    .title {
        font-size: 30px;
        font-weight: 600;
        color: var(--ep-menu-text-color);
        padding-bottom: 16px;
    }
    .subtitle {
        font-size: 14px;
        color: var(--ep-text-color-secondary);
    }
}

.home-nav {
    display: flex;
    flex-wrap: wrap;
}
.home-nav-item {
    border: 1px solid var(--ep-color-primary-light-8);
    background-color: rgba(255, 255, 255, 0.6);
    border-radius: 4px;
    margin-right: 32px;
    margin-bottom: 16px;
    cursor: pointer;
    width: 156px;
    height: 76px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 18px;

    &:hover {
        background-color: var(--ep-color-primary-light-9);
    }
}

.item-title {
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 400;
    padding-bottom: 6px;
    color: var(--ep-color-primary); //#409eff

    .nav-icon {
        margin-right: 10px;
        font-size: 14px !important;
    }
}
.item-subtitle {
    font-size: 12px;
    color: var(--ep-text-color-secondary);
}
</style>
