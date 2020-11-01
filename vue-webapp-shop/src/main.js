// 这是整个Vue项目的入口文件

// 安装Vue
import Vue from 'vue'
// 引入根组件
import App from './App.vue'
// 关闭项目启动的生产提示
Vue.config.productionTip = false

import router from './router'
import store from './store/'  // 导入store目录中的index.js文件

// 把所有api接口方法，都挂载在Vue的原型上，在组件中就可以使用 this.$http 来访问所有的接口方法
import http from '@/utils/api'
Vue.prototype.$http = http

// 创建根组件实例
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
// $mount() 手动挂载
