"use strict";
const common_vendor = require("../common/vendor.js");
const store_user = require("../store/user.js");
const utils_index = require("../utils/index.js");
const pages = [
  {
    path: "pages/index/index",
    style: {
      navigationBarTitleText: "首页"
    },
    meta: {
      checkLogin: true
    }
  },
  {
    path: "pages/login/login",
    style: {
      navigationBarTitleText: "登录"
    },
    meta: {
      checkLogin: false
    }
  },
  {
    path: "pages/test/test",
    style: {
      navigationBarTitleText: "test",
      onReachBottomDistance: 50
    },
    meta: {
      checkLogin: true
    }
  },
  {
    path: "pages/test/test-immersive",
    style: {
      navigationBarTitleText: "test-immersive"
    },
    meta: {
      checkLogin: true
    }
  },
  {
    path: "pages/test/test-immersiveTo",
    style: {
      navigationBarTitleText: "test-immersiveTo"
    },
    meta: {
      checkLogin: true
    }
  },
  {
    path: "pages/test/test-immersiveToIcewindow",
    style: {
      navigationBarTitleText: "test-immersiveToIcewindow"
    },
    meta: {
      checkLogin: true
    }
  },
  {
    path: "pages/test/test-onlysafe",
    style: {
      navigationBarTitleText: "test-onlysafe"
    },
    meta: {
      checkLogin: true
    }
  },
  {
    path: "pages/test/testlist",
    style: {
      navigationBarTitleText: "testlist"
    },
    meta: {
      checkLogin: true
    }
  },
  {
    path: "pages/test/testnomsg",
    style: {
      navigationBarTitleText: "testnomsg"
    },
    meta: {
      checkLogin: true
    }
  },
  {
    path: "pages/mine/mine",
    style: {
      navigationBarTitleText: "个人中心"
    },
    meta: {
      checkLogin: true
    }
  }
];
function setupRouter(app) {
  app.use(common_vendor.Ct);
  const userStore = store_user.useUserStore();
  common_vendor.Et(async (to, from, next) => {
    var _a;
    const nowPage = pages.find((item) => item.path == to.url);
    if (nowPage && ((_a = nowPage.meta) == null ? void 0 : _a.checkLogin) === true && !userStore.token) {
      const _token = common_vendor.index.getStorageSync("token");
      if (_token) {
        userStore.token = _token;
        await userStore.getUserInfo();
      } else {
        utils_index.toast("请先登录");
        setTimeout(() => {
          common_vendor.index.navigateTo({
            url: "/pages/login/login"
          });
        }, 100);
        common_vendor.Rt(() => {
        });
      }
    }
    common_vendor.index.pageScrollTo({
      scrollTop: 0,
      duration: 0
    });
    next();
  });
  common_vendor.St((to, from) => {
  });
  common_vendor.It((to, from) => {
  });
}
exports.setupRouter = setupRouter;
