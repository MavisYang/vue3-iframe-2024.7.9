<template>
    <div class="hot-history main-padding">
        <!-- 搜索部分 -->
        <SearchForm :search="search" :reset="reset" :columns="columns" :search-param="searchParam" />

        <div class="card">
            <!--  表格展示工具栏-->
            <div class="tableToolContainer">
                <el-button type="primary" @click="handleShowModal()"> 新增{{ topTitle }} </el-button>
            </div>

            <!--  表格分页展示部分-->
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

        <!--  新增编辑对话框部分-->
        <FormDialog
            v-if="editData.visible"
            :visible="editData.visible"
            :title="`${editData.type === 'add' ? '新增' : '编辑'}`"
            :columns="columnsEdit"
            :edit-data="editData.data"
            :on-confirm="handleConfirmAdd"
            :on-cancel="handleCancelAdd"
        />
    </div>
</template>

<script setup lang="tsx">
import { reactive, onMounted } from 'vue'
import SearchForm from '@/components/SearchForm/index.vue'
import TableColumns from '@/components/TableColumns/index.vue'
import FormDialog from '@/components/FormDialog/index.vue'
import { CONFIG_STATUS } from './enums'
import { getHotHistoryListApi, addHotHistoryApi, updateHotHistoryApi, deleteHotHistoryApi } from '@/api/modules/hotspot'
import { ElMessage } from 'element-plus'
import { useConfirm } from '@/utils/eleMessage'
import { sliceTime } from '@/utils'
import { ColumnProps } from '@/components/TableColumns/interface'
import { StatusType, EditDataProps } from '@/views/hotConfig/interface'
import { useTable } from '@/hooks/useTable'

const topTitle = '历史数据'
// 搜索表单部分
const initSearch = {
    categoryType: '3', //热点类型
}
const { tableData, searchParam, getTableList, search, reset } = useTable(getHotHistoryListApi, initSearch, false)
onMounted(() => {
    getTableList()
})

const columns = reactive<ColumnProps[]>([
    { label: '序号', type: 'index', width: 100 },
    {
        label: '监控状态',
        prop: 'useStatus',
        type: 'enum',
        enum: CONFIG_STATUS,
        fieldNames: { label: 'dictName', value: 'dictCode' },
        search: { el: 'select', props: { filterable: false } },
    },
    {
        label: 'Cron参数',
        prop: 'cronVal',
        search: { el: 'input', props: { filterable: false } },
    },
    {
        label: '过期时间',
        prop: 'cleanDay',
        search: { el: 'input', props: { filterable: false } },
    },
    {
        label: '创建时间',
        prop: 'createTime',
        sortable: true,
        render: ({ createTime }) => sliceTime(createTime),
    },
    {
        label: '更新时间',
        prop: 'updateTime',
        sortable: true,
        headerRender: () => <span>更新时间</span>,
        render: ({ updateTime }) => sliceTime(updateTime),
    },
])

const columnsEdit = reactive([
    {
        label: '监控状态',
        prop: 'useStatus',
        type: 'select',
        required: true,
        enum: CONFIG_STATUS.slice(1),
        disabled: false,
        rules: [{ required: true, message: '请选择监控状态', trigger: ['blur', 'change'] }],
    },
    {
        label: 'Cron参数',
        prop: 'cronVal',
        type: 'input',
        required: true,
        disabled: false,
        rules: [{ required: true, message: '请输入Cron参数', trigger: ['blur', 'change'] }],
    },
    {
        label: '过期时间',
        prop: 'cleanDay',
        type: 'input',
        required: true,
        disabled: false,
        rules: [
            { required: true, message: '请输入过期时间', trigger: ['blur', 'change'] },
            {
                pattern: /^([1-9][0-9]{0,3})$/,
                message: '请输入大于0的不超过4位数的正整数',
                trigger: ['blur', 'change'],
            },
        ],
    },
])

const editData = reactive<EditDataProps>({
    visible: false,
    data: {},
    type: 'add',
})
//======方法部分=======
//弹框
const handleShowModal = (val: boolean = true, data: any = {}, type: StatusType = 'add') => {
    editData.visible = val
    editData.type = type
    editData.data = data || {}
    columnsEdit.forEach((v: any) => {
        if (v.prop === 'useStatus') {
            v.disabled = type !== 'add' ? true : false
        }
    })
}
const handleHideModal = () => {
    editData.visible = false
    editData.type = 'add'
    editData.data = Object.assign({}, {})
}
//确定新增或编辑
const handleConfirmAdd = (formData: any) => {
    const { type } = editData
    // 接口请求
    let fn = type === 'add' ? addHotHistoryApi : updateHotHistoryApi,
        params = { ...formData, ...initSearch }

    fn(params).then(() => {
        ElMessage.success(`${type === 'add' ? '新增' : '编辑'}成功`)
        handleHideModal()
        getTableList()
    })
}
//取消新增或编辑
const handleCancelAdd = () => {
    handleHideModal()
}

//确定删除
const handleDelete = ({ categoryType, useStatus }) => {
    useConfirm(
        '提示',
        '确定删除该热点资源历史数据吗？',
        () => {
            //确定 接口请求
            deleteHotHistoryApi({ categoryType, useStatus }).then(() => {
                getTableList()
                ElMessage.success('删除成功')
                handleHideModal()
            })
        },
        () => {
            handleHideModal()
        },
    )
}
</script>
