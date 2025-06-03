<template>
  <article class="product-card">
    <div class="product-card__top">
      <img :src="fullImageUrl" :alt="product.title" class="product-card__img" />

      <div class="product-card__actions">
        <button class="btn-primary" @click="onBuy">BUY</button>
        <button class="btn-secondary" @click="showSizes = !showSizes">
          Size?
        </button>
        <ul v-if="showSizes" class="size-list">
          <li
            v-for="size in product.sizes"
            :key="size"
            @click="selectSize(size)"
            :class="{ selected: size === selectedSize }"
          >
            {{ size }}
          </li>
          <li v-if="product.sizes.length === 0">ONE SIZE</li>
        </ul>

        <transition name="slide-down">
          <div v-if="showPhoneInput" class="phone-block">
            <input
              v-model="phoneNumber"
              type="tel"
              placeholder="Your phone number"
              class="phone-input"
            />
            <button
              class="btn-confirm"
              :disabled="!isValidPhone"
              @click="confirmOrder"
            >
              Confirm
            </button>
          </div>
        </transition>
      </div>
    </div>

    <div class="product-card__info">
      <h2 class="product-card__headline">
        {{ product.title.toUpperCase() }} – {{ product.price }}₽
      </h2>
      <p class="product-card__detail">
        {{ product.description }}
      </p>
    </div>

    <transition name="fade">
      <div v-if="showThankYou" class="overlay" @click.self="showThankYou = false">
        <div class="popup">
          <p>Thank you for submitting the order.<br/>You will be contacted soon.</p>
          <button class="btn-close" @click="showThankYou = false">Close</button>
        </div>
      </div>
    </transition>
  </article>
</template>

<script setup>
import { defineProps, computed, ref } from 'vue'

const props = defineProps({
  product: { type: Object, required: true }
})

const API_BASE = import.meta.env.VITE_API_BASE_URL.replace(/\/$/, '')
const fullImageUrl = computed(() => `${API_BASE}${props.product.imageUrl}`)

const showSizes    = ref(false)
const selectedSize = ref('')
function selectSize(size) {
  selectedSize.value = size
  showSizes.value = false
}

const showPhoneInput = ref(false)
const phoneNumber    = ref('')
const showThankYou   = ref(false)

const isValidPhone = computed(() => {
  return /^\+?\d{5,15}$/.test(phoneNumber.value.trim())
})

function onBuy() {
  showPhoneInput.value = !showPhoneInput.value
}

function confirmOrder() {
  // здесь можно отправить на бэк номер телефона + товары...
  showThankYou.value = true
  showPhoneInput.value = false
  phoneNumber.value = ''
}
</script>

<style scoped lang="scss">

.product-card {
  background: #0d00ff;
  color: #fff;
  padding: 1.5rem;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  overflow-x: hidden;
}

.product-card__top {
  display: flex;
  gap: 20rem;
  align-items: flex-start;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 1.5rem;
    align-items: center;
  }
}

.product-card__img {
  width: 300px;
  max-width: 100%;
  border-radius: 0.25rem;
}

.product-card__actions {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-left: auto;
  flex-shrink: 0;
}

.btn-primary, .btn-confirm {
  background: #fff;
  color: #0d00ff;
  padding: 0.75rem 1.5rem;
  border: none;
  font-weight: bold;
  border-radius: 0.25rem;
  font-family: 'Francy', sans-serif;
  text-transform: uppercase;
  letter-spacing: 3%;
  cursor: pointer;
}

.btn-secondary, .btn-close {
  background: rgba(255,255,255,0.8);
  color: #0d00ff;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  font-family: 'Francy', sans-serif;
  text-transform: uppercase;
  letter-spacing: 3%;
  cursor: pointer;
}

.btn-confirm:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.size-list, .phone-block {
  background: rgba(0,0,0,0.2);
  border-radius: 0.25rem;
  padding: 0.5rem;
  list-style: none;
}


.size-list {
  list-style: none;
  margin: 0;
  padding: 0.5rem;
  background: rgba(0,0,0,0.2);
  border-radius: 0.25rem;
  max-width: 150px;
  overflow-y: auto;

  li {
    padding: 0.25rem;
    cursor: pointer;
    &.selected {
      font-weight: bold;
      text-decoration: underline;
    }
    &:hover {
      background: rgba(255,255,255,0.2);
    }
  }
}

.phone-block {
  position: absolute;
  top: 100%;
  right: -10px;
  width: 140px;
  background: rgba(0,0,0,0.2);
  border-radius: 0.25rem;
  padding: 0.5rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  z-index: 10;

  .phone-input {
    padding: 0.5rem;
    border: 2px solid #fff;
    border-radius: 0.25rem;
    background: transparent;
    color: #fff;
    font-family: 'Francy', sans-serif;
  }
}

@media (max-width: 480px) {
  .phone-block {
    width: 100%;
    left: 0;
    right: 0;
  }
}

.product-card__info {
  margin-top: 2rem;
  text-align: center;
}

.product-card__headline {
  text-align: left;
  font-family: 'Francy', sans-serif;
  font-weight: 400;
  font-size: 2rem;
  letter-spacing: 3%;
  text-transform: uppercase;
  margin: 0 0 0.5rem;
}

.product-card__detail {
  text-align: left;
  font-family: 'Francy', sans-serif;
  font-size: 1rem;
  margin: 0;
}

.slide-down-enter-from,
.slide-down-leave-to {
  max-height: 0;
  opacity: 0;
}
.slide-down-enter-active,
.slide-down-leave-active {
  transition: max-height 0.3s ease, opacity 0.3s ease;
  overflow: hidden;
}
.slide-down-enter-to,
.slide-down-leave-from {
  max-height: 200px;
  opacity: 1;
}

/* Оверлей */
.overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.popup {
  background: #fff;
  color: #0d00ff;
  padding: 2rem;
  border-radius: 0.5rem;
  text-align: center;
  max-width: 90%;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.35s ease;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
