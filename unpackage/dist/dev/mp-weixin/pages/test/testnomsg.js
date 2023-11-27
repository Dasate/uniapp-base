"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_pub_nomsg2 = common_vendor.resolveComponent("pub-nomsg");
  const _easycom_lay_layout2 = common_vendor.resolveComponent("lay-layout");
  (_easycom_pub_nomsg2 + _easycom_lay_layout2)();
}
const _easycom_pub_nomsg = () => "../../components/public/pub-nomsg.js";
const _easycom_lay_layout = () => "../../components/layout/lay-layout.js";
if (!Math) {
  (_easycom_pub_nomsg + _easycom_lay_layout)();
}
const _sfc_main = {
  __name: "testnomsg",
  setup(__props) {
    const down = (e) => {
      console.log("down", e);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(down),
        b: common_vendor.p({
          headerTitle: "无数据模板",
          bgi: common_vendor.unref(common_assets.bgi),
          bgc: "#F4F6F9"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-863ce289"], ["__file", "F:/prjs/za-my-demo/uniapp-vue3-chat-mine/uniapp-mine/pages/test/testnomsg.vue"]]);
wx.createPage(MiniProgramPage);
