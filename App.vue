<!-- dasata_layout 兼容app[andriod,ios],小程序，h5移动端 -->

<script setup>
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app';
import { useGlobalStore } from '@/store/global';
import { useUserStore } from '@/store/user';
import { nav, toast, modal } from '@/utils';
const globalStore = useGlobalStore();
const userStore = useUserStore();

onLaunch(async () => {
  globalStore.getSysInfo();
  if (!userStore.token) {
    const _token = uni.getStorageSync('token');
    if (_token) {
      userStore.token = _token;
      await userStore.getUserInfo();
    } else {
      toast('请先登录')
      nav('/pages/login/login',3)
    }
  }
});
onShow(() => {
  console.log('App Show');
});
onHide(() => {
  console.log('App Hide');
});
</script>

<style>
/*每个页面公共css */
</style>

<style lang="scss">
@import '@/static/css/layout.scss';
@import '@/uni_modules/vk-uview-ui/index.scss';
</style>
