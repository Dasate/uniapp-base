<template>
    <lay-layout headerTitle="方向" :bgi="bgi" bgc="#F4F6F9" @next="next" @prev="prev" @up="up" @down="down" @move="move" minDeviationX="30" minDeviationY="30">
        <view>dx:{{ m.dX }}</view>
        <view>dy:{{ m.dY }}</view>
    </lay-layout>
</template>
<script setup>
import { ref, onMounted, computed, watch, nextTick } from 'vue';
import { nav, toast, modal } from '@/utils';
import { onLoad, onShow, onHide } from '@dcloudio/uni-app';
import bgi from '@/static/images/temp/bgi.png';


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
</script>
<style lang="scss" scoped>
.test {}
</style>
  