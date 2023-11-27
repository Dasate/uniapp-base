"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_index = require("../../utils/index.js");
const common_assets = require("../../common/assets.js");
const store_user = require("../../store/user.js");
const utils_validate = require("../../utils/validate.js");
require("../../utils/formcheck.js");
if (!Array) {
  const _easycom_pub_form2 = common_vendor.resolveComponent("pub-form");
  const _easycom_lay_layout2 = common_vendor.resolveComponent("lay-layout");
  (_easycom_pub_form2 + _easycom_lay_layout2)();
}
const _easycom_pub_form = () => "../../components/public/pub-form.js";
const _easycom_lay_layout = () => "../../components/layout/lay-layout.js";
if (!Math) {
  (_easycom_pub_form + _easycom_lay_layout)();
}
const _sfc_main = {
  __name: "login",
  setup(__props) {
    const userStore = store_user.useUserStore();
    const submit = () => {
      let vali = utils_validate.validate.validate(data.value);
      console.log(vali);
      if (vali) {
        setToken();
      }
    };
    const submit2 = () => {
      setToken();
    };
    const setToken = () => {
      userStore.token = "qqqqeqweqwe";
      utils_index.nav("index");
    };
    const data = common_vendor.ref({
      username: {
        topTitle: "",
        //顶部名称
        leftTitle: "",
        //左边名称
        type: "number",
        //input类型
        value: "",
        //值
        tip: "",
        //验证失败的提示
        showPageTip: true,
        //验证失败的提示在输入框下方显示
        placeholder: "请输入手机号",
        //占位
        maxlength: 11,
        //最大能输入长度
        disabled: false,
        //是否禁用
        isMust: true,
        //是否必填（显示顶部名称或左边名称前面的星号）
        cursorSpacing: 10,
        //输入时，光标距离键盘高度
        isFocus: false,
        //焦点
        confirmType: "",
        //设置键盘右下角按钮的文字，仅在 type="text" 时生效。
        confirmHold: false,
        //点击键盘右下角按钮时是否保持键盘不收起
        holdKeyboard: false,
        //focus时，点击页面的时候不收起键盘
        style: {},
        //附加样式
        icon: common_assets.usernameIcon,
        //图标
        rule: {
          //验证规则，配置则为必填，去掉则为选填
          check_null: "手机号不能为空",
          check_phone: "请填写正确的手机号码"
        },
        callback(tip) {
          console.log(tip);
          console.log(data.value.username.tip);
          utils_index.toast(tip);
        }
      },
      password: {
        topTitle: "",
        //顶部名称
        leftTitle: "",
        //左边名称
        type: "password",
        value: "",
        placeholder: "请输入密码",
        tip: "",
        showPageTip: true,
        //验证失败的提示在输入框下方显示
        height: "100",
        isMust: true,
        //是否必填
        showPsw: false,
        //切换显隐密码
        showForget: false,
        //显示忘记密码入口模块
        forgetPath: "",
        //忘记密码路径
        showRegister: false,
        //显示注册入口模块
        registerPath: "",
        //注册入口路径
        maxlength: 20,
        icon: common_assets.lockIcon,
        rule: {
          check_null: "密码不能为空",
          check_password: "密码有误，须包含大小写字母和数字"
        }
      },
      code: {
        type: "text",
        value: "",
        isMust: true,
        //是否必填
        placeholder: "请输入验证码",
        tip: "",
        showPageTip: true,
        //验证失败的提示在输入框下方显示
        isCode: true,
        height: "100",
        length: 6,
        //长度必须是这个值，可不填
        icon: common_assets.defenseIcon,
        rule: {
          check_null: "验证码不能为空"
        }
      }
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          objData: data.value
        }),
        b: common_vendor.o(submit),
        c: common_vendor.o(submit2),
        d: common_vendor.p({
          headerTitle: "登录",
          bgi: common_vendor.unref(common_assets.bgi),
          bgc: "#F4F6F9",
          hideTabbar: true,
          headerIsTabbar: true
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e4e4508d"], ["__file", "F:/prjs/za-my-demo/uniapp-vue3-chat-mine/uniapp-mine/pages/login/login.vue"]]);
wx.createPage(MiniProgramPage);
