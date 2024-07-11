<template>
    <div class="hot-white main-padding">
        <SearchForm :search="search" :reset="reset" :columns="columns" :search-param="searchParam" />

        <div class="card">
            <div class="tableToolContainer">
                <el-button type="primary" @click="handleShowModal()">新增{{ topTitle }}</el-button>
            </div>

            <TableColumns rowKey="resourceId" :tableData="tableData" :columns="columns" :isPageable="false">
                <template #operation>
                    <el-table-column label="操作" fixed="right" align="center">
                        <template #default="{ row }">
                            <span class="operation edit" @click="() => handleShowModal(true, row, 'edit')">编辑</span>
                            <span class="operation delete" @click="() => handleDelete(row)">删除</span>
                        </template>
                    </el-table-column>
                </template>
            </TableColumns>
        </div>

        <FormDialog
            v-if="editData.visible"
            :visible="editData.visible"
            :title="`${editData.type === 'add' ? '新增' : '编辑'}`"
            :columns="columnsEdit"
            :edit-data="editData.data"
            :on-cancel="handleCancelAdd"
            :on-confirm="handleConfirmAdd"
            modalClass="hot-white-dialog"
        />
    </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import SearchForm from '@/components/SearchForm/index.vue'
import TableColumns from '@/components/TableColumns/index.vue'
import FormDialog from '@/components/FormDialog/index.vue'
import { ElMessage } from 'element-plus'
import { useConfirm } from '@/utils/eleMessage'
import { sliceTime } from '@/utils'
import { getHotWhiteListApi, addHotWhiteApi, updateHotWhiteApi, deleteHotWhiteApi } from '@/api/modules/hotspot'
import { WHITE_HOT_TYPE, WHITE_MONITOR_TYPE, WHITE_RECOGNIZE_TYPE } from './enums/index'
import { ColumnProps } from '@/components/TableColumns/interface'
import { useTable } from '@/hooks/useTable'

const topTitle = '白名单'
const initSearch = {}
const { tableData, searchParam, getTableList, search, reset } = useTable(getHotWhiteListApi, initSearch, false)

onMounted(() => {
    getTableList()
})

const columns = reactive<ColumnProps[]>([
    { label: '序号', type: 'index', width: 100 },
    {
        label: '资源ID',
        prop: 'resourceId',
        search: { el: 'input', props: { filterable: false } },
    },
    {
        label: '热点类型',
        prop: 'categoryType',
        type: 'enum',
        enum: WHITE_HOT_TYPE,
        search: { el: 'select', props: { filterable: false } },
        fieldNames: { label: 'dictName', value: 'dictCode' },
    },

    {
        label: '资源监控状态',
        prop: 'hotCategory',
        type: 'enum',
        enum: WHITE_MONITOR_TYPE,
        search: { el: 'select', props: { filterable: false } },
        fieldNames: { label: 'dictName', value: 'dictCode' },
    },
    {
        label: '热点识别状态',
        prop: 'hotspotStatus',
        type: 'enum',
        enum: WHITE_RECOGNIZE_TYPE,
    },
    {
        label: '分区码',
        prop: 'partitionVal',
        search: { el: 'input', props: { filterable: false } },
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
const columnsEdit = reactive([
    {
        label: '资源ID',
        prop: 'resourceId',
        type: 'input',
        required: true,
        disabled: false,
        rules: [{ required: true, message: '请输入资源ID', trigger: 'blur' }],
    },
    {
        label: '热点类型',
        prop: 'categoryType',
        type: 'select',
        required: true,
        enum: WHITE_HOT_TYPE.slice(1),
        disabled: false,
        rules: [{ required: true, message: '请选择热点类型', trigger: 'blur' }],
    },
    {
        label: '资源监控状态',
        prop: 'hotCategory',
        type: 'select',
        required: true,
        disabled: false,
        enum: WHITE_MONITOR_TYPE.slice(1),
        rules: [{ required: true, message: '请选择资源监控状态', trigger: 'blur' }],
    },

    {
        label: '分区码',
        prop: 'partitionVal',
        type: 'input',
        required: true,
        disabled: false,
        rules: [
            { required: true, message: '请输入0-9的分区码', trigger: 'blur' },
            {
                pattern: /^([0-9]{1})$/,
                message: '请输入0-9的分区码',
                trigger: 'blur',
            },
        ],
    },
])

const editData = reactive({
    visible: false,
    data: {},
    type: 'add',
})
//弹框
const handleShowModal = (val: boolean = true, data = {}, type = 'add') => {
    editData.visible = val
    editData.type = type
    editData.data = { ...data } || {} //Object.assign(data || {},{})

    columnsEdit.forEach((v: any) => {
        if (v.prop === 'hotCategory') {
            //编辑状态资源监控状态  临时 选项不可编辑
            v.enum = WHITE_MONITOR_TYPE.slice(1).map((v) => (v.dictCode === '1' ? { ...v, disabled: true } : v))
        }
    })
}
//确定新增或编辑
const handleConfirmAdd = (formData: any) => {
    const { type } = editData

    // 接口请求
    let fn = type === 'add' ? addHotWhiteApi : updateHotWhiteApi
    const params = {
        ...initSearch,
        ...formData,
    }
    fn(params).then(() => {
        ElMessage.success(`${type === 'add' ? '新增' : '编辑'}成功`)
        handleShowModal(false)
        getTableList()
    })
}

//取消新增或编辑
const handleCancelAdd = () => {
    handleShowModal(false, {})
}

//确定删除
const handleDelete = ({ resourceId, categoryType }) => {
    useConfirm(
        '提示',
        '确定删除该热点资源白名单吗？',
        () => {
            //确定 接口请求
            deleteHotWhiteApi({ resourceId, categoryType })
                .then(() => {
                    getTableList()
                    ElMessage.success('删除成功')
                    handleShowModal(false, {})
                })
                .catch((req) => {
                    console.error(req, '失败')
                    ElMessage.error(req)
                })
        },
        () => {
            handleShowModal(false, {})
        },
    )
}
</script>
