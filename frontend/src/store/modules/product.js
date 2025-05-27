import { api } from '../../services/api'

export default {
    namespaced: true,
    state: () => ({
        list: []
    }),
    mutations: {
        setProducts(state, products) {
            state.list = products
        }
    },
    actions: {
        async fetchProducts({ commit }) {
            try {
                const products = await api.fetchProducts()
                commit('setProducts', products)
            } catch (e) {
                console.error('Failed to fetch products:', e)
            }
        }
    },
    getters: {
        products: state => state.list
    }
}
