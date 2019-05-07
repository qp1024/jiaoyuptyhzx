import {asyncRouterMap, constantRouterMap} from '../router/index'
import {filterAsyncRouter} from '../axios/common/common'
export default {
  namespaced: 'true',
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: function (state, routers) {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)// 查到的路由存在vuex中
    }
  },
  actions: {
    GenerateRoutes: function ({commit}, roleId) {
      return new Promise(resolve => {
        let accessedRouters = []
        // 如果是admin 直接加载所有路由 超级管理员可以再加个判断，等角色出来以后再进行划分
        accessedRouters = filterAsyncRouter(asyncRouterMap, roleId) // 根据权限搜索路由
        commit('SET_ROUTERS', accessedRouters) // 保存vuex中
        resolve()
      })
    }
  }
}
