"use strict";
const common_vendor = require("../../common/vendor.js");
const store_global = require("../../store/global.js");
const _sfc_main = {
  __name: "pub-tabbar-safe",
  props: {
    // 顶部背景颜色
    tabbarBgc: {
      type: String
    },
    //仅顶部安全区
    tabbarOnlySafe: {
      type: Boolean,
      default: false
    },
    //仅顶部固定安全区
    tabbarOnlySafeFixed: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    const props = __props;
    const globalStore = store_global.useGlobalStore();
    let safeAreaBottom = common_vendor.computed(() => {
      if (globalStore.safeAreaBottomHeight) {
        return globalStore.safeAreaBottomHeight + "rpx";
      } else {
        return "0rpx";
      }
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: props.tabbarOnlySafe || props.tabbarOnlySafeFixed
      }, props.tabbarOnlySafe || props.tabbarOnlySafeFixed ? common_vendor.e({
        b: common_vendor.unref(safeAreaBottom),
        c: props.tabbarOnlySafeFixed
      }, props.tabbarOnlySafeFixed ? {
        d: common_vendor.unref(safeAreaBottom),
        e: props.tabbarBgc
      } : {}) : {});
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-9750d66f"], ["__file", "F:/prjs/za-my-demo/uniapp-vue3-chat-mine/uniapp-mine/components/public/pub-tabbar-safe.vue"]]);
wx.createComponent(Component);
