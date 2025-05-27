<template>
  <input
    class="base-input"
    type="email"
    :placeholder="placeholder"
    :value="modelValue"
    @input="onInput"
    required
  />
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  modelValue: String,
  placeholder: { type: String, default: '' },
})

const emit = defineEmits(['update:modelValue'])
function onInput(e) {
  emit('update:modelValue', e.target.value)
}
</script>

<style scoped lang="scss">
.base-input {
  width: 100%;
  padding: 0.75rem;
  background-color: #fff;
  border: 2px solid #ccc;
  border-radius: 0.25rem;
  font-size: 1rem;
  font-family: 'Francy', sans-serif;
}
</style>
