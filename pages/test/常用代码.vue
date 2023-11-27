<template>
  <lay-layout headerTitle="" :bgi="bgi" bgc="#F4F6F9"> </lay-layout>

  <!-- #ifdef H5 -->
  <!-- #endif -->

  <!-- #ifndef H5 -->
  <!-- #endif -->

  <!-- #ifdef APP-PLUS -->
  <!-- #endif -->

  <!-- #ifndef APP-PLUS -->
  <!-- #endif -->

  <!-- #ifdef APP-ANDROID -->
  <!-- #endif -->

  <!-- #ifndef APP-IOS -->
  <!-- #endif -->

  <!-- #ifdef MP-WEIXIN -->
  <!-- #endif -->

  <!-- #ifndef MP-WEIXIN -->
  <!-- #endif -->
</template>
<script setup>
/* 通用 */
import { ref, onMounted, computed, watch, nextTick } from 'vue';
import { nav, toast, modal } from '@/utils';
import { onLoad, onShow, onHide, onReady, onPageScroll, onReachBottom } from '@dcloudio/uni-app';

import bgi from '@/static/images/temp/bgi.png';
import { useGlobalStore } from '@/store/global';
const globalStore = useGlobalStore();
const props = defineProps({
  test: {
    type: Boolean,
    default: false
  },
  test: {
    type: String,
    default: ''
  },
  test: {
    type: Number,
    default: 0
  },
  test: {
    type: Array,
    default: ()=>{
      return []
    }
  },
  test: {
    type: Object,
    default: ()=>{
      return {}
    }
  },
});
const emit = defineEmits(['']);
// #ifdef H5
// #endif

// #ifndef H5
// #endif

// #ifdef APP-PLUS
// #endif

// #ifndef APP-PLUS
// #endif

// #ifdef APP-ANDROID
// #endif

// #ifndef APP-IOS
// #endif

// #ifdef MP-WEIXIN
// #endif

// #ifndef MP-WEIXIN
// #endif

//计算lay-layout中间盒子的高度(scroll-view需要用)
let middleViewHeight = computed(() => {
  let height = globalStore.windowHeight; //窗口总高
  if (!props.clean) {
    if (props.headerOnlySafe || props.headerOnlySafeFixed) {
      //仅顶部安全区
      height -= globalStore.safeAreaTopHeight;
    } else if (!props.hideHeader) {
      //有顶部标题栏
      height -= globalStore.pubHeaderHeight;
    }

    if (props.tabbarOnlySafe || props.tabbarOnlySafeFixed) {
      //仅底部安全区
      height -= globalStore.safeAreaBottomHeight;
    } else if (!props.hideTabbar) {
      //有底部tabbar
      height -= globalStore.pubTabbarHeight;
    }
  }
  return height + 'rpx';
});
const prev = (e) => {
    console.log('prev', e);
    toast('prev')
};
const next = (e) => {
    console.log('next', e);
    toast('next')
};
const up = (e) => {
    console.log('up', e);
    toast('up')
};
const down = (e) => {
    console.log('down', e);
    toast('down')
};
const m = ref({dX:0,dY:0})
const move = (e) => {
    m.value = e
};
//向父组件暴露的方法
defineExpose({});
</script>
<style lang="scss" scoped>
.test {
}
</style>
