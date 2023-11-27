<template>
  <view class="no-msg">
    <view class="img"><image :src="nomsgObj.img" /></view>
    <view class="tip">{{ tip ? tip : nomsgObj.tip }}</view>
    <slot></slot>
  </view>
</template>
<script setup>
import { ref, onMounted, computed, watch, nextTick } from 'vue';
import { nav, toast, modal } from '@/utils';
import { onLoad, onShow, onHide } from '@dcloudio/uni-app';
import nomsg from '@/static/images/icons/nomsg.png';
const props = defineProps({
  nomsgObj: {
    type: Object,
    default: () => {
      return {
        tip: '当前无相关数据~',
        img: nomsg
      };
    }
  },
  tip: {
    type: String,
    default: ''
  }
});
</script>
<style lang="scss" scoped>
.no-msg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -80%);
  .img {
    width: 342rpx;
    height: 342rpx;
    image {
      width: 100%;
      height: 100%;
    }
  }
  .tip {
    font-size: 28rpx;
    font-weight: 400;
    color: #9397a2;
    line-height: 28rpx;
    text-align: center;
  }
}
</style>
