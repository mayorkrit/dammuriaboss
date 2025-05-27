<template>
  <form class="email-form" @submit.prevent="onSubmit">
    <BaseInput v-model="email" placeholder="TYPE EMAIL..." />
    <div class="btn-wrapper">
      <BaseButton
        :label="buttonLabel"
        :disabled="!isValid"
        @click="onSubmit"
      />
    </div>
  </form>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import BaseInput from './BaseInput.vue'
import BaseButton from './BaseButton.vue'
import { api } from '../services/api'

const email = ref(localStorage.getItem('emailDammuria') || '')
const router = useRouter()

const isValid = computed(() => /\S+@\S+\.\S+/.test(email.value))
const buttonLabel = computed(() => email.value ? 'JOIN' : 'JOIN')

async function onSubmit() {
  if (!isValid.value) return
  localStorage.setItem('emailDammuria', email.value)
  try {
    await api.sendEmail({ email: email.value })
    router.push({ name: 'products' })
  } catch {
    alert('Ошибка при отправке почты.')
  }
}
</script>

<style scoped lang="scss">
.email-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 320px;
  margin: 0 auto;
}

@media (min-width: 768px) {
  .email-form {
    max-width: 400px;
  }
}

.btn-wrapper {
  display: flex;
  justify-content: center;
}
</style>
