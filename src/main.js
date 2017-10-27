// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import routes from './router'
import fastclick from 'fastclick'
import { routerMode } from './config/env'  // 打包项目要把mode: history注释掉
import './config/rem'
import VueLazyload from 'vue-lazyload'

import 'common/stylus/index.styl'

// 移动调试
/* eslint-disable no-unused-vars */
// import vConsole from 'vconsole'

console.log('text')

// 解决移动端300毫秒的延迟
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    fastclick.attach(document.body)
  }, false)
}

Vue.use(VueRouter)

const router = new VueRouter({
  routes,
  mode: routerMode, // 打包项目要把mode: history注释掉
  strict: process.env.NODE_ENV !== 'production',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop
      }
      return {x: 0, y: to.meta.savedPosition || 0}
    }
  }
})

// 替换图
Vue.use(VueLazyload, {
  loading: require('common/image/default.jpg')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
