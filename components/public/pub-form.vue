<!-- 公用form组件 -->
<!-- 配合@/utils/index.js里的validate()一键验证 -->
<!--
  --传进来的obj属性参数
  --注：Boolean类型默认false,String类型默认''
  ============================
  ==========公共参数==========
  --tit 输入框或选择框顶部的名称 String
  --type 输入框或选择框类型 String 【默认text】
  -- |-text 文本
  -- |-number 数字
  -- |-password 密码
  -- |-idcard 身份证
  -- |-digit 带小数点的数字
  -- |-tel 电话
  -- |-safe-password 密码安全输入键盘
  -- |-nickname 昵称输入键盘
  -- |-textarea 文本域
  -- |-select 选择框【需传入options,见下】,单列和多列
  -- |-date-time 日期+时间 【选传params,default,见下】
  -- |-date 仅日期 【选传params,default,见下】
  -- |-time 仅时间 【选传params,default,见下】
  -- L-region 地址 【选传params,default,见下】
  --value 值【验证后会返回这个】 Any
  --tip 验证失败的提示 String
  --showPageTip 验证失败是否下方红字提示 Boolean 【默认true】
  --placeholder 占位符 String
  --border 是否显示边框【props.border可全局设置】
  -- |-true/false 显示边框 【默认true】
  -- L-underline  显示底线
  --maxlength 最大能输入长度 Number 【默认200，-1为无限】
  --disabled 是否禁用 Boolean
  --style 附加样式 Object
  --icon 左边图标 ImageObject
  --rule 验证规则，配置后显示必填*号，去掉则为选填 Object
  --callback 验证失败后执行,返回失败的rule值 Function
  ----------
  --@input 当键盘输入时触发,返回(k,v)【k是obj的key,v是该值】
  --@blur 输入框失去焦点时触发,返回(k,v)【同上】
  --@focus 输入框聚焦时触发,返回(k,v)【同上】
  --@confirm 点击完成按钮时触发,返回(k,v)
  --@keyboardheightchange 键盘高度发生变化的时候触发此事件,返回{height: height, duration: duration}[height键盘高度,duration键盘弹出完成所需时间]
  --@selectConfirm 返回选择框内容
  ----------props:
  --objData 数据源 Object
  --cursorSpacing 输入时，光标距离键盘高度【可单独设置】 Number 10
  --border 边框【可单独设置】
  -- |-true/false 显示边框 【默认true】
  -- L-underline  显示底线
  --blurValidate 失去焦点时验证 Boolean【可单独设置】
  ============================
  ==========输入框参数==========
  --cursorSpacing 输入框离键盘高度 Number 默认10
  --showEye 显示眼睛【仅type为password时有效】 Boolean 默认true
  --isFocus 是否处于焦点【设置多个仅最后一个生效】 Boolean
  ============================
  ==========选择框参数==========
  --show 显示下拉框
  ----以下针对type=select,type=date,type=date-time,type=time,type=region
  --showValue 选择框显示值 String
  --connect 选择框多级属性显示时，中间的连接符 String 默认'-'
  --mask-close-able 是否可以点击遮罩层关闭 Boolean true
  --default 默认选中 见u-view文档
  --confirm 选择后执行的方法 function
  --columnchange picker滚动就执行[type=select没有] function
  ----以下针对type=select
  --options 选择框时下拉选择的属性 Array 见u-view u-select文档
  --onlyShowLast 仅显示最后一级label Boolean
  ----
  ----以下针对type=text
  --codeImg 验证码 Object
  --confirmType 设置键盘右下角按钮的文字。
  --  |-send 发送
  --  |-search 搜索
  --  |-next 下一个
  --  |-go 前往
  --  L-done 完成
  ----以下针对输入类型的type
  --confirmHold 点击键盘右下角按钮时是否保持键盘不收起 Boolean
  --holdKeyboard focus时，点击页面的时候不收起键盘 Boolean
  --isCode 是否验证码框 Boolean
  --
  --props:
  --objData 数据源 Object
  --cursorSpacing 输入时，光标距离键盘高度 Number 10
  --border 全局设置边框 Boolean, String true
  --blurValidate 失去焦点时验证 Boolean true
 -->

