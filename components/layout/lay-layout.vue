<!-- 通用普通面板 Boolean类型非说明的，默认false,String默认''-->
<!--
  ---------------------------------------------------
  ----以下仅lay-layout组件专有
  --clean纯净面板(无头部和tabbar无安全区) Boolean
  --bgi页面背景图 imgObj
  --bgc页面背景色(可与bgi叠加,bgi优先显示 ) String
  --bgFocus 页面背景图聚焦到中间可滚动区域 Boolean
  --bgFixed 页面背景图锁定不随滚动条滚动 Boolean 默认true
  --hideHeader 隐藏顶部 Boolean
  --hideTabbar 隐藏tabbar Boolean类型非说明的，默认false
  --minDeviationX 最小横划判断距离 Number 50
  --minDeviationY 最小纵划判断距离 Number 50
  --@next 左划 返回obj{startX,endX,dX}
  --@prev 右划 返回obj{startX,endX,dX}
  --@up   上划 返回obj{startY,endY,dY}
  --@down 下划 返回obj{startY,endY,dY}
  --@move 划距 返回obj{dX,dY}
  ---------------------------------------------------
  ----以下仅lay-layout组件和pab-header都有
  --headerOnlySafe 仅顶部安全区[时间，信号，运营商那里] Boolean
  --headerNoPlaceholder 顶部无占位 Boolean
  --headerIsTabbar 顶部tabbar页，隐藏左按钮 Boolean
  --headerBgc 顶部背景颜色 String #ffffff
  --headerTitle 顶部标题 String 
  --headerTitleColor 顶部标题颜色 String #000000
  --headerSubtitle 顶部副标题 String 
  --headerSubtitleColor 顶部副标题颜色 String #999999
  --headerImmersive 顶部标题栏沉浸式(无标题下方透明占位，无颜色) Boolean
  --headerImmersiveTo 顶部标题栏沉浸式转有颜色(无标题下方透明占位) Boolean
  --headerImmersiveToColor 顶部标题栏沉浸式转有颜色的色值 String 
  --headerImmersiveToTitleColor 顶部标题栏沉浸式转有颜色的标题色值 String #000000
  --headerImmersiveToSubtitleColor 沉浸式转有颜色的副标题色值 String #999999
  --headerImmersiveToIceWindow 顶部标题栏沉浸式转冰花窗(无标题下方透明占位) Boolean
  --headerImmersiveToIceWindowOpacity 冰花窗透明度 Number, String 0.5
  --headerImmersiveToDistance 顶部标题栏沉浸式所需距离(开转到转变完成[1/3的时候开始变化标题颜色]) Number 30
  --headerImmersiveToSafeDistance 顶部标题栏沉浸式开转前的距离(下拉多少距离开始渐变) Number 0
  --headerShadow 顶部标题栏阴影 Boolean
  --headerIceWindow 顶部冰纱窗（毛玻璃） Boolean
  --headerBackText 顶部返回文字 String
  --headerBackColor 顶部返回文字颜色 String
  --headerNavBarType 顶部状态栏字体颜色[信号，时间，运营商那里] String，Number 仅黑色和白色，黑色对应['black' '#000' '#000000' 1] 白色对应['white' '#fff' '#ffffff' 2]，uni只提供黑和白
  --headerNavBarTypeAuto 顶部状态栏字体颜色自动适应 Boolean 默认true [注意：当有headerNavBarType时，此属性无效]
  --@immersive 沉浸切换时向父级返回before(初始) after(切换后)
  --
  --slot 插槽 --
  --#headerLeft 标题栏左边插槽[后退箭头那里]
  --#headerCenter 标题栏居中插槽[长宽覆盖整个标题栏，标题用下面的,层级比left和right低]
  --#headerTitle 标题栏标题插槽[标题那里,层级比left和right低]
  --#headerRight 右边插槽[小程序注意会被遮挡，新版小程序好像会兼容]
  --#headerBottom 标题栏下方插槽，[注意手动添加占位]
  --
  ---------------------------------------------------
  ----以下仅lay-layout组件和pab-tabbar有
  --tabbarBgc tabbar背景颜色 String '#ffffff'
  --tabbarActive tabbar激活索引 Number,String 从1开始[建议tabbar页面不填，自动匹配]
  --tabbarOnlySafe 仅底部安全区[苹果底下安全区] Boolean
  --
  --slot 插槽 --
  --#tabbarTop tabbar上方插槽[注意手动添加占位]
  --
  --
  -->

<template>
  <view class="lay-layout">
    <pub-header v-if="!props.hideHeader &&
      !props.clean
      " v-bind="$attrs" @immersive="immersive" @isImmersive="isImmersive">
      <template #headerLeft>
        <slot name="headerLeft"></slot>
      </template>
      <template #headerCenter>
        <slot name="headerCenter"></slot>
      </template>
      <template #headerTitle>
        <slot name="headerTitle"></slot>
      </template>
      <template #headerRight>
        <slot name="headerRight"></slot>
      </template>
      <template #headerBottom>
        <slot name="headerBottom"></slot>
      </template>
    </pub-header>
    <view :style="{ 'min-height': middleViewHeight }" class="slot-box z9" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend">
      <slot></slot>
    </view>
    <pub-tabbar v-if="!props.hideTabbar &&
      !props.clean
      " v-bind="$attrs">
      <template #tabbarTop>
        <slot name="tabbarTop"></slot>
      </template>  
    </pub-tabbar>
  </view>

  <!-- 背景图或颜色 -->
  <view class="layout-bg" :class="{ fixed: props.bgFixed }" v-if="props.bgc || props.bgi" :style="{
    top: props.bgFocus ? bgFocusTop : '0rpx',
    bottom: props.bgFocus ? bgFocusBottom : '0rpx'
  }">
    <view class="bgc" v-if="props.bgc" :style="{ background: props.bgc }"></view>
    <view class="bgi" v-if="props.bgi">
      <image :src="props.bgi" />
    </view>
  </view>
