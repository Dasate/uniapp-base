<template>
  <lay-layout headerTitle="登录" bgc="#ffffff" hideTabbar headerIsTabbar>
    <view class="login">
      <view class="login-box">
        <pub-form :objData="data">
          <template #abc="{ data }">
            <view>
              <input
                style="padding: 20rpx; box-sizing: content-box"
                placeholder="请输入"
                v-model="data.value"
              />
            </view>
          </template>
        </pub-form>
      </view>
      <view class="btn-box">
        <button class="btn" @click="submit">登录</button>
      </view>
      <view class="btn-box">
        <button class="btn" @click="submit2">首页</button>
      </view>
    </view>
  </lay-layout>
</template>

<script setup>
import { ref } from 'vue';
import { nav, toast } from '@/utils';
import bgi from '@/static/images/temp/bgi.png';
import usernameIcon from '@/static/images/icons/phone.png';
import lockIcon from '@/static/images/icons/lock.png';
import defenseIcon from '@/static/images/icons/defense.png';
import { useUserStore } from '@/store/user';
import { validate } from '@/utils/validate';
const userStore = useUserStore();
const submit = () => {
  //验证
  let vali = validate(data.value);
  console.log(vali); //obj{}
  if (vali) {
    setToken();
  }
};
const submit2 = () => {
  setToken();
};
const setToken = () => {
  userStore.token = 'qqqqeqweqwe';
  nav('index'); //跳转
};
const clearToken = () => {
  userStore.token = '';
};
const data = ref({
  username: {
    tit: '手机号',
    type: 'number', //input类型
    placeholder: '请输入手机号', //占位
    maxlength: 11, //最大能输入长度
    isMust: true, //是否必填（显示顶部名称或左边名称前面的星号）
    icon: usernameIcon, //图标
    rule: {
      //验证规则，配置则为必填，去掉则为选填
      check_null: '手机号不能为空',
      check_phone: '请填写正确的手机号码'
    }
  },
  password: {
    tit: '密码',
    type: 'password',
    placeholder: '请输入密码',
    isMust: true,
    icon: lockIcon,
    maxlength: 20,
    rule: {
      check_null: '密码不能为空',
      check_password: '密码有误，须包含大小写字母和数字'
    }
  },
  code: {
    tit: '验证码',
    type: 'text',
    isMust: true,
    placeholder: '请输入验证码',
    isCode: true,
    maxlength: 6,
    icon: defenseIcon,
    rule: {
      check_null: '验证码不能为空'
    }
  }
});
</script>

<style lang="scss" scoped>
.login {
  .login-box {
    width: 600rpx;
    margin: 200rpx auto 0;
  }
}
.btn-box {
  width: 600rpx;
  height: 80rpx;
  margin: 100rpx auto 0;
  .btn {
    background-color: $theme-color;
    height: 80rpx;
    line-height: 80rpx;
    border-radius: 10rpx;
    font-size: 34rpx;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #fff;
  }
}
</style>
