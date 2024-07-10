<!--
 * @Author: yangmiaomiao
 * @Date: 2024-02-19 09:27:21
 * @LastEditors: yangmiaomiao
 * @LastEditTime: 2024-05-21 20:28:03
 * @Description: top10
-->
<template>
    <div class="monitor-top-list card">
        <!-- <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleChangeTabs">
            <el-tab-pane label="热点" :name="1"> </el-tab-pane>
            <el-tab-pane label="非热点" :name="0"> </el-tab-pane>
        </el-tabs> -->

        <div class="monitor-search flx-justify-between">
            <div class="flx-align-center">
                <Title :title="`${tabList[activeName].title}资源TOP${tabList[activeName].searchParam.pageSize}`" />
                <el-dropdown @command="(command) => handleChange('pageSize', command)">
                    <span class="el-dropdown-link">
                        <el-icon class="el-icon--right"><ArrowDownBold /></el-icon>
                    </span>

                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item
                                v-for="item in HOTSPORT_TOP"
                                :tabindex="tabList[activeName].searchParam.pageSize"
                                :key="item.dictCode"
                                :command="item.dictCode"
                                >{{ item.dictName }}
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>

            <el-date-picker
                v-model="tabList[activeName].searchParam.dataTime"
                type="datetimerange"
                format="YYYY-MM-DD HH:mm:ss"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                style="flex: none; width: 360px"
                :default-time="defaultTime"
                :disabled-date="disabledDate"
                @change="(val:any)=>handleChange('dataTime',val)"
            />
        </div>

        <div class="table-box">
            <el-table ref="tableRefs" v-loading="loading" :data="tabList[activeName].tableData" align="center">
                <el-table-column type="index" label="序号" align="center" />
                <el-table-column prop="resourceId" label="资源ID" align="center" />
                <el-table-column prop="resourceType" align="center">
                    <template #header>
                        {{ '资源类型' }}
                        <TableHeaderSearch
                            prop="resourceType"
                            label="资源类型"
                            :searchValue="tabList[activeName].searchParam['resourceType']"
                            :options="RESOURCE_TYPE"
                        />
                    </template>
                    <template #default="{ row }">
                        {{ getNameByCode(RESOURCE_TYPE, row['resourceType'], 'value', 'text') }}
                    </template>
                </el-table-column>
                <el-table-column label="操作" fixed="right" align="center">
                    <template #default="{ row }">
                        <span class="primary-text" @click="lookDetails(row)">详情</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <TableColumns
            ref="tableRefs"
            v-loading="loading"
            :isPageable="false"
            :tableData="tabList[activeName].tableData"
            :columns="columns"
        >
            <template #operation>
                <el-table-column label="操作" fixed="right">
                    <template #default="{ row }">
                        <span class="primary-text" @click="lookDetails(row)">详情</span>
                    </template>
                </el-table-column>
            </template>
        </TableColumns>
    </div>
</template>

<script setup lang="tsx">
import { reactive, ref, onMounted, watch } from 'vue'
import Title from '../components/Title.vue'
import TableHeaderSearch from '../components/TableHeaderSearch.vue'
import TableColumns from '@/components/TableColumns/index.vue'
import {
    RESOURCE_TYPE,
    CATEGORY_TYPE_BALANCE,
    CATEGORY_TYPE_LIMIT,
    HOTSPORT_TOP,
    HOTSPORT_MODE,
    HOTSPORT_MONITOR_STATUS,
} from '../enums'
import type { TabsPaneContext, TableInstance } from 'element-plus'
import { ColumnProps, HeaderRenderScope } from '@/components/TableColumns/interface'
import { getTopList } from '@/api/modules/hotspot'
import { parseTime, getNameByCode } from '@/utils/index'
import { useRouter } from 'vue-router'

const router = useRouter()
const loading = ref(false)
const activeName = ref<any>(1)

const defaultTime: [Date, Date] = [new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 2, 1, 23, 59, 59)],
    curDate = parseTime(new Date(), '{y}-{m}-{d}'),
    startTimeInit = new Date(curDate + ' 00:00:00'), // 当天0点
    endTimeInit = new Date()

const tableRefs = ref<TableInstance>()
const tabList = reactive({
    1: {
        title: '热点',
        searchParam: {
            isHot: 1, //1表示热点
            pageSize: 10, //top10 top30
            categoryType: '', //当为热点时：1表示余额、2表示客户限额、3表示产品限额；
            startTime: parseTime(startTimeInit),
            endTime: parseTime(endTimeInit),
            dataTime: [startTimeInit, endTimeInit],
        },
        tableData: [],
    },
    0: {
        title: '非热点',
        searchParam: {
            isHot: 0, //0表示非热点；
            pageSize: 10, //top10 top30
            categoryType: '', //当为非热点时：1表示余额、2表示限额；
            startTime: parseTime(startTimeInit),
            endTime: parseTime(endTimeInit),
            dataTime: [startTimeInit, endTimeInit],
        },
        tableData: [],
    },
})

const filterHandler = (value: string, row: any, column: any) => {
    const property = column['property']

    return row[property] == value
}
const clearFilter = () => {
    tableRefs.value!.clearFilter()
    tableRefs.value!.clearSort()
}

// 自定义渲染表头（使用tsx语法）
// const resourceTypeHeaderRender = (scope: HeaderRenderScope) => {
const headerRender = (scope: HeaderRenderScope<any>) => {
    console.log(scope, 'scope', scope.column.label)

    return scope.column.label
}