</template>
<script setup>
import { ref, onMounted, computed, watch, nextTick } from 'vue';
import { nav, toast, modal } from '@/utils';
import { onLoad, onShow, onHide } from '@dcloudio/uni-app';
import { useGlobalStore } from '@/store/global';

//props参数
const props = defineProps({
  //纯净面板(无头部和tabbar )
  clean: {
    type: Boolean,
    default: false
  },
  //页面背景图
  bgi: {},
  //页面背景色(可与bgi叠加 )
  bgc: {
    type: String
  },
  //页面背景图聚焦到中间可滚动区域
  bgFocus: {
    type: Boolean,
    default: false
  },
  //页面背景图锁定不随滚动条滚动
  bgFixed: {
    type: Boolean,
    default: true
  },
  //隐藏顶部
  hideHeader: {
    type: Boolean,
    default: false
  },
  //隐藏tabbar
  hideTabbar: {
    type: Boolean,
    default: false
  },
  //最小横划判断距离
  minDeviationX: {
    type: Number,
    default: 50
  },
  //最小纵划判断距离
  minDeviationY: {
    type: Number,
    default: 50
  }
});
const globalStore = useGlobalStore();
const emit = defineEmits(['move','prev', 'next', 'up', 'down', 'immersive']);
const immersive = (e) => {
  emit('immersive', e);
};
let bgFocusTop = computed(() => {
  let top = 0;
  if (!props.clean) {
    if (props.headerOnlySafe || props.headerOnlySafeFixed) {
      //仅顶部安全区
      top = globalStore.safeAreaTopHeight;
    } else if (!props.hideHeader) {
      //有顶部标题栏
      top = globalStore.pubHeaderHeight;
    }
  }
  return top + 'rpx';
});
let bgFocusBottom = computed(() => {
  let bottom = 0;
  if (!props.clean) {
    if (props.tabbarOnlySafe || props.tabbarOnlySafeFixed) {
      //仅底部安全区
      bottom = globalStore.safeAreaBottomHeight;
    } else if (!props.hideTabbar) {
      //有底部tabbar
      bottom = globalStore.pubTabbarHeight;
    }
  }
  return bottom + 'rpx';
});
const touchObj = {
  isTouch:false,
  startX: null,
  endX: null,
  minDeviationX: null, //最小横向偏差
  startY: null,
  endY: null,
  minDeviationY: null //最小纵向偏差
};
const touchstart = (e) => {
  if(!touchObj.isTouch){
    touchObj.isTouch = true;
  }
  touchObj.startX = e.changedTouches[0].clientX;
  touchObj.startY = e.changedTouches[0].clientY;
};
const touchmove = (e) => {
  if(touchObj.isTouch){
    let endX = e.changedTouches[0].clientX;
    let endY = e.changedTouches[0].clientY;
    let obj={
      dX:endX-touchObj.startX,
      dY:endY-touchObj.startY,
    }
    emit('move',obj);
  }
};
const touchend = (e) => {
  touchObj.endX = e.changedTouches[0].clientX;
  touchObj.endY = e.changedTouches[0].clientY;
  const { startX, endX, minDeviationX, startY, endY, minDeviationY } = touchObj;
  let obj;
  if (startX - endX > minDeviationX) {
    obj = { startX, endX, dX: startX - endX };
    emit('next', obj);
  } else if (endX - startX > minDeviationX) {
    obj = { startX, endX, dX: endX - startX };
    emit('prev', obj);
  }

  if (startY - endY > minDeviationY) {
    obj = { startY, endY, dY: startY - endY };
    emit('up', obj);
  } else if (endY - startY > minDeviationY) {
    obj = { startY, endY, dY: endY - startY };
    emit('down', obj);
  }
};
const isImmer = ref(false);
const isImmersive = (bool)=>{
  isImmer.value = bool;
}
//中间视窗高度
let middleViewHeight = computed(() => {
  let height = globalStore.windowHeight; //窗口总高
  if (!props.clean) {
    if (props.headerOnlySafe) {
      //仅顶部安全区
      height -= globalStore.safeAreaTopHeight;
    } else if (!props.hideHeader && !isImmer.value) {
      //有顶部标题栏
      height -= globalStore.pubHeaderHeight;
    }

    if (props.tabbarOnlySafe || props.tabbarOnlySafeFixed) {
      //仅底部安全区
      height -= globalStore.safeAreaBottomHeight;
    } else if (!props.hideTabbar) {
      //有底部tabbar
      height -= globalStore.pubTabbarHeight;
    }
  }
  return height + 'rpx';
});
onLoad((option) => {
  if (props.minDeviationX) touchObj.minDeviationX = props.minDeviationX;
  if (props.minDeviationY) touchObj.minDeviationY = props.minDeviationY;
});
//向外暴露的
defineExpose({});
</script>
<style lang="scss" scoped>
.lay-layout {
  position: relative;
  width: 100vw;
  min-height: 100vh;
  z-index: 3;
}

.slot-box {
  overflow: hidden;
}

.pub-layout {
  position: relative;
  flex: 1;
  z-index: 3;
}

.layout-bg {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1;

  &.fixed {
    position: fixed;
  }

  .bgc {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1;
  }

  .bgi {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 2;
  }
}
</style>
