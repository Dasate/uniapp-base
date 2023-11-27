<template>
  <lay-layout
    headerIsTabbar
    headerTitle="是我"
    headerSubtitle="不是我"
    :bgi="bgi"
    bgc="#F4F6F9"
  >
    <view class="home">
      <view class="menu-box flex-b">
        <view
          class="menu-box-item"
          v-for="(item, index) in menu"
          :key="index"
          @tap="menuTap(item)"
        >
          <view v-if="item.badge" class="badge">{{
            item.badge > 99 ? '99+' : item.badge
          }}</view>
          <view class="img"><image :src="item.img" /></view>
          <view class="title">{{ item.title }}</view>
        </view>
      </view>
    </view>
  </lay-layout>
</template>

<script setup>
import { ref, onMounted, computed, watch, nextTick } from 'vue';
import { nav, toast, modal } from '@/utils';
import { onLoad, onShow, onHide } from '@dcloudio/uni-app';
import bgi from '@/static/images/temp/bgi.png';
import testicon from '@/static/images/icons/testicon.png';
const menu = ref([
  {
    title: '登录',
    img: testicon,
    link: '/pages/login/login'
  },
  {
    title: '通用',
    img: testicon,
    badge: 999,
    link: '/pages/test/test'
  },
  {
    title: '仅安全区',
    img: testicon,
    badge: 999,
    link: '/pages/test/test-onlysafe'
  },
  {
    title: '插槽',
    img: testicon,
    badge: 999,
    link: '/pages/test/test-slot'
  },
  {
    title: '沉浸式标题',
    img: testicon,
    badge: 999,
    link: '/pages/test/test-immersive'
  },
  {
    title: '沉浸式滑动变色',
    img: testicon,
    badge: 999,
    link: '/pages/test/test-immersiveTo'
  },
  {
    title: '沉浸式冰纱窗标题',
    img: testicon,
    badge: 999,
    link: '/pages/test/test-immersiveToIcewindow'
  },
  {
    title: '方向',
    img: testicon,
    badge: 999,
    link: '/pages/test/test-fx'
  },
  {
    title: '表单form',
    img: testicon,
    badge: 999,
    link: '/pages/test/test-form'
  },
  {
    title: '无数据',
    img: testicon,
    badge: 999,
    link: '/pages/test/test-nomsg'
  },
  {
    title: '列表测试[需要后端接口]',
    img: testicon,
    badge: 999,
    link: '/pages/test/test-list'
  },
  {
    title: '列表测试[模拟数据]',
    img: testicon,
    badge: 999,
    link: '/pages/test/test-list-m'
  }
]);

const menuTap = (item) => {
  if (item.link) {
    nav(item.link)
  } else if (item.tap) {
    item.tap();
  }
};
</script>

<style lang="scss" scoped>
.home {
  padding-bottom: 30rpx;
}
.menu-box-title {
  position: relative;
  font-size: 32rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #252b3a;
  background-color: #ffffff;
  line-height: 44rpx;
  margin: 40rpx 0 28rpx 56rpx;
  &::before {
    content: '';
    position: absolute;
    top: 4rpx;
    left: -20rpx;
    width: 6rpx;
    height: 36rpx;
    background: #c92f2f;
    border-radius: 4rpx;
  }
}
.menu-box {
  flex-wrap: wrap;
  padding: 0 30rpx 60rpx;
  .menu-box-item {
    position: relative;
    width: calc(50% - 14rpx);
    text-align: center;
    margin-top: 28rpx;
    background: #ffffff;
    box-shadow: 0rpx 8rpx 16rpx 0rpx rgba(37, 43, 58, 0.04);
    border-radius: 16rpx;
    padding: 6rpx 0 52rpx;
    .badge {
      position: absolute;
      left: 50%;
      margin-left: 46rpx;
      top: 18rpx;
      height: 32rpx;
      line-height: 32rpx;
      padding: 0 10rpx;
      border-radius: 16rpx 16rpx 16rpx 0;
      background: #ef282e;
      font-size: 20rpx;
      font-family: DIN-Medium, DIN;
      font-weight: 500;
      color: #ffffff;
      z-index: 2;
    }
    .img {
      position: relative;
      width: 186rpx;
      height: 186rpx;
      margin: 0 auto;
    }
    .title {
      margin-top: -20rpx;
      font-size: 28rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #252b3a;
      line-height: 40rpx;
    }
  }
}
</style>