<template>
  <view class="pub-form">
    <view
      class="input-item-box"
      v-for="(item, key) in props.objData"
      :key="key"
    >
      <!-- input text -->
      <view class="topTitle" v-if="item.tit"
        ><text class="red-start" v-if="item.rule && Object.keys(item.rule).length">*</text
        >{{ item.tit }}</view
      >
      <block v-if="item.slot">
        <view
          class="input-box flex"
          :class="{
            'border-none':
              (item.border !== undefined && !item.border) || !props.border,
            underline:
              item.border === 'underline' || props.border === 'underline',
            disabled: item.disabled
          }"
        >
          <slot :name="item.slot" :data="item"></slot>
        </view>
      </block>
      <block v-else>
        <view
          class="input-box flex"
          :class="{
            'border-none':
              (item.border !== undefined && !item.border) || !props.border,
            underline:
              item.border === 'underline' || props.border === 'underline',
            disabled: item.disabled
          }"
        >
          <view class="icon-box" v-if="item.icon"
            ><image :src="item.icon"
          /></view>
          <textarea
            v-if="item.type === 'textarea'"
            class="textarea"
            v-model="item.value"
            :style="[item.style]"
            :placeholder="item.placeholder"
            :disabled="item.disabled"
            :maxlength="item.maxlength || 200"
            :cursor-spacing="item.cursorSpacing || props.cursorSpacing"
            :focus="item.isFocus"
            :confirm-type="item.confirmType"
            :confirm-hold="item.confirmHold"
            :hold-keyboard="item.holdKeyboard"
            @input="input(key, item)"
            @blur="blur(key, item)"
            @focus="focus(key, item)"
            @confirm="confirm(key, item)"
            @keyboardheightchange="keyboardheightchange"
          ></textarea>
          <view
            v-else-if="item.type == 'select'"
            class="select"
            :class="{ gray: !item.value }"
            @click="showPop(item)"
          >
            {{ item.showValue || item.placeholder }}
            <view class="icon"
              ><image src="@/static/images/icons/right-arrow.png"
            /></view>
          </view>
          <view
            v-else-if="
              ['time', 'date', 'date-time', 'region'].includes(item.type)
            "
            class="select"
            :class="{ gray: !item.value }"
            @click="showPop(item)"
          >
            {{ item.showValue || item.placeholder }}
            <view class="icon"
              ><image src="@/static/images/icons/right-arrow.png"
            /></view>
          </view>
          <input
            v-else
            class="input"
            :style="[item.style]"
            v-model="item.value"
            :type="item.type || 'text'"
            :placeholder="item.placeholder"
            :disabled="item.disabled"
            :maxlength="item.maxlength || 200"
            :cursor-spacing="item.cursorSpacing || props.cursorSpacing"
            :focus="item.isFocus"
            :confirm-type="item.confirmType"
            :confirm-hold="item.confirmHold"
            :hold-keyboard="item.holdKeyboard"
            @input="input(key, item)"
            @blur="blur(key, item)"
            @focus="focus(key, item)"
            @confirm="confirm(key, item)"
            @keyboardheightchange="keyboardheightchange"
          />
          <image
            class="psw-icon"
            @click="item.type = 'text'"
            v-if="
              (item.showEye || item.showEye === undefined) &&
              item.isPsw &&
              item.type == 'password'
            "
            :src="pswHide"
          />
          <image
            class="psw-icon"
            @click="item.type = 'password'"
            v-if="
              (item.showEye || item.showEye === undefined) &&
              item.isPsw &&
              item.type == 'text'
            "
            :src="pswShow"
          />
          <image class="code" v-if="item.isCode" :src="item.codeImg" />
        </view>
      </block>
      <view
        class="error-tip"
        v-if="item.tip && (item.showPageTip || item.showPageTip === undefined)"
        >{{ item.tip }}</view
      >
      <pub-select
        v-if="item.type === 'select'"
        v-model="item.show"
        :mode="
          item.options[0].children
            ? 'mutil-column-auto'
            : item.options[0].value
            ? 'single-column'
            : item.options[0][0].value
            ? 'mutil-column'
            : null
        "
        :mask-close-able="item['mask-close-able']"
        :default-value="item.default"
        :list="item.options"
        :item="item"
        @confirm="selectConfirm"
        @close="selectClose"
      ></pub-select>
      <pub-picker
        v-model="item.show"
        :mode="item.type === 'region' ? 'region' : 'time'"
        :params="item._params"
        :start-year="item['start-year']"
        :end-year="item['end-year']"
        :safe-area-inset-bottom="item['safe-area-inset-bottom']"
        :cancel-color="item['cancel-color']"
        :confirm-color="item['confirm-color']"
        :default-time="item.default"
        :default-region="item['default-region']"
        :area-code="item['area-code']"
        :default-selector="item['default-selector']"
        :mask-close-able="item['mask-close-able']"
        :show-time-tag="item['show-time-tag']"
        :z-index="item['z-index']"
        :title="item.title"
        :confirm-text="item['confirm-text']"
        :cancel-text="item['cancel-text']"
        :blur="item.blur"
        :item="item"
        v-if="['time', 'date', 'date-time', 'region'].includes(item.type)"
        @initData="pickerInit"
        @confirm="pickerConfirm"
        @cancel="pickerClose"
        @columnchange="pickerColumnChange"
      ></pub-picker>
    </view>
  </view>
