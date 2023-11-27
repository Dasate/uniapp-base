"use strict";
const common_vendor = require("../common/vendor.js");
const useUserStore = common_vendor.defineStore("user", {
  state: () => ({
    token: "",
    userInfo: {}
  }),
  getters: {
    isLogin() {
      return !!this.token;
    }
  },
  actions: {
    logout() {
      this.token = "";
      this.userInfo = {};
    },
    getUserInfo() {
      this.userInfo.name = "是我呀";
      console.log("用户信息");
    }
  }
});
exports.useUserStore = useUserStore;
