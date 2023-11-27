<template>
  <lay-layout :bgi="bgi" bgc="#F4F6F9" headerBgc="#fff" tabbarBgc="#f90" headerOnlySafe tabbarOnlySafe>
    <view @click="nav('back')">back</view>
    <csb></csb>
  </lay-layout>
</template>
<script setup>
import { ref, onMounted, computed, watch, nextTick } from 'vue';
import { nav, toast, modal } from '@/utils';
import { onLoad, onShow, onHide } from '@dcloudio/uni-app';
import csb from './com/csb.vue'
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
