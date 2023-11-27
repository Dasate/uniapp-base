<template>
  <lay-layout headerTitle="列表模板" :bgi="bgi" bgc="#F4F6F9">
    <pub-listm api="test" :params="{}">
      <template v-slot="{ list }">
        <view v-for="(item, index) in list" :key="index">
          <view style="height:200rpx;">{{ item }}</view>
        </view>
      </template>
    </pub-listm>
  </lay-layout>
</template>
<script setup>
import { ref, onMounted, computed, watch, nextTick } from 'vue';
import { nav, toast, modal } from '@/utils';
import { onLoad, onShow, onHide } from '@dcloudio/uni-app';
import pubListm from './com/pub-listm.vue'
import bgi from '@/static/images/temp/bgi.png';
</script>
<style lang="scss" scoped>
</style>
