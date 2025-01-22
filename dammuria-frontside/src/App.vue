<template>
  <div id="app">
    <header>
      <!-- <nav> -->
        <!-- <router-link to="/">Home</router-link> | -->
        <!-- <router-link to="/catalog">Catalog</router-link> -->
      <!-- </nav> -->
    </header>

    <main>
      <!-- Здесь будет текущая страница -->
      <router-view />
    </main>

    <footer>
      <p>© </p>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App'
})
</script>

<style lang="scss">
#app {
  font-family: Arial, sans-serif;
  // color: #333;
  margin: 0 auto;
  max-width: 100%;

  header, footer {
    padding: 10px 0;
    // border-bottom: 1px solid #ddd;
  }

  footer {
    border-top: 1px solid #ddd;
    border-bottom: none;
    text-align: center;
  }

  nav a {
    margin-right: 10px;
    text-decoration: none;
    // color: #333;

    &:hover {
      text-decoration: underline;
    }
  }

  main {
    padding: 0 0;
  }
}
</style>
