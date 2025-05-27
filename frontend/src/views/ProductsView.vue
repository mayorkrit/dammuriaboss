<template>
    <main class="products-page">
      <section class="hero">
        <div v-for="item in heroItems" :key="item.id" class="hero__item">
          <img :src="item.src" :alt="item.alt" class="hero__img" />
          <div class="hero__caption">{{ item.caption }}</div>
        </div>
      </section>
  
      <button class="toggle-btn" @click="toggle">
        Products
        <svg
          :class="{ rotated: !collapsed }"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="6 15 12 9 18 15" />
        </svg>
      </button>
      <transition name="slide-fade">
        <section v-if="!collapsed" class="products-list">
          <ProductCard
            v-for="prod in products"
            :key="prod.id"
            :product="prod"
          />
      </section></transition>

    </main>
  </template>
  
  <script setup>
  import { onMounted, ref, computed } from 'vue'
  import { useStore } from 'vuex'
  import ProductCard from '../components/ProductCard.vue'
  
  import hero1 from '../assets/blueheart.svg'
  import hero2 from '../assets/dammuriastudio.svg'
  
  const heroItems = [
    { id: 1, src: hero1, alt: '“BLUE HEART”', caption: '“BLUE HEART”' },
    { id: 2, src: hero2, alt: 'DAMMURIA STUDIO', caption: 'DAMMURIA STUDIO' },
  ]
  
  const store = useStore()
  const collapsed = ref(false)
  
  onMounted(() => {
    store.dispatch('product/fetchProducts')
  })
  
  const products = computed(() => store.state.product.list)
  
  function toggle() {
    collapsed.value = !collapsed.value
  }
</script>

<style scoped lang="scss">

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: opacity 0.35s ease, transform 0.35s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}


.products-page {
    background: #0d00ff;
    min-height: 100vh;
    padding: 12rem;
}
    
.hero {
  display: grid;
  grid-template-columns: repeat(2, .3fr);
  // gap: 1rem;
  justify-content: center;
  margin-bottom: 2rem;

  &__item {
    text-align: center;
  }
  &__img {
    width: 95px;
    height: 81px;
    object-fit: cover;
    border-radius: 0.5rem;
  }
  &__caption {
    margin-top: 0.5rem;
    font-family: 'Francy', sans-serif;
    font-size: 1rem;
    color: #fff;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.toggle-btn {
  display: flex;
  align-items: center;
  margin: 10rem auto 1.5rem;
  background: transparent;
  border: none;
  color: #fff;
  font-family: 'Francy', sans-serif;
  font-size: 1.25rem;
  cursor: pointer;

  svg {
    margin-left: 0.5rem;
    transition: transform 0.2s;
  }
  .rotated {
    transform: rotate(180deg);
  }
}

.products-list {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
