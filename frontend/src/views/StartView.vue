<template>
  <main class="start-page">
    <section class="container">
      <h1 class="title">If you’re reading this, you’re not inside yet. <br>Join The Inside — email only</h1>
      <EmailForm />
    </section>
  </main>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import EmailForm from '../components/EmailForm.vue'

const router = useRouter()

onMounted(() => {
  const email = localStorage.getItem('emailDammuria')
  if (email) {
    router.replace({ name: 'products' })
  }
})
</script>

<style scoped lang="scss">
.start-page {
  background-color: #0D00FF;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
}

.container { text-align: center; }

.title {
  font-family: 'Francy', sans-serif;
  font-weight: 400;
  font-size: 35px;
  letter-spacing: 3%;
  text-transform: uppercase;
  margin-bottom: 1.5rem;
  color: #fff;

  @media (min-width: 480px) { font-size: 3rem; }
  @media (min-width: 768px) { font-size: 3.5rem; }
}
</style>
