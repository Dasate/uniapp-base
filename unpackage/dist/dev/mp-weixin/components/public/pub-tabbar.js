"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_index = require("../../utils/index.js");
const common_assets = require("../../common/assets.js");
const store_global = require("../../store/global.js");
const _sfc_main = {
  __name: "pub-tabbar",
  props: {
    //背景
    tabbarBgc: {
      type: String,
      default: "#ffffff"
    },
    //从1开始[建议不填，自动匹配 ]
    tabbarActive: {
      type: [Number, String],
      default: ""
    },
    //从1开始[建议不填，自动匹配 ]
    tabbarOnlySafe: {
      type: [Number, String],
      default: ""
    }
  },
  setup(__props, { expose }) {
    const props = __props;
    const globalStore = store_global.useGlobalStore();
    let safeAreaBottom = common_vendor.computed(() => {
      if (globalStore.safeAreaBottomHeight) {
        return globalStore.safeAreaBottomHeight + "rpx";
      } else {
        return "0rpx";
      }
    });
    const instance = common_vendor.getCurrentInstance();
    const getPubTabbarHeight = () => {
      const query = common_vendor.index.createSelectorQuery().in(instance);
      query.select("#pubtabbar").boundingClientRect((data) => {
        if (data) {
          globalStore.setPubTabbarHeight(globalStore.pxToRpx(data.height));
        }
      }).exec();
    };
    const menu = common_vendor.ref([
      {
        pagePath: "/pages/index/index",
        title: "首页",
        icon: common_assets.icon1,
        iconActive: common_assets.icon1Active
      },
      {
        pagePath: "",
        title: "test2",
        icon: common_assets.icon2,
        iconActive: common_assets.icon2Active
      },
      {
        pagePath: "",
        title: "购物车",
        icon: common_assets.icon3,
        iconActive: common_assets.icon3Active
      },
      {
        pagePath: "/pages/mine/mine",
        title: "我的",
        icon: common_assets.icon4,
        iconActive: common_assets.icon4Active
      }
    ]);
    const isActive = (pagePath) => {
      let pages = getCurrentPages();
      let route = pages[pages.length - 1].route;
      return "/" + route === pagePath;
    };
    const routerPush = (link) => {
      let pages = getCurrentPages();
      let route = pages[pages.length - 1].route;
      if (link) {
        if ("/" + route != link) {
          utils_index.nav(link, 3);
        }
      } else {
        utils_index.toast("功能尚未开放");
      }
    };
    common_vendor.onMounted(() => {
      getPubTabbarHeight();
    });
    expose({});
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(safeAreaBottom),
        b: common_vendor.f(menu.value, (item, index, i0) => {
          return {
            a: isActive(item.pagePath) || index === props.tabbarActive - 1 ? item.iconActive : item.icon,
            b: common_vendor.t(item.title),
            c: index,
            d: !props.tabbarActive && index === props.tabbarActive - 1 || isActive(item.pagePath) ? 1 : "",
            e: common_vendor.o(($event) => routerPush(item.pagePath), index)
          };
        }),
        c: props.bgc,
        d: common_vendor.unref(safeAreaBottom)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-9c68f658"], ["__file", "F:/prjs/za-my-demo/uniapp-vue3-chat-mine/uniapp-mine/components/public/pub-tabbar.vue"]]);
wx.createComponent(Component);
