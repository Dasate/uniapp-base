<template>
  <view class="state" v-if="props.state"> </view>
</template>
<script setup>
const props = defineProps({
  state: {
    type: Object
  }
});
</script>
<style scoped lang="scss"></style>
