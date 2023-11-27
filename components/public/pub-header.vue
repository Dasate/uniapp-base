<!-- 公用标题栏组件 -->
<!--
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
 -->
<template>
  <view class="pub-header">
    <block v-if="!props.headerNoPlaceholder">
      <!-- 占位用 仅安全区-->
      <view class="placeholder-only-safe" v-if="props.headerOnlySafe" :style="{ paddingTop: safeAreaTop }"></view>
      <!-- 占位用 非仅安全区-->
      <view class="placeholder" v-else-if="!immersive && immersive !== 'immersiveTo'" :style="{ paddingTop: safeAreaTop }"></view>
    </block>
    <view class="header-fixed" id="pubheader" v-if="!props.headerOnlySafe" :class="{
      immersive: immersive === 'immersive',
      icewindow: isIceWindow,
      shadow: props.headerShadow }" :style="{ background: bgc, paddingTop: safeAreaTop }">
      <view class="left" v-if="!props.headerIsTabbar">
        <view class="back flex" @click="nav('back')">
          <view class="back-icon" :style="{
            'border-top-color': backColor,
            'border-left-color': backColor
          }"></view>
          <view class="back-text">{{ props.headerBackText }}</view>
        </view>
      </view>

      <view class="center" v-if="props.headerTitle">
        <view class="title text-one" :class="{ hassubtitle: props.headerSubtitle }" :style="{ color: titleColor }">{{
          props.headerTitle }}</view>
        <view v-if="props.headerSubtitle" class="subtitle text-one" :style="{ color: subtitleColor }">{{
          props.headerSubtitle }}
        </view>
      </view>
      <!-- 左插槽 -->
      <view class="left-slot">
        <slot name="headerLeft"></slot>
      </view>
      <!-- 中间插槽 -->
      <view class="center-slot">
        <slot name="headerCenter"></slot>
      </view>
      <view class="title-slot">
        <slot name="headerTitle"></slot>
      </view>
      <view class="right-slot">
        <!-- 右插槽 -->
        <slot name="headerRight"></slot>
      </view>
      <view class="header-bottom">
        <slot name="headerBottom"></slot>
      </view>
    </view>
    <view class="header-fixed-only-safe" v-if="props.headerOnlySafe"
      :style="{ background: bgc, paddingTop: safeAreaTop }"></view>
  </view>
</template>
<script setup>
import {
  ref,
  onMounted,
  onUnmounted,
  computed,
  watch,
  nextTick,
  getCurrentInstance
} from 'vue';
import { nav, toast, modal, colorChangeRgba, colorisLight } from '@/utils';
import { onLoad, onShow, onHide, onPageScroll } from '@dcloudio/uni-app';
import { useGlobalStore } from '@/store/global';
const props = defineProps({
  //仅顶部安全区[时间，信号，运营商那里]
  headerOnlySafe: {
    type: Boolean,
    default: false
  },
  //顶部无占位
  headerNoPlaceholder: {
    type: Boolean,
    default: false
  },
  //顶部tabbar页，隐藏左按钮
  headerIsTabbar: {
    type: Boolean,
    default: false
  },
  // 顶部背景颜色
  headerBgc: {
    type: String,
    default: '#ffffff'
  },
  //顶部标题
  headerTitle: {
    type: String,
    default: ''
  },
  //顶部标题颜色
  headerTitleColor: {
    type: String,
    default: '#000000'
  },
  //顶部副标题
  headerSubtitle: {
    type: String,
    default: ''
  },
  //顶部副标题颜色
  headerSubtitleColor: {
    type: String,
    default: '#999999'
  },
  //顶部标题栏沉浸式(无补白，无颜色)
  headerImmersive: {
    type: Boolean,
    default: false
  },
  //顶部标题栏沉浸式转有颜色
  headerImmersiveTo: {
    type: Boolean,
    default: false
  },
  //顶部标题栏沉浸式转有颜色的色值
  headerImmersiveToColor: {
    type: String,
    default: ''
  },
  //顶部标题栏沉浸式转有颜色的标题色值
  headerImmersiveToTitleColor: {
    type: String,
    default: ''
  },
  //顶部标题栏沉浸式转有颜色的副标题色值
  headerImmersiveToSubtitleColor: {
    type: String,
    default: ''
  },
  //顶部标题栏沉浸式转冰花窗
  headerImmersiveToIceWindow: {
    type: Boolean,
    default: false
  },
  //顶部标题栏沉浸式转冰花窗透明度
  headerImmersiveToIceWindowOpacity: {
    type: [Number, String],
    default: 0.5
  },
  //顶部标题栏沉浸式所需距离(开转到转变完成[1/3的时候开始变化标题颜色])
  headerImmersiveToDistance: {
    type: Number,
    default: 30
  },
  //顶部标题栏沉浸式开转前的距离(下拉多少距离开始渐变)
  headerImmersiveToSafeDistance: {
    type: Number,
    default: 0
  },
  //顶部标题栏阴影
  headerShadow: {
    type: Boolean,
    default: false
  },
  //顶部冰纱窗（毛玻璃）
  headerIceWindow: {
    type: Boolean,
    default: false
  },
  //顶部返回文字
  headerBackText: {
    type: String,
    default: ''
  },
  //顶部返回按钮颜色
  headerBackColor: {
    type: String,
    default: ''
  },
  //顶部状态栏字体颜色
  headerNavBarType: {
    type: [Number, String]
  },
  //顶部状态栏字体颜色自动适应
  headerNavBarTypeAuto: {
    type: Boolean,
    default: true
  },
});
const emit = defineEmits(['immersive','isImmersive']);
const globalStore = useGlobalStore();
let safeAreaTop = computed(() => {
  if (globalStore.safeAreaTopHeight) {
    return globalStore.safeAreaTopHeight + 'rpx';
  } else {
    return '0rpx';
  }
});

