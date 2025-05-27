import { createRouter, createWebHistory } from 'vue-router'
import StartView from '../views/StartView.vue'

const routes = [
  { path: '/', name: 'start',    component: StartView },
  {
    path: '/products',
    name: 'products',
    component: () => import('../views/ProductsView.vue')
  },
  
]

export default createRouter({
  history: createWebHistory(),
  routes
})

