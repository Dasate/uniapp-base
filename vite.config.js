import { defineConfig } from 'vite'
import path from 'path';
import uni from '@dcloudio/vite-plugin-uni'
import h5ProdEffectPlugin from 'uni-vite-plugin-h5-prod-effect'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uni(),
    // 对h5 production环境打包时的特殊处理，否则uni-crazy-router在这个环境会异常
    h5ProdEffectPlugin()
  ],
  resolve: {
    alias: [
      {
        find: '@api',
        replacement: path.resolve(__dirname, 'lib/assets/js/api'),
      }
    ]
  },
  // server:{
  //   proxy: {
  //     '/api': {
  //        target: 'http://scphp.mrxdtech.com/api',
  //       target: 'http://scjava.mrxdtech.com/api',
  //       // target: 'http://sc23.mrxdtech.com/api',
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, '')
  //     }
  //   }
  // }
})