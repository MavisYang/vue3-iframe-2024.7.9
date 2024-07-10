/*
 * @Author: yangmiaomiao
 * @Date: 2024-02-04 10:31:26
 * @LastEditors: yangmiaomiao
 * @LastEditTime: 2024-02-04 10:33:12
 * @Description: 
 */
import { defineStore } from 'pinia'

const useLogin = defineStore('login', {
  state: () => ({
    login: false,// 应用的状态
  }),// 返回一个对象，这个对象包含着应用需要的所有状态
  getters: {},// 返回一个对象，这个对象包含着应用需要的所有getters
  actions: {},// 返回一个对象，这个对象包含着应用需要的所有actions
})

export default useLogin