const initColumns = reactive<ColumnProps<any>[]>([
    { label: '序号', type: 'index', width: 120 },
    {
        label: '资源ID',
        prop: 'resourceId',
        // headerRender: (scope: HeaderRenderScope<any>) => <span>资源ID11</span>,
        type: 'render',
        render: (row: any) => row.resourceId,
        isShow: true,
    },
    {
        label: '资源类型',
        prop: 'resourceType',
        type: 'enum',
        enum: RESOURCE_TYPE,
        fieldNames: { label: 'text', value: 'value' },
        columnKey: 'resourceType',
        filterMultiple: false,
        filterMethod: filterHandler,
        filters: RESOURCE_TYPE,
        isShow: true,
    },
    {
        label: '热点类型',
        prop: 'categoryType',
        type: 'enum',
        enum: CATEGORY_TYPE_BALANCE,
        fieldNames: { label: 'text', value: 'value' },
        columnKey: 'categoryType',
        filterMultiple: false,
        filterMethod: filterHandler,
        filters: CATEGORY_TYPE_BALANCE,
        isShow: true,
    },
    {
        label: '热点TPS',
        prop: 'tps',
        sortable: true,
        type: 'render',
        render: (row: any) => row.tps,
        isShow: true,
    },
    {
        label: '热点识别模式',
        prop: 'hotspotModeType',
        type: 'enum',
        enum: HOTSPORT_MODE,
        fieldNames: { label: 'text', value: 'value' },
        columnKey: 'hotspotModeType',
        filterMultiple: false,
        filterMethod: filterHandler,
        filters: HOTSPORT_MODE,
        isShow: true,
    },
    {
        label: '监控状态',
        prop: 'hotCategory',
        type: 'enum',
        enum: HOTSPORT_MONITOR_STATUS,
        fieldNames: { label: 'text', value: 'value' },
        columnKey: 'hotCategory',
        filterMultiple: false,
        filterMethod: filterHandler,
        filters: HOTSPORT_MONITOR_STATUS,
        isShow: true,
    },
])
const columns = ref<ColumnProps<any>[]>([])
// 初始化表格数据
onMounted(() => {
    setColumns()
    getTableList()
})
// 1、非热点没有这个监控状态字段，就把这个隐藏掉吧
// 2、非热点时，热点类型只有余额和限额（1余额；2限额）
// 3、热点下没有热点识别模式
const handleChangeTabs = (tab: TabsPaneContext) => {
    activeName.value = tab.paneName
    clearFilter()
    setColumns()
    getTableList()
}

const setColumns = () => {
    columns.value = []
    columns.value = initColumns.map((v) => {
        if (v.prop == 'categoryType') {
            const options = activeName.value === 1 ? CATEGORY_TYPE_BALANCE : CATEGORY_TYPE_LIMIT
            v.enum = options
            v.filters = options
        }
        if (v.prop == 'hotspotModeType') {
            v.isShow = activeName.value === 1 ? false : true
        }
        if (v.prop == 'hotCategory') {
            v.isShow = activeName.value === 1 ? true : false
        }
        return v
    })
}

// 限制年月日--当天后的天数不可选择
const disabledDate = (date: any) => {
    return date.getTime() > Date.now()
}
// 监听dataTime数据，清空后重新赋值默认值
watch(
    () => tabList[activeName.value].searchParam.dataTime,
    (newVal) => {
        if (newVal == null) {
            tabList[activeName.value].searchParam.dataTime = [startTimeInit, endTimeInit]
        }
    },
)
const handleChange = (key: string, val: any) => {
    // console.log(val, 'val----')
    if (key === 'dataTime') {
        let startTime: any = val ? parseTime(val[0]) : parseTime(startTimeInit), //'2024-3-29 11:07:36'
            endTime: any = val ? parseTime(val[1]) : parseTime(endTimeInit)

        const nowTime: any = parseTime(new Date())

        if (endTime > nowTime) {
            //选择时间大于当前时间，则改为当前时间
            endTime = endTime.split(' ')[0] + ' ' + nowTime.split(' ')[1]
        }

        console.log(startTime, endTime, '----')

        tabList[activeName.value].searchParam = {
            ...tabList[activeName.value].searchParam,
            startTime,
            endTime,
            dataTime: [startTime, endTime],
        }
    } else {
        tabList[activeName.value].searchParam[key] = val
    }

    getTableList()
}

const lookDetails = (row: any) => {
    const { isHot, startTime, endTime } = tabList[activeName.value].searchParam
    console.log(row, 'row')

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
const getTableList = async () => {
    loading.value = true
    const { isHot, categoryType, startTime, endTime, pageSize } = tabList[activeName.value].searchParam
    const params = { isHot, categoryType, startTime, endTime, pageSize }

    // console.log(params, 'list--')
    const { data }: any = await getTopList(params)

    const sortData = data?.sort((a, b) => b.tps - a.tps) //mock排序正序，后期有了接口此部分代码可删除

    tabList[activeName.value].tableData = sortData
    setTimeout(() => {
        loading.value = false
    }, 300)
}
</script>

<style lang="scss">
.monitor-top-list {
    padding-top: 0;
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
    position: relative;
    overflow: hidden;

    .monitor-search {
        position: sticky;
        top: 0;
    }

    .table-box {
        flex: none;
        height: calc(100% - 134px);
        overflow: auto;
    }
}
</style>