const bgc = ref(props.headerBgc);
const titleColor = ref(props.headerTitleColor);
const subtitleColor = ref(props.headerSubtitleColor);
const isIceWindow = ref(props.headerIceWindow);
const backColor = ref(props.headerBackColor);
const immersive = ref('');
if (!props.headerOnlySafe) {
  if (props.headerImmersive||props.headerImmersiveTo || props.headerImmersiveToIceWindow) {
    emit('isImmersive',true);
    if(props.headerImmersive){
      immersive.value = 'immersive';
    }
    if(props.headerImmersiveTo || props.headerImmersiveToIceWindow){
      immersive.value = 'immersiveTo';
      bgc.value = 'transparent';
    }
  }
}
if(props.headerNoPlaceholder){
  emit('isImmersive',true);
}
/* 标题栏相关颜色转换处理 */
let emitImmersiveText = 'before';
let colorSafeNum = props.headerImmersiveToSafeDistance; //下拉多少距离开始渐变
const colorChange = (e) => {
  let opacity = e.scrollTop <= colorSafeNum ? 0 : (e.scrollTop - colorSafeNum) / (props.headerImmersiveToDistance * 1);
  if (props.headerImmersiveToIceWindow) {
    isIceWindow.value = true;
    opacity > props.headerImmersiveToIceWindowOpacity
      ? (opacity = props.headerImmersiveToIceWindowOpacity)
      : null;
  }
  opacity > 1 ? (opacity = 1) : null;
  if (props.headerImmersiveToColor) {
    bgc.value = colorChangeRgba(
      props.headerImmersiveToColor,
      opacity
    );
  } else {
    bgc.value = 'transparent'
  }

  if (e.scrollTop - colorSafeNum > (props.headerImmersiveToDistance * 1) / 3.33) {
    if (props.headerImmersiveToTitleColor) {
      titleColor.value = props.headerImmersiveToTitleColor;
      backColor.value = props.headerImmersiveToTitleColor;
    }
    if (props.headerImmersiveToSubtitleColor) {
      subtitleColor.value = props.headerImmersiveToSubtitleColor;
    }
    if (emitImmersiveText !== 'after') {
      emitImmersiveText = 'after';
      emit('immersive', 'after');
    }
  } else {
    titleColor.value = props.headerTitleColor;
    backColor.value = props.headerBackColor;
    subtitleColor.value = props.headerSubtitleColor;
    if (emitImmersiveText !== 'before') {
      emitImmersiveText = 'before';
      emit('immersive', 'before');
    }
  }
};
//更新头部高度和占位信息
const instance = getCurrentInstance();
const getPubHeaderHeight = () => {
  const query = uni.createSelectorQuery().in(instance);
  query
    .select('#pubheader')
    .boundingClientRect((data) => {
      if (data) {
        globalStore.setPubHeaderHeight(globalStore.pxToRpx(data.height));
      }
    })
    .exec();
};
/* 顶部状态栏字体颜色相关 */
const navBarColor = (color) => {
  if (['black', '#000', '#000000', 1].includes(color)) {
    /* 黑色 */
    uni.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#000000'
    });
  } else if (['white', '#fff', '#ffffff', 2].includes(color)) {
    /* 白色 */
    uni.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#ffffff'
    });
  }
};

