/*
 * @Author: yangmiaomiao
 * @Date: 2024-02-05 14:35:49
 * @LastEditors: yangmiaomiao
 * @LastEditTime: 2024-05-20 14:31:25
 * @Description:
 */

import http from '@/api'
import { ResPage } from '@/api/interface/index'

/**白名单接口*/
export const getHotWhiteListApi = async (params: any) => await http.post('/selectTableWhite', params)
export const addHotWhiteApi = async (params: any) => await http.post('/insertTableWhite', params)
export const updateHotWhiteApi = async (params: any) => await http.post('/updateTableWhite', params)
export const deleteHotWhiteApi = async (params: any) => await http.post('/deleteTableWhite', params)

/**热点监控配置*/
export const getHotConfigListApi = async (params: any) => await http.post('/selectTableConfigParam', params)
export const addHotConfigApi = async (params: any) => await http.post('/insertTableConfigParam', params)
export const updateHotConfigApi = async (params: any) => await http.post('/updateTableConfigParam', params)
export const deleteHotConfigApi = async (params: any) => await http.post('/deleteTableConfig', params)

/**热点监控配置--历史数据*/
export const getHotHistoryListApi = async (params: any) => await http.post('/selectTableConfigHistory', params)
export const addHotHistoryApi = async (params: any) => await http.post('/insertTableConfigHistory', params)
export const updateHotHistoryApi = async (params: any) => await http.post('/updateTableConfigHistory', params)
export const deleteHotHistoryApi = async (params: any) => await http.post('/deleteTableConfig', params)

/**数据监测*/
export const getInitTpsData = (params: any) => http.post('/totalAllTPS', params)
export const getInitDetailsTpsData = (params: any) => http.post('/totalAllTPS', params)

export const getTpsData = (params: any) => http.post('/totalTPS', params) // 首页tps
export const getTopList = (params: any) => http.post('/topList', params) // TOP N 列表
export const getDetailsTpsData = (params: any) => http.post('/tps', params) //详情中的tps
export const getHotsDetails = (params: any) => http.post<ResPage<any>>(`/topDetail`, params) // 详情列表（分页写法）
