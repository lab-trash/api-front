import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      id: sessionStorage.getItem('user.id'),
      token: sessionStorage.getItem('user.token')
    }
  },
  getters: {
    isAuthenticated: function (state) {
      return state.user.token !== null
    }
  },
  mutations: {
    setUser: function (state, user) {
      state.user.id = user.id
      state.user.token = user.token
    }
  },
  actions: {
    signIn: function ({ commit }, user) {
      sessionStorage.setItem('user.token', user.token)
      sessionStorage.setItem('user.id', user.id)
      commit('setUser', user)
    },
    logOut: function ({ commit }) {
      commit('setUser', {
        id: null,
        token: null
      })
      sessionStorage.removeItem('user.token')
      sessionStorage.removeItem('user.id')
    }
  }
})
