/*
 * @Author: yangmiaomiao
 * @Date: 2024-02-04 11:03:09
 * @LastEditors: yangmiaomiao
 * @LastEditTime: 2024-02-19 10:09:13
 * @Description: 
 */
import { defineStore } from "pinia";
import { UserState } from "@/stores/interface";
import piniaPersistConfig from "@/stores/helper/persist";

export const useUserStore = defineStore({
  id: "hotspot-user",
  state: (): UserState => ({
    token: "",
    userInfo: {
      // userId: "1595625687086100482",
      userName: "root",
      // password: "$2a$10$Mhcy3zXi0vr5Hp1KxLEYFOIUMHzCQKYZXNAVFYqcM9aYlR0kvcHBO",
      // nickname: "yaozhenpeng",
      // status: "1",
      // avatar: null,
      // phone: "18065220862",
      // email: null,
      // deptId: null,
      // tenantId: null,
      // tenantName: null,
      // gender: "1",
      // type: "0",
      // roleNames: null,
    }
  }),
  getters: {},
  actions: {
    // Set Token
    setToken(token: string) {
      this.token = token;
    },
    // Set setUserInfo
    setUserInfo(userInfo: UserState["userInfo"]) {
      this.userInfo = userInfo;
    }
  },
  persist: piniaPersistConfig("hotspot-user")
});
