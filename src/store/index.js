import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import userStore from './userStore'
import routerStore from './routerStore'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    userStore,
    routerStore
  },
  plugins: [createLogger()]
})
export default store
