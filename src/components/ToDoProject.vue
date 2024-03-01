<script setup>
import { ref, inject } from 'vue'

const $modals = inject('$modals')
const _result = ref('')

// Shows a modal to create or edit a to-do item
function showModal() {
  $modals.show('myModal').then(() => {
    console.log('modal open')
  })
}
</script>

<template>
  <button @click="showModal">Show modal</button>
  <div>{{ _result }}</div>
  <Modal name="myModal" title="Modal example"> Some important content here </Modal>
</template>
