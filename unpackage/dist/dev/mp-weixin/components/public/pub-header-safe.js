"use strict";
const common_vendor = require("../../common/vendor.js");
const store_global = require("../../store/global.js");
const _sfc_main = {
  __name: "pub-header-safe",
  props: {
    // 顶部背景颜色
    headerBgc: {
      type: String
    }
  },
  setup(__props) {
    const props = __props;
    const globalStore = store_global.useGlobalStore();
    let safeAreaTop = common_vendor.computed(() => {
      if (globalStore.safeAreaTopHeight) {
        return globalStore.safeAreaTopHeight + "rpx";
      } else {
        return "0rpx";
      }
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: props.headerOnlySafe
      }, props.headerOnlySafe ? {
        b: common_vendor.unref(safeAreaTop),
        c: common_vendor.unref(safeAreaTop),
        d: props.headerBgc
      } : {});
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0a824231"], ["__file", "F:/prjs/za-my-demo/uniapp-vue3-chat-mine/uniapp-mine/components/public/pub-header-safe.vue"]]);
wx.createComponent(Component);
