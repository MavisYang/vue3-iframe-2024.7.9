<!--
 * @Author: yangmiaomiao
 * @Date: 2024-02-19 09:27:21
 * @LastEditors: yangmiaomiao
 * @LastEditTime: 2024-05-20 14:52:33
 * @Description: 
-->
<template>
    <div class="montior-details">
        <Breadcrumb />
        <div class="montior-details-center" v-loading="loading">
            <div class="montior-details-top mb-10">
                <div class="baseInfo card">
                    <Title :title="`${baseInfo?.isHot == 0 ? '非热点' : '热点'}资源基本信息`" />
                    <ul class="baseInfo-view">
                        <li><span>资源ID：</span>{{ baseInfo?.resourceId ?? '-' }}</li>
                        <li>
                            <span>资源类型：</span
                            >{{ getNameByCode(RESOURCE_TYPE, baseInfo?.resourceType, 'value', 'text') ?? '-' }}
                        </li>
                        <li>
                            <span>热点类型：</span
                            >{{
                                getNameByCode(
                                    baseInfo?.isHot === 1 ? CATEGORY_TYPE_BALANCE : CATEGORY_TYPE_LIMIT,
                                    baseInfo?.categoryType,
                                    'value',
                                    'text',
                                ) ?? '-'
                            }}
                        </li>
                        <li v-if="baseInfo?.isHot === 0">
                            <span>热点识别模式：</span
                            >{{ getNameByCode(HOTSPORT_MODE, baseInfo?.hotspotModeType, 'value', 'text') ?? '-' }}
                        </li>
                        <li v-if="baseInfo?.isHot === 1">
                            <span>热点监控模式：</span
                            >{{ getNameByCode(HOTSPORT_MONITOR_STATUS, baseInfo?.hotCategory, 'value', 'text') ?? '-' }}
                        </li>
                    </ul>
                </div>
                <div class="baseTps">
                    <TPSEcharts
                        :api="getDetailsTpsData"
                        :initApi="getInitDetailsTpsData"
                        :params="initParam"
                        type="details"
                    />
                </div>
            </div>

            <div class="card">
                <Title :title="`交易详情`" className="mb-10" />

                <TableColumns
                    :tableData="tableData.list"
                    :columns="columns"
                    :pageable="tableData.pageable"
                    :handleSizeChange="(val:number)=>handleSizeChange(val)"
                    :handleCurrentChange="(val:number)=>handleCurrentChange(val)"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts" name="TopDeatils">
import { ref, reactive, onMounted } from 'vue'
import Breadcrumb from '@/layouts/components/Header/components/Breadcrumb.vue'
import Title from '../components/Title.vue'
import TableColumns from '@/components/TableColumns/index.vue'
import TPSEcharts from '@/views/dataMonitor/components/TPSEcharts.vue'
import { getHotsDetails, getDetailsTpsData, getInitDetailsTpsData } from '@/api/modules/hotspot'
import { BaseInfoProps } from '@/views/dataMonitor/interface'
import { ColumnProps } from '@/components/TableColumns/interface'
import { getNameByCode } from '@/utils'
import {
    RESOURCE_TYPE,
    ACCOUNTNO_TYPE,
    CATEGORY_TYPE_BALANCE,
    CATEGORY_TYPE_LIMIT,
    HOTSPORT_MODE,
    HOTSPORT_MONITOR_STATUS,
    HOTSPORT_VISIABLE,
} from '@/views/dataMonitor/enums'

const loading = ref(true),
    baseInfo: any = ref<BaseInfoProps>(),
    initParam = ref<any>({}),
    searchParams = ref<any>({}),
    tableData = reactive<any>({
        list: [],
        pageable: {
            pageSize: 10,
            pageNum: 1,
            total: 0,
        },
    })

let columns = reactive<ColumnProps<any>[]>([])
onMounted(() => {
    loading.value = true
    const historyState = history.state.params
    if (historyState != undefined) {
        // console.log(historyState, 'historyState')
        const { resourceId, categoryType, isHot, resourceType, startTime, endTime } = historyState

        initParam.value = {
            resourceId, //资源id
            categoryType, //热点类型：当为热点时：1表示余额、2表示客户限额、3表示产品限额； 为非热点时：1表示余额、2表示限额；
            isHot, //1表示热点；0表示非热点；
            resourceType, //资源类型 账户类型限额场景
            startTime,
            endTime,
        }
        baseInfo.value = { ...historyState }
        columns =
            isHot == 0
                ? noHotColumns
                : categoryType == 1
                ? hotBalanceColumns
                : categoryType == 2
                ? hotLimitColumns
                : hotProctLimitColumns

        getTableList()
    }
})

const getTableList = () => {
    const params = {
        ...initParam.value,
        ...tableData.pageable,
        ...searchParams.value,
    }
    console.log(params, 'getTableList')

    getHotsDetails(params).then((res) => {
        const { list, total } = res.data

        tableData.list = list ?? []
        tableData.pageable.total = total
        loading.value = false
    })
}

const handleSizeChange = (val: number) => {
    tableData.pageable.pageNum = 1
    tableData.pageable.pageSize = val
    getTableList()
}

