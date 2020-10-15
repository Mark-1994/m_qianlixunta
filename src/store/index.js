import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users_id: window.localStorage.getItem('users_id') ? window.localStorage.getItem('users_id') : 0,
    // 会员卡id
    vip_id: 0
  },
  mutations: {
    increment (state) {
      state.users_id = window.localStorage.getItem('users_id') ? window.localStorage.getItem('users_id') : 0
    },
    getid (state, n) {
      state.vip_id = n
    }
  },
  actions: {
  },
  modules: {
  }
})
