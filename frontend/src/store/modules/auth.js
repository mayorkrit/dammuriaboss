// Пример модуля auth
export default {
    namespaced: true,
    state: () => ({
      user: null,
      token: localStorage.getItem('token') || null
    }),
    mutations: {
      setUser(state, user) {
        state.user = user
      },
      setToken(state, token) {
        state.token = token
        localStorage.setItem('token', token)
      }
    },
    actions: {
      // пример асинхронного логина
      async login({ commit }, credentials) {
        // const data = await api.login(credentials)
        // commit('setUser', data.user)
        // commit('setToken', data.token)
      }
    },
    getters: {
      isAuthenticated: state => !!state.token
    }
  }
  