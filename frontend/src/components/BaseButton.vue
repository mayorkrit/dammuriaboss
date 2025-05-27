<template>
  <button
    class="base-button"
    :disabled="disabled"
    @click="onClick"
  >
    {{ label }}
  </button>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  label:    { type: String,  required: true },
  disabled: { type: Boolean, default: false },
})

const emit = defineEmits(['click'])
function onClick() { emit('click') }
</script>

<style scoped lang="scss">
.base-button {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: #fff;
  color: #0D00FF;
  border: none;
  border-radius: 0.25rem;
  font-family: 'Francy', sans-serif;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover:not(:disabled) {
    background-color: #f0f0f0;
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}
</style>
