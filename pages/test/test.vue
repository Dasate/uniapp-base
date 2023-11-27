<template>
  <lay-layout
    headerTitle="test"
    :bgi="bgi"
    bgc="#F4F6F9"
  >
    <view style="padding: 20rpx">
      <view @click="nav('/pages/test/test-onlysafe')">uni.navigateTo</view>
      <view>----</view>
      <view>----</view>
      <view @click="nav('/pages/test/test-onlysafe', 2)">uni.redirectTo</view>
      <view>----</view>
      <view>----</view>
      <view @click="nav('/pages/test/test-onlysafe', 3)">uni.reLaunch</view>
      <view>----</view>
      <view>----</view>
      <view @click="nav('back')">uni.navigateBack</view>
      <view>详见@/utils/index.js里nav注释</view>
    </view>
  </lay-layout>
</template>
<script setup>
import { ref, onMounted, computed, watch, nextTick } from 'vue';
import { nav, toast, modal } from '@/utils';
import { onLoad, onShow, onHide } from '@dcloudio/uni-app';
import bgi from '@/static/images/temp/bgi.png';


</script>
<style lang="scss" scoped>
.left {
  position: fixed;
  width: 100rpx;
  overflow-y: auto;
  z-index: 2;
  line-height: 40rpx;
  background-color: #ccc;
}

.right {
  position: relative;
  padding-left: 110rpx;
  z-index: 1;
  line-height: 40rpx;
}
</style>
