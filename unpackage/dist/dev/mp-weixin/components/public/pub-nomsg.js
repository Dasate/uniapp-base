"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "pub-nomsg",
  props: {
    nomsgObj: {
      type: Object,
      default: () => {
        return {
          tip: "当前无相关数据~",
          img: common_assets.nomsg
        };
      }
    },
    tip: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: __props.nomsgObj.img,
        b: common_vendor.t(__props.tip ? __props.tip : __props.nomsgObj.tip)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ac2d3e43"], ["__file", "F:/prjs/za-my-demo/uniapp-vue3-chat-mine/uniapp-mine/components/public/pub-nomsg.vue"]]);
wx.createComponent(Component);
