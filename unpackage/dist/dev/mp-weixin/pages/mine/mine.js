"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_lay_layout2 = common_vendor.resolveComponent("lay-layout");
  _easycom_lay_layout2();
}
const _easycom_lay_layout = () => "../../components/layout/lay-layout.js";
if (!Math) {
  _easycom_lay_layout();
}
const _sfc_main = {
  __name: "mine",
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o((...args) => _ctx.login && _ctx.login(...args)),
        b: common_vendor.p({
          headerIsTabbar: true,
          headerImmersive: true,
          bgc: "#F6f6f6"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-7c2ebfa5"], ["__file", "F:/prjs/za-my-demo/uniapp-vue3-chat-mine/uniapp-mine/pages/mine/mine.vue"]]);
wx.createPage(MiniProgramPage);
