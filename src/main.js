// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import axios from 'axios'
import http from './axios/http'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/common.css'
import './assets/css/reset.css'
import './assets/css/border.css'
// 引入echarts
import echarts from 'echarts'

Vue.config.productionTip = false
Vue.prototype.GLOBAL = global
axios.defaults.withCredentials = true // 解决axios 跨域问题

Vue.prototype.$http = http
Vue.prototype.$axios = axios
Vue.prototype.$echarts = echarts

Vue.use(ElementUI)

router.beforeEach((to, from, next) => {
  let Authorization = localStorage.getItem('Authorization')
  // 跳转路由前需要判断用户是否携带token
  if (Authorization) {
    if (to.path === '/' || to.path === '/login') {
      next({ path: '/index' })
    } else {
      let length = store.state.routerStore.addRouters.length
      if (length === 0) {
        let roleId = JSON.parse(localStorage.getItem('userInfo')).roleId
        store.dispatch('routerStore/GenerateRoutes', roleId).then(() => {
          console.log(store.state.routerStore.addRouters, 'store.state.routerStore.addRouters')
          router.addRoutes(store.state.routerStore.addRouters) // 动态添加可访问路由表
          next({ ...to, replace: true })
        })
      } else {
        next() // 当有用户权限的时候，说明所有可访问路由已生成 如访问没权限的全面会自动进入404页面
      }
    }
  } else {
    if (to.path === '/login' || to.path === '/register' || to.path === '/forgot') { // 登录注册直接跳转
      next()
    } else {
      window.document.body.style.backgroundColor = 'rgba(60,150,255,1)'
      next({ path: '/login' })
    }
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
