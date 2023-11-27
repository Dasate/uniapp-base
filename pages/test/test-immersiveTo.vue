<template>
  <lay-layout
    headerImmersiveTo
    headerImmersiveToColor="#007AFF"
    headerImmersiveToTitleColor="#ffffff"
    headerImmersiveToSubtitleColor="#ffffff"
    headerTitle="出师表"
    headerSubtitle="猪葛亮"
    :bgi="bgi"
    bgc="#F4F6F9"
  >
    <view style="height:500rpx;"></view>
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
<style lang="scss" scoped></style>
