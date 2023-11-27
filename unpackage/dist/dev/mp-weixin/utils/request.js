"use strict";
const common_vendor = require("../common/vendor.js");
const utils_errorCode = require("./errorCode.js");
const utils_index = require("./index.js");
const store_user = require("../store/user.js");
const request = function(url, data, method, hideLoad, success, fail) {
  !hideLoad && utils_index.loading();
  let dataType = "json";
  let responseType = "text";
  let apiUrl;
  apiUrl = "http://scjava.mrxdtech.com/api" + url;
  let token = store_user.useUserStore().token;
  common_vendor.index.request({
    url: apiUrl,
    data,
    method,
    dataType,
    responseType,
    header: {
      "content-type": "application/json",
      "X-Token": token
    },
    success: function(res) {
      !hideLoad && utils_index.loadEnd();
      utils_errorCode.codeCheck(res.data, success, fail);
    },
    fail: function(err) {
      !hideLoad && utils_index.loadEnd();
    }
  });
};
function $get(url, data = {}, hideLoad) {
  return new Promise((resolve, reject) => {
    request(url, data, "GET", hideLoad, (res) => {
      resolve(res);
    }, (err) => {
      reject(err);
    });
  });
}
exports.$get = $get;
