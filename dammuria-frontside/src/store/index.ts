import { createStore } from 'vuex'

// Пример интерфейсов
interface Product {
  id: number
  name: string
  price: number
}

// Описание корневого состояния
export interface RootState {
  // Поля для товаров
  products: Product[]
  cart: Product[]

  // Поля для подписки
  loading: boolean
  error: string | null
  success: boolean
}

export default createStore<RootState>({
  // -------------------------
  // КОРНЕВОЙ STATE
  // -------------------------
  state: {
    // Для товаров
    products: [],
    cart: [],

    // Для подписки
    loading: false,
    error: null,
    success: false
  },

  // -------------------------
  // MUTATIONS
  // -------------------------
  mutations: {
    // Для товаров
    SET_PRODUCTS(state, products: Product[]) {
      state.products = products
    },
    ADD_TO_CART(state, product: Product) {
      state.cart.push(product)
    },

    // Для подписки
    SET_LOADING(state, payload: boolean) {
      state.loading = payload
    },
    SET_ERROR(state, payload: string | null) {
      state.error = payload
    },
    SET_SUCCESS(state, payload: boolean) {
      state.success = payload
    }
  },

  // -------------------------
  // ACTIONS
  // -------------------------
  actions: {
    // Загрузка продуктов
    async fetchProducts({ commit }) {
      // Пример "запроса" (можно заменить на реальный API)
      const products: Product[] = [
        { id: 1, name: 'T-Shirt', price: 100 },
        { id: 2, name: 'Hoodie', price: 200 }
      ]
      commit('SET_PRODUCTS', products)
    },

    // Подписка (отправка email на бэкенд)
    async subscribeEmail({ commit }, email: string) {
      try {
        // Сбрасываем статусы
        commit('SET_LOADING', true)
        commit('SET_ERROR', null)
        commit('SET_SUCCESS', false)

        // Запрос на твой бэкенд
        const response = await fetch('http://localhost:3000/api/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        })

        if (!response.ok) {
          // Если ошибка (например, 409)
          const errData = await response.json()
          commit('SET_ERROR', errData.error || 'Subscription error')
          return
        }

        // Успешная подписка
        const data = await response.json()
        console.log('Subscribed:', data.subscriber)
        commit('SET_SUCCESS', true)
      } catch (error) {
        console.error('Network error:', error)
        commit('SET_ERROR', 'Network error')
      } finally {
        commit('SET_LOADING', false)
      }
    }
  },

  // -------------------------
  // GETTERS
  // -------------------------
  getters: {
    // Для товаров
    cartCount: (state) => state.cart.length,
    totalPrice: (state) =>
      state.cart.reduce((sum, p) => sum + p.price, 0),

    // При желании можно добавить геттеры по полям подписки (loading, error, success)
    isLoading: (state) => state.loading,
    subscribeError: (state) => state.error,
    isSubscribed: (state) => state.success
  }
})
