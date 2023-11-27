import uniCrazyRouter, { beforeEach, afterEach, onError, afterNotNext } from "uni-crazy-router";
import { pages } from '../pages.json'
import { useUserStore } from "@/store/user"
import { toast } from '@/utils'

export function setupRouter(app) {
  // 接收vue3的实例，并注册uni-crazy-router
  app.use(uniCrazyRouter)
  const userStore = useUserStore()

  beforeEach(async (to, from, next) => {
    // 逻辑代码
    const nowPage = pages.find(item => item.path == to.url) // 获取当页
    //验证登录信息
    if (nowPage && nowPage.meta?.checkLogin === true && !userStore.token) {
      const _token = uni.getStorageSync("token");
      if (_token) {
        userStore.token = _token;
        await userStore.getUserInfo();
      } else {
        toast('请先登录');
        setTimeout(() => {
          uni.navigateTo({
            url: "/pages/login/login"
          })
        }, 100)

        afterNotNext(() => {

        })
      }
    }
    // 页面切换时，回到顶部
    uni.pageScrollTo({
      scrollTop: 0,
      duration: 0
    })
    next()
  })

  afterEach((to, from) => {
    // 逻辑代码
  })

  onError((to, from) => {
    // 逻辑代码
  })
}