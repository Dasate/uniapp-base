"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_index = require("../../utils/index.js");
const store_global = require("../../store/global.js");
const _sfc_main = {
  __name: "pub-header",
  props: {
    //仅顶部安全区[时间，信号，运营商那里]
    headerOnlySafe: {
      type: Boolean,
      default: false
    },
    //顶部无占位
    headerNoPlaceholder: {
      type: Boolean,
      default: false
    },
    //顶部tabbar页，隐藏左按钮
    headerIsTabbar: {
      type: Boolean,
      default: false
    },
    // 顶部背景颜色
    headerBgc: {
      type: String,
      default: "#ffffff"
    },
    //顶部标题
    headerTitle: {
      type: String,
      default: ""
    },
    //顶部标题颜色
    headerTitleColor: {
      type: String,
      default: "#000000"
    },
    //顶部副标题
    headerSubtitle: {
      type: String,
      default: ""
    },
    //顶部副标题颜色
    headerSubtitleColor: {
      type: String,
      default: "#999999"
    },
    //顶部标题栏沉浸式(无补白，无颜色)
    headerImmersive: {
      type: Boolean,
      default: false
    },
    //顶部标题栏沉浸式转有颜色
    headerImmersiveTo: {
      type: Boolean,
      default: false
    },
    //顶部标题栏沉浸式转有颜色的色值
    headerImmersiveToColor: {
      type: String,
      default: ""
    },
    //顶部标题栏沉浸式转有颜色的标题色值
    headerImmersiveToTitleColor: {
      type: String,
      default: ""
    },
    //顶部标题栏沉浸式转有颜色的副标题色值
    headerImmersiveToSubtitleColor: {
      type: String,
      default: ""
    },
    //顶部标题栏沉浸式转冰花窗
    headerImmersiveToIceWindow: {
      type: Boolean,
      default: false
    },
    //顶部标题栏沉浸式转冰花窗透明度
    headerImmersiveToIceWindowOpacity: {
      type: [Number, String],
      default: 0.5
    },
    //顶部标题栏沉浸式开转距离
    headerImmersiveToDistance: {
      type: Number,
      default: 30
    },
    //顶部标题栏沉浸式开转前的距离(下拉多少距离开始渐变)
    headerImmersiveToSafeDistance: {
      type: Number,
      default: 0
    },
    //顶部标题栏阴影
    headerShadow: {
      type: Boolean,
      default: false
    },
    //顶部冰纱窗（毛玻璃）
    headerIceWindow: {
      type: Boolean,
      default: false
    },
    //顶部返回文字
    headerBackText: {
      type: String,
      default: ""
    },
    //顶部返回按钮颜色
    headerBackColor: {
      type: String,
      default: ""
    },
    //仅顶部安全区
    headerOnlySafe: {
      type: Boolean,
      default: false
    },
    //顶部状态栏字体颜色
    headerNavBarType: {
      type: [Number, String]
    },
    //顶部状态栏字体颜色自动适应
    headerNavBarTypeAuto: {
      type: Boolean,
      default: true
    }
  },
  emits: ["immersive"],
  setup(__props, { emit }) {
    const props = __props;
    const globalStore = store_global.useGlobalStore();
    let safeAreaTop = common_vendor.computed(() => {
      if (globalStore.safeAreaTopHeight) {
        return globalStore.safeAreaTopHeight + "rpx";
      } else {
        return "0rpx";
      }
    });
    const bgc = common_vendor.ref(props.headerBgc);
    const titleColor = common_vendor.ref(props.headerTitleColor);
    const subtitleColor = common_vendor.ref(props.headerSubtitleColor);
    const isIceWindow = common_vendor.ref(props.headerIceWindow);
    const backColor = common_vendor.ref(props.headerBackColor);
    const immersive = common_vendor.ref("");
    if (!props.headerOnlySafe) {
      if (props.headerImmersive) {
        immersive.value = "immersive";
      } else if (props.headerImmersiveTo || props.headerImmersiveToIceWindow) {
        immersive.value = "";
        bgc.value = "transparent";
      }
    }
    let emitImmersiveText = "before";
    let colorSafeNum = props.headerImmersiveToSafeDistance;
    const colorChange = (e) => {
      let opacity = e.scrollTop <= colorSafeNum ? 0 : (e.scrollTop - colorSafeNum) / (props.headerImmersiveToDistance * 1);
      if (props.headerImmersiveToIceWindow) {
        isIceWindow.value = true;
        opacity > props.headerImmersiveToIceWindowOpacity ? opacity = props.headerImmersiveToIceWindowOpacity : null;
      }
      opacity > 1 ? opacity = 1 : null;
      if (props.headerImmersiveToColor) {
        bgc.value = utils_index.colorChangeRgba(
          props.headerImmersiveToColor,
          opacity
        );
      } else {
        bgc.value = "transparent";
      }
      if (e.scrollTop - colorSafeNum > props.headerImmersiveToDistance * 1 / 3.33) {
        if (props.headerImmersiveToTitleColor) {
          titleColor.value = props.headerImmersiveToTitleColor;
          backColor.value = props.headerImmersiveToTitleColor;
        }
        if (props.headerImmersiveToSubtitleColor) {
          subtitleColor.value = props.headerImmersiveToSubtitleColor;
        }
        if (emitImmersiveText !== "after") {
          emitImmersiveText = "after";
          emit("immersive", "after");
        }
      } else {
        titleColor.value = props.headerTitleColor;
        backColor.value = props.headerBackColor;
        subtitleColor.value = props.headerSubtitleColor;
        if (emitImmersiveText !== "before") {
          emitImmersiveText = "before";
          emit("immersive", "before");
        }
      }
    };
    const instance = common_vendor.getCurrentInstance();
    const getPubHeaderHeight = () => {
      const query = common_vendor.index.createSelectorQuery().in(instance);
      query.select("#pubheader").boundingClientRect((data) => {
        if (data) {
          globalStore.setPubHeaderHeight(globalStore.pxToRpx(data.height));
        }
      }).exec();
    };
    const navBarColor = (color) => {
      if (["black", "#000", "#000000", 1].includes(color)) {
        common_vendor.index.setNavigationBarColor({
          frontColor: "#000000",
          backgroundColor: "#000000"
        });
      } else if (["white", "#fff", "#ffffff", 2].includes(color)) {
        common_vendor.index.setNavigationBarColor({
          frontColor: "#ffffff",
          backgroundColor: "#ffffff"
        });
      }
    };
    common_vendor.onMounted(() => {
      if (props.headerOnlySafe)
        return;
      getPubHeaderHeight();
      if (props.headerImmersiveTo || props.headerImmersiveToIceWindow) {
        common_vendor.index.$on("uOnPageScroll", (e) => {
          colorChange(e);
        });
      }
      if (props.headerNavBarType) {
        navBarColor(props.headerNavBarType);
      } else if (props.headerNavBarTypeAuto) {
        common_vendor.watch(
          () => bgc.value,
          (n, o) => {
            if (utils_index.colorisLight(n)) {
              navBarColor(1);
            } else {
              navBarColor(2);
            }
          },
          { immediate: true }
        );
      }
    });
    common_vendor.onUnmounted(() => {
      if (props.headerOnlySafe)
        return;
      if (props.headerImmersiveTo || props.headerImmersiveToIceWindow) {
        common_vendor.index.$off("uOnPageScroll", (e) => {
          colorChange(e);
        });
      }
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !props.headerNoPlaceholder
      }, !props.headerNoPlaceholder ? common_vendor.e({
        b: props.headerOnlySafe
      }, props.headerOnlySafe ? {
        c: common_vendor.unref(safeAreaTop)
      } : !immersive.value ? {
        e: common_vendor.unref(safeAreaTop)
      } : {}, {
        d: !immersive.value
      }) : {}, {
        f: !props.headerOnlySafe
      }, !props.headerOnlySafe ? common_vendor.e({
        g: !props.headerIsTabbar
      }, !props.headerIsTabbar ? {
        h: backColor.value,
        i: backColor.value,
        j: common_vendor.t(props.headerBackText),
        k: common_vendor.o(($event) => common_vendor.unref(utils_index.nav)("back"))
      } : {}, {
        l: props.headerTitle
      }, props.headerTitle ? common_vendor.e({
        m: common_vendor.t(props.headerTitle),
        n: props.headerSubtitle ? 1 : "",
        o: titleColor.value,
        p: props.headerSubtitle
      }, props.headerSubtitle ? {
        q: common_vendor.t(props.headerSubtitle),
        r: subtitleColor.value
      } : {}) : {}, {
        s: immersive.value === "immersive" ? 1 : "",
        t: isIceWindow.value ? 1 : "",
        v: props.headerShadow ? 1 : "",
        w: bgc.value,
        x: common_vendor.unref(safeAreaTop)
      }) : {}, {
        y: props.headerOnlySafe
      }, props.headerOnlySafe ? {
        z: bgc.value,
        A: common_vendor.unref(safeAreaTop)
      } : {});
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-9d00f76e"], ["__file", "F:/prjs/za-my-demo/uniapp-vue3-chat-mine/uniapp-mine/components/public/pub-header.vue"]]);
wx.createComponent(Component);
