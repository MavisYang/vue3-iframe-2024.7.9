/*
 * @Author: yangmiaomiao
 * @Date: 2024-03-18 08:45:46
 * @LastEditors: yangmiaomiao
 * @LastEditTime: 2024-03-26 15:01:09
 * @Description:
 */
export type TypeProps =
    | 'index'
    | 'input'
    | 'select'
    | 'date'
    | 'number'
    | 'password'
    | 'radio'
    | 'checkbox'
    | 'switch'
    | 'slider'
    | 'time'
    | 'time-range'
    | 'rate'

export type DictType = {
    dictName: string
    dictCode: string | number | boolean
}

export type BaseInfoProps = {
    resourceId: string
    resourceType: string | number
    categoryType: string | number
    hotspotModeType: string | number
    hotCategory: string
    [key: string]: any
}

export type DeatilsInfoProps = {
    businessSeqNo: string //业务流水
    serviceSeqNo: string //服务流水
    accountingSeqNo: string //记账序号
    accountNo: string //账号
    //热点余额字段

    acctType: string //账户类型
    //热点余额字段
    tranAmount: string | number //交易金额
    //热点余额字段
    visiable: string //可见性 1-本交易可见 2-跨交易可见 3-可用

    tranTime: string //交易时间
    batchId: string | number //批次号
    //热点字段

    batchStatus: string //批次状态
    //热点字段（0-处理中 1-待更新主余额 2-已更新主余额 3-已更新交易后余额）

    partitionVal: string //分区列

    //热点字段

    createTime: string
    //创建时间
    updateTime: string
    //更新时间
    limitClassCode: string
    //限额种类代码
    //热点限额字段

    limitClassifyCode: string
    //限额分类代码
    //热点限额字段

    limitPeriodCode: string
    //限额周期编码
    //热点限额字段

    limitStartDate: string
    //限额开始日期
    //热点限额字段

    limitAmount: string
    //增量限额
    //热点限额字段

    limitNum: string
    //增量限次
    //热点限额字段

    custNo: string
    //客户号
    //热点限额字段

    limitClassMgtCtrlCd: string
    //限额管控方式代码
    //热点限额字段

    overLimitSign: string
    //超限标志
    //热点限额字段

    limitSeqNo: string
    //累计限额序号
    //热点限额字段

    seqId: string | number
    //自增id
    //非热点字段

    detailedContent: string
    //详细内容
    //非热点字段（交易的相关信息描述）
    [key: string]: any
}
