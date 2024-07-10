/*
 * @Author: yangmiaomiao
 * @Date: 2024-03-18 08:45:46
 * @LastEditors: yangmiaomiao
 * @LastEditTime: 2024-07-08 09:26:50
 * @Description:
 */
// 资源类型
export const HOTSPORT_TYPE_STATUS = [
    { dictName: '热点', dictCode: '1' },
    { dictName: '非热点', dictCode: '2' },
]
// 资源类型 1账号类型；2限额场景
export const RESOURCE_TYPE = [
    { text: '账号', value: '1' },
    { text: '限额场景', value: '2' },
]
// 热点类型 categoryType balance  limit
export const CATEGORY_TYPE_BALANCE = [
    { text: '余额', value: '1' },
    { text: '客户限额', value: '2' },
    { text: '产品限额', value: '3' },
]
export const CATEGORY_TYPE_LIMIT = [
    { text: '余额', value: '1' },
    { text: '限额', value: '2' },
]
export const HOTSPORT_TYPE = [
    { dictName: '热点余额', dictCode: '1' },
    { dictName: '热点限额', dictCode: '2' },
]
// 监控模式
export const HOTSPORT_MODE = [
    { text: '超时模式', value: '1' }, //模式一
    { text: '逐笔模式', value: '2' }, //模式二
]
// 监控状态
export const HOTSPORT_MONITOR_STATUS = [
    { text: '临时', value: '1' },
    { text: '永久', value: '2' },
]
// top10
export const HOTSPORT_TOP = [
    { dictName: '10', dictCode: 10 },
    { dictName: '20', dictCode: 20 },
    { dictName: '30', dictCode: 30 },
    { dictName: '50', dictCode: 50 },
    { dictName: '100', dictCode: 100 },
]
// 账户类型
export const ACCOUNTNO_TYPE = [
    { dictName: '对公', dictCode: '0' },
    { dictName: '零售', dictCode: '1' },
    { dictName: '内部户', dictCode: '2' },
    { dictName: '其他', dictCode: '3' },
]

// 交易可见性
export const HOTSPORT_VISIABLE = [
    { dictName: '本交易可见', dictCode: '1' }, //不同交易不可见
    { dictName: '跨交易可见', dictCode: '2' }, //每一笔交易都会往增量表插一条，要计算总价，所有都是可见
    { dictName: '可用', dictCode: '3' },
]

export const HOTSPORT_STATUS = [
    { dictName: '启用', dictCode: true },
    { dictName: '禁用', dictCode: false },
]

// const tagTypes = ["primary", "success", "info", "warning", "danger"];
export const HOTSPORT_TAG_STATUS = [
    { dictName: '启用', dictCode: 1, tagType: 'success' },
    { dictName: '禁用', dictCode: 0, tagType: 'danger' },
]

export const DATE_TIME_TYPE = [
    { dictName: '秒', dictCode: 3 },
    { dictName: '分', dictCode: 2 },
    { dictName: '时', dictCode: 1 },
]
