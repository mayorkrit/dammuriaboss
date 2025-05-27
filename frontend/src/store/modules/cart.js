export default {
    namespaced: true,
    state: () => ({
      items: []
    }),
    mutations: {
      addItem(state, product) {
        state.items.push(product)
      },
      removeItem(state, id) {
        state.items = state.items.filter(p => p.id !== id)
      },
    },
    actions: {
      addToCart({ commit }, product) {
        commit('addItem', product)
      }
    },
    getters: {
      totalCount: state => state.items.length
    }
  }
  