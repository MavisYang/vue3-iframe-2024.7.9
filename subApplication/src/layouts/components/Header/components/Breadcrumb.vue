<template>
    <div :class="['breadcrumb-box ', !globalStore.breadcrumbIcon && 'no-icon']">
        <el-breadcrumb separator="/">
            <!-- :separator-icon="ArrowRight" -->
            <transition-group name="breadcrumb">
                <el-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="`${item.path}_${index}`">
                    <div
                        class="el-breadcrumb__inner is-link"
                        :class="{ 'item-no-icon': !item.meta.icon }"
                        @click="onBreadcrumbClick(item, index)"
                    >
                        <el-icon v-if="item.meta.icon && globalStore.breadcrumbIcon" class="breadcrumb-icon">
                            <component :is="item.meta.icon"></component>
                        </el-icon>
                        <span class="breadcrumb-title">{{ item.meta.title }}</span>
                    </div>
                </el-breadcrumb-item>
            </transition-group>
        </el-breadcrumb>
    </div>
</template>

<script setup lang="ts" name="Breadcrumb">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
// import { ArrowRight } from '@element-plus/icons-vue'
import { useAuthStore } from '@/stores/modules/auth'
import { useGlobalStore } from '@/stores/modules/global'
// import { HOME_URL } from '@/config'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const globalStore = useGlobalStore()

interface Props {
    breadCrumb?: any[] //手动添加面包屑内容
}
const props = withDefaults(defineProps<Props>(), {
    breadCrumb: () => [],
})

const breadcrumbList = computed(() => {
    let breadcrumbData =
        props.breadCrumb?.length > 0
            ? [...props.breadCrumb]
            : authStore.breadcrumbListGet[route.matched[route.matched.length - 1].path] ?? []
    // 🙅‍♀️不需要首页面包屑可删除以下判断
    // if (breadcrumbData[0].path !== HOME_URL) {
    //     breadcrumbData = [{ path: HOME_URL, meta: { icon: 'HomeFilled', title: '首页' } }, ...breadcrumbData]
    // }
    return breadcrumbData
})

// Click Breadcrumb
const onBreadcrumbClick = (item: Menu.MenuOptions, index: number) => {
    if (props.breadCrumb?.length > 0) {
        item.path && router.push(item.path)
    }
    if (index !== breadcrumbList.value.length - 1) {
        router.push(item.path)
    }
}
</script>

<style scoped lang="scss">
.breadcrumb-box {
    position: sticky;
    top: 0;
    z-index: 9999;
    display: flex;
    align-items: center;
    overflow: hidden;
    padding: 12px 0 4px 16px;
    background-color: var(--el-bg-color-page);
    .el-breadcrumb {
        white-space: nowrap;
    }
    .el-breadcrumb__item {
        position: relative;
        display: inline-block;
        float: none;
        .item-no-icon {
            transform: translateY(-3px);
        }
        .el-breadcrumb__inner {
            display: inline-flex;
            &.is-link {
                &:hover {
                    color: var(--el-color-primary);
                }
            }
            .breadcrumb-icon {
                margin-top: 1px;
                margin-right: 6px;
                font-size: 16px;
            }
            .breadcrumb-title {
                margin-top: 2px;
            }
        }
        &:last-child .el-breadcrumb__inner,
        &:last-child .el-breadcrumb__inner:hover {
            color: var(--el-header-text-color-regular);
        }
        :deep(.el-breadcrumb__separator) {
            transform: translateY(-1px);
        }
    }
}
// separator="/"
.no-icon {
    .el-breadcrumb {
        .el-breadcrumb__item {
            top: -2px;
            :deep(.el-breadcrumb__separator) {
                top: 4px;
            }
            .item-no-icon {
                transform: translateY(0);
            }
        }
    }
}
</style>