</template>
<script setup>
import { ref, onMounted, computed, watch, nextTick } from 'vue';
import { nav, toast, modal } from '@/utils';
import { onLoad, onShow, onHide } from '@dcloudio/uni-app';
import { validateItem } from '@/utils/validate';

import pswHide from '@/static/images/icons/psw-hide.png';
import pswShow from '@/static/images/icons/psw-show.png';
const props = defineProps({
  //数据源
  objData: {
    type: Object
  },
  //输入时，光标距离键盘高度
  cursorSpacing: {
    type: Number,
    default: 10
  },
  //全局设置边框
  border: {
    type: [Boolean, String],
    default: true
  },
  //失去焦点时验证
  blurValidate: {
    type: Boolean,
    default: true
  }
});

const init = () => {
  //源数据处理
  for (let key in props.objData) {
    let item = props.objData[key];
    let type = item.type;
    if (type === 'password') {
      item.isPsw = true;
    } else if (['time', 'date', 'date-time', 'region'].includes(type)) {
      let params;
      if (['region'].includes(type)) {
        //地区
        params = {
          province: true,
          city: true,
          area: true,
          ...item.params
        };
      } else {
        //时间
        params = {
          year: true,
          month: true,
          day: true,
          hour: true,
          minute: true,
          second: true,
          ...item.params
        };
        if (type === 'time') {
          delete params.year;
          delete params.month;
          delete params.day;
        } else if (type === 'date') {
          delete params.hour;
          delete params.minute;
          delete params.second;
        }
      }
      item._params = params;
      if (item.default) {
        if (type === 'region') {
          if (isNaN(item.default[0] * 1)) {
            item['default-region'] = item.default;
          } else {
            item['area-code'] = item.default;
          }
        } else {
          item['item-time'] = params;
          item.showValue = item.default;
        }
      }
    }
  }
};
init();
//重置默认
const cloneData = ref(null);
const reset = () => {
  return JSON.parse(JSON.stringify(cloneData.value));
};
onMounted(() => {
  cloneData.value = JSON.parse(JSON.stringify(props.objData));
});
const emit = defineEmits([
  'input',
  'blur',
  'focus',
  'confirm',
  'keyboardheightchange',
  'selectConfirm'
]);
const input = (k, item) => {
  emit('input', k, item.value);
};
const blur = (k, item) => {
  if (item.blurValidate || props.blurValidate) {
    validateItem(item);
  }
  emit('blur', k, item.value);
};
const focus = (k, item) => {
  item.tip = '';
  emit('focus', k, item.value);
};
const confirm = (k, item) => {
  emit('confirm', k, item.value);
};
const keyboardheightchange = (e) => {
  console.log(e.detail);
  emit('keyboardheightchange', e.detail);
};
const showPop = (item) => {
  if (!item.disabled) {
    item.tip = '';
    item.show = true;
  }
};
const selectConfirm = (e, item) => {
  item.value = e;
  let str = '';
  if (!item.onlyShowLast) {
    e.map((_item, _index) => {
      if (_index) str += item.connect || '-';
      str += _item.label;
    });
  } else {
    str += e[e.length - 1].label;
  }
  item.showValue = str;
  emit('selectConfirm', e, item);
  item.confirm && item.confirm(e, item);
};
const selectClose = (bool, item) => {
  if (item.blurValidate || props.blurValidate) {
    validateItem(item);
  }
};

