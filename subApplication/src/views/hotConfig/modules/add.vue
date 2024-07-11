<template>
    <el-dialog
        :model-value="visible"
        :title="title"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :destroy-on-close="true"
        width="680px"
        @close="handleCancel(ruleFormRef)"
        :modal-class="modalClass"
    >
        <el-form
            ref="ruleFormRef"
            :model="formEditInfo"
            class="demo-dialog-form"
            :validate-on-rule-change="false"
            :label-width="labelWidth"
        >
            <template v-for="item in formList" :key="item.prop">
                <!-- 下拉选择框 -->
                <el-form-item
                    v-if="item.type === 'select'"
                    :required="item.required"
                    :label="item.label"
                    :prop="item.prop"
                    :rules="item.rules"
                    :label-position="labelPosition"
                >
                    <el-select
                        v-model="formEditInfo[item.prop]"
                        :disabled="item.disabled"
                        placeholder="请选择"
                        clearable
                    >
                        <el-option
                            v-for="stems in item.options"
                            :key="stems[selectValue]"
                            :label="stems[selectLabel]"
                            :value="stems[selectValue]"
                        />
                    </el-select>
                </el-form-item>

                <!-- input框 数字判断都用正则 因为后端要的都是string类型 -->
                <el-form-item
                    v-if="item.type === 'number'"
                    :required="item.required"
                    :label="item.label"
                    :prop="item.prop"
                    :rules="item.rules"
                    :label-position="labelPosition"
                >
                    <el-input
                        v-model="formEditInfo[item.prop]"
                        :disabled="item.disabled"
                        placeholder="请输入"
                        clearable
                    />
                </el-form-item>

                <!-- 复合框 -->
                <el-form-item
                    v-if="item.type === 'input-number'"
                    :required="item.required"
                    :label="item.label"
                    :prop="`${item.prop + filedValue}`"
                    :label-position="labelPosition"
                    :rules="[
                        {
                            required: true,
                            message: DATA_TIME_TYPE[formEditInfo[item.prop + filedUnit]]?.message,
                            trigger: 'blur',
                        },
                        {
                            pattern: DATA_TIME_TYPE[formEditInfo[item.prop + filedUnit]]?.pattern,
                            message: DATA_TIME_TYPE[formEditInfo[item.prop + filedUnit]]?.message,
                            trigger: ['change', 'blur'],
                        },
                    ]"
                >
                    <el-input
                        v-model="formEditInfo[item.prop + filedValue]"
                        clearabl
                        :disabled="item.disabled"
                        :placeholder="DATA_TIME_TYPE[formEditInfo[item.prop + filedUnit]]?.message"
                    >
                        <template #append>
                            <el-select
                                v-model="formEditInfo[item.prop + filedUnit]"
                                placeholder="请选择"
                                style="width: 120px"
                            >
                                <el-option
                                    v-for="stems in item.options"
                                    :key="stems[selectValue]"
                                    :label="stems[selectLabel]"
                                    :value="stems[selectValue]"
                                />
                            </el-select>
                        </template>
                    </el-input>
                </el-form-item>
            </template>
        </el-form>

        <template #footer>
            <span class="dialog-footer">
                <el-button @click="handleCancel(ruleFormRef)">取消</el-button>
                <el-button type="primary" @click="handleConfirm(ruleFormRef)"> 确定 </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { FormInstance } from 'element-plus'
import { CONFIG_HOT_TYPE, CONFIG_STATUS, CONFIG_MODE_TYPE, HOTSPOT_UNIT, DATA_TIME_TYPE } from '../enums'
import { StatusType, FormListProps } from '../interface'
import { dialogPostMessage, changeDialogStyle } from '@/utils/postMessage'

interface Props {
    formData: any //编辑数据
    title?: string
    type?: StatusType // 类型
    selectLabel?: string //option中的label
    selectValue?: string //OPtion中的value
    labelWidth?: string //from的label宽度
    labelPosition?: string
    filedUnit?: string
    filedValue?: string
    onCancel: () => void
    onConfirm: (params: any) => void
    visible: boolean
}
const props = withDefaults(defineProps<Props>(), {
    formData: () => ({}),
    title: '操作',
    selectLabel: 'dictName',
    selectValue: 'dictCode',
    labelWidth: 'auto',
    labelPosition: 'left',
    filedUnit: '_unit',
    filedValue: '_value',
    onCancel: () => {},
    onConfirm: () => {},
    visible: false,
    type: 'add',
})

