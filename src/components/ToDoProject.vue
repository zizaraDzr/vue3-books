<script setup>
import { ref, inject } from 'vue'
import TodoItemForm from './ToDoItemForm.vue'
import TodoList from './ToDoList.vue'
// import TodoFilter from './ToDoFilter.vue'
// import TodoSummary from './ToDoSummary.vue'
import todoService from '../services/todo'

const $modals = inject('$modals')
const filter = ref('')
const defaultItem = ref(todoService.getDefault())
const items = ref([])

// Shows a modal to create or edit a to-do item
function showModal(newItem = true, item = {}) {
  if (newItem) {
    // Prepare a new item
    defaultItem.value = todoService.getDefault()
  } else {
    // Make a copy of the item for editing
    defaultItem.value = todoService.makeCopy(item)
  }

  // Open the modal
  $modals.show('newEditItem').then(
    () => {
      if (newItem) {
        // Add to the list
        items.value.push(defaultItem.value)
      } else {
        // Replace item
        let index = getIndex(item)
        if (index >= 0) {
          items.value[index] = defaultItem.value
        } else {
          alert('Error updating the item')
        }
      }
    },
    () => {
      // Handle cancellation, in this case, just ignore.
    }
  )
}

function deleteItem(item) {
  $modals.show('deleteItem').then(
    () => {
      let index = getIndex(item)
      if (index >= 0) {
        items.value.splice(index, 1)
      }
    },
    () => {}
  )
}

function getIndex(item) {
  let index = items.value.findIndex((it) => {
    return it.id == item.id
  })
  if (index == -1) {
    return false
  } else {
    return index
  }
}

function toggleStatus(item) {
  item.status = todoService.toggleStatus(item.status)
}
</script>

<template>
  <div class="project-container">
    <!-- Summary -->
    <!-- <TodoSummary :items="items" class="w3-margin-bottom"></TodoSummary> -->

    <!-- Filter bar -->
    <!-- <div class="w3-margin-bottom">
      <TodoFilter v-model="filter" class="flex-grow"></TodoFilter>
    </div> -->

    <!-- Todo list -->
    <TodoList
      v-model="items"
      :filter="filter"
      @toggle="toggleStatus"
      @edit="showModal(false, $event)"
      @delete="deleteItem"
    >
      <button @click="showModal(true)" class="w3-button w3-blue w3-round-xxlarge">
        <i class="fa-solid fa-square-plus"></i>
        New items
      </button>
    </TodoList>

    <!-- Modals -->
    <Modal name="newEditItem" title="To Do Item">
      <TodoItemForm v-model="defaultItem"></TodoItemForm>
    </Modal>

    <Modal name="deleteItem" title="Delete To-Do Item">
      <p>
        This action will delete the item:<br />
        <strong>{{ defaultItem.text }}</strong>
      </p>
      <p class="w3-text-red w3-pale-red">This action cannot be undone.</p>
    </Modal>
  </div>
</template>

<style scoped>
.project-container {
  max-width: 56rem;
  padding: 1rem;
  margin: 0 auto;
}
</style>
