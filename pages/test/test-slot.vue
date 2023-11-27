<template>
  <lay-layout
    headerIsTabbar
    :bgi="bgi"
    bgc="#F4F6F9"
  >
    <template #headerLeft>
      <view @click="showBottomFn">打开下方插槽</view>
    </template>
    <template #headerCenter>
      <view>headerCenter</view>
    </template>
    <template #headerTitle>
      <view>这个才是标题</view>
    </template>
    <template #headerRight>
      <view @click="showTopFn">打开下方插槽</view>
    </template>


    <template #headerBottom>
      <view style="height:300rpx;" class="bgw" v-if="showBottom">这是下方插槽</view>
    </template>
    <!-- 补白 记得加这个 -->
    <view v-if="showBottom" style="height:300rpx;" class="placeholder"></view>



    <!-- 主内容 -->
    <view @click="nav('back')">back</view>
    <csb></csb>



    <template #tabbarTop>
      <view style="height:300rpx;" class="bgw" v-if="showTop">这是上方插槽</view>
    </template>
    <!-- 补白 记得加这个 -->
    <view v-if="showTop" style="height:300rpx;" class="placeholder"></view>
  </lay-layout>
</template>
<script setup>
import { ref, onMounted, computed, watch, nextTick } from 'vue';
import { nav, toast, modal } from '@/utils';
import { onLoad, onShow, onHide } from '@dcloudio/uni-app';
import csb from './com/csb.vue'
import bgi from '@/static/images/temp/bgi.png';
const showBottom = ref(false)
const showBottomFn = ()=>{
  showBottom.value = !showBottom.value;
}

const showTop = ref(false)
const showTopFn = ()=>{
  showTop.value = !showTop.value;
}
</script>
<style lang="scss" scoped></style>