const modalClass = ref('config-add-dialog-iframe')

const formEditInfo = ref(Object.assign({}, props.formData) || {})
const ruleFormRef = ref<FormInstance>()
const formList = ref<FormListProps[]>([
    {
        label: '热点类型',
        prop: 'categoryType',
        type: 'select',
        options: CONFIG_HOT_TYPE,
        disabled: false,
        required: true,
        rules: [
            {
                required: true,
                message: '请选择热点类型',
                trigger: 'change',
            },
        ],
    },
    {
        label: '监控状态',
        prop: 'useStatus',
        type: 'select',
        options: CONFIG_STATUS,
        required: true,
        disabled: false,
        rules: [{ required: true, message: '请选择监控状态', trigger: 'change' }],
    },
    {
        label: '热点模式',
        prop: 'hotspotModeType',
        type: 'select',
        options: CONFIG_MODE_TYPE,
        required: true,
        disabled: false,
        rules: [{ required: true, message: '请选择热点模式', trigger: 'change' }],
    },
    {
        label: '统计频率',
        prop: 'hotFre',
        type: 'input-number',
        required: true,
        disabled: false,
        options: HOTSPOT_UNIT,
    },
    {
        label: '持续时间',
        prop: 'hotTime',
        type: 'input-number',
        required: true,
        disabled: false,
        options: HOTSPOT_UNIT,
    },
    {
        label: '失效时间',
        prop: 'hotFailuretime',
        type: 'input-number',
        required: true,
        disabled: false,
        options: HOTSPOT_UNIT,
    },
    {
        label: '取消统计频率',
        prop: 'cancelhotFre',
        type: 'input-number',
        required: true,
        disabled: false,
        options: HOTSPOT_UNIT,
    },
    {
        label: '取消持续时间',
        prop: 'cancelhotTime',
        type: 'input-number',
        required: true,
        disabled: false,
        options: HOTSPOT_UNIT,
    },
    {
        label: '取消失效时间',
        prop: 'cancelhotFailuretime',
        type: 'input-number',
        required: true,
        disabled: false,
        options: HOTSPOT_UNIT,
    },
    {
        label: '监控数量',
        prop: 'hotValue',
        type: 'number',
        required: true,
        disabled: false,
        rules: [
            { required: true, message: '请输入监控数量阈值', trigger: 'blur' },
            {
                pattern: /^([1-9][0-9]{0,5})$/,
                message: '请输入大于0的不超过5位数的正整数',
                trigger: 'blur',
            },
        ],
    },
    {
        label: '取消监控数量',
        prop: 'cancelhotValue',
        type: 'number',
        required: true,
        disabled: false,
        rules: [
            { required: true, message: '请输入取消监控数量阈值', trigger: 'blur' },
            {
                pattern: /^([1-9][0-9]{0,5})$/,
                message: '请输入大于0的不超过5位数的正整数',
                trigger: 'blur',
            },
        ],
    },
])
onMounted(() => {
    if (props.type === 'edit') {
        formList.value.forEach((v: any) => {
            //处理formList事件，编辑时categoryType和useStatus不可编辑
            if (v.prop === 'categoryType' || v.prop === 'useStatus') {
                v.disabled = true
            }
        })
    }
    dialogPostMessage(props.visible, modalClass.value) //子页面传值给父页面，记录弹框的visible

    //监听父页面传递的值
    window.addEventListener('message', changeDialogStyle, false)
})

onUnmounted(() => {
    window.removeEventListener('message', changeDialogStyle, false)
})

//确定表单验证
const handleConfirm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            props.onConfirm(formEditInfo.value)
            dialogPostMessage(false, modalClass.value)
        } else {
            console.log('error submit!', fields)
        }
    })
}
const handleCancel = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
    props.onCancel()
    dialogPostMessage(false, modalClass.value)
}
</script>

<style scoped lang="scss">
.demo-dialog-form {
    .el-select {
        width: 360px;
    }

    .el-input {
        width: 360px;
    }
}
</style>
