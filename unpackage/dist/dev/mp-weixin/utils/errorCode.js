"use strict";
const common_vendor = require("../common/vendor.js");
const utils_index = require("./index.js");
function codeCheck(data, success, fail) {
  let code = parseInt(data.code);
  let err_code = parseInt(data.err_code);
  switch (err_code || code) {
    case 0:
      success && success(data);
      break;
    case 50001:
    case 50002:
    case 50003:
    case 50004:
      fail && fail(data);
      let txt = "";
      if (common_vendor.index.getStorageSync("token")) {
        txt = "登录已过期，请重新登录";
      } else {
        txt = "请先登录";
      }
      common_vendor.index.setStorageSync("token", "");
      utils_index.modal({ title: "提示", content: txt, showCancel: false }, () => {
        utils_index.nav("/pages/login/login");
      });
      break;
    default:
      fail && fail(data);
      utils_index.modal({ title: "提示", content: data.msg || "系统出错" });
      break;
  }
}
exports.codeCheck = codeCheck;
