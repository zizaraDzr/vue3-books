<script setup>
import { computed } from 'vue'
const props = defineProps({
  modelValue: { type: Array, default: () => [] },
  filter: { type: String, default: '' }
})
const emit = defineEmits(['edit', 'delete', 'toggle', 'editCellTable'])
const _filteredList = computed(() => {
  if (props.filter) {
    return props.modelValue.filter((item) => {
      return item.text.toUpperCase().includes(props.filter.toUpperCase())
    })
  } else {
    return props.modelValue
  }
})


function emitEvent(eventName, payload) {
  emit(eventName, payload)
}
</script>

<template>
  <div>
    <table class="w3-table">
      <thead>
        <tr class="w3-bottombar w3-topbar">
          <th>Status</th>
          <th>Item</th>
          <th class="w3-right-align">
            <slot></slot>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in _filteredList" :key="item.id" style="height: 1px;">
          <td class="clickable w3-hover-pale-blue" @click="emitEvent('toggle', item)" style="height: inherit">
            <div v-if="item.status == 'not_started'" style="background: #f1f1f1; width: 100%;height: 100%;"></div>
            <div v-if="item.status == 'in_progress'" style="background: teal; width: 100%;height: 100%;"></div>
            <div v-if="item.status == 'completed'" style="background: green; width: 100%;height: 100%;"></div>
          </td>
          <td  @dblclick="emitEvent('editCellTable', item)">
            <span v-show="!item.isEditCell">{{ item.text }}</span>
            <input @focus.stop="" v-show="item.isEditCell" type="text" v-model=" item.text" @keyup.enter="emitEvent('editCellTable', item)">
          </td>
          <td class="w3-right-align">
            <span
              class="clickable w3-transparent w3-text-indigo w3-hover-text-blue w3-hover-white w3-margin-right"
              @click="emitEvent('edit', item)"
            >
              <i class="fa-solid fa-pen-to-square"></i>
              Edit
            </span>

            <span
              class="clickable w3-transparent w3-text-purple w3-hover-text-red w3-hover-white"
              @click="emitEvent('delete', item)"
            >
              <i class="fa-solid fa-trash-can"></i>
              Delete
            </span>
          </td>
        </tr>
        <tr v-if="_filteredList.length == 0">
          <td><i class="fa-solid fa-square w3-text-light-gray"></i></td>
          <td>The list is empty.</td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
td:first-child {
  width: 5rem;
}
</style>
