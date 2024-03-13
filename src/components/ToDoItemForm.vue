<script setup>
import { ref } from "vue"
import todoService from "../services/todo"
import { onMounted } from 'vue'

onMounted(() => {
  console.log(`the component is now mounted. ${$props.modelValue.text}`)
})
const $props = defineProps({
  modelValue: {
    type: Object,
    default: () => {
      return {}
    }
  }
})
const $emit = defineEmits(["update:modelValue"])
const copyModel = ref({})
copyModel.value = { ...$props.modelValue }

function emitUpdate() {
    $emit("update:modelValue", copyModel.value)
}
</script>

<template>
  <div class="w3-cell-row w3-padding">
    <div class="w3-cell w3-padding">
      <strong>Description{{ $props }}</strong>
      <input
        type="text"
        class="w3-input w3-border"
        v-model="copyModel.text"
        @input="emitUpdate()"
      />
    </div>

    <div class="w3-cell w3-padding">
      <strong>Status</strong>
      <select class="w3-select w3-border" v-model="copyModel.status" @change="emitUpdate()">
        <option v-for="state in todoService.getStatusList()" :key="state.id" :value="state.id">
          {{ state.label }}
        </option>
      </select>
    </div>
  </div>
</template>

<style scoped></style>
