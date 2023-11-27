<template>
  <lay-layout
    headerImmersiveToIceWindow
    headerImmersiveToColor="#007AFF"
    headerImmersiveToTitleColor="#ffffff"
    headerImmersiveToSubtitleColor="#ffffff"
    headerTitle="冰纱窗"
    :bgi="bgi"
    @immersive="immersive"
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
const immersive = res=>{
  console.log(res)
}
</script>
<style lang="scss" scoped></style>
