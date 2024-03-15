<script setup>
import { ref, onMounted } from 'vue'
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
const value = ref('')

onMounted(() => {
  value.value = props.modelValue
})

function clear() {
  value.value = ''
  publishValue()
}

function publishValue(event) {
  emit('update:modelValue', event?.target.value || '')
}
</script>

<template>
  <div class="flex-container w3-border">
    <input
      type="text"
      class="w3-input w3-border-0"
      v-model="value"
      @keyup.enter="publishValue($event)"
      placeholder="Enter filter text here..."
    />
    <button class="w3-border-0" @click="clear()">
      <i class="fas fa-fw fa-times"></i>
      очистить
    </button>
  </div>
</template>

<style scoped></style>
