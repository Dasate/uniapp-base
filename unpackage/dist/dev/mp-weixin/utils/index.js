"use strict";
const common_vendor = require("../common/vendor.js");
const navToIndex = (cb1, cb2) => {
  nav("index", "", cb1, cb2);
};
function nav(page_path, type, cb1, cb2) {
  if (!page_path) {
    toast("参数异常，请检查");
    return;
  }
  let navType = "";
  let navObj = {
    success() {
      cb1 && cb1();
    },
    fail(err) {
      console.log(err);
      cb2 && cb2(err);
    }
  };
  if (page_path == "index") {
    navType = "reLaunch";
    navObj.url = "/pages/index/index";
  } else {
    if (page_path === 4 || page_path === "back" || page_path === "Back") {
      navType = "navigateBack";
      const pages = getCurrentPages();
      if (!type) {
        if (pages.length > 1) {
          navObj.delta = 1;
        } else {
          navToIndex();
          return;
        }
      } else {
        if (typeof type === "number") {
          if (pages.length > type) {
            navObj.delta = type;
          } else {
            navToIndex();
            return;
          }
        } else if (typeof type === "string") {
          if (~type.search("/pages")) {
            let index = pages.findIndex((v) => "/" + v.route === type);
            if (index != -1) {
              navObj.delta = pages.length - 1 - index;
            } else {
              navType = "redirectTo";
              navObj.url = type;
            }
          } else {
            toast("路径异常，请检查");
            return;
          }
        } else {
          toast("参数异常，请检查");
          return;
        }
      }
    } else {
      if (!type || type === 1 || type === "nav") {
        navType = "navigateTo";
        navObj.url = page_path;
      } else if (type === 2 || type === "red") {
        navType = "redirectTo";
        navObj.url = page_path;
      } else if (type === 3 || type === "rel" || type === "reL") {
        navType = "reLaunch";
        navObj.url = page_path;
      }
    }
  }
  common_vendor.index[navType](navObj);
}
function toast(msg = "提示", duration = 3e3) {
  setTimeout(() => {
    common_vendor.index.showToast({
      title: msg,
      icon: "none",
      duration
    });
  }, 10);
}
function modal(obj, cb_confirm, cb_cancel) {
  const {
    title = "提示",
    content = "",
    showCancel = true,
    cancelText = "取消",
    confirmText = "确定",
    cancelColor = "#848484",
    confirmColor = "007AFF"
  } = obj;
  common_vendor.index.showModal({
    title,
    content,
    showCancel,
    cancelText,
    confirmText,
    cancelColor,
    confirmColor,
    success: function(res) {
      if (res.confirm) {
        cb_confirm && cb_confirm();
      } else if (res.cancel) {
        cb_cancel && cb_cancel();
      }
    }
  });
}
function loading(msg = "") {
  common_vendor.index.showLoading({
    title: msg,
    mask: true
  });
}
function loadEnd() {
  common_vendor.index.hideLoading();
}
const colorChangeRgba = (color, opacity = 1) => {
  if (color.search("#") > -1) {
    let rgbastr = "";
    if (color.length == 4) {
      let str = color.split("");
      rgbastr += "#" + str[1] + str[1] + str[2] + str[2] + str[3] + str[3];
      color = rgbastr;
    }
    let rgba = "rgba(" + parseInt("0x" + color.slice(1, 3)) + "," + parseInt("0x" + color.slice(3, 5)) + "," + parseInt("0x" + color.slice(5, 7)) + "," + opacity + ")";
    return rgba;
  } else if (color.search("rgba") > -1) {
    let str = color.split(",");
    str.pop();
    str.push(opacity + ")");
    return str.join(",");
  } else if (color.search("rgb") > -1) {
    return color.replace(")", "," + opacity + ")");
  } else {
    toast("色值有误");
  }
};
const set16ToRgb = (str) => {
  var reg = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;
  if (!reg.test(str)) {
    return;
  }
  let newStr = str.toLowerCase().replace(/\#/g, "");
  let len = newStr.length;
  if (len == 3) {
    let t = "";
    for (var i = 0; i < len; i++) {
      t += newStr.slice(i, i + 1).concat(newStr.slice(i, i + 1));
    }
    newStr = t;
  }
  let arr = [];
  for (var i = 0; i < 6; i = i + 2) {
    let s = newStr.slice(i, i + 2);
    arr.push(parseInt("0x" + s));
  }
  return "rgb(" + arr.join(",") + ")";
};
const colorisLight = (rgb, opacity) => {
  if (rgb) {
    if (rgb && rgb.length == 3) {
      let num = rgb[0] * 0.299 + rgb[1] * 0.587 + rgb[2] * 0.114;
      if (opacity < 0.3) {
        return true;
      } else {
        return num > 192 ? true : false;
      }
    } else if (rgb.search("#") > -1) {
      let c = colorisLight(set16ToRgb(rgb));
      return c;
    } else if (rgb.search("rgb") > -1) {
      let _rgb = rgb.replace(")", "");
      let opa;
      if (rgb.search("rgba") > -1) {
        _rgb = _rgb.replace("rgba(", "");
        _rgb = _rgb.split(",");
        opa = _rgb.pop();
      } else {
        _rgb = _rgb.replace("rgb(", "");
        _rgb = _rgb.split(",");
      }
      let c = colorisLight(_rgb, opa);
      return c;
    } else {
      console.log("色值有误");
    }
  } else {
    console.log("请传入色值");
  }
};
exports.colorChangeRgba = colorChangeRgba;
exports.colorisLight = colorisLight;
exports.loadEnd = loadEnd;
exports.loading = loading;
exports.modal = modal;
exports.nav = nav;
exports.toast = toast;
