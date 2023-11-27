<!-- 公用底部tabbar组件 -->
<!-- 
  --tabbarBgc tabbar背景颜色 String '#ffffff'
  --tabbarActive tabbar激活索引 Number,String 从1开始[建议tabbar页面不填，自动匹配]
  --tabbarOnlySafe 仅底部安全区[苹果底下安全区] Boolean
  ---------------------------------------------------
  --slot 插槽
  --#tabbarTop tabbar上方插槽[注意手动添加占位]
 -->

<template>
  <view class="pub-tabbar">
    <!-- 仅安全区 -->
    <view class="placeholder-only-safe" v-if="props.tabbarOnlySafe" :style="{ paddingBottom: safeAreaBottom }"></view>
    <!-- 非仅安全区 -->
    <view class="placeholder" v-else :style="{ paddingBottom: safeAreaBottom }"></view>
    <view v-if="!props.tabbarOnlySafe" class="tabbar-fixed"
      :style="{ background: props.tabbarBgc, paddingBottom: safeAreaBottom }" id="pubtabbar">
      <view class="top-slot"><slot name="tabbarTop"></slot></view>
      <view class="tabbar-list flex-c">
        <view class="tabbar-list-item" v-for="(item, index) in menu" :key="index" :class="{
          active:
            (!props.tabbarActive && index === props.tabbarActive - 1) || isActive(item.pagePath)
        }" @click="routerPush(item.pagePath)">
          <view class="tabbar-list-item-icon">
            <image mode="aspectFit" :src="isActive(item.pagePath) || index === props.tabbarActive - 1
                ? item.iconActive
                : item.icon
              " />
          </view>
          <view class="tabbar-list-item-title">{{ item.title }}</view>
        </view>
      </view>
    </view>
  </view>
</template>
<script setup>
import { ref, onMounted, computed, watch, nextTick,getCurrentInstance } from 'vue';
import { nav, toast, modal } from '@/utils';
import { onLoad, onShow, onHide } from '@dcloudio/uni-app';
import icon1 from '@/static/tabbar/icon1.png';
import icon1Active from '@/static/tabbar/icon1_active.png';
import icon2 from '@/static/tabbar/icon2.png';
import icon2Active from '@/static/tabbar/icon2_active.png';
import icon3 from '@/static/tabbar/icon3.png';
import icon3Active from '@/static/tabbar/icon3_active.png';
import icon4 from '@/static/tabbar/icon4.png';
import icon4Active from '@/static/tabbar/icon4_active.png';
import { useGlobalStore } from '@/store/global';

const globalStore = useGlobalStore();

const props = defineProps({
  //背景
  tabbarBgc: {
    type: String,
    default: '#ffffff'
  },
  //从1开始[不填则自动匹配 ]
  tabbarActive: {
    type: [Number, String],
    default: ''
  },
  //仅底部安全区
  tabbarOnlySafe: {
    type: Boolean,
    default: false
  }
});
let safeAreaBottom = computed(() => {
  if (globalStore.safeAreaBottomHeight) {
    return globalStore.safeAreaBottomHeight + 'rpx';
  } else {
    return '0rpx';
  }
});
//更新底部tabbar高度信息
const instance = getCurrentInstance();
const getPubTabbarHeight = () => {
  const query = uni.createSelectorQuery().in(instance);
  query
    .select('#pubtabbar')
    .boundingClientRect((data) => {
      if (data) {
        globalStore.setPubTabbarHeight(globalStore.pxToRpx(data.height));
      }
    })
    .exec();
};
const menu = ref([
  {
    pagePath: '/pages/index/index',
    title: '首页',
    icon: icon1,
    iconActive: icon1Active
  },
  {
    pagePath: '',
    title: 'test2',
    icon: icon2,
    iconActive: icon2Active
  },
  {
    pagePath: '',
    title: '购物车',
    icon: icon3,
    iconActive: icon3Active
  },
  {
    pagePath: '',
    title: '我的',
    icon: icon4,
    iconActive: icon4Active
  }
]);

const isActive = (pagePath) => {
  let pages = getCurrentPages();
  let route = pages[pages.length - 1].route;
  return '/' + route === pagePath;
};
const routerPush = (link) => {
  let pages = getCurrentPages();
  let route = pages[pages.length - 1].route;
  if (link) {
    if ('/' + route != link) {
      nav(link, 3)
    }
  } else {
    toast('功能尚未开放');
  }
};

onMounted(() => {
  getPubTabbarHeight();
});
//向父组件暴露的函数
defineExpose({});
</script>
<style lang="scss" scoped>
$tabbarHeight: 98rpx;

.pub-tabbar {
  position: relative;
  z-index: 10;
}

.placeholder-only-safe {
  box-sizing: content-box;
  height: 0;
}

.placeholder {
  box-sizing: content-box;
  height: $tabbarHeight;
  /* 弃用 采用JS动态计算 */
  /*   padding-bottom: constant(safe-area-inset-bottom); 
  padding-bottom: env(safe-area-inset-bottom); */
}

.tabbar-fixed {
  position: fixed;
  bottom: 0;
  left: 0;
  box-sizing: content-box;
  width: 100%;
  height: $tabbarHeight;
  border-top: 2rpx solid #ccc;

  /* 弃用 采用JS动态计算 */
  /*   padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);  */
  .tabbar-list {
    position: relative;
    height: 100%;

    &-item {
      flex: 1;
      text-align: center;

      &-icon {
        width: 46rpx;
        height: 44rpx;
        margin: 0 auto;
      }

      &-title {
        margin-top: 10rpx;
        font-size: 20rpx;
        font-family: PingFangSC-Medium, PingFang SC;
        color: #999999;
        line-height: 20rpx;
      }

      &.active {
        .tabbar-list-item-title {
          color: var(--chatbar-bg-color);
        }
      }
    }
  }
  .top-slot{
    position: absolute;
    top:0;
    left:0;
    width:100%;
    transform: translateY(-100%);
  }
}
</style>
