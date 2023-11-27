***
uniapp-base
|-api 接口
|-conmponents 组件
|   |-layout 通用面板组件[不需要手动引入]
|   +-public 公用组件[不需要手动引入]
|-node_modules 依赖包
|-pages 页面 [建议用xxx/xxx.vue格式，如abc/abc.vue]
|-router 路由守卫
|-static 静态文件
|   |-css css的通用文件
|   |-images 图片文件
|   |   |-icons 小图标文件
|   |   +-temp 大图片文件
|   +-tabbar tabbar图标
|-store 状态管理
|-uni_modules uni插件库
|-unpackage 打包后的文件
|-utils 静态JS文件
|-.env.development baseUrl开发环境会用
|-.env.production baseUrl生产环境会用
|-App.vue
|-main.js
|-manifest.json
|-pages.json
|-uni.scss
+-vite.config.js
***

使用此套代码前需看注释[配合pages/test理解]：
@/components/layout/lay-layout.vue
@/utils/index.js
@/router/index.js
@/store/global.js

注意：
@/pages/test/常用代码.vue
@/pages/test/默认复用模板.vue

下面文件夹里面的组件为全局引用，如需要添加个人组件，建议在@/components里新建文件夹或添加至@/components根目录里
@/components/layout/lay-xxx.vue
@/components/public/pub-xxx.vue

ui文档地址：https://vkuviewdoc.fsq.pub/components/intro.html