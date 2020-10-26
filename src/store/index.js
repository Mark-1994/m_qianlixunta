import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users_id: window.localStorage.getItem('users_id') ? window.localStorage.getItem('users_id') : 0,
    // 会员卡id
    vip_id: 0,
    // 红娘卡id
    super_vip_id: 0,
    // 服务类型
    serveType: 0,
    // 聊天页标识 0 私信 1 系统
    chatType: 0,
    faceToFaceId: 0,
    // 聊天页姓名
    chatName: '千里寻TA'
  },
  mutations: {
    increment (state) {
      state.users_id = window.localStorage.getItem('users_id') ? window.localStorage.getItem('users_id') : 0
    },
    getid (state, n) {
      state.vip_id = n
    },
    // 服务类型
    getServeType (state, n) {
      state.serveType = n
    },
    // 红娘卡id
    getRedId (state, n) {
      state.super_vip_id = n
    },
    // 聊天页标识
    getChatType (state, n) {
      state.chatType = n.chatType
      state.faceToFaceId = n.faceToFaceId
    },
    // 聊天页姓名
    getChatName (state, n) {
      state.chatName = n
    }
  },
  actions: {
    // 聊天页姓名
    getActionsChatName (context, n) {
      // setTimeout(function () {
      //   context.commit('getChatName', n)
      // }, 2000)
      context.commit('getChatName', n)
    }
  },
  modules: {
  }
})
