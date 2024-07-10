<!--
 * @Author: yangmiaomiao
 * @Date: 2024-02-06 08:42:53
 * @LastEditors: yangmiaomiao
 * @LastEditTime: 2024-03-25 14:41:09
 * @Description: 
-->
<template>
    <div class="custom-card">
        <h2 class="mb-10">标题</h2>
    </div>
</template>

<script setup lang="tsx">
import { reactive, ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
// import { changeStatusApi, deleteListApi } from '@/api/modules/hotspot'
import { ColumnProps, ProTableInstance } from '@/components/TableColumns/interface'
import { HOTSPORT_TYPE, HOTSPORT_STATUS, HOTSPORT_TAG_STATUS } from '../enums'
import { useSwitch } from '@/hooks/useSwitch'
import { useConfirm } from '@/utils/eleMessage'

const initParam = reactive({})
const proTable = ref<ProTableInstance>()

onMounted(() => {
    console.log(proTable.value, 'proTable.value')
})

const { switchRow, initSwitchRow, handleClickSwitch, handleSwitchChange } = useSwitch()

const columns = reactive<ColumnProps[]>([
    {
        label: '序列',
        prop: 'index',
        type: 'selection',
        width: 80,
        align: 'left',
    },
    { label: '序列', prop: 'index', type: 'index', width: 80, align: 'center' },
    {
        label: '数据展开',
        prop: 'expand',
        type: 'expand',
        width: 100,
        render: (row) => {
            return <div style='padding:0 20px'>{row.expand}</div>
        },
    },
    { label: '热点ID', prop: 'id', searchType: 'input' },
    { label: '热点名称', prop: 'name', searchType: 'input' },
    {
        label: '热点类型',
        prop: 'hotsType',
        type: 'enum',
        searchType: 'select',
        enum: HOTSPORT_TYPE,
        isFilterEnum: true,
        fieldNames: { label: 'dictName', value: 'dictCode' },
    },
    {
        label: '自定义render',
        prop: 'render',
        type: 'render',
        render: (row) => {
            return <div>{row.render}111</div>
        },
    },
    {
        label: '状态',
        prop: 'status',
        type: 'switch',
        searchType: 'select',
        isFilterEnum: true,
        enum: HOTSPORT_STATUS,
        fieldNames: { label: 'dictName', value: 'dictCode' },
        switchRow: switchRow,
        beforeChange: (row: any) => {
            return handleClickSwitch(row.status, row, 'status', '确定停用吗', () => {
                // changeStatusApi({
                //     id: row.id,
                //     status: row.status === true ? false : true,
                // })
                //     .then((res: any) => {
                //         if (res.code === 200) {
                //             proTable.value?.getTableList();
                //             ElMessage.success(row.status === false ? '停用成功' : '启用成功');
                //             initSwitchRow();
                //             return true;
                //         } else {
                //             throw res;
                //         }
                //     })
                //     .catch((err) => {
                //         ElMessage.error(err.message);
                //         initSwitchRow();
                //         return false;
                //     });
            })
        },
    },
    {
        label: '状态2',
        prop: 'status2',
        type: 'switch',
        searchType: 'select',
        isFilterEnum: true,
        enum: HOTSPORT_STATUS,
        fieldNames: { label: 'dictName', value: 'dictCode' },
        active: 1,
        inactive: 2,
        beforeChange: (row: any) => {
            return handleSwitchChange(row, 'status2', () => {
                // changeStatusApi({
                //     id: row.id,
                //     status2: row.status2 === 1 ? 2 : 1,
                // })
                //     .then((res: any) => {
                //         if (res.code === 200) {
                //             proTable.value?.getTableList()
                //             ElMessage.success(row.status2 === 2 ? '停用成功' : '启用成功')
                //             initSwitchRow()
                //             return true
                //         } else {
                //             throw res
                //         }
                //     })
                //     .catch((err) => {
                //         ElMessage.error(err.message)
                //         initSwitchRow()
                //         return false
                //     })
            })
        },
    },
    {
        label: '标签',
        prop: 'tag',
        type: 'tag',
        searchType: 'select',
        isFilterEnum: true,
        enum: HOTSPORT_TAG_STATUS,
        fieldNames: { label: 'dictName', value: 'dictCode' },
    },
    {
        label: '创建时间',
        prop: 'createTime',
    },
    {
        label: '操作',
        prop: 'operation',
        type: 'operation',
    },
])

const handelEdit = (row: any) => {
    console.log(row)
    ElMessage.success('编辑')
}
const deleteId: any = ref([])
const handleDelete = (row: any, type = 'only') => {
    deleteId.value = type === 'only' ? [row.id] : proTable.value?.selectedListIds
    useConfirm(
        '温馨提示',
        '确定要删除吗？',
        () => {
            const params = deleteId.value
            // deleteListApi(params).then((res: any) => {
            //     if (res.code === 200) {
            //         ElMessage.success('删除成功')
            //         proTable.value?.getTableList()
            //     } else {
            //         throw res
            //     }
            // })
        },
        () => {},
    )
}
</script>

<style scoped lang="scss"></style>
