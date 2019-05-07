import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 静态路由
export const constantRouterMap = [
  // mode: 'history', //后端支持可开
  {path: '/login', component: () => import('../components/Login.vue')},
  {path: '/register', component: () => import('../components/Register.vue')},
  {path: '/forgot', component: () => import('../components/Forgot.vue')},
  {path: '/index', component: () => import('../components/index/Index.vue'), meta: {title: '首页'}},
  {path: '/bulletin', component: () => import('../components/bulletin/Bulletin.vue'), meta: {title: '公告'}},
  {path: '/bulletin/detail', component: () => import('../components/bulletin/BulletinDetail.vue'), meta: { title: '公告详情' }},
  {path: '/mine', component: () => import('../components/mine/Upload.vue')}
]

// 动态路由
export const asyncRouterMap = [
  {path: '/404', component: () => import('../components/404.vue'), meta: {title: '404'}},
  {path: '*', redirect: '/404'}
]
export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
