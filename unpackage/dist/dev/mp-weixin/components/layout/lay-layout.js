"use strict";
const common_vendor = require("../../common/vendor.js");
const store_global = require("../../store/global.js");
if (!Array) {
  const _easycom_pub_header2 = common_vendor.resolveComponent("pub-header");
  const _easycom_pub_tabbar2 = common_vendor.resolveComponent("pub-tabbar");
  (_easycom_pub_header2 + _easycom_pub_tabbar2)();
}
const _easycom_pub_header = () => "../public/pub-header.js";
const _easycom_pub_tabbar = () => "../public/pub-tabbar.js";
if (!Math) {
  (_easycom_pub_header + _easycom_pub_tabbar)();
}
const _sfc_main = {
  __name: "lay-layout",
  props: {
    //纯净面板(无头部和tabbar )
    clean: {
      type: Boolean,
      default: false
    },
    //页面背景图
    bgi: {},
    //页面背景色(可与bgi叠加 )
    bgc: {
      type: String
    },
    //页面背景图聚焦到中间可滚动区域
    bgFocus: {
      type: Boolean,
      default: false
    },
    //页面背景图锁定不随滚动条滚动
    bgFixed: {
      type: Boolean,
      default: true
    },
    //隐藏顶部
    hideHeader: {
      type: Boolean,
      default: false
    },
    // tabbar背景颜色
    tabbarBgc: {
      type: String
    },
    // tabbar激活索引
    tabbarActive: {
      type: [Number, String]
    },
    //仅底部安全区
    tabbarOnlySafe: {
      type: Boolean,
      default: false
    },
    //仅底部安全区
    tabbarOnlySafeFixed: {
      type: Boolean,
      default: false
    },
    //隐藏tabbar
    hideTabbar: {
      type: Boolean,
      default: false
    },
    //最小横划判断距离
    minDeviationX: {
      type: Number,
      default: 50
    },
    //最小纵划判断距离
    minDeviationY: {
      type: Number,
      default: 50
    }
  },
  emits: ["prev", "next", "up", "down", "immersive"],
  setup(__props, { expose, emit }) {
    const props = __props;
    const globalStore = store_global.useGlobalStore();
    const immersive = (e) => {
      emit("immersive", e);
    };
    let bgFocusTop = common_vendor.computed(() => {
      let top = 0;
      if (!props.clean) {
        if (props.headerOnlySafe || props.headerOnlySafeFixed) {
          top = globalStore.safeAreaTopHeight;
        } else if (!props.hideHeader) {
          top = globalStore.pubHeaderHeight;
        }
      }
      return top + "rpx";
    });
    let bgFocusBottom = common_vendor.computed(() => {
      let bottom = 0;
      if (!props.clean) {
        if (props.tabbarOnlySafe || props.tabbarOnlySafeFixed) {
          bottom = globalStore.safeAreaBottomHeight;
        } else if (!props.hideTabbar) {
          bottom = globalStore.pubTabbarHeight;
        }
      }
      return bottom + "rpx";
    });
    const touchObj = {
      startX: null,
      endX: null,
      minDeviationX: null,
      //最小横向偏差
      startY: null,
      endY: null,
      minDeviationY: null
      //最小纵向偏差
    };
    const touchstart = (e) => {
      touchObj.startX = e.changedTouches[0].clientX;
      touchObj.startY = e.changedTouches[0].clientY;
    };
    const touchend = (e) => {
      touchObj.endX = e.changedTouches[0].clientX;
      touchObj.endY = e.changedTouches[0].clientY;
      const { startX, endX, minDeviationX, startY, endY, minDeviationY } = touchObj;
      let obj;
      if (startX - endX > minDeviationX) {
        obj = { startX, endX, deviation: startX - endX };
        emit("next", obj);
      } else if (endX - startX > minDeviationX) {
        obj = { startX, endX, deviation: endX - startX };
        emit("prev", obj);
      }
      if (startY - endY > minDeviationY) {
        obj = { startY, endY, deviation: startY - endY };
        emit("up", obj);
      } else if (endY - startY > minDeviationY) {
        obj = { startY, endY, deviation: endY - startY };
        emit("down", obj);
      }
    };
    let middleViewHeight = common_vendor.computed(() => {
      let height = globalStore.windowHeight;
      if (!props.clean) {
        if (props.headerOnlySafe) {
          height -= globalStore.safeAreaTopHeight;
        } else if (!props.hideHeader && !props.headerImmersive) {
          height -= globalStore.pubHeaderHeight;
        }
        if (props.tabbarOnlySafe || props.tabbarOnlySafeFixed) {
          height -= globalStore.safeAreaBottomHeight;
        } else if (!props.hideTabbar) {
          height -= globalStore.pubTabbarHeight;
        }
      }
      return height + "rpx";
    });
    common_vendor.onLoad((option) => {
      if (props.minDeviationX)
        touchObj.minDeviationX = props.minDeviationX;
      if (props.minDeviationY)
        touchObj.minDeviationY = props.minDeviationY;
    });
    expose({});
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !props.hideHeader && !props.clean
      }, !props.hideHeader && !props.clean ? {
        b: common_vendor.o(immersive),
        c: common_vendor.p({
          ..._ctx.$attrs
        })
      } : {}, {
        d: common_vendor.unref(middleViewHeight),
        e: common_vendor.o(touchstart),
        f: common_vendor.o(touchend),
        g: !props.hideTabbar && !props.clean
      }, !props.hideTabbar && !props.clean ? {
        h: common_vendor.p({
          ..._ctx.$attrs
        })
      } : {}, {
        i: props.bgc || props.bgi
      }, props.bgc || props.bgi ? common_vendor.e({
        j: props.bgc
      }, props.bgc ? {
        k: props.bgc
      } : {}, {
        l: props.bgi
      }, props.bgi ? {
        m: props.bgi
      } : {}, {
        n: props.bgFixed ? 1 : "",
        o: props.bgFocus ? common_vendor.unref(bgFocusTop) : "0rpx",
        p: props.bgFocus ? common_vendor.unref(bgFocusBottom) : "0rpx"
      }) : {});
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-63f09916"], ["__file", "F:/prjs/za-my-demo/uniapp-vue3-chat-mine/uniapp-mine/components/layout/lay-layout.vue"]]);
wx.createComponent(Component);
