<template>
    <div class="landing-page">
      <!-- Шапка (header) -->
      <header class="landing-page__header">
        <nav class="landing-page__nav">
          <ul class="landing-page__nav-list">
            <li class="landing-page__nav-item">
              <a class="landing-page__nav-link" href="#art">ART</a>
            </li>
            <li class="landing-page__nav-item">
              <a class="landing-page__nav-link" href="#culture">CULTURE</a>
            </li>
            <li class="landing-page__nav-item">
              <a class="landing-page__nav-link" href="#philosophy">PHILOSOPHY</a>
            </li>
            <li class="landing-page__nav-item">
              <a class="landing-page__nav-link" href="#community">COMMUNITY</a>
            </li>
          </ul>
        </nav>
      </header>
  
      <!-- Блок Hero с заголовками и кнопками -->
      <section class="landing-page__hero">
        <div class="clouds">
          
          <h1 class="landing-page__hero-title">DREAMING MINDS ONLY</h1>
          <h2 class="landing-page__hero-subtitle">DAMMURIA STUDIO</h2>
          
          <div class="landing-page__hero-actions">
            <!-- Инпут для e-mail -->
            <input
            class="landing-page__hero-input"
            type="email"
            placeholder="TYPE EMAIL"
            v-model="email"
            />
            
            <!-- Кнопка "JOIN COMMUNITY" -->
            <button 
            @click="subscribe" 
            class="landing-page__hero-btn landing-page__hero-btn--join"
            :disabled="loading"
            >
            JOIN COMMUNITY
          </button>
  
          <!-- Кнопка "JOIN WITH INSTAGRAM" -->
          <a href="https://www.instagram.com/dammuriastudio?igsh=ZGxzem0zc3k0dHUw&utm_source=qr" class="landing-page__hero-btn landing-page__hero-btn--instagram">
            JOIN WITH INSTAGRAM
          </a>
        </div>
      </div>
      </section>
  
      <!-- Раздел ART (как внизу макета) -->
      <section class="landing-page__art" id="art">
      <h2 id="art" class="landing-page__art-title">ART</h2>
      <div class="landing-page__art-underline"></div>

      <!-- Карточка товара (продукт) -->
      <div class="landing-page__product">

      </div>

      <!-- Разделительная линия (синяя) -->
      <div class="landing-page__divider"></div>

      <!-- Второй блок товара (розовое "мыло") -->
      <div class="landing-page__soap">
        <!-- Подставь свою картинку вместо /assets/soap.png -->
        <img
          src="../assets/soap.png"
          alt="Dammuria Studio Soap"
          class="landing-page__soap-img"
        />
        <button class="landing-page__soap-btn">
          BUY
        </button>
      </div>
    </section>
    </div>
  </template>
  
