<template>
    <div class="catalog">
      <h1>Catalog Page</h1>
      <p>Здесь будет список товаров</p>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue'
  
  export default defineComponent({
    name: 'CatalogPage'
  })
  </script>
  
  <style lang="scss" scoped>
  .catalog {
    padding: 20px;
    h1 {
      color: #e74c3c;
    }
  }
  </style>
  