const handleCurrentChange = (val: number) => {
    tableData.pageable.pageNum = val
    getTableList()
}
// 热点余额
const hotBalanceColumns = reactive<ColumnProps<any>[]>([
    { label: '账号', prop: 'accountNo' }, //账号+账户类型确定唯一值
    {
        label: '账户类型',
        prop: 'acctType',
        type: 'enum',
        enum: ACCOUNTNO_TYPE,
        fieldNames: { label: 'dictName', value: 'dictCode' },
        search: { el: 'select', props: { filterable: false, clearable: false } },
    }, //枚举展示：对公、零售
    { label: '交易金额', prop: 'tranAmount' },
    { label: '交易日期', prop: 'tranDate' }, //交易日期（账务日期）
    { label: '交易时间', prop: 'tranTime' }, //交易时间(服务器时间)
    {
        label: '交易可见性',
        prop: 'visiable',
        type: 'enum',
        enum: HOTSPORT_VISIABLE,
        fieldNames: { label: 'dictName', value: 'dictCode' },
        search: { el: 'select', props: { filterable: false, clearable: false } },
    },
    { label: '记账序号', prop: 'accountingSeqNo' },
    { label: '服务流水', prop: 'serviceSeqNo' }, //一条服务流水会有多个交易，每个交易一个记账序号
])
// 热点限额-产品限额
const hotProctLimitColumns = reactive<ColumnProps<any>[]>([
    { label: '限额Key', prop: 'limitKey' },
    { label: '增量限额', prop: 'limiValue' }, //累计金额+累计次数
    { label: '限额累计额度', prop: 'limiAccumilateValue' }, //累计金额+累计次数
    { label: '限额总额度', prop: 'limiTotalValue' },
    { label: '累计限额序号', prop: 'limitSeqNo' },
    {
        label: '限额类型',
        prop: 'limitType',
        type: 'enum',
        enum: ACCOUNTNO_TYPE,
        fieldNames: { label: 'dictName', value: 'dictCode' },
        search: { el: 'select', props: { filterable: false, clearable: false } },
    }, //对公零售
    { label: '交易日期', prop: 'tranDate' }, //交易日期（账务日期）
    { label: '交易时间', prop: 'tranTime' },
    { label: '交易流水', prop: 'tranSeqNo' },
    { label: '服务流水', prop: 'serviceSeqNo' }, //一条服务流水会有多个交易，每个交易一个记账序号
])
// 热点限额-客户限额
const hotLimitColumns = reactive<ColumnProps<any>[]>([
    { label: '限额对象编码', prop: 'limitObjCode' }, //六个一起确定客户限额的唯一值，汇总更新明细表，定位到是次数还是金额
    { label: '限额种类代码', prop: 'limitClassCode' },
    { label: '限额分类代码', prop: 'limitClassfyCode' },
    { label: '限额周期编码', prop: 'limitPeriodCode' },
    { label: '限额开始日期', prop: 'limitStartDate' },
    {
        label: '限额类型',
        prop: 'limitType',
        type: 'enum',
        enum: ACCOUNTNO_TYPE,
        fieldNames: { label: 'dictName', value: 'dictCode' },
        search: { el: 'select', props: { filterable: false, clearable: false } },
    },

    { label: '累计限额序号', prop: 'limitSeqNo' },
    { label: '增量限额', prop: 'increnentLimt' }, //累计金额+累计次数

    { label: '交易日期', prop: 'tranDate' }, //交易日期（账务日期）
    { label: '交易时间', prop: 'tranTime' }, //交易时间(服务器时间)
    { label: '服务流水', prop: 'serviceSeqNo' }, //一条服务流水会有多个交易，每个交易一个记账序号
    { label: '记账序号', prop: 'accountingSeqNo' },

    { label: '限额管控方式代码', prop: 'limitClassMgtCtrlCd' }, //业务要求登记
    { label: '超限标志', prop: 'overLimitSign' },
])

// 非热点
const noHotColumns = reactive<ColumnProps<any>[]>([
    { label: '自增ID', prop: 'seqId' },

    { label: '记账序号', prop: 'accountingSeqNo' },
    { label: '服务流水', prop: 'businessSeqNo' },
    { label: '业务流水', prop: 'serviceSeqNo' },
    {
        label: '热点类型',
        prop: 'categoryType',
        type: 'enum',
        enum: CATEGORY_TYPE_LIMIT,
        fieldNames: { label: 'text', value: 'value' },
    },
    { label: '详细内容', prop: 'detailedContent', render: (row: any) => row.detailedContent ?? '-' },
    { label: '创建时间', prop: 'createTime' },
])
</script>

<style scoped lang="scss">
.montior-details-center {
    padding: 10px 12px;
}

.montior-details-top {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 260px;
}
.baseInfo {
    width: 30%;
    margin-right: 10px;
    height: 100%;
}
.baseTps {
    width: 70%;
    height: 100%;
}

.baseInfo-view {
    li {
        padding-top: 16px;
        font-size: 15px;

        color: var(--el-color-black);
        span {
            color: var(--el-text-color-regular);
        }
    }
}
</style>
