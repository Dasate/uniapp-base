"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_index = require("../../utils/index.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_lay_layout2 = common_vendor.resolveComponent("lay-layout");
  _easycom_lay_layout2();
}
const _easycom_lay_layout = () => "../../components/layout/lay-layout.js";
if (!Math) {
  _easycom_lay_layout();
}
const _sfc_main = {
  __name: "test",
  setup(__props) {
    const prev = (e) => {
      console.log("prev", e);
    };
    const next = (e) => {
      console.log("next", e);
    };
    const up = (e) => {
      console.log("up", e);
    };
    const down = (e) => {
      console.log("down", e);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => common_vendor.unref(utils_index.nav)("/pages/test/test-onlysafe")),
        b: common_vendor.o(($event) => common_vendor.unref(utils_index.nav)("/pages/test/test-onlysafe", 2)),
        c: common_vendor.o(($event) => common_vendor.unref(utils_index.nav)("/pages/test/test-onlysafe", 3)),
        d: common_vendor.o(($event) => common_vendor.unref(utils_index.nav)("back")),
        e: common_vendor.o(next),
        f: common_vendor.o(prev),
        g: common_vendor.o(up),
        h: common_vendor.o(down),
        i: common_vendor.p({
          headerTitle: "test",
          bgi: common_vendor.unref(common_assets.bgi),
          bgc: "#F4F6F9"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-727d09f0"], ["__file", "F:/prjs/za-my-demo/uniapp-vue3-chat-mine/uniapp-mine/pages/test/test.vue"]]);
wx.createPage(MiniProgramPage);
