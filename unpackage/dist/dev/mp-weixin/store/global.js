"use strict";
const common_vendor = require("../common/vendor.js");
const useGlobalStore = common_vendor.defineStore("global", {
  state: () => ({
    systemInfo: {},
    //系统信息[安卓平台,ios,版本信息都在这里]
    radio: 1,
    //px-rpx比率
    safeAreaTopHeight: 0,
    // 顶部状态栏(安全区)高度rpx
    pubHeaderHeight: 0,
    //公用顶部标题栏高度rpx[自动获取，不用理会，修改请到pub-header组件]
    safeAreaBottomHeight: 0,
    //底部安全区高度rpx
    pubTabbarHeight: 0,
    //公用底部选项卡高度rpx[自动获取，不用理会，修改请到pub-tabbar组件]
    screenHeight: 0,
    //可用屏幕高度rpx[除去顶部状态栏和底部安全区的高度]
    windowHeight: 0,
    //整个视窗高度rpx
    os: "",
    //操作系统 andriod ios windows等
    os_v: "",
    //系统版本号
    isWxXcx: false
    //是否微信小程序
  }),
  actions: {
    //px换算成rpx
    pxToRpx(px) {
      let __px = (px + "").replace("px", "");
      return Math.round(__px / this.radio);
    },
    //系统信息
    setSystemInfo(obj) {
      this.systemInfo = obj;
      console.log(obj);
    },
    setRadio(num) {
      this.radio = num;
    },
    setSafeAreaTopHeight(height) {
      this.safeAreaTopHeight = height;
    },
    setPubHeaderHeight(height) {
      this.pubHeaderHeight = height;
    },
    setSafeAreaBottomHeight(height) {
      this.safeAreaBottomHeight = height;
    },
    setPubTabbarHeight(height) {
      this.pubTabbarHeight = height;
    },
    setScreenHeight(height) {
      this.screenHeight = height;
    },
    setWindowHeight(height) {
      this.windowHeight = height;
    },
    getSysInfo() {
      let sysInfo = common_vendor.index.getSystemInfoSync();
      const radio = sysInfo.windowWidth / 750;
      this.setSystemInfo(sysInfo);
      this.setRadio(radio);
      this.setSafeAreaTopHeight(
        this.pxToRpx(sysInfo.safeAreaInsets.top)
      );
      this.setSafeAreaBottomHeight(
        this.pxToRpx(sysInfo.safeAreaInsets.bottom)
      );
      this.setScreenHeight(
        this.pxToRpx(sysInfo.windowHeight) - this.safeAreaTopHeight - this.safeAreaBottomHeight
      );
      this.setWindowHeight(this.pxToRpx(sysInfo.windowHeight));
      this.os = sysInfo.osName;
      this.os_v = sysInfo.osVersion;
      if (sysInfo.hostName === "WeChat") {
        this.isWxXcx = true;
      }
    }
  }
});
exports.useGlobalStore = useGlobalStore;
