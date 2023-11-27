import App from './App'
//vue3
import uView from './uni_modules/vk-uview-ui';
import { createSSRApp } from 'vue'
import * as Pinia from 'pinia'
import { setupRouter } from './router' // 引入路由
export function createApp() {
  const app = createSSRApp(App)
  const store = Pinia.createPinia()
  // 关键代码 👇
  app.use(store);
  app.use(uView)
  setupRouter(app)
  return {
    app,
    Pinia
  }
}