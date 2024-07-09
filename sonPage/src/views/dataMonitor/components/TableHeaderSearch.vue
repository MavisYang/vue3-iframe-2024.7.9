<!--
 * @Author: yangmiaomiao
 * @Date: 2024-05-20 17:16:57
 * @LastEditors: yangmiaomiao
 * @LastEditTime: 2024-05-21 20:30:27
 * @Description: 
-->
<template>
    <!-- <el-table-column :prop="prop" align="center">
        <template #header>
            <span class="flx-center">
                {{ label }}{{ '--' }}
                <el-icon style="cursor: pointer"><Search color="#909399" /></el-icon>
            </span>
            <el-popover placement="bottom" title="请选择" width="200" trigger="hover">
                <el-select :model-value="searchValue" placeholder="请选择">
                    <el-option v-for="item in options" :key="item.value" :label="item.text" :value="item.value">
                    </el-option>
                </el-select>
            </el-popover>
        </template>
        <template #default="{ row }">
            {{ getNameByCode(options, row[prop], 'value', 'text') }}
        </template>
    </el-table-column> -->
    <el-popover popper-class="table-header-popover" placement="bottom" width="382" :visible="visible">
        <template #reference>
            <el-icon style="cursor: pointer"><Filter color="#909399" /></el-icon>
        </template>
        <div class="header-table-popover">
            <div class="header-table-popover-search">
                <span>筛选条件</span>
                <span>X</span>
            </div>
            <div class="header-table-popover-search flex-center">
                <span>{{ '资源类型:1' }}</span>
                <el-select :model-value="searchValue" placeholder="请选择">
                    <el-option v-for="item in options" :key="item.value" :label="item.text" :value="item.value" />
                </el-select>
            </div>
            <div class="header-table-popover-footer">
                <el-button type="primary">重置</el-button>
                <el-button type="primary">确定</el-button>
            </div>
        </div>
    </el-popover>
</template>

<script setup lang="ts" name="TableHeaderSearch">
import { getNameByCode } from '@/utils/index'

import { CSSProperties } from 'vue'
import { ref } from 'vue'

interface Props {
    prop: string
    label: string
    searchValue?: string
    style?: CSSProperties
    className?: string
    options?: any[]
}
withDefaults(defineProps<Props>(), {
    searchValue: '',
})
const visible = ref(false)

// const emits = defineEmits(['update:value'])

// // 点击头部🔍
// const handleClick = () => {}

// const handleChange = (value) => {
//     emits('update:value', value)
// }
</script>

<style lang="scss">
.table-header-popover {
    padding: 0 !important;
}
</style>
