<template>
  <lay-layout headerTitle="表单" bgc="#ffffff" hideTabbar>
    <view class="login">
      <view class="login-box">
        <pub-form :objData="form_data" ref="pub_form">
          <template #abc="{ data }">
            <view>
              <input
                style="padding: 20rpx; box-sizing: content-box"
                placeholder="请输入"
                v-model="data.value"
                @focus="data.tip = ''"
              />
            </view>
          </template>
          <template #bcd="{ data }">
            {{ `------我是插槽bcd，我是选填的，我的默认值是：${data.value}` }}
          </template>
        </pub-form>
      </view>
      <view class="btn-box">
        <button class="btn" @click="submit">验证</button>
      </view>
      <view class="btn-box">
        <button class="btn" @click="moren">默认</button>
      </view>
    </view>
  </lay-layout>
</template>

<script setup>
import { ref, onMounted, computed, watch, nextTick } from 'vue';
import { nav, toast, modal } from '@/utils';
import { onLoad, onShow, onHide, onReady, onPageScroll, onReachBottom } from '@dcloudio/uni-app';
import bgi from '@/static/images/temp/bgi.png';
import usernameIcon from '@/static/images/icons/phone.png';
import codeImg from '@/static/images/temp/code.png';
import lockIcon from '@/static/images/icons/lock.png';
import defenseIcon from '@/static/images/icons/defense.png';
import { validate } from '@/utils/validate';
const pub_form = ref();
const moren = () => {
  form_data.value = pub_form.value.reset();
};
const submit = () => {
  //验证
  let vali = validate(form_data.value);
  console.log(vali); //obj{}
};
const form_data = ref({
  username: {
    tit: '手机号', //顶部名称
    type: 'number', //input类型
    value: '', //值
    tip: '', //验证失败的提示
    showPageTip: true, //验证失败的提示在输入框下方显示
    placeholder: '请输入手机号', //占位
    maxlength: 11, //最大能输入长度
    cursorSpacing: 10, //输入时，光标距离键盘高度
    isFocus: false, //焦点
    border: 'underline',
    confirmType: '', //设置键盘右下角按钮的文字，仅在 type="text" 时生效。
    confirmHold: false, //点击键盘右下角按钮时是否保持键盘不收起
    holdKeyboard: false, //focus时，点击页面的时候不收起键盘
    style: {}, //附加样式
    icon: usernameIcon, //图标
    cln: '123', //额外类名
    rule: {
      //验证规则，配置则为必填，去掉则为选填
      check_null: '手机号不能为空',
      check_phone: '请填写正确的手机号码'
    },
    callback(tip) {
      //验证失败后执行的提示
      console.log(tip);
      console.log(form_data.value.username.tip);
      toast(tip);
    }
  },
  password: {
    tit: '密码',
    type: 'password',
    value: '',
    placeholder: '请输入密码',
    tip: '',
 
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
    value: '',
    placeholder: '请输入验证码',
    tip: '',
    isCode: true,
    codeImg,
    maxlength: 6,
    icon: defenseIcon,
    rule: {
      check_null: '验证码不能为空'
    }
  },
  textarea: {
    tit: '验证码',
    type: 'textarea',
    value: '',
 
    placeholder: '请输入',
    tip: '',
    rule: {
      check_null: '不能为空'
    }
  },
  select: {
    tit: '选择框单列',
    type: 'select',
    value: '',
    show: false,
    showValue: '',
    connect: '-',
 
    placeholder: '请选择',
    options: [
      {
        value: '1',
        label: '河'
      },
      {
        value: '2',
        label: '湖'
      }
    ],
    tip: '',
    rule: {
      check_null: '不能为空'
    }
  },
  select1: {
    tit: '选择框多列',
    type: 'select',
    value: '',
    show: false,
    showValue: '',
    connect: '-',
 
    placeholder: '请选择',
    options: [
      [
        {
          value: '1',
          label: '河'
        },
        {
          value: '2',
          label: '湖'
        }
      ],
      [
        {
          value: '1',
          label: '河'
        },
        {
          value: '2',
          label: '湖'
        }
      ]
    ],
    tip: '',
    rule: {
      check_null: '不能为空'
    }
  },
  select2: {
    tit: '选择框多列联动',
    type: 'select',
    value: '',
    show: false,
    showValue: '',
    connect: '&',
 
    placeholder: '请选择',
    options: [
      {
        value: '1',
        label: '河1',
        children: [
          {
            value: '1',
            label: '河1'
          },
          {
            value: '2',
            label: '湖1'
          }
        ]
      },
      {
        value: '2',
        label: '湖2',
        children: [
          {
            value: '1',
            label: '河2'
          },
          {
            value: '2',
            label: '湖2'
          }
        ]
      }
    ],
    tip: '',
    rule: {
      check_null: '不能为空'
    }
  },
  textSlot: {
    tit: '我是插槽呀',
    value: '',
    tip: '',
    slot: 'abc', //插槽名，不要和其它的相同
    rule: {
      check_null: '不能为空'
    }
  },
  textSlot2: {
    tit: '巧了，我也是插槽',
    value: '我好帅',
    border: false,
    tip: '',
    slot: 'bcd' //插槽名，不要和其它的相同
  },
  // select3: {
  //   tit: '选择框多列联动[仅显示最后一级]',
  //   type: 'select',
  //   value: '',
  //   onlyShowLast: true,
  //   show: false,
  //   showValue: '',
  //   connect: '&',
 
  //   placeholder: '请选择',
  //   options: [
  //     {
  //       value: '1',
  //       label: '河1',
  //       children: [
  //         {
  //           value: '1',
  //           label: '河1'
  //         },
  //         {
  //           value: '2',
  //           label: '湖1'
  //         }
  //       ]
  //     },
  //     {
  //       value: '2',
  //       label: '湖2',
  //       children: [
  //         {
  //           value: '1',
  //           label: '河2'
  //         },
  //         {
  //           value: '2',
  //           label: '湖2'
  //         }
  //       ]
  //     }
  //   ],
  //   tip: '',
  //   rule: {
  //     check_null: '不能为空'
  //   }
  // },
  picker1: {
    tit: '日期时间',
    type: 'date-time',
    default:'2022-01-08 14:02:05',
    placeholder: '请选择日期时间',
    rule: {
      check_null: '不能为空'
    }
  },
  picker2: {
    tit: '日期',
    type: 'date',
    placeholder: '请选择日期',
    rule: {
      check_null: '不能为空'
    }
  },
  picker4: {
    tit: '地区',
    type: 'region',
    placeholder: '请选择',
    default:["广东省", "广州市", "海珠区"],
    rule: {
      check_null: '不能为空'
    }
  },
  picker5: {
    tit: '地区',
    type: 'region',
    placeholder: '请选择',
    default:["440000", "440100", "440104"],
    rule: {
      check_null: '不能为空'
    }
  },
  picker3: {
    tit: '时间',
    type: 'time',
    default:'14:02:05',
    placeholder: '请选择',
    rule: {
      check_null: '不能为空'
    }
  },
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
