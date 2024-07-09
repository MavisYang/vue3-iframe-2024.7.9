/*
 * @Author: yangmiaomiao
 * @Date: 2024-01-09 15:26:55
 * @LastEditors: yangmiaomiao
 * @LastEditTime: 2024-07-08 09:26:02
 * @Description:
 */

export const splitItemKeys = [
    'hotFre',
    'hotTime',
    'hotFailuretime',
    'cancelhotFre',
    'cancelhotTime',
    'cancelhotFailuretime',
]

export const initConfigEdit = {
    categoryType: '', //热点类型

    //热点类型一、二的时候
    hotFre: '', //设置热点监控统计频率
    hotTime: '', //热点监控持续时间阈值 格式：连续时间10分钟  10mm
    hotFailuretime: '', //热点监控失效时间阈值
    cancelhotFre: '', //取消热点监控统计频率
    cancelhotTime: '', //取消热点监控持续时间阈值
    cancelhotFailuretime: '', //取消热点监控失效时间阈值

    hotValue: '', //设置热点监控数量阈值
    cancelhotValue: '', //取消热点监控数量阈值
    hotspotModeType: '', //热点模式类型
    useStatus: '', //状态
}

const OPTION_ALL = [
    {
        dictName: '全部',
        dictCode: '',
    },
]
//白名单热点类型
const WHITE_HOT_TYPE = [
    {
        dictName: '热点账户',
        dictCode: '1',
    },
    {
        dictName: '热点限额',
        dictCode: '2',
    },
]
//白名单资源监控状态
const WHITE_MONITOR_TYPE = [
    {
        dictName: '临时',
        dictCode: '1',
    },
    {
        dictName: '永久',
        dictCode: '2',
    },
]
//白名单热点识别状态
const WHITE_RECOGNIZE_TYPE = [
    {
        dictName: '取消中',
        dictCode: '1',
    },
    {
        dictName: '进行中',
        dictCode: '2',
    },
]
//监控配置表热点类型
const CONFIG_HOT_TYPE = [
    {
        dictName: '热点账户',
        dictCode: '1',
    },
    {
        dictName: '热点限额',
        dictCode: '2',
    },
    // {
    //     dictName: "热点历史数据清理",
    //     dictCode: "3",
    // },
]
//监控配置状态
const CONFIG_STATUS = [
    {
        dictName: '初始化',
        dictCode: '1',
    },
    {
        dictName: '启用',
        dictCode: '2',
    },
    {
        dictName: '停用',
        dictCode: '3',
    },
]
//监控配置模式类型
const CONFIG_MODE_TYPE = [
    {
        dictName: '超时模式',
        dictCode: '1',
    },
    {
        dictName: '逐笔模式',
        dictCode: '2',
    },
]
//热点监控单位
const HOTSPOT_UNIT = [
    { dictName: 'ss(秒)', dictCode: 'ss' },
    { dictName: 'mm(分)', dictCode: 'mm' },
    { dictName: 'hh(时)', dictCode: 'hh' },
]

const DATA_TIME_TYPE = {
    ss: {
        message: '请输入1~59的数字',
        pattern: /(^[1-9]$)|(^[1-5][0-9])$/,
        min: 1,
        max: 59,
    },
    mm: {
        message: '请输入1~59的数字',
        pattern: /(^[1-9]$)|(^[1-5][0-9])$/,
        min: 1,
        max: 59,
    },
    hh: {
        message: '请输入1~23的数字',
        pattern: /(^[1][0-9]$)|(^[2][0-3]$)|(^[1-9]$)/,
        min: 1,
        max: 23,
    },
}

export {
    OPTION_ALL,
    WHITE_HOT_TYPE,
    WHITE_MONITOR_TYPE,
    WHITE_RECOGNIZE_TYPE,
    CONFIG_HOT_TYPE,
    CONFIG_STATUS,
    CONFIG_MODE_TYPE,
    HOTSPOT_UNIT,
    DATA_TIME_TYPE,
}
