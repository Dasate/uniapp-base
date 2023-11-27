<template>
  <lay-layout headerTitle="无数据模板" :bgi="bgi" bgc="#F4F6F9" @down="down">
    <pub-nomsg></pub-nomsg>
  </lay-layout>
</template>
<script setup>
import { ref, onMounted, computed, watch, nextTick } from 'vue';
import { nav, toast, modal } from '@/utils';
import { onLoad, onShow, onHide } from '@dcloudio/uni-app';
import bgi from '@/static/images/temp/bgi.png';

const prev = (e) => {
  console.log('prev', e);
};
const next = (e) => {
  console.log('next', e);
};
const up = (e) => {
  console.log('up', e);
};
const down = (e) => {
  console.log('down', e);
};
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