const pickerConfirm = (e, item, noConfirm) => {
  item.value = JSON.parse(JSON.stringify(e));
  let arr = [[], []];
  let str = '';
  if (item.type === 'region') {
    e.province ? arr[0].push(e.province.name) : null;
    e.city ? arr[0].push(e.city.name) : null;
    e.area ? arr[0].push(e.area.name) : null;
    str += arr[0].join(item.connect || '-');
    item['default-region'] = arr[0];
    item['area-code'] = '';
  } else {
    e.year ? arr[0].push(e.year) : null;
    e.month ? arr[0].push(e.month) : null;
    e.day ? arr[0].push(e.day) : null;
    e.hour ? arr[1].push(e.hour) : null;
    e.minute ? arr[1].push(e.minute) : null;
    e.second ? arr[1].push(e.second) : null;
    if (arr[0].length) {
      str += arr[0].join(item.connect || '-');
    }
    if (arr[1].length) {
      if (str) {
        str += ' ';
      }
      str += arr[1].join(':');
    }
  }
  item.value.val = str;
  item.showValue = str;
  if (!noConfirm) {
    item.confirm && item.confirm(e, item);
  }
};
const pickerInit = (v, item) => {
  pickerConfirm(v, item, true);
};
const pickerClose = (e, item) => {
  if (item.blurValidate || props.blurValidate) {
    validateItem(item);
  }
  item.cancel && item.cancel(e, item);
};
const pickerColumnChange = (e, item) => {
  item.columnchange && item.columnchange(e, item);
};
defineExpose({ reset });
</script>
<style lang="scss" scoped>
.pub-form {
  position: relative;
  .input-item-box {
    position: relative;
    margin-top: 40rpx;
    .topTitle {
      font-size: 26rpx;
      line-height: 26rpx;
      margin-bottom: 20rpx;
      .red-start{
        color:red;
      }
    }
    .icon-box {
      width: 40rpx;
      height: 40rpx;
      margin-left: 20rpx;
    }
    .input-box {
      position: relative;
      border-radius: 8rpx;
      border: 2rpx solid rgba(37, 43, 58, 0.2);
      &.border-none {
        border: none;
      }
      &.underline {
        border-radius: 0;
        border: none;
        border-bottom: 2rpx solid rgba(37, 43, 58, 0.2);
      }
      &.disabled {
        background-color: #f0f0f0;
      }
      .code {
        margin: 0 10rpx;
        width: 180rpx;
        height: 60rpx;
      }
      .psw-icon {
        margin: 0 12rpx;
        width: 36rpx;
        height: 36rpx;
      }
      .input {
        flex: 1;
        height: 80rpx;
        padding-left: 16rpx;
        font-size: 26rpx;
      }
      .textarea {
        flex: 1;
        min-height: 200rpx;
        padding: 16rpx;
        font-size: 26rpx;
      }
      .select {
        flex: 1;
        position: relative;
        height: 80rpx;
        line-height: 80rpx;
        padding-left: 16rpx;
        font-size: 26rpx;
        .icon {
          position: absolute;
          width: 36rpx;
          height: 36rpx;
          right: 20rpx;
          top: 50%;
          transform: translateY(-50%);
          line-height: 0;
        }
        &.gray {
          color: #888;
        }
      }
    }

    .error-tip {
      color: red;
      font-size: 24rpx;
      line-height: 18rpx;
      margin-top: 10rpx;
    }
  }
}
</style>