<script lang="ts">
    import { defineComponent, ref, computed } from 'vue'
    import { useStore } from 'vuex'
    import { RootState } from '../store/index.ts'
  
  export default defineComponent({
    name: 'HomePage',
    setup() {
    const store = useStore<RootState>()
    const email = ref('')

    // Читаем поля подписки из store
    const loading = computed(() => store.state.loading)
    const error = computed(() => store.state.error)
    const success = computed(() => store.state.success)

    const subscribe = () => {
      store.dispatch('subscribeEmail', email.value)
    }

    return {
      email,
      loading,
      error,
      success,
      subscribe
    }
  }
  })
  </script>
  
  <style lang="scss" scoped>
  // ------------------------------
  // Переменные (примерные)
  // ------------------------------
  $brand-blue: #0000ff;
  $text-color: #000;
  $font-family: 'Arial', sans-serif;
  $max-content-width: 1200px;
  $gray-bg: #ddd;
  
  // ------------------------------
  // Корневой блок landing-page
  // ------------------------------
  .landing-page {
    min-height: 100vh;
    width: 100%;
    background-color: #fff;
    color: $text-color;
    font-family: $font-family;
    margin: 0 auto;
  }
  
  // ------------------------------
  // Элемент: header (шапка)
  // ------------------------------
  .landing-page__header {
    width: 100%;
    // padding: 20px 40px;
    display: flex;
    
    
    // Меню навигации
    .landing-page__nav {
        padding: 0 40px;
        width: 100%;
    }

    .landing-page__nav-list {
      display: flex;
      width: 100%;
      list-style: none;
      gap: 40px;
      margin: 0;
      padding: 0;
      justify-content: space-between;
    }
  
    .landing-page__nav-link {
      text-decoration: none;
      color: $brand-blue;
      font-weight: 600;
      transition: color 0.2s ease;
  
      &:hover {
        color: darken($brand-blue, 15%);
      }
    }
  }
  
  // ------------------------------
  // Элемент: hero (главный блок)
  // ------------------------------
  .landing-page__hero {
    max-width: $max-content-width;
    margin: 0 auto;
    padding: 80px 20px 60px;
    text-align: center;
  }
  
  // Заголовки
  .landing-page__hero-title {
    font-size: 2.5rem;
    color: $brand-blue;
    margin-bottom: 5px;
    letter-spacing: 0.00em;
  }
  
  .landing-page__hero-subtitle {
    font-size: 1rem;
    color: #0000ff;
    margin-bottom: 50px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
  
  // Обёртка для кнопок и инпута
  .landing-page__hero-actions {
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    justify-content: center;
  }
  
  // Элемент: инпут
  .landing-page__hero-input {
    width: 250px;
    height: 45px;
    border-radius: 30px;
    border: none;
    text-align: center;
    font-size: 0.9rem;
    color: $text-color;
    background: #f8f8f8;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    outline: none;
  
    &::placeholder {
      color: #aaa;
    }
  }
  
  // Элемент: кнопка, + модификаторы
  .landing-page__hero-btn {
    width: 250px;
    height: 45px;
    border-radius: 30px;
    border: none;
    font-size: 0.9rem;
    font-weight: 600;
    color: #fff;
    cursor: pointer;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.1s ease;
  
    &:active {
      transform: scale(0.98);
    }
  
    &--join {
      background-color: $brand-blue;
    }
  
    &--instagram {
      background-color: $brand-blue;
      // Или цвет, соответствующий Instagram, если нужно
      // background-color: #e1306c;
    }
  }
  
  // ------------------------------
  // Элемент: art (блок снизу)
  // ------------------------------
  .landing-page__art {
  max-width: $max-content-width;
  margin: 60px auto 0; // отступ сверху, если нужен
  padding: 0 20px;
  text-align: left; // либо center, если нужно
}

.landing-page__art-title {
  font-size: 2rem;
  color: $brand-blue;
  margin-bottom: 10px;
}

.landing-page__art-underline {
  height: 4px;
  background-color: $brand-blue;
  width: 100px; /* ширина синей полоски */
  margin-bottom: 40px;
}

// ------------------------------
// Divider (синяя полоска-разделитель)
// ------------------------------
.landing-page__divider {
  margin: 40px 0;
  height: 2px;
  background-color: $brand-blue;
}

// ------------------------------
// Product (карточка товара)
// ------------------------------
.landing-page__product {
  display: flex;
  gap: 20px;
  // Для адаптива можно добавить media-queries
  // и делать flex-direction: column; при маленьких экранах
}

// Левая часть: "фото"
.landing-page__product-photo {
  width: 300px;
  height: 300px;
  background-color: $gray-bg;
  border: 2px solid $brand-blue;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.landing-page__product-photo-text {
  font-size: 1rem;
  color: #333;
}

.landing-page__product-photo-arrow {
  position: absolute;
  right: 10px;
  font-size: 1.2rem;
  color: #333;
}

// Правая часть: инфо и кнопки
.landing-page__product-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px 0;
}

.landing-page__product-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 8px;
}

.landing-page__product-desc {
  font-size: 0.8rem;
  margin-bottom: 16px;
  color: #555;
}

// Кнопки
.landing-page__product-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.landing-page__product-btn {
  width: 120px;
  height: 40px;
  border: none;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  // общее оформление, а цвет - по модификатору
}

.landing-page__product-btn--buy {
  background-color: $brand-blue;
  color: #fff;
}

.landing-page__product-btn--size {
  background-color: #fff;
  color: #000;
  border: 2px solid #000; // обводка чёрным
}

// ------------------------------
// Второй блок товара (розовое "мыло")
// ------------------------------
.landing-page__soap {
  display: flex;
  align-items: center;
  gap: 20px;
}

.landing-page__soap-img {
  width: 300px;  // подбирай по макету
  // height: auto (автоматически)
  display: block;
}

.landing-page__soap-btn {
  width: 100px;
  height: 40px;
  border-radius: 20px;
  border: none;
  font-size: 0.9rem;
  font-weight: 600;
  color: #fff;
  background-color: $brand-blue;
  cursor: pointer;
  &:active {
    transform: scale(0.97);
  }
}

.clouds {
  background-image: url(../assets/CLOUD.svg);
}

</style>
  