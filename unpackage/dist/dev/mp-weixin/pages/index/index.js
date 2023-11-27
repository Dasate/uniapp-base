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
  __name: "index",
  setup(__props) {
    const menu = common_vendor.ref([
      {
        title: "登录",
        img: common_assets.testicon,
        link: "/pages/login/login"
      },
      {
        title: "通用",
        img: common_assets.testicon,
        badge: 999,
        link: "/pages/test/test"
      },
      {
        title: "仅安全区",
        img: common_assets.testicon,
        badge: 999,
        link: "/pages/test/test-onlysafe"
      },
      {
        title: "沉浸式标题",
        img: common_assets.testicon,
        badge: 999,
        link: "/pages/test/test-immersive"
      },
      {
        title: "沉浸式滑动变色",
        img: common_assets.testicon,
        badge: 999,
        link: "/pages/test/test-immersiveTo"
      },
      {
        title: "沉浸式冰纱窗标题",
        img: common_assets.testicon,
        badge: 999,
        link: "/pages/test/test-immersiveToIcewindow"
      },
      {
        title: "无数据",
        img: common_assets.testicon,
        badge: 999,
        link: "/pages/test/testnomsg"
      },
      {
        title: "列表测试",
        img: common_assets.testicon,
        badge: 999,
        link: "/pages/test/testlist"
      }
    ]);
    const menuTap = (item) => {
      if (item.link) {
        utils_index.nav(item.link);
      } else if (item.tap) {
        item.tap();
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(menu.value, (item, index, i0) => {
          return common_vendor.e({
            a: item.badge
          }, item.badge ? {
            b: common_vendor.t(item.badge > 99 ? "99+" : item.badge)
          } : {}, {
            c: item.img,
            d: common_vendor.t(item.title),
            e: index,
            f: common_vendor.o(($event) => menuTap(item), index)
          });
        }),
        b: common_vendor.p({
          headerIsTabbar: true,
          headerTitle: "是我",
          headerSubtitle: "不是我",
          bgi: common_vendor.unref(common_assets.bgi),
          bgc: "#F4F6F9"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"], ["__file", "F:/prjs/za-my-demo/uniapp-vue3-chat-mine/uniapp-mine/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
