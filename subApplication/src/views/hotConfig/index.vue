<template>
    <div class="hot-config main-padding">
        <SearchForm :search="search" :reset="reset" :columns="columns" :search-param="searchParam" />

        <div class="card">
            <div class="tableToolContainer">
                <el-button type="primary" @click="handleShowModal(true, {})">新增{{ topTitle }}</el-button>
            </div>

            <TableColumns
                rowKey="resourceId"
                :tableData="tableData.filter((v) => v.categoryType !== '3')"
                :columns="columns"
                :isPageable="false"
            >
                <template #operation>
                    <el-table-column label="操作" fixed="right" align="center" width="120px">
                        <template #default="{ row }">
                            <span class="operation edit" @click="() => handleShowModal(true, row, 'edit')">编辑</span>
                            <span class="operation delete" @click="() => handleDelete(row)">删除</span>
                        </template>
                    </el-table-column>
                </template>
            </TableColumns>
        </div>

        <ConfigAddDialog
            v-if="editData.visible"
            :visible="editData.visible"
            :form-data="editData.data"
            :title="`${editData.type === 'add' ? '新增' : '编辑'}`"
            :type="editData.type"
            :on-confirm="handleConfirmAdd"
            :on-cancel="handleCancelAdd"
        />
    </div>
</template>

<script setup lang="tsx">
import { reactive, onMounted } from 'vue'
import SearchForm from '@/components/SearchForm/index.vue'
import TableColumns from '@/components/TableColumns/index.vue'
import ConfigAddDialog from './modules/add.vue'
import { ElMessage } from 'element-plus'
import { useConfirm } from '@/utils/eleMessage'
import { sliceTime } from '@/utils'
import { CONFIG_HOT_TYPE, CONFIG_STATUS, CONFIG_MODE_TYPE } from './enums'
import { getHotConfigListApi, addHotConfigApi, updateHotConfigApi, deleteHotConfigApi } from '@/api/modules/hotspot'
import { SearchDataProps, EditDataProps, StatusType } from './interface'
import { ColumnProps } from '@/components/TableColumns/interface'
import { splitItemKeys, initConfigEdit } from './enums'
import { useTable } from '@/hooks/useTable'

const topTitle = '热点配置'
const initSearch: SearchDataProps = {}

const { tableData, searchParam, getTableList, search, reset } = useTable(getHotConfigListApi, initSearch, false)

onMounted(() => {
    getTableList()
})

const columns = reactive<ColumnProps<any>[]>([
    { label: '序号', type: 'index', width: 60 },
    {
        label: '热点类型',
        prop: 'categoryType',
        type: 'enum',
        enum: CONFIG_HOT_TYPE,
        search: { el: 'select', props: { filterable: false } },
        fieldNames: { label: 'dictName', value: 'dictCode' },
    },
    {
        label: '监控状态',
        prop: 'useStatus',
        type: 'enum',
        enum: CONFIG_STATUS,
        search: { el: 'select', props: { filterable: false } },
        fieldNames: { label: 'dictName', value: 'dictCode' },
    },
    {
        label: '热点模式',
        prop: 'hotspotModeType',
        type: 'enum',
        enum: CONFIG_MODE_TYPE,
        search: { el: 'select', props: { filterable: false } },
        fieldNames: { label: 'dictName', value: 'dictCode' },
    },
    {
        label: '统计频率',
        prop: 'hotFre',
    },
    {
        label: '持续时间',
        prop: 'hotTime',
    },
    {
        label: '失效时间',
        prop: 'hotFailuretime',
    },
    {
        label: '取消统计频率',
        prop: 'cancelhotFre',
    },
    {
        label: '取消持续时间',
        prop: 'cancelhotTime',
    },
    {
        label: '取消失效时间',
        prop: 'cancelhotFailuretime',
    },
    {
        label: '监控数量',
        prop: 'hotValue',
    },
    {
        label: '取消监控数量',
        prop: 'cancelhotValue',
    },
    {
        label: '创建时间',
        prop: 'createTime',
        render: ({ row }) => sliceTime(row.createTime),
    },
    {
        label: '更新时间',
        prop: 'updateTime',
        render: ({ row }) => sliceTime(row.updateTime),
    },
])

//新增编辑
const editData = reactive<EditDataProps>({
    visible: false,
    data: {},
    type: 'add',
})

//======方法部分=======
//现实淫隐藏--新增编辑弹框
const handleShowModal = (val: boolean = true, data: any = {}, type: StatusType = 'add') => {
    editData.visible = val
    editData.type = type
    editData.data = val ? { ...initConfigEdit, ...data } : {}
    regroupItemFn()
}
const handleHideModal = () => {
    editData.visible = false
    editData.type = 'add'
    editData.data = {}
}
//确定新增
const handleConfirmAdd = async (data: {}) => {
    // //提取提交的数据
    // console.log(data, "data=====新增数据");
    const paramsData: any = dataConcatFn(data)
    console.log(paramsData, '=====Z提交数据==params')

    let fn = editData.type === 'add' ? addHotConfigApi : updateHotConfigApi

    fn(paramsData)
        .then(() => {
            ElMessage.success(`${editData.type === 'add' ? '新增' : '编辑'}成功`)
            handleHideModal()
            getTableList()
        })
        .catch((req) => {
            console.error(req)
        })
}
//取消新增/编辑
const handleCancelAdd = () => {
    handleHideModal()
}

//确定删除
const handleDelete = (val) => {
    useConfirm(
        '提示',
        '确定删除该热点资源监控配置吗？',
        () => {
            //确定 接口请求
            const params = {
                categoryType: val.categoryType,
                useStatus: val.useStatus,
            }
            deleteHotConfigApi(params)
                .then(() => {
                    getTableList()
                    ElMessage.success('删除成功')
                    handleHideModal()
                })
                .catch((req) => {
                    console.error(req, '失败')
                    ElMessage.error(req)
                })
        },
        () => {
            handleHideModal()
        },
    )
}

//拆分字段
function regroupItemFn() {
    let newObj = {}
    for (let [key, value] of Object.entries(editData.data)) {
        newObj = {
            ...newObj,
            [key]: value,
        }
        if (splitItemKeys.includes(key)) {
            newObj = {
                ...newObj,
                ...dataSplitFn(key, value),
            }
        }
    }
    editData.data = newObj
    return newObj
}

function dataSplitFn(name: String, val: any) {
    const item = {
        [`${name}_value`]: val ? val.slice(0, -2) : '',
        [`${name}_unit`]: val ? val.slice(-2).toLocaleLowerCase() : 'ss', //初始化选择
    }
    return item
}
// 合并字段
function dataConcatFn(data: {}) {
    let newObj = {}
    for (let [key, value] of Object.entries(data)) {
        newObj = {
            ...newObj,
            [key]: value,
        }
        splitItemKeys.map((v) => {
            if (key.includes(v)) {
                newObj = {
                    ...newObj,
                    [v]: `${data[`${v}_value`] || ''}${data[`${v}_unit`]}`,
                }
                delete newObj[`${v}_value`]
                delete newObj[`${v}_unit`]
            }
        })
    }
    return newObj
}
</script>
