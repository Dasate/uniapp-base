"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_pub_list2 = common_vendor.resolveComponent("pub-list");
  const _easycom_lay_layout2 = common_vendor.resolveComponent("lay-layout");
  (_easycom_pub_list2 + _easycom_lay_layout2)();
}
const _easycom_pub_list = () => "../../components/public/pub-list.js";
const _easycom_lay_layout = () => "../../components/layout/lay-layout.js";
if (!Math) {
  (_easycom_pub_list + _easycom_lay_layout)();
}
const _sfc_main = {
  __name: "testlist",
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.w(({
          list
        }, s0, i0) => {
          return {
            a: common_vendor.f(list, (item, index, i1) => {
              return {
                a: common_vendor.t(item),
                b: index
              };
            }),
            b: i0,
            c: s0
          };
        }, {
          name: "d",
          path: "a",
          vueId: "0853c5dd-1,0853c5dd-0"
        }),
        b: common_vendor.p({
          api: "test",
          params: {}
        }),
        c: common_vendor.p({
          headerTitle: "列表模板",
          bgi: common_vendor.unref(common_assets.bgi),
          bgc: "#F4F6F9"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "F:/prjs/za-my-demo/uniapp-vue3-chat-mine/uniapp-mine/pages/test/testlist.vue"]]);
wx.createPage(MiniProgramPage);
