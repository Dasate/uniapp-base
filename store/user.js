import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: '',
    userInfo: {}
  }),
  getters: {
    isLogin() {
      return !!this.token
    }
  },
  actions: {
    logout() {
      this.token = ''
      this.userInfo = {}
    },
    getUserInfo() {
      //用户信息
      this.userInfo.name = '是我呀'
      console.log("用户信息");
    }
  }
})