onMounted(() => {
  if (props.headerOnlySafe) return;
  getPubHeaderHeight();
  if (props.headerImmersiveTo || props.headerImmersiveToIceWindow) {
    uni.$on('uOnPageScroll', (e) => {
      colorChange(e);
    });
  }
  if (props.headerNavBarType) {
    navBarColor(props.headerNavBarType);
  } else if (props.headerNavBarTypeAuto) {
    watch(
      () => bgc.value,
      (n, o) => {
        if (colorisLight(n)) {
          navBarColor(1);
        } else {
          navBarColor(2);
        }
      },
      { immediate: true }
    );
  }
});
onUnmounted(() => {
  if (props.headerOnlySafe) return;
  if (props.headerImmersiveTo || props.headerImmersiveToIceWindow) {
    uni.$off('uOnPageScroll', (e) => {
      colorChange(e);
    });
  }
});
</script>
<style lang="scss" scoped>
$headerHeight: 88rpx;
$halfHeaderHeight: 44rpx;
$topNativeHolder: 88rpx;

.pub-header {
  position: relative;
  z-index: 10;

  .placeholder {
    box-sizing: content-box;
    height: $headerHeight;
    /* 弃用 采用JS动态计算 */
    /*padding-top: constant(safe-area-inset-top);
    padding-top: env(safe-area-inset-top);*/
  }

  .placeholder-only-safe {
    box-sizing: content-box;
    height: 0;
  }

  .header-fixed {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    box-sizing: content-box;
    height: $headerHeight;
    /* 弃用 采用JS动态计算 */
    /*padding-top: constant(safe-area-inset-top);
    padding-top: env(safe-area-inset-top);*/
    line-height: 1.2;
    z-index: 2;

    &.shadow {
      box-shadow: 0rpx 2rpx 2rpx 0rpx rgba(0, 8, 38, 0.06);
    }

    &.immersive {
      background: transparent !important;
    }

    &.icewindow {
      backdrop-filter: blur(10rpx);
    }

    .left {
      position: absolute;
      left: 10rpx;
      bottom: 10rpx;
      z-index: 6;

      .back {
        padding: 20rpx;

        &-icon {
          width: 24rpx;
          height: 24rpx;
          border-top: 4rpx solid #000000;
          border-left: 4rpx solid #000000;
          transform: rotateZ(-45deg);
        }
      }
    }

    .center {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      line-height: $headerHeight;
      padding: 0 150rpx;
      text-align: center;
      z-index: 5;

      .title {
        font-size: 34rpx;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 600;

        &.hassubtitle {
          line-height: $halfHeaderHeight;
        }
      }

      .subtitle {
        font-size: 24rpx;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 400;
        line-height: 28rpx;
        padding-bottom: 10rpx;
      }
    }

    .left-slot {
      position: absolute;
      left: 24rpx;
      top: 50%;
      transform: translateY(-50%);
      z-index: 4;
    }

    .center-slot {
      position: absolute;
      left: 0;
      bottom: 0;
      right: 0;
      top: 0;
      z-index: 3;
    }
    .title-slot {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      z-index: 3;
    }

    .right-slot {
      position: absolute;
      right: 24rpx;
      top: 50%;
      transform: translateY(-50%);
      z-index: 4;
    }
    .header-bottom{
      position: absolute;
      width:100%;
      left: 0;
      bottom: 0;;
      transform: translateY(100%);
      z-index: 5;
    }
  }

  .header-fixed-only-safe {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    box-sizing: content-box;
    height: 0;
  }
}
</style>
