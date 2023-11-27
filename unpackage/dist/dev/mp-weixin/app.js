"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const store_global = require("./store/global.js");
const store_user = require("./store/user.js");
const utils_index = require("./utils/index.js");
const uni_modules_vkUviewUi_index = require("./uni_modules/vk-uview-ui/index.js");
const router_index = require("./router/index.js");
require("./uni_modules/vk-uview-ui/libs/mixin/mixin.js");
require("./uni_modules/vk-uview-ui/libs/request/index.js");
require("./uni_modules/vk-uview-ui/libs/function/deepMerge.js");
require("./uni_modules/vk-uview-ui/libs/function/deepClone.js");
require("./uni_modules/vk-uview-ui/libs/function/test.js");
require("./uni_modules/vk-uview-ui/libs/function/queryParams.js");
require("./uni_modules/vk-uview-ui/libs/function/route.js");
require("./uni_modules/vk-uview-ui/libs/function/timeFormat.js");
require("./uni_modules/vk-uview-ui/libs/function/timeFrom.js");
require("./uni_modules/vk-uview-ui/libs/function/colorGradient.js");
require("./uni_modules/vk-uview-ui/libs/function/guid.js");
require("./uni_modules/vk-uview-ui/libs/function/color.js");
require("./uni_modules/vk-uview-ui/libs/function/type2icon.js");
require("./uni_modules/vk-uview-ui/libs/function/randomArray.js");
require("./uni_modules/vk-uview-ui/libs/function/addUnit.js");
require("./uni_modules/vk-uview-ui/libs/function/random.js");
require("./uni_modules/vk-uview-ui/libs/function/trim.js");
require("./uni_modules/vk-uview-ui/libs/function/toast.js");
require("./uni_modules/vk-uview-ui/libs/function/getParent.js");
require("./uni_modules/vk-uview-ui/libs/function/_parent.js");
require("./uni_modules/vk-uview-ui/libs/function/sys.js");
require("./uni_modules/vk-uview-ui/libs/function/debounce.js");
require("./uni_modules/vk-uview-ui/libs/function/throttle.js");
require("./uni_modules/vk-uview-ui/libs/config/config.js");
require("./uni_modules/vk-uview-ui/libs/config/zIndex.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/login/login.js";
  "./pages/test/test.js";
  "./pages/test/test-immersive.js";
  "./pages/test/test-immersiveTo.js";
  "./pages/test/test-immersiveToIcewindow.js";
  "./pages/test/test-onlysafe.js";
  "./pages/test/testlist.js";
  "./pages/test/testnomsg.js";
  "./pages/mine/mine.js";
}
const _sfc_main = {
  __name: "App",
  setup(__props) {
    const globalStore = store_global.useGlobalStore();
    const userStore = store_user.useUserStore();
    common_vendor.onLaunch(async () => {
      globalStore.getSysInfo();
      if (!userStore.token) {
        const _token = common_vendor.index.getStorageSync("token");
        if (_token) {
          userStore.token = _token;
          await userStore.getUserInfo();
        } else {
          utils_index.toast("请先登录");
          utils_index.nav("/pages/login/login", 3);
        }
      }
    });
    common_vendor.onShow(() => {
      console.log("App Show");
    });
    common_vendor.onHide(() => {
      console.log("App Hide");
    });
    return () => {
    };
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "F:/prjs/za-my-demo/uniapp-vue3-chat-mine/uniapp-mine/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  const store = common_vendor.createPinia();
  app.use(store);
  app.use(uni_modules_vkUviewUi_index.uView);
  router_index.setupRouter(app);
  return {
    app,
    Pinia: common_vendor.Pinia
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
