/*
 * @Author: yangmiaomiao
 * @Date: 2024-01-25 17:07:26
 * @LastEditors: yangmiaomiao
 * @LastEditTime: 2024-02-05 19:07:11
 * @Description: 
 */
/*
 * @Author: yangmiaomiao
 * @Date: 2024-01-15 09:26:51
 * @LastEditors: yangmiaomiao
 * @LastEditTime: 2024-02-05 19:00:45
 * @Description: 
 */
import { defineStore } from "pinia";
import { GlobalState } from "@/stores/interface";
import { DEFAULT_PRIMARY } from "@/config";
import piniaPersistConfig from "@/stores/helper/persist";
// const DEFAULT_PRIMARY ='#009688'
export const useGlobalStore = defineStore({
  id: "hotspot-global",
  // 修改默认值之后，需清除 localStorage 数据
  state: (): GlobalState => ({
    // 布局模式 (纵向：vertical | 经典：classic | 横向：transverse | 分栏：columns)
    layout: "classic",
    // 当前系统语言
    language: null,
    // 当前页面是否全屏
    maximize: false,
    // 主题颜色
    primary: DEFAULT_PRIMARY,
    // 头部反转
    headerInverted: false,
    // 折叠菜单
    isCollapse: false,
    // 菜单手风琴
    accordion: true,
    // 面包屑导航
    breadcrumb: true,
    // 面包屑导航图标
    breadcrumbIcon: false,
    // 标签页
    tabs: true,
    // 标签页图标
    tabsIcon: true,
    // 页脚
    footer: true
  }),
  getters: {},
  actions: {
    // Set GlobalState
    setGlobalState(...args: ObjToKeyValArray<GlobalState>) {
      this.$patch({ [args[0]]: args[1] });
    }
  },
  persist: piniaPersistConfig("hotspot-global")
});
