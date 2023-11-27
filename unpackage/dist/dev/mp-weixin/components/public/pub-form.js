"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "pub-form",
  props: {
    //数据源
    objData: {
      type: Object
    },
    //输入时，光标距离键盘高度
    cursorSpacing: {
      type: Number,
      default: 0
    }
  },
  emits: [
    "input",
    "blur",
    "focus",
    "confirm",
    "keyboardheightchange"
  ],
  setup(__props, { emit }) {
    const props = __props;
    const input = (k, v) => {
      emit("input", k, v);
    };
    const blur = (k, v) => {
      emit("blur", k, v);
    };
    const focus = (item) => {
      item.tip = "";
      emit("focus", item);
    };
    const confirm = () => {
      emit("confirm");
    };
    const keyboardheightchange = (e) => {
      emit("keyboardheightchange", e.detail);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(props.objData, (item, key, i0) => {
          return common_vendor.e({
            a: item.topTitle
          }, item.topTitle ? {
            b: common_vendor.t(item.topTitle)
          } : {}, {
            c: item.icon
          }, item.icon ? {
            d: item.icon
          } : {}, {
            e: item.leftTitle
          }, item.leftTitle ? {
            f: common_vendor.t(item.leftTitle)
          } : {}, {
            g: item.icon ? 1 : "",
            h: item.isCode ? 1 : "",
            i: common_vendor.s(item.style),
            j: item.type,
            k: item.placeholder,
            l: item.disabled,
            m: item.maxlength,
            n: item.cursorSpacing || props.cursorSpacing,
            o: item.isFocus,
            p: item.confirmType,
            q: item.confirmHold,
            r: item.holdKeyboard,
            s: common_vendor.o([($event) => item.value = $event.detail.value, key, ($event) => input(key, item.value), key], key),
            t: common_vendor.o(($event) => blur(key, item.value), key),
            v: common_vendor.o(($event) => focus(item), key),
            w: common_vendor.o(confirm, key),
            x: common_vendor.o(keyboardheightchange, key),
            y: item.value,
            z: item.isCode
          }, item.isCode ? {
            A: common_vendor.unref(common_assets.codeImg)
          } : {}, {
            B: item.tip && item.showPageTip
          }, item.tip && item.showPageTip ? {
            C: common_vendor.t(item.tip)
          } : {}, {
            D: key
          });
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2f4af43a"], ["__file", "F:/prjs/za-my-demo/uniapp-vue3-chat-mine/uniapp-mine/components/public/pub-form.vue"]]);
wx.createComponent(Component);
