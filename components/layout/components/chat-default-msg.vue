<template>
  <view class="default-chat-msg-box" v-if="props.listData.length">
    <view
      class="item"
      :class="{
        positionleft: item.position === 'left',
        positioncenter: item.position === 'center',
        positionright: item.position === 'right'
      }"
      v-for="(item, index) in props.listData"
      :key="index"
    >
      <!-- 对方发的消息 -->
      <block v-if="item.position && item.position === 'left'">
        <view class="head-img">
          <image
            v-if="item.img || (defaultHeadImg && defaultHeadImg.left)"
            :src="item.img || (defaultHeadImg && defaultHeadImg.left)"
          />
          <u-icon v-else name="account" color="#333" size="28"></u-icon>
        </view>
        <view class="text">{{ item.text }}</view>
        <view class="state" v-if="item.state">!</view>
      </block>
      <!-- 系统通知 -->
      <block v-else-if="item.position && item.position === 'center'">
        <view class="text">{{ item.text }}</view>
      </block>
      <!-- 我发的消息 -->
      <block v-else-if="item.position && item.position === 'right'">
        <view class="state" v-if="item.state">!</view>
        <view class="text">{{ item.text }}</view>
        <view class="head-img">
          <image
            v-if="item.img || (defaultHeadImg && defaultHeadImg.right)"
            :src="item.img || (defaultHeadImg && defaultHeadImg.right)"
          />
          <u-icon v-else name="account" color="#fff" size="28"></u-icon>
        </view>
      </block>
      <state :state="item.state"></state>
    </view>
    <view class="item" style="text-align: center">{{ props.loadingText }}</view>
  </view>
</template>
<script setup>
import state from './state';
const props = defineProps({
  listData: {
    type: Object
  },
  defaultHeadImg: {
    type: Object
  },
  loadingText: {
    type: String
  }
});
</script>
<style scoped lang="scss">
.default-chat-msg-box {
  padding: 10rpx 28rpx;
  .item {
    margin-top: 40rpx;
    transform: rotateX(180deg);
    display: flex;
    align-items: flex-start;
    justify-content: center;
    &.positionleft {
      justify-content: flex-start;
      .head-img {
        background-color: #fff;
      }
      .text {
        background-color: #fff;
        border-radius: 0 20rpx 20rpx 20rpx;
        margin-left: 16rpx;
        &::after {
          left: 0;
          margin-left: -10rpx;
          border-right: 20rpx solid #fff;
          transform: rotateZ(-90deg);
        }
      }
    }
    &.positioncenter {
      justify-content: center;
      .text {
        padding: 10rpx 20rpx;
        background: #eeeeee;
        border-radius: 10rpx;
        font-size: 24rpx;
        font-family: DIN-Regular, DIN;
        font-weight: 400;
        color: #999999;
        line-height: 20rpx;
      }
    }
    &.positionright {
      justify-content: flex-end;
      .head-img {
        background-color: $theme-color;
      }
      .text {
        background-color: $theme-color;
        text-align: right;
        color: #fff;
        border-radius: 20rpx 6rpx 20rpx 20rpx;
        margin-right: 16rpx;
        &::after {
          right: 0;
          margin-right: -10rpx;
          border-left: 20rpx solid $theme-color;
          transform: rotateZ(90deg);
        }
      }
    }
    .head-img {
      width: 70rpx;
      height: 70rpx;
      line-height: 70rpx;
      text-align: center;
      border-radius: 10rpx;
      overflow: hidden;
    }
    .text {
      position: relative;
      max-width: 516rpx;
      padding: 22rpx 32rpx;
      font-size: 30rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #000000;
      line-height: 40rpx;
      &::after {
        content: '';
        position: absolute;
        width: 0;
        height: 0;
        top: 0;
        border-top: 10rpx solid transparent;
        border-bottom: 10rpx solid transparent;
      }
    }
  }
}
</style>
