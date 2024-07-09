<!--
 * @Author: yangmiaomiao
 * @Date: 2024-02-19 09:27:21
 * @LastEditors: yangmiaomiao
 * @LastEditTime: 2024-05-24 09:58:34
 * @Description: top10
-->
<template>
    <div class="monitor-top-list card">
        <div class="monitor-search">
            <div class="monitor-top">
                <Title :title="`热点TOP${searchParam.pageSize}`" />
                <el-dropdown @command="(command) => handleChange('pageSize', command)">
                    <span class="el-dropdown-link">
                        <el-icon class="el-icon--right"><ArrowDownBold /></el-icon>
                    </span>

                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item
                                v-for="item in HOTSPORT_TOP"
                                :tabindex="searchParam.pageSize"
                                :key="item.dictCode"
                                :command="item.dictCode"
                                >{{ item.dictName }}
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </template></el-dropdown
                >
            </div>
            <SearchForm
                classType="default"
                :search="search"
                :reset="reset"
                :columns="columns"
                :search-param="searchParam"
            />
        </div>

        <TableColumns ref="tableRefs" v-loading="loading" :isPageable="false" :tableData="tableData" :columns="columns">
            <template #operation>
                <el-table-column label="操作" fixed="right" align="center">
                    <template #default="{ row }">
                        <span class="primary-text" @click="lookDetails(row)">详情</span>
                    </template>
                </el-table-column>
            </template>
        </TableColumns>
    </div>
</template>

<script setup lang="tsx">
import { ref, onMounted, watch } from 'vue'
import Title from '../components/Title.vue'
import TableColumns from '@/components/TableColumns/index.vue'
import SearchForm from '@/components/SearchForm/index.vue'
import { RESOURCE_TYPE, CATEGORY_TYPE_BALANCE, HOTSPORT_TOP, HOTSPORT_MONITOR_STATUS } from '../enums'
import type { TableInstance } from 'element-plus'
import { ColumnProps, HeaderRenderScope } from '@/components/TableColumns/interface'
import { getTopList } from '@/api/modules/hotspot'
import { useRouter } from 'vue-router'
import { useTable } from '@/hooks/useTable'
import moment from 'moment'

const router = useRouter()
const loading = ref(false)

const startTimeInit = moment().format('YYYY-MM-DD 00:00:00'), // 当天0点
    endTimeInit = moment().format('YYYY-MM-DD HH:mm:ss')

const initSearch = {
    isHot: 1, //1表示热点
    pageSize: 10, //top10 top30
    categoryType: '', //当为热点时：1表示余额、2表示客户限额、3表示产品限额；
    startTime: startTimeInit,
    endTime: endTimeInit,
    dataTime: [startTimeInit, endTimeInit],
}

const tableRefs = ref<TableInstance>()
const { tableData, searchParam, getTableList, search, reset } = useTable(getTopList, initSearch, false)

// 初始化表格数据
onMounted(() => {
    setColumns()
    getTableList()
})

const columns = ref<ColumnProps<any>[]>([
    { label: '序号', type: 'index', width: 120 },
    {
        label: '资源ID',
        prop: 'resourceId',
        headerRender: (scope: HeaderRenderScope<any>) => <span>资源ID</span>,
        type: 'render',
        render: (row: any) => row.resourceId,
    },
    {
        label: '资源类型',
        prop: 'resourceType',
        type: 'enum',
        enum: RESOURCE_TYPE,
        fieldNames: { label: 'text', value: 'value' },
        search: { el: 'select', props: { filterable: false } },
    },
    {
        label: '热点类型',
        prop: 'categoryType',
        type: 'enum',
        enum: CATEGORY_TYPE_BALANCE,
        fieldNames: { label: 'text', value: 'value' },
        search: { el: 'select', props: { filterable: false } },
    },
    {
        label: '热点TPS',
        prop: 'tps',
        sortable: true,
        type: 'render',
        render: (row: any) => row.tps,
    },
    {
        label: '监控状态',
        prop: 'hotCategory',
        type: 'enum',
        enum: HOTSPORT_MONITOR_STATUS,
        fieldNames: { label: 'text', value: 'value' },
        search: { el: 'select', props: { filterable: false } },
    },
])
const setColumns = () => {
    columns.value.unshift({
        prop: 'dataTime',
        label: '更新时间',
        search: {
            el: 'date-picker',
            // span: 1,
            props: {
                type: 'datetimerange',
                valueFormat: 'YYYY-MM-DD HH:mm:ss',
                rangeSeparator: '~',
                disabledDate: (date: any) => date.getTime() > Date.now(), //限制年月日--当天后的天数不可选择
                defaultTime: [new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 2, 1, 23, 59, 59)],
                defaultValue: searchParam.value.dataTime, //默认时间
                onChange: (val: any) => handleChange('dataTime', val),
            },
        },
        isShow: false,
    })
}

// 监听dataTime数据，清空后重新赋值默认值
watch(
    () => searchParam.value.dataTime,
    (newVal) => {
        if (newVal == null) {
            searchParam.value.dataTime = [startTimeInit, endTimeInit]
        }
    },
)
const handleChange = (key: string, val: any) => {
    console.log(val, 'handleChange===val----')
    if (key === 'dataTime') {
        let startTime: any = val ? val[0] : startTimeInit, //'2024-3-29 11:07:36'
            endTime: any = val ? val[1] : endTimeInit

        const nowTime: any = moment().format('YYYY-MM-DD HH:mm:ss')
        if (endTime > nowTime) {
            //选择时间大于当前时间，则改为当前时间
            endTime = endTime.split(' ')[0] + ' ' + nowTime.split(' ')[1]
        }
        searchParam.value.startTime = startTime
        searchParam.value.endTime = endTime
        searchParam.value.dataTime = [startTime, endTime]
    } else {
        console.log('')

        searchParam.value[key] = val
        getTableList()
    }
}

const lookDetails = (row: any) => {
    const { isHot, startTime, endTime } = searchParam.value
    const obj = {
        ...row,
        isHot,
        startTime,
        endTime,
    }

    router.push({
        path: '/dataMonitor/details',
        state: {
            params: { ...obj },
        },
    })
}
</script>

<style lang="scss">
.monitor-top-list {
    padding-top: 20px;
    .demo-tabs {
        padding-top: 6px;
        width: 100%;
        font-size: 15px;
        .el-tabs__item {
            font-size: 15px;
        }
        .el-tabs__item.is-active {
            font-weight: bold;
        }
        .el-tabs__header {
            margin-bottom: 10px;
        }
    }

    .monitor-search {
        display: flex;
        align-items: flex-start;

        .table-search {
            margin-bottom: 0;
        }
    }
    .monitor-top {
        flex: none;
        display: flex;
        align-items: center;
        padding-top: 5px;
        padding-right: 32px;
    }

    .table-box {
        flex: none;
        height: calc(100% - 134px);
        overflow: auto;
    }

    .el-dropdown-link {
        cursor: pointer;
    }
}
</style>
