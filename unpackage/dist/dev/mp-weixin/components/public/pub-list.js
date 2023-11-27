"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request = require("../../utils/request.js");
require("../../utils/errorCode.js");
require("../../utils/index.js");
require("../../store/user.js");
if (!Array) {
  const _easycom_pub_nomsg2 = common_vendor.resolveComponent("pub-nomsg");
  const _easycom_u_loadmore2 = common_vendor.resolveComponent("u-loadmore");
  (_easycom_pub_nomsg2 + _easycom_u_loadmore2)();
}
const _easycom_pub_nomsg = () => "./pub-nomsg.js";
const _easycom_u_loadmore = () => "../../uni_modules/vk-uview-ui/components/u-loadmore/u-loadmore.js";
if (!Math) {
  (_easycom_pub_nomsg + _easycom_u_loadmore)();
}
const _sfc_main = {
  __name: "pub-list",
  props: {
    // 接口地址
    api: {
      type: String,
      required: true
    },
    // 每页条数
    rownum: {
      type: Number,
      default: 10
    },
    // 接口参数
    params: {
      type: Object,
      default: () => ({})
    },
    // 底部文字
    loadText: {
      type: Object,
      default: () => {
        return {
          loadmore: "上拉加载更多",
          loading: "正在加载",
          nomore: "没有更多了"
        };
      },
      validator(val) {
        return Object.keys(val).every(
          (key) => ["loadmore", "loading", "nomore"].includes(key)
        );
      }
    },
    // 处理数据
    handleList: {
      type: Function,
      default: null
    }
  },
  emits: ["change", "loading", "finished", "error"],
  setup(__props, { expose, emit }) {
    const props = __props;
    const status = common_vendor.ref("loadmore");
    const list = common_vendor.ref([]);
    let pagination = common_vendor.reactive({
      page: 1,
      rownum: props.rownum,
      total_page: 2,
      total: 1
    });
    const getListData = () => {
      if (!props.api)
        throw "请传入接口地址";
      status.value = "loading";
      emit("loading");
      utils_request.$get(
        props.api,
        {
          page: pagination.page,
          rownum: pagination.rownum,
          ...props.params
        },
        true
      ).then(({ data }) => {
        if (props.handleList)
          data.list = props.handleList(data.list);
        list.value = list.value.concat(data.list);
        emit("change", { list: list.value, pagination });
        pagination = common_vendor.reactive(data.pagination);
        pagination.page++;
        state.status = "normal";
        state.distance = 0;
        if (pagination.page > pagination.total_page) {
          emit("finished");
          status.value = "nomore";
          return;
        }
        status.value = "loadmore";
      }).catch((err) => {
        emit("error");
        state.status = "normal";
        state.distance = 0;
        status.value = "loadmore";
      });
    };
    const onRefresh = () => {
      list.value = [];
      pagination = common_vendor.reactive({
        page: 1,
        rownum: props.rownum,
        total_page: 2,
        total: 1
      });
      emit("change", { list: list.value, pagination });
      getListData();
    };
    common_vendor.watch(
      () => props.params,
      (newVal, oldVal) => {
        onRefresh();
      },
      {
        immediate: true,
        deep: true
      }
    );
    common_vendor.onMounted(() => {
      console.log("onMounted");
      common_vendor.index.$on("uOnReachBottom", () => {
        if (pagination.page > pagination.total_page) {
          emit("finished");
          status.value = "nomore";
          return;
        }
        getListData();
        status.value = "loading";
      });
    });
    common_vendor.onUnmounted(() => {
      console.log("onUnmounted");
      common_vendor.index.$off("uOnReachBottom");
    });
    const state = common_vendor.reactive({
      status: "normal",
      // normal | pulling | loading
      distance: 0
    });
    common_vendor.reactive({
      normal: "下拉即可刷新",
      pulling: "释放即可刷新",
      loading: "正在加载"
    });
    common_vendor.ref(100);
    const isPageTop = common_vendor.ref(false);
    const startY = common_vendor.ref(0);
    common_vendor.ref(0);
    const touchstart = (e) => {
      common_vendor.index.createSelectorQuery().selectViewport().scrollOffset((res) => {
        if (res.scrollTop <= 10)
          isPageTop.value = true;
        else
          isPageTop.value = false;
        startY.value = e.touches[0].clientY;
      }).exec();
    };
    const listStyle = common_vendor.computed(() => {
      return {
        transitionDuration: state.status === "pulling" ? `0ms` : `300ms`,
        transform: state.distance ? `translateY(${state.distance}px)` : ""
      };
    });
    expose({
      list,
      pagination,
      status,
      onRefresh
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.r("d", {
          list: list.value
        }),
        b: common_vendor.unref(pagination).total === 0
      }, common_vendor.unref(pagination).total === 0 ? {} : common_vendor.unref(pagination).total >= 1 ? {
        d: common_vendor.p({
          status: status.value,
          ["load-text"]: __props.loadText
        })
      } : {}, {
        c: common_vendor.unref(pagination).total >= 1,
        e: common_vendor.s(common_vendor.unref(listStyle)),
        f: common_vendor.o(touchstart),
        g: common_vendor.o((...args) => _ctx.touchmove && _ctx.touchmove(...args)),
        h: common_vendor.o((...args) => _ctx.touchend && _ctx.touchend(...args))
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-05e3efde"], ["__file", "F:/prjs/za-my-demo/uniapp-vue3-chat-mine/uniapp-mine/components/public/pub-list.vue"]]);
wx.createComponent(Component);
