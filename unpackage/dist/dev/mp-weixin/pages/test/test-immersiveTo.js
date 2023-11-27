"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_pub_z_csb2 = common_vendor.resolveComponent("pub-z-csb");
  const _easycom_lay_layout2 = common_vendor.resolveComponent("lay-layout");
  (_easycom_pub_z_csb2 + _easycom_lay_layout2)();
}
const _easycom_pub_z_csb = () => "../../components/public/pub-z-csb.js";
const _easycom_lay_layout = () => "../../components/layout/lay-layout.js";
if (!Math) {
  (_easycom_pub_z_csb + _easycom_lay_layout)();
}
const _sfc_main = {
  __name: "test-immersiveTo",
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          headerImmersiveTo: true,
          headerImmersiveToColor: "#007AFF",
          headerImmersiveToTitleColor: "#ffffff",
          headerImmersiveToSubtitleColor: "#ffffff",
          headerTitle: "出师表",
          headerSubtitle: "猪葛亮",
          bgi: common_vendor.unref(common_assets.bgi),
          bgc: "#F4F6F9"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "F:/prjs/za-my-demo/uniapp-vue3-chat-mine/uniapp-mine/pages/test/test-immersiveTo.vue"]]);
wx.createPage(MiniProgramPage);
