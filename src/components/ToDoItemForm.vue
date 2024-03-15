<script setup>
import todoService from '../services/todo'

const model = defineModel({ required: true, type: Object })
</script>

<template>
  <div class="w3-cell-row w3-padding">
    <div class="w3-cell w3-padding">
      <strong>Description{{ model }}</strong>
      <input type="text" class="w3-input w3-border" v-model="model.text" />
    </div>

    <div class="w3-cell w3-padding">
      <strong>Status</strong>
      <select class="w3-select w3-border" v-model="model.status">
        <option v-for="state in todoService.getStatusList()" :key="state.id" :value="state.id">
          {{ state.label }}
        </option>
      </select>
    </div>
  </div>
</template>

<style scoped></style>
