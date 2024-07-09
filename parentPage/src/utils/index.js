/*
 * @Author: yangmiaomiao
 * @Date: 2024-06-15 14:36:08
 * @LastEditors: yangmiaomiao
 * @LastEditTime: 2024-07-05 14:18:48
 * @Description:
 */
/**
 *
 * @returns 获取url参数
 */
export const getSearch = () => {
    let search = window.location.search.slice(1).split('&')
    let params = {}
    for (let i = 0; i < search.length; i++) {
        let param = search[i].split('=')
        params[param[0]] = param[1]
    }
    return params
}
